"use client";
import { useState } from "react";

// Mostra a capa como imagem (carregada só perto da tela) e troca pelo vídeo ao clicar.
export default function VideoPoster({ src, poster, titulo, prioridade = false }) {
  const [ativo, setAtivo] = useState(false);
  if (ativo) {
    return (
      <video controls autoPlay preload="auto" width="1920" height="1080" aria-label={`Vídeo ${titulo}`}>
        <source src={src} type="video/mp4" />
      </video>
    );
  }
  return (
    <button type="button" className="capa" onClick={() => setAtivo(true)} aria-label={`Assistir ao vídeo ${titulo}`}>
      <img src={poster} alt="" width="1280" height="720" {...(prioridade ? { fetchPriority: "high" } : { loading: "lazy" })} decoding="async" />
      <span className="play" aria-hidden="true" />
    </button>
  );
}
