import Link from "next/link"
import { FolderOpen, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  acceleratorDataRooms,
  dataRoomStatusTone,
} from "./accelerator-data"
import { AcceleratorPageHeader } from "./accelerator-page-header"

export function AcceleratorDataRoomsPage() {
  return (
    <>
      <AcceleratorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/accelerator/diligence">Ver tarefas</Link>
          </Button>
        }
        description="Estado dos data rooms das startups acompanhadas pela aceleradora."
        title="Data rooms"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-3">
          {acceleratorDataRooms.map((room) => (
            <Link
              className="grid gap-4 rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)] transition-colors hover:bg-muted/60 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              href={room.href}
              key={room.id}
            >
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                  {room.category}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[color:var(--seed-petroleum)]">
                  {room.startup}
                </h2>
                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                  {room.updatedAt}
                </p>
              </div>
              <span
                className={cn(
                  "w-fit rounded-full border px-3 py-1 text-xs font-extrabold",
                  dataRoomStatusTone[room.status]
                )}
              >
                {room.status}
              </span>
            </Link>
          ))}
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <FolderOpen
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Curadoria documental
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              A aceleradora acompanha qualidade, completude e coerência antes de conceder acesso a investidores.
            </p>
          </article>
          <article className="rounded-lg border border-border bg-card p-5">
            <ShieldCheck
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-petroleum)]"
            />
            <h2 className="mt-4 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
              Próximo backend
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              Esta tela deve receber versões, permissões, logs e bloqueios por documento.
            </p>
          </article>
        </aside>
      </div>
    </>
  )
}
