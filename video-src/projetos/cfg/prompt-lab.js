window.CFG = { segments: [
 { type:"title", dur:7, name:"Prompt Lab", sub:"5 prompts de negócio e 6 experimentos com claude-haiku-5-5, com acerto e custo medidos.", prob:"Escolher uma técnica de prompt sem medir é palpite. Aqui cada prompt tem gabarito e custo.", note:"Dados 100% fictícios, gerados por script com seed fixa.",
   cap:[[0,7,"Medir o acerto e o custo de cada prompt contra um gabarito."]] },
 { type:"bars", dur:16, tag:"Os 5 prompts · acerto e custo por chamada",
   rows:[
    {label:"P1 · Extrair pedido de compra em 8 campos", a:{pct:100,txt:"100,0% · US$ 0,000145"}},
    {label:"P2 · Classificar solicitação de suporte", a:{pct:98.3,txt:"98,3% · US$ 0,000137"}},
    {label:"P3 · E-mail pedindo só os campos que faltaram", a:{pct:98.3,txt:"98,3% na v2 · US$ 0,000273"}},
    {label:"P4 · Resumir reclamação de cliente em JSON", a:{pct:95,txt:"95,0% · US$ 0,000219"}},
    {label:"P5 · Decidir a próxima etapa da solicitação", a:{pct:100,txt:"100,0% · US$ 0,000278"}}],
   cap:[[0,8,"Cinco problemas de negócio, cada um com uma técnica diferente."],[8,16,"Acerto medido contra um gabarito escrito e congelado, com hash, antes de rodar."]] },
 { type:"bars", dur:14, tag:"E2 e E6 · antes e depois de reescrever o prompt",
   legend:["Antes (v1)","Depois (v2)"],
   rows:[
    {label:"E2 · acerto geral em 20 pedidos novos", a:{pct:70,txt:"70,0%"}, b:{pct:100,txt:"100,0%"}},
    {label:"E2 · tipo valor total em 20 pedidos novos", a:{pct:0.6,txt:"0/18"}, b:{pct:100,txt:"18/18"}},
    {label:"E6 · P3, e-mail só com os campos que faltam", a:{pct:78.3,txt:"78,3%"}, b:{pct:98.3,txt:"98,3%"}}],
   lim:"o P3 v2 foi medido nos mesmos 20 casos usados para escrevê-lo.",
   cap:[[0,7,"Duas linhas acrescentadas levaram o acerto de 92,0% para 100,0%, com custo menor."],[7,14,"O P3 v2 foi medido nos mesmos casos usados para escrevê-lo."]] },
 { type:"bars", dur:16, tag:"E3, E4 e E5 · vale pagar mais por uma técnica?",
   legend:["Alternativa mais simples","Técnica testada"],
   rows:[
    {label:"E3 · zero-shot contra few-shot", a:{pct:91.7,txt:"91,7% · US$ 0,000073"}, b:{pct:98.3,txt:"98,3% · US$ 0,000137"}},
    {label:"E4 · prompt único contra encadeado", a:{pct:81.7,txt:"81,7% · US$ 0,000270"}, b:{pct:78.3,txt:"78,3% · US$ 0,000256"}},
    {label:"E5 · sem raciocínio contra passo a passo", a:{pct:95,txt:"95,0% · US$ 0,000123"}, b:{pct:100,txt:"100,0% · US$ 0,000278"}}],
   lim:"com 20 casos, a diferença é um indício, não uma prova.",
   cap:[[0,8,"Few-shot acertou mais e custou 1,9 vez mais. O raciocínio passo a passo custou 2,3 vezes mais."],[8,16,"Com 20 casos, é um indício, não uma prova."]] },
 { type:"stats", dur:12, tag:"O que o projeto não prova",
   counters:[],
   meth:["<b>Gabarito escrito pelo autor,</b> sem revisão de uma segunda pessoa.","<b>Um único modelo,</b> com esforço de raciocínio baixo; reexecuções podem dar números diferentes.","<b>Poucos casos:</b> 50 na extração e 20 em cada prompt novo.","<b>Dados fictícios,</b> mais regulares que e-mails e chamados reais."],
   cap:[[0,12,"Os resultados indicam a direção do método, não que uma técnica é melhor em geral."]] },
 { type:"end", dur:7, head:"Código e resultados no repositório.", links:[["GitHub","github.com/Prodigyb0y/prompt-lab"]], note:"Teto geral de gasto: US$ 1,00. Dados fictícios.",
   cap:[[0,7,"Repositório público, com dados fictícios."]] }
]};
