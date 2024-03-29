"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Steps() {
  let [step, setStep] = useState(1)

  return (
    <div className="mx-auto flex w-full max-w-lg items-start rounded-xl py-4">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
        <div className="flex justify-between rounded p-8">
          <Step step={1} currentStep={step} />
          <Step step={2} currentStep={step} />
          <Step step={3} currentStep={step} />
          <Step step={4} currentStep={step} />
        </div>
        <div className="px-8 pb-8">
          <div>
            <div className="mt-2 h-6 w-40 rounded bg-slate-300" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-5/6 rounded bg-slate-300" />
              <div className="h-4 rounded bg-slate-300" />
              <div className="h-4 w-4/6 rounded bg-slate-300" />
            </div>
          </div>

          <div className="mt-10 flex justify-between">
            <button
              onClick={() => setStep(step < 2 ? step : step - 1)}
              className={`rounded px-2 py-1 text-red-300 hover:text-red-400 ${
                step == 1 ? "pointer-events-none opacity-0" : ""
              }`}
            >
              Back
            </button>

            <button
              onClick={() => setStep(step > 4 ? step : step + 1)}
              className={`${
                step > 3
                  ? "bg-green-500 hover:bg-green-600 active:bg-green-700"
                  : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              } bg flex select-none items-center justify-center rounded-full px-3.5 py-1.5 font-medium tracking-tight text-white`}
            >
              {step > 3 ? "Finish" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StepProps {
  step: number
  currentStep: number
}

function Step({ step, currentStep }: StepProps) {
  let status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete"

  return (
    <motion.div animate={status} className="relative">
      <motion.div
        variants={{
          active: {
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.2,
            },
          },
          complete: {
            scale: 1.25,
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "tween",
          ease: "circOut",
        }}
        className={`absolute inset-0 rounded-full 
        ${status === "complete" ? "bg-green-200" : "bg-blue-50"}`}
      ></motion.div>

      <motion.div
        initial={false}
        variants={{
          inactive: {
            backgroundColor: "var(--white)",
            borderColor: "var(--slate-200)",
            color: "var(--slate-400)",
          },
          active: {
            backgroundColor: "var(--white)",
            borderColor: "var(--blue-500)",
            color: "var(--blue-500)",
          },
          complete: {
            backgroundColor: "var(--blue-500)",
            borderColor: "var(--blue-500)",
            color: "var(--blue-500)",
          },
        }}
        transition={{ duration: 0.3 }}
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold`}
      >
        <div className="flex items-center justify-center">
          {status === "complete" ? (
            <CheckIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <span>{step}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

interface CheckIconProps {
  className?: string
}

function CheckIcon(className: CheckIconProps) {
  return (
    <svg
      {...className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.4,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
