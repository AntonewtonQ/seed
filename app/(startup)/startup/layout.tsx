import { StartupShell } from "@/components/startup/startup-shell"

export default function StartupLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <StartupShell>{children}</StartupShell>
}
