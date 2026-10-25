"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="ws-empty" role="alert">
      <h1 className="ws-state-title">Não foi possível mostrar esta página</h1>
      <p>Os seus dados não foram alterados. Tente novamente.</p>
      <button className="ws-button" onClick={reset}>
        Tentar novamente
      </button>
    </div>
  );
}
