import { experiencia, formacao, cursos, hackathon, idiomas } from "../../data/site";

export const metadata = { title: "Experiência e formação" };

export default function Experiencia() {
  return (
    <>
      <h1>Experiência e formação</h1>
      <p className="intro">
        A experiência profissional é interna e não é pública. Por isso aparece só como descrição e como dois tempos cronometrados, sem nome de sistema, tela ou dado da empresa. Quem lê não consegue verificar esses números.
      </p>

      <section className="secao" aria-labelledby="exp">
        <h2 id="exp">Experiência</h2>
        {experiencia.map((e) => (
          <div className="cargo-bloco" key={e.cargo}>
            <h3>{e.cargo}</h3>
            <p className="meta">{e.empresa} · {e.periodo} · {e.local}</p>
            <p>{e.texto}</p>
            {e.resultados.length ? (
              <>
                <p className="interno">Resultados internos, cronometrados pelo autor:</p>
                <ul>{e.resultados.map((r) => <li key={r}>{r}</li>)}</ul>
              </>
            ) : null}
          </div>
        ))}
      </section>

      <section className="secao" aria-labelledby="form">
        <h2 id="form">Formação</h2>
        <ul className="linhas">
          {formacao.map((f) => (
            <li key={f.curso}>
              <span className="nome">{f.curso}</span>
              <p>{f.instituicao}. {f.status}.</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="secao" aria-labelledby="outros">
        <h2 id="outros">Idiomas e atividades</h2>
        <p>{idiomas}</p>
        <p>{hackathon}</p>
        <details>
          <summary>Cursos concluídos (formação, sem projeto público associado)</summary>
          <dl>
            {cursos.map(([t, d]) => (
              <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
            ))}
          </dl>
        </details>
      </section>
    </>
  );
}
