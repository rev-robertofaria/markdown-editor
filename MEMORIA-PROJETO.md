# MEMORIA-PROJETO — Markdown.md

## Objetivo
Leitor e editor de Markdown local em um único HTML, para as pastas de projeto e o vault Obsidian "Zikaron".

## Decisões
| Data | Decisão | Motivo |
|---|---|---|
| 26/10/2026 | Repositório próprio, público, com GitHub Pages | PWA exige HTTPS; Pages grátis só em repo público |
| 26/10/2026 | Nome de exibição **Markdown.md** (pedido do Roberto); repo e URL `markdown-editor` | Um ponto no nome do repo geraria a URL `/markdown.md/`, que parece um arquivo; `markdown-editor` escolhido pelo Roberto (disponível no GitHub) |
| 26/10/2026 | Arquivo continua `index.html` | Um arquivo `.md` não é renderizado como página pelo navegador |
| 26/10/2026 | Prefixo do localStorage `markdownmd.` | Consistência com o novo nome |

## Auditoria das propostas (26/10/2026)
Testado em Chromium headless com o HTML original:
- Confirmado: "Abrir arquivos" acrescenta à lista (1 → 2 arquivos) sem fechar o que estava aberto.
- Confirmado (bug): abrir `b/nota.md` depois de `a/nota.md` substitui a primeira na lista (continuam 2 arquivos).
- Confirmado: sem acesso às CDNs, a página mostra só o aviso e o texto cru.
- Descartado: suspeita de `$5 … $10` virar fórmula. A regex já impede isso.

## Backlog
- v1.0: ~~PWA + abrir .md na mesma janela~~ ✓, ~~correção do nome duplicado~~ ✓, ~~wikilinks de arquivo aberto por duplo clique (quando dentro da pasta aberta)~~ ✓; ~~offline (bibliotecas dentro do repo)~~ ✓; ~~arquivos recentes~~ ✓; falta: abas.
- v1.1: novo arquivo/renomear, busca no conteúdo, edição lado a lado.

## Histórico
- 26/10/2026 — Repositório preparado a partir de `leitor-md_1.html` (agora `index.html`), com README e `.nojekyll`.
- 26/10/2026 — Renomeado para Markdown.md. Auditoria das propostas registrada acima.
- 26/10/2026 — Repositório definido como `markdown-editor` (URL: rev-robertofaria.github.io/markdown-editor/).
- 26/10/2026 — GitHub Pages ativo: https://rev-robertofaria.github.io/markdown-editor/
- 26/10/2026 — Melhoria 1: PWA instalável (manifest, service worker, ícones), `file_handlers` para .md e `launch_handler: focus-existing` (abre na mesma janela). Arquivos com o mesmo nome viram "nome (2).md". Arquivo dentro da pasta aberta usa o caminho real. Testado em Chromium: manifesto sem erros, instalável, SW ativo, regras de nome e caminho OK. O duplo clique real no Windows só dá para testar no PC do Roberto.
- 26/10/2026 — Roberto testou no Windows: instalação e "Abrir com" na mesma janela funcionando. Instalação noutro PC = abrir a URL no Chrome/Edge e clicar em Instalar (não há instalador para baixar).
- 26/10/2026 — Melhoria 2: bibliotecas copiadas do npm (mesmas versões de antes) para `lib/`, com licenças em `lib/LICENSES/`. Service worker v2 guarda tudo na instalação (36 arquivos, ~4 MB). Mermaid só carrega quando há diagrama. Testado em Chromium: zero pedidos externos; com a rede desligada, código, fórmulas, diagrama e callout renderizam. Regras da melhoria 1 continuam OK.
- 29/10/2026 — Manifest `id` passou de `./` (= raiz do domínio, colidia com a calculadora eBay) para `/markdown-editor/`. SW v3. Instalações antigas continuam a funcionar; se houver comportamento estranho, desinstalar e reinstalar.
- 29/10/2026 — Pente fino: fallbacks CSS para Safari 15 (color-mix); `:has()` nas listas de tarefas fica como melhoria progressiva. SW v4.
- 29/10/2026 — Blocos de código passam a quebrar linha (sem scroll horizontal). Botão **⬇ Baixar HTML** + `build-standalone.mjs` gera `markdown-md.html` (ficheiro único, 5,25 MB, bibliotecas em base64 avaliadas no âmbito global para evitar conflitos do parser HTML). Testado offline a partir do disco (desktop e telemóvel): sem erros, sem pedidos externos, KaTeX/Mermaid/highlight OK. SW v5.
- 29/10/2026 — Visual v2: marca no topo (volta ao início), tela inicial com cartões, caminho do arquivo em "chip" (📁 pasta › subpasta) com palavras e minutos de leitura, ícones de tema e impressão em SVG, barra do telemóvel sem cortes. **Recentes**: últimos 20 arquivos abertos/guardados (IndexedDB `markdownmd`: metadados em `recent`, handles do disco à parte em `handles`, lidos só ao clicar), com pasta, subpasta e "aberto/editado há…"; reabrir com 1 clique no Chrome/Edge (pede permissão uma vez por sessão); no Firefox/Safari/HTML único fica só o registo. O navegador não revela o caminho completo do disco (C:\…), só o nome da pasta e o caminho dentro dela. Testado em Chromium (1150 px e 390 px, claro/escuro, HTML único offline): sem erros nem scroll horizontal; o Chromium do servidor de testes fecha ao ler handles guardados (limitação do ambiente), por isso a reabertura foi testada com o handle em memória. SW v6.
- 29/10/2026 — Botão da lista lateral: ☰ trocado por ícone de painel (retângulo arredondado com barra à esquerda) em SVG, na cor de destaque do app (azul; mais claro no modo escuro), a pedido do Roberto. SW v7.
- 29/10/2026 — Barra de cima harmonizada: todos os botões com 34 px de altura; botões de ícone 38×34 px; ícone do painel com o mesmo peso visual dos de tema e impressão. SW v8.
- 29/10/2026 — **Auditoria completa** (ver `AUDITORIA-2026-10-29.md`): 48/48 testes automáticos, 5 cenários de local, HTML único offline. Corrigidos: imagens locais pedidas ao site (404); arquivo solto (arrastado / "Abrir arquivos") sem local → "pastas conhecidas" (IndexedDB `folders`, v2) + botão **📍 indicar pasta** (seletor abre na pasta do arquivo); solto registrado na pasta errada; recente duplicado; soltos agrupados na lista. Falta o Roberto confirmar 3 testes no Windows. SW v9.
