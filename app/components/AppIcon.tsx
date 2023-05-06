"use client"
import {
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { IconType } from "react-icons"

interface AppIconProps {
  icon: IconType
  mouseX: MotionValue
}

export default function AppIcon({ icon: Icon, mouseX }: AppIconProps) {
  let ref = useRef<HTMLDivElement>(null)
  const [iconSize, setIconSize] = useState(40)

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
      ref={ref}
      style={{ width }}
      className="flex aspect-square w-10 items-center justify-center rounded-2xl bg-gray-400"
    >
      <Icon size={iconSize - 6} color="white" />
    </motion.div>
  )
}
