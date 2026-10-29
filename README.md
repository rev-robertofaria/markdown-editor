# Markdown.md

Leitor e editor de Markdown que roda inteiro num único `index.html`. Os arquivos são lidos direto do seu computador e o conteúdo deles nunca sai do navegador.

**Usar online:** https://rev-robertofaria.github.io/markdown-editor/
**Sem internet:** depois da primeira visita, o app instalado funciona offline.

## Instalar como app (recomendado)
1. Abra o site no **Chrome** ou no **Edge** e clique em **⤓ Instalar** (ou no ícone de instalar na barra de endereço).
2. No Explorer, botão direito num `.md` → **Abrir com** → **Markdown.md** (marque "Sempre usar este app" se quiser).
3. Cada `.md` aberto assim entra na **mesma janela**, na lista lateral; não é preciso fechar e abrir de novo.
4. Se o arquivo estiver dentro da pasta já aberta (ex.: Zikaron), ele usa o caminho real e os `[[links]]` e imagens funcionam.

## Baixar como um único ficheiro HTML (sem instalar)
No site, botão **⬇ Baixar HTML** (ou direto: https://rev-robertofaria.github.io/markdown-editor/markdown-md.html).
Gera `Markdown.md.html` (~5 MB) com todas as bibliotecas dentro: abre com duplo clique, funciona sem internet, não precisa de instalar.
Para regenerar depois de mudar `index.html` ou `lib/`: `node build-standalone.mjs`.

## Recursos
- Abrir pasta inteira (ex.: vault "Zikaron" do Obsidian) ou arquivos soltos; arrastar e soltar
- **Recentes**: últimos 20 arquivos abertos ou guardados, com a pasta onde estão e quando foram abertos/editados; reabrir com um clique no Chrome/Edge. Ficam só neste navegador; o caminho completo do disco não é visível para páginas web, só o nome da pasta e o caminho dentro dela
- Tabelas, tarefas, notas de rodapé, realce de código, KaTeX, Mermaid
- `[[wikilinks]]`, `![[embeds]]`, callouts e front matter do Obsidian
- Editar e guardar no arquivo original (Chrome/Edge — File System Access API)
- Auto-atualização quando o arquivo é salvo por outro programa
- Tema claro/escuro, tamanho de fonte, impressão/PDF

## Atalhos
| Tecla | Ação |
|---|---|
| Ctrl+Shift+O | Abrir pasta |
| Ctrl+O | Abrir arquivos |
| Ctrl+K | Filtrar |
| Ctrl+B | Mostrar/ocultar lista |
| Ctrl+E | Editar / ler |
| Ctrl+S | Guardar |
| Ctrl+P | Imprimir / PDF |

## Privacidade
- O conteúdo dos arquivos abertos fica no navegador e não é enviado a servidor nenhum.
- As bibliotecas (marked, DOMPurify, highlight.js, KaTeX, Mermaid) estão dentro do repositório, em `lib/`. A página não chama nenhuma CDN.
- Imagens com URL externa (`https://...`) dentro de um `.md` são carregadas do site de origem.

## Sem internet
Depois da primeira visita com internet, o app funciona offline: o service worker guarda a página e as bibliotecas no computador.

## Licenças de terceiros
Ver `lib/LICENSES/` (marked e KaTeX: MIT; Mermaid: MIT; DOMPurify: Apache-2.0 / MPL-2.0; highlight.js: BSD-3-Clause).
