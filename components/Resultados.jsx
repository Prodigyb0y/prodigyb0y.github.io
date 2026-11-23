export default function Resultados({ itens }) {
  return (
    <ul className="resultados">
      {itens.map((r) => (
        <li key={r.rotulo}>
          <span className="r-rotulo">{r.rotulo}</span>
          <span className="r-valor">{r.valor}</span>
          {r.nota ? <span className="r-nota">{r.nota}</span> : null}
        </li>
      ))}
    </ul>
  );
}
