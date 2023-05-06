"use client"
import { useState } from "react"
import Switch from "./ToggleBuild"
import { BsMoon, BsSunFill } from "react-icons/bs"

export default function Toggle() {
  let [airplaneMode, setAirplaneMode] = useState(false)

  return (
    <div className="flex justify-end p-4">
      <Switch isSelected={airplaneMode} onChange={setAirplaneMode}>
        {airplaneMode ? <BsSunFill size={22} /> : <BsMoon size={22} />}
      </Switch>
    </div>
  )
}
