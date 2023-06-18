"use client"

import { motion, useMotionValue } from "framer-motion"
import { ImUserTie } from "react-icons/im"
import { AiOutlineMail, AiOutlineHome } from "react-icons/ai"
import { SiMonkeytie } from "react-icons/si"
import AppIcon from "./AppIcon"

export default function Dock() {
  let mouseX = useMotionValue(Infinity)

  const categories = [
    { icon: AiOutlineHome, color: "bg-black/60", title: "Home" },
    { icon: SiMonkeytie, color: "bg-black/60", title: "About" },
    { icon: ImUserTie, color: "bg-black/60", title: "Jobs" },
    { icon: AiOutlineMail, color: "bg-black/60", title: "Contact" },
  ]

  return (
    <div className="absolute bottom-0 left-[50%]">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="relative left-[-50%] mx-auto hidden h-16 items-end gap-6 rounded-2xl border-[0.5px] border-white/[50%] bg-black/[45%] px-6 pb-3 md:flex"
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
    </div>
  )
}
