
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title: string
  description?: string
}

export function toast({ title, description }: ToastProps) {
  return sonnerToast(title, {
    description,
  })
}

