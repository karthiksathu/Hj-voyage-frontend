import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0372aa] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0372aa] text-white hover:bg-[#0372aa]/80", // Reef Escape
        secondary:
          "border-transparent bg-[#024b74] text-white hover:bg-[#024b74]/80", // Blue Meridian
        destructive:
          "border-transparent bg-[#002444] text-white hover:bg-[#002444]/80", // Rhapsody in Blue
        outline: "text-[#002444] border border-[#002444]", // Navy text/border
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
