import Link from "next/link";
import { perfil, projetos } from "../data/site";

const manchete = {
  "api-pedidos-ia": { dado: "160 de 160 campos corretos", metodo: "20 pedidos fictícios, gabarito registrado antes, uma rodada." },
  "assistente-rag-auditoria": { dado: "30/30 de acerto, com citação válida", metodo: "30 perguntas com gabarito, uma execução por modo, sem intervalo de confiança." },
  "dashboard-importacao": { dado: "14 de 14 recortes com diferença zero", metodo: "Conferido contra um script independente. Dados fictícios." },
};

export default function Inicio() {
  const fortes = projetos.filter((p) => p.destaque);
  return (
    <>
      <section className="hero" aria-labelledby="nome">
        <div>
          <p className="cargo">{perfil.cargo} · {perfil.local}</p>
          <h1 id="nome">{perfil.nome}</h1>
          <p className="frase">{perfil.frase}</p>
          <div className="botoes">
            <Link className="btn primario" href="/projetos/">Ver projetos</Link>
            <Link className="btn" href="/experiencia/">Currículo</Link>
            <a className="btn" href={perfil.links.linkedin} rel="noopener">LinkedIn</a>
          </div>
        </div>
        <div>
          <p className="ficha-cabeca">Três projetos para começar, com o que foi medido e como.</p>
          <ul className="ficha">
            {fortes.map((p, i) => (
              <li key={p.slug} style={{ "--i": i }}>
                <Link href={`/projetos/${p.slug}/`}>
                  <span className="ficha-titulo">{p.titulo}</span>
                  <span className="ficha-dado">{manchete[p.slug].dado}</span>
                  <span className="ficha-metodo">{manchete[p.slug].metodo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao" aria-labelledby="como-ler">
        <h2 id="como-ler">Como ler este site</h2>
        <div className="aviso">
          <p>
            Todos os projetos públicos são recriações com dados fictícios. Cada número aparece com o método usado
            para medi-lo, e cada página tem a lista do que o resultado não prova. Os links levam ao repositório
            para você conferir.
          </p>
        </div>
      </section>
    </>
  );
}
