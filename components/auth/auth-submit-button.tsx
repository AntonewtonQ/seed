import { Button } from "@/components/ui/button"

type AuthSubmitButtonProps = {
  children: React.ReactNode
}

export function AuthSubmitButton({ children }: AuthSubmitButtonProps) {
  return (
    <Button className="h-10 w-full" size="lg" type="submit">
      {children}
    </Button>
  )
}
