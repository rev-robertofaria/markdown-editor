// Gera markdown-md.html: um único ficheiro HTML com todas as bibliotecas embutidas.
// Abre direto do disco (duplo clique), sem internet e sem instalar.
// Correr depois de mudar index.html ou lib/:   node build-standalone.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const rd = (p) => readFileSync(new URL(p, import.meta.url));
const txt = (p) => rd(p).toString("utf8");
const b64 = (p) => rd(p).toString("base64");
// Cada biblioteca entra em base64 e é avaliada no âmbito global: evita que sequências como
// "<!--" ou "<script" dentro do código confundam o parser de HTML.
const js = (p) => `(0,eval)(new TextDecoder().decode(Uint8Array.from(atob("${b64(p)}"),function(c){return c.charCodeAt(0)})))`;

let html = txt("./index.html");
const swap = (from, to) => { if (!html.includes(from)) throw new Error("não encontrado: " + from); html = html.replace(from, () => to); };

// KaTeX: fontes woff2 embutidas; outras variantes (woff/ttf) removidas
let katexCss = txt("./lib/katex/katex.min.css").replace(/url\(fonts\/([^)]+?)\.(woff2|woff|ttf)\)\s*format\("[^"]+"\),?/g, (m, name, ext) => {
  const f = `./lib/katex/fonts/${name}.woff2`;
  return ext === "woff2" && existsSync(new URL(f, import.meta.url)) ? `url(data:font/woff2;base64,${b64(f)}) format("woff2"),` : "";
}).replace(/,\s*}/g, "}").replace(/,;/g, ";").replace(/src:([^;}]*?),\s*([;}])/g, "src:$1$2");

swap('<link rel="manifest" href="manifest.webmanifest">', "");
swap('<link rel="icon" type="image/png" href="icons/favicon-64.png">', `<link rel="icon" type="image/png" href="data:image/png;base64,${b64("./icons/favicon-64.png")}">`);
swap('<link rel="apple-touch-icon" href="icons/icon-192.png">', "");
swap('<link rel="stylesheet" href="lib/katex/katex.min.css">', `<style>${katexCss}</style>`);
swap('<link id="hl-light" rel="stylesheet" href="lib/hljs/github.min.css">', `<style id="hl-light">${txt("./lib/hljs/github.min.css")}</style>`);
swap('<link id="hl-dark" rel="stylesheet" href="lib/hljs/github-dark.min.css" disabled>', `<style id="hl-dark">${txt("./lib/hljs/github-dark.min.css")}</style>`);
for (const f of ["marked.min.js", "purify.min.js", "hljs/highlight.min.js", "katex/katex.min.js"])
  swap(`<script src="lib/${f}"></script>`, `<script>${js("./lib/" + f)}</script>`);
// Mermaid embutido (o carregamento preguiçoso deteta window.mermaid e não pede o ficheiro)
{ const mer = js("./lib/mermaid.min.js"); html = html.replace(/(<script>\s*"use strict";)/, (m) => `<script>window.MDMD_STANDALONE=true;</script>\n<script>${mer}</script>\n${m}`); }
// LICENÇAS de terceiros (exigidas ao redistribuir)
const lic = ["marked.md", "dompurify.txt", "highlightjs.txt", "katex.txt", "mermaid.txt"].map((f) => `--- ${f} ---\n` + txt("./lib/LICENSES/" + f)).join("\n\n").replace(/-->/g, "--&gt;");
html = html.replace("</body>", () => `<!--\nMarkdown.md — ficheiro único gerado por build-standalone.mjs\nhttps://github.com/rev-robertofaria/markdown-editor\n\nLicenças das bibliotecas incluídas:\n${lic}\n-->\n</body>`);

writeFileSync(new URL("./markdown-md.html", import.meta.url), html);
console.log("markdown-md.html:", (html.length / 1024 / 1024).toFixed(2), "MB");
