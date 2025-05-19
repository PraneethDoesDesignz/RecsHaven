import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface DockProps {
  className?: string
  items: {
    icon: LucideIcon
    label: string
    onClick?: () => void
  }[]
}

interface DockIconButtonProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  className?: string
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, className }, ref) => {
    return (
      <div className="relative flex flex-col items-center z-10 overflow-visible group">
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.3, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={cn(
            "p-2 rounded-lg hover:bg-white transition-colors",
            className
          )}
        >
          <Icon className="w-5 h-5 text-foreground" />
        </motion.button>

        {/* Floating label on hover */}
        <span className="absolute top-full mt-2 text-xs text-black- bg-background px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">

          {label}
        </span>
      </div>
    )
  }
)


DockIconButton.displayName = "DockIconButton"

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    return (
      <div ref={ref} className={cn("w-full flex items-center justify-center p-0 overflow-visible", className)}>
        <div className="w-full max-w-2xl rounded-2xl flex items-center justify-center relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={floatingAnimation}
            className={cn(
              "flex items-center gap-1 p-1 rounded-2xl",
              "backdrop-blur-lg border shadow-lg",
              "bg-white border-border",
              "hover:shadow-xl transition-shadow duration-300"
            )}
          >
            {items.map((item) => (
              <DockIconButton key={item.label} {...item} />
            ))}
          </motion.div>
        </div>
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock } 