import { AcceleratorShell } from "@/components/accelerator/accelerator-shell"

export default function AcceleratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AcceleratorShell>{children}</AcceleratorShell>
}
