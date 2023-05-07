import Container from "./components/Container"
import Toggle from "./components/toggle/Toggle"
import Dock from "./components/dock/Dock"
import Calendar from "./components/calendar/Calendar"
import Slider from "./components/ios-slider/Slider"
import Steps from "./components/steps/Steps"
import Calendar2 from "./components/calendar/Calendar2"
import ResizablePanel from "./components/resizable_panel/ResizablePanel"

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen flex-col justify-between px-2 py-1">
      <Toggle />
      <div className="my-auto grid grid-cols-2 items-center justify-center">
        <div className="flex flex-col gap-2">
          <Steps />
          <ResizablePanel />
        </div>
        <Calendar2 />
      </div>
      <Dock />
    </div>
  )
}
