import Dock from "./components/dock/Dock"
import Calendar from "./components/calendar/Calendar"
import ResizablePanel from "./components/resizable_panel/ResizablePanel"
import Steps from "./components/steps/Steps"
import TabMenu from "./components/Tabs/TabMenu"
import Slider from "./components/ios-slider/Slider"

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen flex-col justify-between gap-8 px-2 py-1 pt-6">
      <div className="grid grid-cols-1 items-start justify-center md:grid-cols-2 ">
        <div className="flex flex-col flex-wrap gap-2">
          <Slider />
          <hr className="mx-auto w-[80%]" />
          <Steps />
          <hr className="m-auto w-[80%]" />
          <ResizablePanel />
          <hr className="m-auto w-[80%] md:hidden" />
        </div>
        <div className="mt-8 flex w-full flex-col justify-center gap-8 md:mt-0">
          <TabMenu />
          <hr className="mx-auto w-[80%]" />
          <Calendar />
        </div>
      </div>
      <Dock />
    </div>
  )
}
