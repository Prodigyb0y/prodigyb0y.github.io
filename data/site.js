// Fonte única de dados do site. Cada métrica e cada texto de medição vem do README do repositório,
// sem arredondar nem melhorar. Para conferir: busque o número aqui e no README.

export const perfil = {
  nome: "Guilherme Gabriel Bento",
  cargo: "Analista de Planejamento Logístico",
  local: "Sorocaba, SP",
  frase:
    "Construo automações e ferramentas com IA para problemas de planejamento logístico. Cada resultado vem com o método de medição e as limitações.",
  links: {
    linkedin: "https://www.linkedin.com/in/guilherme-g-bento/",
    github: "https://github.com/Prodigyb0y",
    huggingface: "https://huggingface.co/bEniac",
  },
};

export const eixos = [
  { id: "automacao", nome: "Automação" },
  { id: "dados", nome: "Dados e dashboards" },
  { id: "ia", nome: "IA, RAG e prompts" },
  { id: "apis", nome: "APIs e vibe coding" },
];

const gh = (r) => `https://github.com/Prodigyb0y/${r}`;

export const projetos = [
  {
    slug: "api-pedidos-ia",
    videoSegundos: 88,
    destaque: true,
    eixo: "apis",
    titulo: "API de pedidos com IA",
    resumo:
      "Pedido de compra em texto livre vira 8 campos estruturados e um e-mail que pede só o que falta.",
    problema:
      "Pedidos de compra chegam em texto livre. Alguém precisa ler, separar os campos e pedir ao solicitante o que ficou faltando.",
    solucao:
      "Uma API serverless transforma o texto em 8 campos, lista o que falta e escreve o e-mail pedindo só essas informações. Segundo o README, o que não está no texto volta vazio, nunca inventado. Ela integra com o n8n e tem teto de gasto mensal.",
    stack: [
      "Funções serverless da Vercel (Node 22, JavaScript puro, sem dependências)",
      "Anthropic claude-haiku-5-5, via API HTTP, com effort: low",
      "n8n Cloud (Form Trigger, HTTP Request, Data Table, IF e Gmail)",
      "Upstash Redis (opcional)",
      "OpenAPI 3.1 e node:test",
    ],
    imagem: {
      src: "/img/api-pedidos-portal-console.webp",
      alt: "Console de teste do portal da API de pedidos: à esquerda o campo de texto do pedido e quatro exemplos prontos, à direita a área de resultado ainda vazia.",
      legenda: "Console de teste do portal (print da demo pública, dados fictícios).",
    },
    medicao: {
      metodo: [
        "20 pedidos fictícios (10 completos e 10 incompletos), medidos em 21/11/2026.",
        "O gabarito foi escrito e registrado antes da execução.",
        "Os pedidos foram enviados pelo fluxo do n8n, em uma única rodada.",
        "Comparação manual em 5 pedidos (C02, C07, I01, I04, I06).",
        "Testes automatizados: 28 testes com node:test, sem chamar a Anthropic.",
      ],
      resultados: [
        { rotulo: "Campos corretos", valor: "160 de 160" },
        { rotulo: "Status correto (completo ou pendente)", valor: "20 de 20" },
        { rotulo: "E-mails citando exatamente os campos faltantes", valor: "10 de 10" },
        { rotulo: "Tempo de execução no n8n (mediana)", valor: "2,03 s" },
        { rotulo: "Custo por pedido (média)", valor: "US$ 0,000218" },
        {
          rotulo: "Comparação manual, 5 pedidos: processo manual",
          valor: "119 s por pedido, 38 de 40 campos",
          nota: "A API acertou 40 de 40 campos, com média de 2,29 s no n8n. Segundo o README, as duas medições não são equivalentes: o tempo da API é de máquina, e o manual inclui leitura e digitação.",
        },
      ],
    },
    limitacoes: [
      "Dados e pedidos fictícios, um único modelo e prompts medidos em casos escritos pelo autor do Prompt Lab.",
      "Medição de 20 pedidos em uma rodada; comparação manual com 5 cronometragens.",
      "Sem Redis, limites e teto valem por instância, não para a API inteira.",
      "O e-mail pede apenas quatro campos (área, prazo, valor com moeda e fornecedor), e a conferência é por nome exato do campo.",
      "No n8n, um texto que não é pedido (422) é registrado como pedido_sem_item, mas o solicitante não recebe resposta.",
      "O formulário de produção do n8n foi despublicado em 22/11/2026.",
      "O portal não foi testado com leitor de tela, movimento reduzido nem a ordem completa do Tab.",
    ],
    links: [
      { rotulo: "Repositório", href: gh("api-pedidos-ia") },
      { rotulo: "Portal de demonstração", href: "https://api-pedidos-portal.vercel.app" },
      { rotulo: "Console de teste (4 exemplos prontos, sem chave)", href: "https://api-pedidos-portal.vercel.app/console" },
      { rotulo: "API publicada", href: "https://api-pedidos-mu.vercel.app" },
      { rotulo: "Especificação OpenAPI", href: "https://api-pedidos-mu.vercel.app/api/openapi.json" },
      { rotulo: "Resultados medidos", href: `${gh("api-pedidos-ia")}/blob/main/docs/resultados_medicao.md` },
    ],
  },
  {
    slug: "api-pedidos-portal",
    videoSegundos: 70,
    eixo: "apis",
    titulo: "Portal da API de pedidos",
    resumo: "Interface em Next.js, feita no v0, que consome a API com a chave guardada só no servidor.",
    problema:
      "A API de pedidos precisa de uma interface para quem quer testá-la sem ler a especificação nem ter uma chave.",
    solucao:
      "O visitante cola um pedido de compra em texto livre e vê os campos extraídos, o status, o e-mail de pendências e o custo da chamada. A chave da API é lida apenas no servidor. O repositório contém só a interface; o problema, os resultados e a arquitetura estão no repositório da API.",
    stack: [
      "Next.js, TypeScript e Tailwind CSS",
      "Gerado no v0 (Vercel) e publicado na Vercel",
      "pnpm",
      "Chave da API lida só no servidor (DEMO_API_KEY)",
    ],
    imagem: {
      src: "/img/api-pedidos-portal.webp",
      alt: "Página inicial do portal da API de pedidos da empresa fictícia Gutenberg Systems, com tema escuro.",
      legenda: "Página inicial do portal (print da demo pública, dados fictícios).",
    },
    medicao: {
      metodo: [
        "Comando: npm test.",
        "16 testes de contrato da rota /api/demo/processar, com rede simulada, sem chamar a API real.",
      ],
      resultados: [
        { rotulo: "Testes de contrato", valor: "16 testes" },
        { rotulo: "Exemplos prontos no console", valor: "4 exemplos" },
      ],
    },
    limitacoes: [
      "Feito para demonstração, com dados fictícios e um limite diário de uso na API.",
      "A acessibilidade foi verificada por inspeção e teclado nas páginas principais.",
      "Não houve teste com leitor de tela, com movimento reduzido nem com a ordem completa do Tab.",
    ],
    links: [
      { rotulo: "Repositório", href: gh("api-pedidos-portal") },
      { rotulo: "Portal publicado", href: "https://api-pedidos-portal.vercel.app" },
      { rotulo: "Console de teste", href: "https://api-pedidos-portal.vercel.app/console" },
      { rotulo: "Repositório da API", href: gh("api-pedidos-ia") },
    ],
  },
  {
    slug: "dashboard-importacao",
    videoSegundos: 72,
    destaque: true,
    eixo: "dados",
    titulo: "Dashboard de custos de importação",
    resumo: "Painel em HTML, CSS e JavaScript puro, sem IA, com 14 recortes conferidos contra um script independente.",
    problema:
      "Recriação, com dados fictícios, de um padrão de trabalho do autor: entender quanto a importação custou, de onde vem o custo e onde a reposição está em risco.",
    solucao:
      "Um painel estático com custo em R$, mapa por país, MRP e cobertura de estoque. Ele não usa IA. A marca (Gutenberg Systems) e os dados são fictícios.",
    stack: [
      "HTML, CSS e JavaScript puros, em um único arquivo, sem build",
      "Python para geração de dados e gabarito (Decimal)",
      "Playwright e Chrome para a conferência",
      "GitHub Pages",
    ],
    imagem: {
      src: "/img/dashboard-importacao.webp",
      alt: "Painel de custos de importação da empresa fictícia Gutenberg Systems: filtros por país, material, segmento, área, ano e trimestre, e oito indicadores como custo total, importações e atraso médio.",
      legenda: "Visão geral do painel (print da demo pública, dados fictícios).",
    },
    medicao: {
      metodo: [
        "O script referencia.py calcula 14 recortes de forma independente do painel, com arredondamento meio para cima, e grava um gabarito.",
        "O script conferir_dashboard.py abre o painel em um navegador automatizado, aplica cada filtro e compara custo total, número de importações, atraso médio, cobertura média e pedidos críticos.",
        "Os recortes incluem o total geral, filtros por país, material, ano, trimestre, segmento, área e combinações.",
      ],
      resultados: [
        { rotulo: "Recortes conferidos", valor: "14 de 14 com diferença zero" },
        { rotulo: "Total geral", valor: "1.500 importações; custo total de R$ 307.292.989,94" },
      ],
    },
    limitacoes: [
      "Dados e alíquotas são fictícios e não servem para decisão real.",
      "A conferência prova que a soma e os filtros estão corretos. Não prova que as regras fictícias correspondem a uma operação real.",
      "Os 14 recortes foram conferidos localmente. Na página publicada, o README diz ter sido verificado apenas o carregamento e o filtro.",
      "O mapa usa geometria simplificada e destaca apenas os 5 países de origem.",
      "Não há medição de tempo ou de ganho de horas, e nenhum ganho é afirmado.",
    ],
    links: [
      { rotulo: "Repositório", href: gh("dashboard-importacao") },
      { rotulo: "Demo", href: "https://prodigyb0y.github.io/dashboard-importacao/" },
    ],
  },
  {
    slug: "prompt-lab",
    videoSegundos: 72,
    eixo: "ia",
    titulo: "Prompt Lab",
    resumo: "5 prompts de negócio e 6 experimentos com claude-haiku-5-5, com acerto e custo medidos.",
    problema:
      "Escolher uma técnica de prompt sem medir é palpite. O projeto mede o acerto e o custo de cada prompt contra um gabarito congelado antes da rodada.",
    solucao:
      "Recriação conceitual, com dados 100% fictícios gerados por script com seed fixa. Cada prompt é versionado, tem a regra de acerto em código e permite saber se uma mudança piorou o resultado.",
    stack: ["Python", "claude-haiku-5-5, com esforço de raciocínio fixado em baixo", "Gabarito congelado com hash"],
    imagem: null,
    medicao: {
      metodo: [
        "Acerto: medido contra um gabarito escrito e congelado (com hash) antes de rodar. A regra de acerto de cada prompt está em código (src/avaliadores.py).",
        "Validação em casos novos: o P1 foi medido nos 50 casos em que a regra foi escrita e depois conferido em 20 pedidos novos. O P3 v2 foi medido nos mesmos 20 casos usados para escrevê-lo.",
        "Critério de generalização (E2), definido antes da rodada: a regra generaliza se a v2 acertar pelo menos 17 de 18 respostas de valor total sem piorar os outros tipos. Resultado: generalizou.",
        "Custo: calculado a partir dos tokens informados pela API. O cliente para antes de passar do teto. Teto geral: US$ 1,00; gasto até a data do README: US$ 0,3510.",
      ],
      resultados: [
        { rotulo: "P1 · Extrair pedido de compra em 8 campos", valor: "100,0% nos 50 casos de desenvolvimento; 100,0% em 20 pedidos novos (só 6 de valor total)", nota: "Custo por chamada: US$ 0,000145" },
        { rotulo: "P2 · Classificar solicitação de suporte interno", valor: "98,3%", nota: "Custo por chamada: US$ 0,000137" },
        { rotulo: "P3 · E-mail pedindo só os campos que faltaram", valor: "98,3% na v2 (v1: 78,3%); casos de desenvolvimento", nota: "Custo por chamada: US$ 0,000273" },
        { rotulo: "P4 · Resumir reclamação de cliente em JSON", valor: "95,0%", nota: "Custo por chamada: US$ 0,000219" },
        { rotulo: "P5 · Decidir a próxima etapa da solicitação", valor: "100,0%", nota: "Custo por chamada: US$ 0,000278" },
        { rotulo: "E1 · Qual técnica usar na extração?", valor: "Em 46 de 50 casos, todas as técnicas acertaram", nota: "A diferença apareceu só quando a regra de negócio não estava escrita no prompt. O raciocínio passo a passo custou 2,8 vezes mais por resposta que o zero-shot." },
        { rotulo: "E2 · Antes e depois de um prompt", valor: "92,0% para 100,0%, sem regressão e com custo menor", nota: "Em 20 pedidos novos, o tipo valor total foi de 0/18 (v1) para 18/18 (v2). Acerto geral: 70,0% contra 100,0%. Custo: US$ 0,000152 (v2) contra US$ 0,000194 (v1)." },
        { rotulo: "E3 · Few-shot ajuda na classificação?", valor: "98,3% contra 91,7% do zero-shot", nota: "Custou 1,9 vez mais (US$ 0,000137 contra US$ 0,000073). Com 20 casos, é um indício, não uma prova." },
        { rotulo: "E4 · Encadear ou pedir tudo de uma vez?", valor: "Encadeado 78,3% contra 81,7% do prompt único", nota: "Custou 0,9 vez o valor do prompt único (US$ 0,000256 contra US$ 0,000270). Com 20 casos, é um indício." },
        { rotulo: "E5 · Vale pagar pelo raciocínio?", valor: "100,0% contra 95,0% sem raciocínio", nota: "Custou 2,3 vezes mais (US$ 0,000278 contra US$ 0,000123). Com 20 casos, é um indício." },
        { rotulo: "E6 · O erro some se eu reescrever o prompt?", valor: "P3 v2 acertou 98,3% contra 78,3% do v1", nota: "Melhor em 8 casos e pior em 1, com custo de 1,07× por resposta. Campos citados a mais: 18 no v1 e 1 no v2." },
      ],
    },
    limitacoes: [
      "Dados fictícios gerados por script, mais regulares que e-mails e chamados reais.",
      "Um único modelo, com esforço de raciocínio baixo; o modelo não aceita temperatura 0, então reexecuções podem dar números diferentes.",
      "O gabarito foi escrito pelo autor, sem revisão de uma segunda pessoa; nos casos ambíguos, reflete convenções do autor.",
      "Poucos casos (50 na extração e 20 em cada prompt novo). Diferenças pequenas são indícios, não provas.",
      "A regra do T4 v2 foi escrita olhando os mesmos casos em que foi medida.",
      "A comparação do E1 usou prompts v1, exceto o T4 v2, então a comparação não é simétrica.",
      "Os resultados indicam a direção do método, mas não permitem concluir que uma técnica é melhor que outra em geral.",
    ],
    links: [{ rotulo: "Repositório", href: gh("prompt-lab") }],
  },
  {
    slug: "assistente-rag-auditoria",
    videoSegundos: 75,
    destaque: true,
    eixo: "ia",
    titulo: "Assistente RAG de auditoria",
    resumo: "Busca em políticas de auditoria com a seção citada, orquestrando OpenAI e Anthropic, com teto de gasto.",
    problema:
      "Responder perguntas sobre políticas de auditoria apontando a seção de onde a resposta veio, sem tomar decisão de auditoria.",
    solucao:
      "Um RAG que devolve a resposta com a seção citada. A orquestração escolhe entre OpenAI e Anthropic em modos diferentes (escalonar, adaptativo e consenso), e o gasto tem teto. Projeto com dados fictícios da Gutenberg Systems.",
    stack: [
      "Python 3.11 e Gradio 6",
      "OpenAI gpt-6.1-terra e Anthropic claude-haiku-5-5",
      "Embeddings text-embedding-3-small, similaridade cosseno, top-k = 3",
      "Pydantic (extra=forbid) e JSON Schema estrito nas duas APIs",
      "Hugging Face Spaces, usado apenas como hospedagem",
    ],
    imagem: {
      src: "/img/assistente-rag-auditoria.webp",
      alt: "Tela do Space Busca em políticas de auditoria: aviso de demo com dados fictícios, lista de perguntas sugeridas à esquerda, área de conversa à direita e campo para escrever a pergunta.",
      legenda: "Space no Hugging Face (print da demo pública, dados fictícios).",
    },
    medicao: {
      metodo: [
        "Resultados de 2026-11-19, 30 perguntas com gabarito, prompt agente_resposta_v1.",
        "Acerto: respostas corretas ÷ 30. Uma regra automática exige encontrado=true e a presença de todos os fatos-chave.",
        "Citação válida: saída válida no schema e todas as citações entre os trechos recuperados naquela execução.",
        "Custo por resposta: tokens × preço de tabela (config/precos.json, 2026-11-19), somado sobre todas as tentativas e provedores.",
        "Latência: time.perf_counter, média por pergunta, incluindo retries.",
        "Recall@3: medido ao nível da seção (acerto quando a seção do gabarito, documento mais id, aparece entre os 3 primeiros trechos).",
      ],
      resultados: [
        { rotulo: "Só OpenAI (gpt-6.1-terra)", valor: "Acerto 30/30 · citação válida 30/30", nota: "Custo por resposta US$ 0,002024 · latência média 6,43 s" },
        { rotulo: "Só Anthropic (claude-haiku-5-5)", valor: "Acerto 30/30 · citação válida 30/30", nota: "Custo por resposta US$ 0,000467 · latência média 3,41 s" },
        { rotulo: "Orquestrado (escalonar)", valor: "Acerto 30/30 · citação válida 30/30", nota: "Custo por resposta US$ 0,000469 · latência média 2,86 s" },
        { rotulo: "Orquestrado (adaptativo), 2 execuções", valor: "Acerto 30/30 e 30/30 · citação válida 30/30 e 30/30", nota: "Custo por resposta US$ 0,000461 e 0,000469 · latência média 4,05 s e 3,24 s" },
        { rotulo: "Orquestrado (consenso), 2 execuções", valor: "Acerto 30/30 e 30/30 · citação válida 30/30 e 30/30", nota: "Custo por resposta US$ 0,002493 e 0,002475 · latência média 8,17 s e 7,77 s" },
        { rotulo: "Recall@3", valor: "30/30" },
        { rotulo: "Consenso vs. adaptativo", valor: "5,3x o custo e 2,2x a latência", nota: "Divergências no consenso sinalizadas em 5 e 6 perguntas." },
        { rotulo: "Roteamento (log de 2026-11-19, 28 perguntas)", valor: "14 perguntas chamaram um provedor, com custo médio de US$ 0,000512; as outras 14 chamaram dois, com US$ 0,004831" },
      ],
    },
    limitacoes: [
      "Base pequena e fictícia; os números não se generalizam para documentos reais.",
      "30 perguntas e uma execução por modo, sem intervalo de confiança.",
      "A regra de acerto verifica a presença dos fatos, não a ausência de afirmações erradas.",
      "Efeito teto: 30/30 em todos os modos não distingue os modelos.",
      "O modo escalonar da tabela não descreve o comportamento da demo, que o autor informou ser adaptativo (não verificado pelo repositório).",
      "Cada pergunta é independente, sem memória de conversa.",
      "Limites da demo: 5 perguntas por visitante por dia, 60 no total, teto de US$ 0,25 por dia, 300 caracteres por pergunta.",
      "Injeção de prompt: não há teste adversarial executado.",
    ],
    links: [
      { rotulo: "Repositório", href: gh("assistente-rag-auditoria") },
      { rotulo: "Space no Hugging Face", href: "https://huggingface.co/spaces/bEniac/Assistente_RAG" },
    ],
  },
  {
    slug: "alerta-desvio-consumo",
    videoSegundos: 71,
    eixo: "automacao",
    titulo: "Alerta de desvio de consumo",
    resumo: "n8n, Make e Zapier sobre Google Sheets, sem IA, com dashboard publicado.",
    problema:
      "Identificar ordens de produção com consumo abaixo do necessário e avisar a equipe, hoje feito à mão.",
    solucao:
      "Fluxo de ponta a ponta: a base fica no Google Sheets, o cálculo roda no n8n ou no Make, o Zapier envia o e-mail pelo Gmail e um dashboard em HTML mostra os detalhes. Todos os dados são fictícios (Gutenberg Systems) e o projeto não usa LLM.",
    stack: [
      "Google Sheets (abas ordens e resumo)",
      "n8n Cloud ou Make (um por vez)",
      "Zapier e Gmail",
      "Python 3 (biblioteca padrão) para dados e build",
      "Dashboard em HTML, CSS e JavaScript puros no GitHub Pages",
    ],
    imagem: {
      src: "/img/alerta-desvio-consumo.webp",
      alt: "Dashboard de alerta de desvio de consumo da empresa fictícia Gutenberg Systems: filtros à esquerda, cinco indicadores no topo, barras de pendência por componente e por área.",
      legenda: "Dashboard publicado (print da demo pública, dados fictícios).",
    },
    medicao: {
      metodo: [
        "O processo manual foi cronometrado pelo autor em 7 repetições, em 18/11/2026, com a base fictícia. Resultado: 5 min para quem tem experiência e 10 min para quem não tem. Com o e-mail, a leitura leva 1 min.",
        "Premissas: 2 execuções por dia útil, 22 dias úteis por mês e 260 dias úteis por ano (520 execuções por ano).",
        "Método: horas ganhas = (minutos do processo manual − 1 minuto de leitura) × execuções ÷ 60.",
      ],
      resultados: [
        { rotulo: "Semana (10 execuções)", valor: "Com experiência: 40 min (0,7 h) · sem experiência: 90 min (1,5 h)" },
        { rotulo: "Mês (44 execuções)", valor: "Com experiência: 176 min (2,9 h) · sem experiência: 396 min (6,6 h)" },
        { rotulo: "Ano (520 execuções)", valor: "Com experiência: 2.080 min (34,7 h) · sem experiência: 4.680 min (78 h)" },
      ],
    },
    estimativa: "O ganho de tempo é estimado a partir de uma cronometragem manual. Não foi medido em operação.",
    limitacoes: [
      "O ganho de tempo é estimado, não medido em operação.",
      "O ano considera 260 dias úteis com 2 execuções por dia, ou seja, 520 execuções.",
      "Planos gratuitos: Make com 1.000 créditos por mês; Zapier com 100 tarefas por mês e gatilho que pode levar até 15 min; n8n Cloud em teste de 14 dias.",
      "Gatilho manual: não há agendamento automático.",
      "Amostra pequena: 4 linhas em resumo e 2 medições de atraso (cerca de 2 min 04 s e 2 min 21 s).",
      "A aba ordens é publicada como CSV, o que só é seguro porque os dados são fictícios.",
      "O dashboard foi feito para telas a partir de 1280 px e não foi testado com leitor de tela real.",
    ],
    links: [
      { rotulo: "Repositório", href: gh("alerta-desvio-consumo") },
      { rotulo: "Dashboard publicado", href: "https://prodigyb0y.github.io/alerta-desvio-consumo/" },
    ],
  },
];

export const competencias = [
  { nome: "Engenharia de prompts", slug: "prompt-lab", prova: "5 prompts e 6 experimentos medidos contra gabarito congelado." },
  { nome: "RAG", slug: "assistente-rag-auditoria", prova: "Resposta com seção citada, medida em 30 perguntas." },
  { nome: "Orquestração de GPT e Claude", slug: "assistente-rag-auditoria", prova: "Modos escalonar, adaptativo e consenso, com custo e latência medidos." },
  { nome: "Automação com n8n, Make e Zapier", slug: "alerta-desvio-consumo", prova: "Fluxo sobre Google Sheets; o n8n também integra a API de pedidos." },
  { nome: "APIs REST", slug: "api-pedidos-ia", prova: "API serverless com especificação OpenAPI 3.1 e 28 testes." },
  { nome: "Vibe coding com v0", slug: "api-pedidos-portal", prova: "Portal gerado no v0 e publicado na Vercel." },
  { nome: "Next.js", slug: "api-pedidos-portal", prova: "Portal com rota de servidor e 16 testes de contrato." },
  { nome: "Python", slug: "dashboard-importacao", prova: "Geração de dados e script independente de conferência dos 14 recortes." },
  { nome: "HTML, CSS e JavaScript", slug: "dashboard-importacao", prova: "Painel em um único arquivo, sem build e sem dependências." },
  { nome: "Hugging Face", slug: "assistente-rag-auditoria", prova: "Demo publicada em um Space." },
];

export const sobre = [
  "Sou analista de planejamento logístico na Schaeffler, em Sorocaba. Uso IA generativa e automação para construir soluções de negócio de ponta a ponta.",
  "Comecei em logística em 2018, passei por vendas para grandes contas e pelo chão de fábrica, e foi essa base operacional que me deu a visão de quem usa a ferramenta. Hoje trabalho lado a lado com os donos de processo: entendo o problema, monto a solução e meço o que mudou. Como a produção é interna, recriei esses padrões com dados fictícios em repositórios públicos, para que dê para conferir.",
];

// Experiência: nomes de sistemas e ferramentas como no LinkedIn do autor (decisão dele em 23/11/2026).
// Sem tela nem dado das empresas. Só os dois tempos têm medição (cronometrado pelo autor). O resto é descrição, sem número.
export const competenciasExtras = [
  "LangChain", "GitHub", "Microsoft Fabric", "PySpark", "SQL", "Power BI", "Power Apps",
  "Power Automate", "SharePoint", "SAP (PP e MM)", "Azure",
];

export const experiencia = [
  {
    periodo: "10/2018 – 09/2020",
    cargo: "Estágio Auxiliar de Logística",
    empresa: "EFX Importação",
    local: "Sorocaba, SP",
    texto: "Meu primeiro contato com a rotina de logística.",
    topicos: [
      "Planejamento e execução de atividades dentro dos prazos combinados.",
      "Definição de planos, metas e cronogramas para concluir os projetos no prazo.",
    ],
  },
  {
    periodo: "10/2020 – 10/2021",
    cargo: "Assistente de Vendas Key Account",
    empresa: "EFX Importação",
    local: "Sorocaba, SP",
    texto: "Administração operacional da carteira de grandes contas do varejo (Carrefour, Pão de Açúcar, Sam's Club, Saint Marchet e Pague Menos), no ERP TOTVS WinThor.",
    topicos: [
      "Análise diária da curva de demanda, acompanhamento de faturamento, controle de estoque e análise de corte de pedidos.",
      "Regras de validade dos produtos e validação fiscal de NCMs.",
      "Participei da troca do controle de estoque manual, em Google Sheets, para o ERP WinThor, com contato direto com representantes comerciais, recebimento e setor fiscal.",
    ],
  },
  {
    periodo: "10/2021 – 09/2022",
    cargo: "Aprendiz Operador de Processos de Fabricação Mecânica",
    empresa: "Schaeffler Group",
    local: "Sorocaba, SP",
    texto: "Aprendizagem integrada ao curso de Operador de Processos de Fabricação Mecânica do SENAI: o conteúdo teórico e prático da mecânica industrial aplicado na fábrica.",
    topicos: [
      "Experiência de aprendizagem no setor de Shop Floor Control, com análise de requisitos no SAP (módulo EP1).",
    ],
  },
  {
    periodo: "09/2022 – 02/2024",
    cargo: "Operador de Produção II",
    empresa: "Schaeffler Group",
    local: "Sorocaba, SP",
    texto: "Atuação no fluxo de manufatura. Essa base operacional foi essencial para a visão orientada a quem usa a ferramenta, que sustenta a minha transição para soluções sistêmicas e arquiteturas de dados.",
    topicos: ["Vivência prática com metodologias Lean (5S e Kaizen)."],
  },
  {
    periodo: "02/2024 – 06/2025",
    cargo: "Analista de Controle de Produção",
    empresa: "Schaeffler Group",
    local: "Sorocaba, SP",
    texto:
      "Responsável por conectar os indicadores de produção às necessidades do negócio por meio da análise de dados. Auditoria de consumo, apropriação de custos e reconciliação físico-contábil de ordens de produção.",
    topicos: [
      "Dashboards interativos em Power BI para acompanhar indicadores industriais, desvios e gargalos, apoiando as decisões da gestão.",
      "Acompanhamento ativo de ordens no SAP (PP/MM) e apoio operacional na implantação e na estabilização de sistemas de execução da manufatura (MES Forcam).",
      "Análise integrada de dados entre o MES e o ERP para achar causas de paradas, refugo e gargalos, com indicadores de acuracidade de estoque e produtividade.",
      "Metodologias ágeis e de qualidade para mapear oportunidades operacionais e transformá-las em soluções de sistemas e de análise.",
    ],
    entregas: [
      {
        titulo: "Rotina de auditoria automatizada",
        problema: "Inconsistências entre apontamentos e estoque eram achadas por verificação manual, depois que o erro já tinha acontecido.",
        acao: "Escrevi rotinas em Python, integradas ao Power Automate, que varrem as bases e mandam alertas preventivos.",
        resultado: "Anomalias identificadas antes do fechamento contábil. Sem medição.",
      },
    ],
  },
  {
    periodo: "06/2025 – atual",
    cargo: "Analista de Planejamento Logístico",
    empresa: "Schaeffler Group",
    local: "Sorocaba, SP",
    texto:
      "Ponto focal da digitalização e da automação do setor logístico: pipelines de dados, modelagem para dashboards, aplicações low-code e assistentes de IA generativa aplicados à operação.",
    topicos: [
      "Migração de fluxos legados para a nuvem no Microsoft Fabric, com Lakehouse, Dataflows Gen2, Data Pipelines, notebooks em PySpark e consultas em SQL para ingestão, limpeza e modelagem dimensional.",
      "Otimização das rotinas de extração de dados operacionais do SAP, para reduzir o tempo de processamento.",
      "Conjuntos de dados e dashboards em Power BI para indicadores de MRP, Shop Floor Control e desenvolvimento de embalagens.",
      "Atuação consultiva junto aos donos de processo: parceria direta com o key user de PP/MM, documentação dos fluxos de dados e implantação de agentes de IA com RAG.",
    ],
    entregas: [
      {
        titulo: "Atualização de ordens de produção",
        problema: "Consolidar as bases operacionais à mão levava cerca de 20 minutos a cada atualização.",
        acao: "Montei um fluxo no Power Automate que captura e valida os metadados e aciona os Dataflows do Microsoft Fabric.",
        resultado: "Cerca de 3 minutos, sem intervenção manual. Cronometrado.",
        medido: true,
      },
      {
        titulo: "Distribuição de desvio de consumo",
        problema: "Alguém identificava e enviava à mão, por área, as ordens com desvio.",
        acao: "Estruturei o Lakehouse, o modelo semântico, o dashboard em Power BI e o envio automático por e-mail.",
        resultado: "Execução em cerca de 2 minutos, sem intervenção manual. Cronometrado.",
        medido: true,
      },
      {
        titulo: "Assistente de consulta para líderes de produção",
        problema: "Líderes de produção tinham dificuldade com o sistema de apontamento (MES).",
        acao: "Organizei a documentação e as dúvidas recorrentes numa base de consulta com RAG.",
        resultado: "Os líderes consultam o assistente, e a solução está em uso. Sem medição.",
      },
      {
        titulo: "Agentes locais para engenharia de dados",
        problema: "Mapear dicionários de dados e testar na nuvem era lento.",
        acao: "Rodei agentes locais (Qwen e Llama, em Miniforge e Jupyter) ligados por API de consulta ao Azure e ao Fabric, para mapear tabelas e validar código sem usar a nuvem.",
        resultado: "Validações de ETL mais rápidas e sem gasto de créditos de nuvem. Sem medição.",
      },
      {
        titulo: "Reabertura de ordens",
        problema: "O controle era feito por muitos e-mails, e isso travava a conversa entre áreas.",
        acao: "Prototipei com o GitHub Copilot um aplicativo em Power Apps, com aprovação em dois níveis no Power Automate e no SharePoint.",
        resultado: "O fluxo por e-mail acabou e passou a haver indicadores por motivo e setor. Sem medição.",
      },
      {
        titulo: "Painel de custos de importação",
        problema: "A análise dos encargos sobre o valor FOB estava espalhada em planilhas.",
        acao: "Montei um dashboard em Power BI com recortes por país, fornecedor e material, usando o Microsoft Copilot para analisar tendências.",
        resultado: "Visão consolidada para planos de redução de custos. Sem medição.",
        slug: "dashboard-importacao",
      },
      {
        titulo: "Reembolso de frete especial",
        problema: "O controle antigo, em VBA, travava e dependia de um computador local.",
        acao: "Levantei os requisitos e recriei a solução em Power Apps e Power Automate, para sete cenários operacionais, com comprovantes em HTML e governança do processo. Prototipei o front-end com o GitHub Copilot e o Claude Haiku.",
        resultado: "Os travamentos acabaram e os documentos ficaram centralizados. Sem medição.",
      },
    ],
  },
];

export const formacao = [
  { curso: "Tecnólogo em Análise e Desenvolvimento de Sistemas", instituicao: "Centro Universitário Internacional Uninter", status: "Conclusão prevista em 12/2027 (cursando)" },
  { curso: "Tecnólogo em Ciência de Dados", instituicao: "Universidade Cruzeiro do Sul", status: "Conclusão prevista em 12/2028 (cursando)" },
  { curso: "Operador de Processos de Fabricação Mecânica", instituicao: "SENAI São Paulo", status: "10/2021 – 10/2022" },
];

export const cursos = [
  ["Engenharia de prompts", "Generative AI: Prompt Engineering Basics (Board Infinity); Prompt Engineering for ChatGPT (Jules White, Vanderbilt); Advanced Prompt Engineering for Everyone (Jules White, Vanderbilt)."],
  ["Orquestração de agentes", "Generative AI for Everyone (Andrew Ng, DeepLearning.AI); Agentic AI with LangChain and LangGraph (IBM); Multi-Agent Systems with LangGraph (Edureka)."],
  ["Automações e vibe coding", "Build AI Agents with n8n (Edureka); n8n: Build AI Agents, APIs, and Automation (KodeKloud); Vibe Coding with Cursor AI (Scrimba); Vibe Coding with Cursor and Antigravity (Edureka); Building Full-Stack Applications with Vibe Coding (Edureka)."],
  ["APIs e análise de dados com IA", "Mastering REST APIs with FastAPI (Packt); Chat with Your Data: Generative AI-Powered SQL Data Analysis (Vanderbilt); ChatGPT Advanced Data Analysis (Vanderbilt); Trustworthy Generative AI (Vanderbilt)."],
  ["Dados, engenharia de software e metodologias ágeis", "Power BI: Formação Básica; Introduction to Python; Santander - Linux para Iniciantes; Fundamentos do Scrum; Técnicas Avançadas de Scrum."],
];

export const hackathon =
  "Hackathon Prosus 2025: participação em imersão na plataforma Toqan e estudo do protocolo MCP (Model Context Protocol).";

export const idiomas = "Inglês intermediário, com foco técnico.";

export const aviso =
  "Todos os projetos públicos são recriações com dados fictícios. Nenhum deles é produção nem foi usado por terceiros. O site não foi testado com leitor de tela.";
