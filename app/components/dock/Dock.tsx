"use client"

import { motion, useMotionValue } from "framer-motion"
import { ImUserTie } from "react-icons/im"
import { AiOutlineMail, AiOutlineHome } from "react-icons/ai"
import { SiMonkeytie } from "react-icons/si"

import AppIcon from "./AppIcon"

export default function Dock() {
  let mouseX = useMotionValue(Infinity)

  const categories = [
    { icon: AiOutlineHome },
    { icon: SiMonkeytie },
    { icon: ImUserTie },
    { icon: AiOutlineMail },
  ]

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-16 items-end gap-4 rounded-2xl border-[0.5px] border-white/[50%] bg-gray-600/[35%] px-4 pb-3 "
    >
      {categories.map((item, i) => (
        <AppIcon icon={item.icon} mouseX={mouseX} key={i} />
      ))}
    </motion.div>
  )
}
