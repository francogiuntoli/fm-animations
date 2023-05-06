import Container from "./components/Container"
import Toggle from "./components/toggle/Toggle"
import Dock from "./components/dock/Dock"

export default function Home() {
  return (
    <div className="flex h-[100vh] flex-col justify-between py-1">
      <Toggle />

      <Dock />
    </div>
  )
}
