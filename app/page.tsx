import Container from "./components/Container"
import Toggle from "./components/toggle/Toggle"
import Dock from "./components/dock/Dock"
import Calendar from "./components/calendar/Calendar"
import Slider from "./components/ios-slider/Slider"
import Steps from "./components/steps/Steps"

export default function Home() {
  return (
    <div className="flex h-[100vh] flex-col justify-between py-1">
      <Toggle />
      <Steps />
      {/* <Calendar /> */}
      {/* <Slider /> */}
      <Dock />
    </div>
  )
}
