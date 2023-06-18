"use client"
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion"
import { useRef, useState } from "react"
import { IconType } from "react-icons"

interface AppIconProps {
  icon: IconType
  mouseX: MotionValue
  color: string
  title: string
}

export default function AppIcon({
  icon: Icon,
  mouseX,
  color,
  title,
}: AppIconProps) {
  let ref = useRef<HTMLDivElement>(null)
  const [iconSize, setIconSize] = useState(40)
  const [show, setShow] = useState(false)

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 85, 40])

  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 10 })

  useMotionValueEvent(width, "change", (latest) => {
    setIconSize(latest)
  })

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      onHoverStart={() => setShow(true)}
      onHoverEnd={() => setShow(false)}
      ref={ref}
      style={{ width }}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.12,
              ease: "easeIn",
            }}
            className="pointer-events-none select-none pb-0 text-center text-white/[85%]"
          >
            <div className="mb-2 flex items-center justify-center rounded-md border border-slate-900 border-opacity-60 bg-black/[25%] px-3">
              {title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        ref={ref}
        style={{ width }}
        className={`flex aspect-square w-10 items-center justify-center rounded-lg ${color}`}
      >
        <Icon size={iconSize - 6} color="white" />
      </motion.div>
    </motion.div>
  )
}
