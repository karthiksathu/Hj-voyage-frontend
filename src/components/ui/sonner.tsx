import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#ffffff] group-[.toaster]:text-[#002444] group-[.toaster]:border-[#024b74] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#0372aa]",
          actionButton:
            "group-[.toast]:bg-[#0372aa] group-[.toast]:text-[#ffffff]",
          cancelButton:
            "group-[.toast]:bg-[#024b74] group-[.toast]:text-[#0372aa]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
