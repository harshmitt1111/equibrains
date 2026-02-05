import Link from "next/link"

export default function Navbar() {
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

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-4 py-2 text-sm rounded-full border border-ink-200 text-ink-700 hover:border-ink-500">
            Sign in
          </button>
          <button className="px-4 py-2 text-sm rounded-full bg-ink-900 text-white shadow-sm">
            Request access
          </button>
        </div>
      </div>
    </nav>
  )
}
