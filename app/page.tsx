import Toggle from "./components/toggle/Toggle"
import Dock from "./components/dock/Dock"

import Calendar2 from "./components/calendar/Calendar2"
import ResizablePanel from "./components/resizable_panel/ResizablePanel"
import Steps from "./components/steps/Steps"
import TabMenu from "./components/Tabs/TabMenu"

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen flex-col justify-between px-2 py-1 pt-10">
      <div className="grid grid-cols-1 items-start  justify-center md:grid-cols-2">
        <div className="flex flex-col flex-wrap gap-2">
          <Steps />
          <hr />
          <ResizablePanel />
        </div>
        <div className="flex w-full flex-col justify-center gap-8">
          <TabMenu />
          <hr />
          <Calendar2 />
        </div>
      </div>
      <Dock />
    </div>
  )
}
