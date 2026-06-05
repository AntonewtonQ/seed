import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

type AuthSubmitButtonProps = {
  children: React.ReactNode
}

export function AuthSubmitButton({ children }: AuthSubmitButtonProps) {
  return (
    <Button className="h-11 w-full text-sm font-extrabold" size="lg" type="submit">
      {children}
      <ArrowRight aria-hidden="true" />
    </Button>
  )
}
