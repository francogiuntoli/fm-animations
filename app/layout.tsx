import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Genie Effect",
  description: "Genie Effect",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="bg-zinc-500" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
