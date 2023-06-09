"use client"

import { motion, useMotionValue } from "framer-motion"
import { ImUserTie } from "react-icons/im"
import { AiOutlineMail, AiOutlineHome } from "react-icons/ai"
import { SiMonkeytie } from "react-icons/si"
import AppIcon from "./AppIcon"

export default function Dock() {
  let mouseX = useMotionValue(Infinity)

  const categories = [
    { icon: AiOutlineHome, color: "bg-black/80", title: "Home" },
    { icon: SiMonkeytie, color: "bg-black/80", title: "About" },
    { icon: ImUserTie, color: "bg-black/80", title: "Jobs" },
    { icon: AiOutlineMail, color: "bg-black/80", title: "Contact" },
  ]

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-16 items-end gap-6 rounded-2xl border-[0.5px] border-white/[50%] bg-black/[45%] px-6 pb-3"
    >
      {categories.map((item, i) => (
        <AppIcon
          icon={item.icon}
          title={item.title}
          color={item.color}
          mouseX={mouseX}
          key={i}
        />
      ))}
    </motion.div>
  )
}
