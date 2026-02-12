import Link from "next/link"
import AuthButtons from "@/app/components/AuthButtons"

export default function Navbar() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  )

  return (
    <nav className="sticky top-0 z-40 border-b border-white/30 bg-white/75 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight text-lg"
        >
          <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 via-lime-400 to-amber-300 shadow-sm" />
          <span className="display-font text-xl">EquiBrains</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-ink-500">
          <Link href="/" className="hover:text-ink-900">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-ink-900">
            Insights
          </Link>
          <a href="#features" className="hover:text-ink-900">
            Platform
          </a>
          <a href="#pricing" className="hover:text-ink-900">
            Pricing
          </a>
        </div>

        <AuthButtons googleEnabled={googleEnabled} />
      </div>
    </nav>
  )
}
