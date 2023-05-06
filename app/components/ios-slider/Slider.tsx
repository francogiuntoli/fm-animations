"use client"

import {
  motion,
  MotionConfig,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { useEffect, useState } from "react"
import useMeasure from "react-use-measure"
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid"

export default function Slider() {
  let initialHeight = 4
  let height = 12
  let buffer = 12
  let [ref, bounds] = useMeasure()
  let [hovered, setHovered] = useState(false)
  let [panning, setPanning] = useState(false)
  let progress = useMotionValue(0.5)
  let width = useTransform(progress, (v) => `${v * 100}%`)
  let roundedProgress = useTransform(progress, (v) => `${roundTo(v * 100, 0)}%`)
  let [progressState, setProgressState] = useState(roundedProgress.get())
  let state = panning ? "panning" : hovered ? "hovered" : "idle"

  useEffect(() => {
    roundedProgress.onChange((v) => setProgressState(v))
  }, [roundedProgress])

  return (
    <MotionConfig transition={transition}>
      <div className="flex h-full max-h-[800px] items-center justify-center py-16">
        <div className="flex h-full w-[375px] flex-col justify-center rounded-2xl bg-gray-800 px-4">
          <p className="mt-8 text-center text-sm font-medium">
            iOS 16 Slider demo
          </p>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex w-full items-center justify-center">
              <motion.div
                initial={false}
                animate={{
                  color:
                    hovered || panning
                      ? "rgb(255,255,255)"
                      : "rgb(120,113,108)",
                }}
                className="flex w-6 shrink-0 justify-start"
              >
                <SpeakerXMarkIcon className="h-4 w-4" />
              </motion.div>
              {/* Slider */}
              <motion.div
                animate={state}
                onPanStart={() => setPanning(true)}
                onPanEnd={() => setPanning(false)}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                onPan={(event, info) => {
                  let deltaInPercent = info.delta.x / bounds.width
                  let newPercent = clamp(progress.get() + deltaInPercent, 0, 1)
                  progress.set(newPercent)
                }}
                style={{ height: height + buffer }}
                className="relative flex grow-0 touch-none items-center justify-center"
                variants={{
                  idle: { width: "calc(95% - 48px)" },
                  hovered: { width: "calc(100% - 48px)" },
                  panning: { width: "calc(100% - 48px)" },
                }}
                initial={false}
                ref={ref}
              >
                <motion.div
                  initial={false}
                  variants={{
                    idle: { height: initialHeight },
                    hovered: { height },
                    panning: { height },
                  }}
                  className="relative w-full overflow-hidden rounded-full"
                >
                  <div className="h-full bg-white/20" />
                  <motion.div
                    style={{ width }}
                    className="absolute inset-0 w-[20%] bg-white"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  color:
                    hovered || panning
                      ? "rgb(255,255,255)"
                      : "rgb(120,113,108)",
                }}
                className="flex w-6 shrink-0 justify-end"
              >
                <SpeakerWaveIcon className="h-4 w-4" />
              </motion.div>
            </div>
            {/* Label */}
            <motion.div
              initial={false}
              animate={{
                color:
                  hovered || panning ? "rgb(255,255,255)" : "rgb(120,113,108)",
              }}
              className={`mt-4 select-none text-center text-sm font-semibold tabular-nums`}
            >
              {progressState}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

let transition = { type: "spring", bounce: 0, duration: 0.3 }

let clamp = (num: number, min: number, max: number) =>
  Math.max(Math.min(num, max), min)

function roundTo(number: number, decimals: number): number {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
}
