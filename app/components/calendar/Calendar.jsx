"use client"

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
  getDay,
  isEqual,
  isToday,
  startOfToday,
} from "date-fns"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { useState } from "react"
import useMeasure from "react-use-measure"

export default function Calendar() {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"))
  let [direction, setDirection] = useState()
  let [isAnimating, setIsAnimating] = useState(false)

  let month = parse(monthString, "yyyy-MM", new Date())

  function nextMonth() {
    if (isAnimating) return

    let next = addMonths(month, 1)

    setMonthString(format(next, "yyyy-MM"))
    setDirection(1)
    setIsAnimating(true)
  }

  function previousMonth() {
    if (isAnimating) return

    let previous = subMonths(month, 1)

    setMonthString(format(previous, "yyyy-MM"))
    setDirection(-1)
    setIsAnimating(true)
  }

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  })

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  return (
    <MotionConfig transition={transition}>
      <div className="flex items-start p-4 text-stone-900">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <div className="rounded-2xl border border-stone-200 py-8">
            <div className="flex flex-col justify-center  text-center">
              <ResizablePanel>
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    key={monthString}
                    initial="enter"
                    animate="middle"
                    exit="exit"
                  >
                    <header className="relative flex justify-between px-20">
                      <motion.button
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={previousMonth}
                      >
                        <HiOutlineChevronLeft className="h-4 w-4" />
                      </motion.button>
                      <motion.p
                        variants={variants}
                        custom={direction}
                        className="relative inset-0 flex items-center justify-center font-semibold"
                      >
                        {format(month, "MMMM yyyy")}
                      </motion.p>
                      <motion.button
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={nextMonth}
                      >
                        <HiOutlineChevronRight className="h-4 w-4" />
                      </motion.button>
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)",
                        }}
                        variants={removeImmediately}
                      />
                    </header>
                    <motion.div
                      variants={removeImmediately}
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
                    >
                      <span className="font-medium text-stone-600">Su</span>
                      <span className="font-medium text-stone-600">Mo</span>
                      <span className="font-medium text-stone-600">Tu</span>
                      <span className="font-medium text-stone-600">We</span>
                      <span className="font-medium text-stone-600">Th</span>
                      <span className="font-medium text-stone-600">Fr</span>
                      <span className="font-medium text-stone-600">Sa</span>
                    </motion.div>
                    <motion.div
                      variants={variants}
                      custom={direction}
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
                    >
                      {/* {days.map((day) => (
                        <span
                          className={`${
                            isSameMonth(day, month) ? "" : "text-stone-300"
                          } font-semibold`}
                          key={format(day, "yyyy-MM-dd")}
                        >
                          {format(day, "d")}
                        </span>
                      ))} */}

                      {days.map((day, dayIdx) => (
                        <div
                          key={day.toString()}
                          className={classNames(
                            dayIdx === 0 && colStartClasses[getDay(day)],
                            "py-1.5"
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              return isSameMonth(day, month)
                                ? setSelectedDay(day)
                                : Number(format(day, "d")) <= 7
                                  ? (nextMonth(), setSelectedDay(day))
                                  : (previousMonth(), setSelectedDay(day))
                            }}
                            className={classNames(
                              isEqual(day, selectedDay) && "text-white",
                              !isEqual(day, selectedDay) &&
                              isToday(day) &&
                              "text-red-500",
                              !isEqual(day, selectedDay) &&
                              !isToday(day) &&
                              isSameMonth(day, month) &&
                              "text-gray-900",
                              !isEqual(day, selectedDay) &&
                              !isToday(day) &&
                              !isSameMonth(day, month) &&
                              "text-gray-300",
                              isEqual(day, selectedDay) &&
                              isToday(day) &&
                              "bg-red-500",
                              isEqual(day, selectedDay) &&
                              !isToday(day) &&
                              "bg-gray-900",
                              !isEqual(day, selectedDay) && "hover:bg-gray-200",
                              (isEqual(day, selectedDay) || isToday(day)) &&
                              "font-semibold",
                              "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                            )}
                          >
                            <time dateTime={format(day, "yyyy-MM-dd")}>
                              {format(day, "d")}
                            </time>
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

let transition = { type: "spring", bounce: 0, duration: 0.3 }
let variants = {
  enter: (direction) => {
    return { x: `${100 * direction}%`, opacity: 0 }
  },
  middle: { x: "0%", opacity: 1 },

  exit: (direction) => {
    return { x: `${-100 * direction}%`, opacity: 0 }
  },
}

let removeImmediately = {
  exit: { visibility: "hidden" },
}

function ResizablePanel({ children }) {
  let [ref, bounds] = useMeasure()

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : null }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]
