"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="ws-panel">
      <h1 className="text-xl font-bold">
        Não foi possível carregar esta página
      </h1>
      <p className="my-4">Tente novamente dentro de instantes.</p>
      <button className="ws-button" onClick={reset}>
        Voltar a tentar
      </button>
    </div>
  );
}
