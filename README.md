# Leitor MD

Leitor e editor de Markdown que roda inteiro num único `index.html`. Os arquivos são lidos direto do seu computador e nada é enviado para a internet.

**Usar online:** https://rev-robertofaria.github.io/leitor-md/
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
O site no GitHub Pages só serve o HTML. Os arquivos abertos ficam no navegador e não são enviados para servidor nenhum.
As bibliotecas (marked, DOMPurify, highlight.js, KaTeX, Mermaid) vêm de CDN com versão fixa.
