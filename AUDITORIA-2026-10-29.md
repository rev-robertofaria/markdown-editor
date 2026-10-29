# Auditoria — Markdown.md

> 29/10/2026 · Versão auditada: commit após `74d121a` (service worker v9)
> Site: https://rev-robertofaria.github.io/markdown-editor/

## Resultado
- **Funcional:** 48 de 48 testes automáticos passaram, mais 5 cenários de local dos arquivos soltos e o teste do HTML único offline.
- **Problemas encontrados:** 5, todos corrigidos nesta mesma auditoria (lista abaixo).
- **Falta confirmar no Windows:** 3 testes que só funcionam no PC do Roberto (ver "Testes no PC").

## Como foi testado
- Navegador Chromium (o mesmo motor do Chrome e do Edge), automatizado com Playwright.
- Ecrãs: computador (1440 e 1150 px) e telemóvel (390 px), tema claro e escuro.
- Pasta de teste no formato do Zikaron: subpasta, imagem, `node_modules`, `[[wikilinks]]`, front matter, callout, tabela, tarefas, notas de rodapé, fórmulas, diagrama e código.
- Gravação real no arquivo (Ctrl+S) e alteração do arquivo "por fora" para testar a auto-atualização.
- Sem internet: service worker (site) e HTML único aberto do disco.
- Segurança: nome de arquivo e conteúdo com código malicioso (`<img onerror>`, `<script>`).
- Migração: recentes gravados pela versão anterior continuam visíveis.
- Deploy: GitHub Pages concluído com sucesso para o último commit.

## Testes automáticos (48/48)
| Área | Teste | Resultado |
|---|---|---|
| Início | Tela inicial com cartões | ✅ |
| Início | Recentes vazio com mensagem | ✅ |
| Pasta | Lista os .md da pasta e das subpastas | ✅ |
| Pasta | Ignora `node_modules` | ✅ |
| Pasta | Título da lista com o nome da pasta | ✅ |
| Render | Front matter | ✅ |
| Render | Tabela | ✅ |
| Render | Tarefas | ✅ |
| Render | Nota de rodapé | ✅ |
| Render | Fórmulas KaTeX (na linha e em bloco) | ✅ |
| Render | Diagrama Mermaid | ✅ |
| Render | Realce de código | ✅ |
| Render | Callout do Obsidian | ✅ |
| Render | Imagem `![[embed]]` da pasta | ✅ |
| Render | `[[wikilink]]` | ✅ |
| Render | Botão Copiar nos blocos de código | ✅ |
| Barra de cima | Local da pasta e contagem de palavras | ✅ |
| Índice | Índice lateral em ecrã largo | ✅ |
| Wikilink | Clique abre a nota ligada | ✅ |
| Atalhos | Ctrl+K filtra a lista | ✅ |
| Atalhos | Ctrl+B esconde e mostra a lista | ✅ |
| Edição | Ctrl+E abre o editor | ✅ |
| Edição | Ctrl+S grava no arquivo original | ✅ |
| Edição | Aviso "Guardado ✓" | ✅ |
| Edição | Esc volta à leitura com o texto novo | ✅ |
| Recentes | Registra os arquivos com o local | ✅ |
| Recentes | Marca "editado" | ✅ |
| Recentes | Destaca o arquivo atual | ✅ |
| Recentes | Continuam após recarregar | ✅ |
| Recentes | × remove um item | ✅ |
| Recentes | "limpar" esvazia a lista | ✅ |
| Recentes | Recentes da versão anterior continuam (com "📍 indicar pasta") | ✅ |
| Auto-atualizar | Recarrega quando o arquivo muda no disco | ✅ |
| Aparência | Botão de tema alterna | ✅ |
| Aparência | A+ aumenta a fonte | ✅ |
| Aparência | Tema e fonte lembrados após recarregar | ✅ |
| Impressão | Barra e lista não saem no PDF | ✅ |
| Acessibilidade | Todos os botões têm nome ou título | ✅ |
| Layout | Botões da barra com a mesma altura (34 px) | ✅ |
| Privacidade | Nenhum pedido a servidores externos | ✅ |
| Segurança | Nome ou conteúdo malicioso não executa código | ✅ |
| Offline | Abre sem internet (service worker) | ✅ |
| Telemóvel | Sem rolagem horizontal | ✅ |
| Telemóvel | Barra cabe sem cortar | ✅ |
| Telemóvel | Botão de painel abre a lista | ✅ |
| Erros | Sem erros de JavaScript (computador) | ✅ |
| Erros | Sem erros de JavaScript (telemóvel) | ✅ |
| Erros | Sem erros na migração dos recentes | ✅ |

### Local dos arquivos soltos (arrastados ou abertos por "Abrir arquivos")
| Cenário | Resultado |
|---|---|
| Arquivo solto, nenhuma pasta conhecida | ✅ "local por identificar" + botão "📍 indicar pasta" |
| Clicar em "indicar pasta" | ✅ O seletor abre já na pasta do arquivo; depois mostra "Zikaron › Igreja" |
| Outro arquivo solto da mesma pasta | ✅ O local aparece sozinho |
| Arquivo do Zikaron solto com a pasta Claude-Code aberta | ✅ Registrado como Zikaron (antes ficava como Claude-Code) |
| Arquivo fora de qualquer pasta conhecida | ✅ "local por identificar" |

### HTML único (`Markdown.md.html`, 5,27 MB, aberto do disco sem internet)
✅ Bibliotecas carregam, recentes funcionam, botão "Baixar" escondido (já é o arquivo baixado), sem erros.

### Verificações no código
| Item | Resultado |
|---|---|
| Sintaxe do JavaScript | ✅ |
| Manifesto do app (id `/markdown-editor/`, 4 ícones, abrir .md pelo Windows) | ✅ |
| Service worker: os 33 arquivos da lista existem | ✅ |
| Licenças das bibliotecas em `lib/LICENSES/` (5) | ✅ |
| Safari 15 (MacBook 2012) | ✅ Só `:has()` nas listas de tarefas; sem ele, o Safari mostra a lista normalmente (já registrado antes) |

## Problemas encontrados e corrigidos
1. **Imagens pedidas ao site (erro 404).** Ao abrir uma nota com imagem local, o navegador pedia a imagem ao github.io antes de o app a trocar pela do disco. A imagem aparecia, mas o nome dela ia para o servidor. **Corrigido:** o pedido já não sai.
2. **Arquivo solto sem local** (pedido do Roberto). Arrastar ou abrir um arquivo sozinho mostrava só "arquivo avulso". O navegador não revela de que pasta veio um arquivo solto. **Corrigido:** o app guarda as pastas já abertas ("pastas conhecidas", até 30); o arquivo que estiver dentro de uma delas mostra o local sozinho. Para os outros, há o botão **📍 indicar pasta**, que abre o seletor já na pasta do arquivo: basta clicar em "Selecionar pasta" uma vez.
3. **Local errado.** Com uma pasta aberta, um arquivo de outro lugar solto por cima era registrado como se fosse dessa pasta. **Corrigido.**
4. **Recente repetido.** Depois de "indicar pasta", o mesmo arquivo podia aparecer duas vezes. **Corrigido:** os dois registos juntam-se num só.
5. **Soltos misturados na lista da pasta.** **Corrigido:** passam a aparecer no grupo "Soltos (fora de …)", no topo da lista.

## Limites (do navegador, não do app)
- **Caminho completo do disco (C:\…):** nenhuma página web consegue ver. O app mostra o nome da pasta e o caminho dentro dela.
- **Reabrir com um clique e "indicar pasta":** só no Chrome e no Edge. Firefox, Safari e o HTML único guardam só o registo.
- **Recentes:** ficam só no navegador do computador onde os arquivos foram abertos.

## Testes no PC (só o Roberto pode fazer)
O Chromium deste servidor fecha sempre que lê um "handle" de arquivo guardado (limitação do ambiente; no Chrome e no Edge do Windows é o método oficial). Por isso a reabertura e as pastas conhecidas foram testadas com os handles em memória. Falta confirmar no PC:
1. Abrir o Zikaron, fechar o navegador, abrir de novo e clicar num recente: deve pedir autorização e abrir.
2. Arrastar um `.md` que esteja dentro do Zikaron: deve aparecer "📁 Zikaron › …" sem pedir nada.
3. Arrastar um `.md` de outra pasta (ex.: Downloads): deve aparecer "📍 indicar pasta"; clicar, confirmar a pasta e ver o local.

## Pendências e backlog
- v1.0: falta só **abas**.
- v1.1: novo arquivo e renomear, busca no conteúdo, edição lado a lado.
