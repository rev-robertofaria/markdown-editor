# Markdown.md

Leitor e editor de Markdown que roda inteiro num único `index.html`. Os arquivos são lidos direto do seu computador e o conteúdo deles nunca sai do navegador.

**Usar online:** https://rev-robertofaria.github.io/markdown-editor/
**Usar offline:** baixe o `index.html` e abra no Chrome/Edge (na primeira vez, precisa de internet para carregar as bibliotecas).

## Recursos
- Abrir pasta inteira (ex.: vault "Zikaron" do Obsidian) ou arquivos soltos; arrastar e soltar
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
- Hoje a página baixa as bibliotecas (marked, DOMPurify, highlight.js, KaTeX, Mermaid) de `cdn.jsdelivr.net` e `cdnjs.cloudflare.com`, com versão fixa.
- Imagens com URL externa (`https://...`) dentro de um `.md` são carregadas do site de origem.
