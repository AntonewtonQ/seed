import { InvestorShell } from "@/components/investor/investor-shell"

export default function InvestorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <InvestorShell>{children}</InvestorShell>
}
