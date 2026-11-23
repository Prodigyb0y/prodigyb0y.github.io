// Divide o texto em palavras para a animação de revelação. O texto lido continua inteiro.
export default function Palavras({ texto }) {
  return texto.split(" ").map((p, i, a) => (
    <span key={i}>
      <span className="pal"><span style={{ "--i": i }}>{p}</span></span>
      {i < a.length - 1 ? " " : null}
    </span>
  ));
}
