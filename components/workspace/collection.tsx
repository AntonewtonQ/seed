"use client";
import { useState, type ReactNode } from "react";
import { Empty, Row } from "./ui";
export type ListItem = {
  id: string;
  href: string;
  title: string;
  description?: string;
  meta?: ReactNode;
};
export function Collection({
  items,
  empty,
  description,
  action,
  search = "Pesquisar",
}: {
  items: ListItem[];
  empty: string;
  description?: string;
  action?: ReactNode;
  search?: string;
}) {
  const [query, setQuery] = useState(""),
    [page, setPage] = useState(0);
  const filtered = items.filter((i) =>
    `${i.title} ${i.description ?? ""}`
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()),
  );
  const total = Math.max(1, Math.ceil(filtered.length / 8)),
    current = Math.min(page, total - 1);
  if (!items.length)
    return <Empty title={empty} description={description} action={action} />;
  return (
    <>
      <div className="ws-toolbar">
        <label>
          {search}
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Escreva para filtrar…"
          />
        </label>
        <p>
          {filtered.length} {filtered.length === 1 ? "registo" : "registos"}
        </p>
      </div>
      {filtered.length ? (
        <ul className="ws-list">
          {filtered.slice(current * 8, current * 8 + 8).map((i) => (
            <Row key={i.id} {...i} />
          ))}
        </ul>
      ) : (
        <Empty
          title="Nenhum resultado"
          description={`Nada corresponde a “${query}”.`}
          action={
            <button
              type="button"
              className="ws-button ws-secondary"
              onClick={() => setQuery("")}
            >
              Limpar pesquisa
            </button>
          }
        />
      )}
      {total > 1 && (
        <nav aria-label="Paginação" className="ws-pagination">
          <button disabled={current === 0} onClick={() => setPage(current - 1)}>
            Anterior
          </button>
          <span>
            Página {current + 1} de {total}
          </span>
          <button
            disabled={current + 1 === total}
            onClick={() => setPage(current + 1)}
          >
            Seguinte
          </button>
        </nav>
      )}
    </>
  );
}
