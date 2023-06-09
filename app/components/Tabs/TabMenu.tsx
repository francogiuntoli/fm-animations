"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Switch from "../toggle/ToggleBuild"

let tabs = [
  { id: "world", label: "World" },
  { id: "ny", label: "N.Y." },
  { id: "business", label: "Business" },
  { id: "arts", label: "Arts" },
  { id: "science", label: "Science" },
]

export default function TabMenu() {
  let [activeTab, setActiveTab] = useState(tabs[0].id)
  let [slowMo, setSlowMo] = useState(false)

  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-4">
      <Switch isSelected={slowMo} onChange={setSlowMo}>
        {slowMo ? "Slow Mode" : "Fast Mode"}
      </Switch>
      <div className="mx-auto flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? "" : "hover:text-white/60"
            }  relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className={`absolute inset-0 z-10 mix-blend-difference ${
                  slowMo ? "bg-pink-400" : "bg-white "
                }`}
                style={{ borderRadius: 9999 }}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: slowMo ? 4 : 0.6,
                }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
