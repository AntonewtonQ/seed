import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { SeedLogo } from "@/components/brand/seed-logo"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex min-h-screen flex-col bg-background px-4 py-5 text-foreground sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <Link href="/" aria-label="Voltar para a página inicial">
          <SeedLogo compact />
        </Link>
        <Link
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          href="/"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Início
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center py-10">
        {children}
      </div>
    </main>
  )
}
