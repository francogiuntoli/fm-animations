import Container from "./components/Container"
import Toggle from "./components/toggle/Toggle"
import Dock from "./components/dock/Dock"
import Calendar from "./components/calendar/Calendar"
import Slider from "./components/ios-slider/Slider"
import Steps from "./components/steps/Steps"
import Calendar2 from "./components/calendar/Calendar2"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-red-900 py-1">
      <Toggle />
      <div className="my-auto grid grid-cols-2">
        <Steps />
        <Calendar2 />
      </div>

      <Dock />
    </div>
  )
}
