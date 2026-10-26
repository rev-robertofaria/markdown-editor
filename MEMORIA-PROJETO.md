# MEMORIA-PROJETO — Markdown.md

## Objetivo
Leitor e editor de Markdown local em um único HTML, para as pastas de projeto e o vault Obsidian "Zikaron".

## Decisões
| Data | Decisão | Motivo |
|---|---|---|
| 26/10/2026 | Repositório próprio, público, com GitHub Pages | PWA exige HTTPS; Pages grátis só em repo público |
| 26/10/2026 | Nome de exibição **Markdown.md** (pedido do Roberto); repo e URL `markdown-md` | Um ponto no nome do repo gera a URL `/markdown.md/`, que parece um arquivo e confunde links e o escopo da PWA |
| 26/10/2026 | Arquivo continua `index.html` | Um arquivo `.md` não é renderizado como página pelo navegador |
| 26/10/2026 | Prefixo do localStorage `markdownmd.` | Consistência com o novo nome |

## Auditoria das propostas (26/10/2026)
Testado em Chromium headless com o HTML original:
- Confirmado: "Abrir arquivos" acrescenta à lista (1 → 2 arquivos) sem fechar o que estava aberto.
- Confirmado (bug): abrir `b/nota.md` depois de `a/nota.md` substitui a primeira na lista (continuam 2 arquivos).
- Confirmado: sem acesso às CDNs, a página mostra só o aviso e o texto cru.
- Descartado: suspeita de `$5 … $10` virar fórmula. A regex já impede isso.

## Backlog
- v1.0: PWA + abrir .md na mesma janela, offline (bibliotecas dentro do repo), abas, pastas recentes, correção do nome duplicado, resolver wikilinks de arquivo aberto por duplo clique.
- v1.1: novo arquivo/renomear, busca no conteúdo, edição lado a lado.

## Histórico
- 26/10/2026 — Repositório preparado a partir de `leitor-md_1.html` (agora `index.html`), com README e `.nojekyll`.
- 26/10/2026 — Renomeado para Markdown.md. Auditoria das propostas registrada acima.
