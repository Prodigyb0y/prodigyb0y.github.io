# Auditoria do portfólio (modo repositório, árvore de trabalho)

Data: 2026-11-23. Fonte: `/home/claude/site`, branch `feat/portfolio`, sem commit. Páginas geradas em `out/` e servidas em localhost.

Escopo: rodei os critérios de 6 lentes (design, UX, frontend, desempenho, prontidão para produção e acessibilidade) e a lista do web-review como verificação direta no site renderizado. Não invoquei cada skill de lente separadamente. Backend/Rust, estrutural, DX e mantenedor de repositório não se aplicam a um site estático de 14 páginas.

## Veredito: aprovar com mudanças já feitas e 4 pendências suas

## Medições (feitas, não lidas do código)
| Verificação | Resultado |
|---|---|
| Lighthouse, mobile e desktop, `/`, `/projetos/`, página de projeto | desempenho 100, acessibilidade 100, boas práticas 96, SEO 100 (antes do favicon) |
| Lighthouse após favicon, `/`, RAG, `/video/` | desempenho 98, 99 e 96; acessibilidade 100; boas práticas 100; SEO 100 |
| Rolagem horizontal, 12 páginas × 375, 768 e 1440 px × claro e escuro | nenhuma |
| axe-core, 12 páginas × claro e escuro | 0 violações |
| Ordem dos títulos | 1 h1 por página, sem saltos |
| Foco por teclado (16 tabs numa página de projeto) | contorno de 3 px em todos; link "Pular para o conteúdo" é o primeiro |
| `prefers-reduced-motion: reduce` | 0 animações em execução na home |
| Movimento normal | 3 animações (entrada das linhas da ficha), uma vez |
| Console | 1 erro 404 (favicon), corrigido |

## Corrigido durante a revisão
1. Favicon ausente (404 e boas práticas 96): adicionado `app/icon.svg`.
2. Rodapé citava a empresa em todas as páginas: trocado por "produção interna do autor". O nome da empresa fica só em Experiência.
3. Trecho de roteamento do RAG usava uma frase que não existe no README: reescrito com os números verificados.

## Pendências (precisam de decisão ou de ação do Guilherme)
| # | Item | Por quê |
|---|---|---|
| 1 | Botão "Currículo" leva à página Experiência | O .docx do CV tem e-mail e telefone, então não pode ser publicado. Se quiser um PDF, gere uma versão sem contatos. |
| 2 | README do alerta de desvio escreve "260 por ano"; o autor confirmou 2 execuções por dia útil (260 dias × 2 = 520) | Site ajustado para 260 dias úteis e 520 execuções. Falta só corrigir o texto do README. |
| 3 | README da API e briefing divergem sobre quem escreveu os casos | Decisão do autor: manter o texto do README. |
| 4 | Space do simulador ("iFood GenAI Coach") fora do site | Decisão do autor: manter fora; ajusta depois, se quiser. |

## Não verificado
- LinkedIn: o site bloqueia robôs (HTTP 999), então o link não foi checado.
- Leitor de tela: não testado, declarado no site.
- Lighthouse rodou em localhost, não no site publicado. Rode de novo após publicar.
- Imagem de pré-visualização para redes sociais (Open Graph): não criada.
- Vídeo sem narração: só legendas na tela. Os quadros foram conferidos por amostragem a cada 5 s mais quadros-chave, não um a um.

## Nice to have
- Menu do celular ocupa 3 linhas; funciona, mas pode virar um botão "Menu".
- Imagem Open Graph.
- Legendas em arquivo `.vtt` além das queimadas, se quiser acessibilidade por leitor.
