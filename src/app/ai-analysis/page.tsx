import Link from "next/link"

const analysisCards = [
  {
    title: "Market Regime",
    value: "Risk-On",
    detail: "Momentum and breadth indicators remain supportive for large-cap growth.",
  },
  {
    title: "Top Opportunity",
    value: "RELIANCE",
    detail: "Improving earnings quality and positive institutional flow trend.",
  },
  {
    title: "Primary Risk",
    value: "Rate Volatility",
    detail: "Watch for macro surprise risk into central bank commentary windows.",
  },
]

const watchlist = [
  { symbol: "RELIANCE", action: "Accumulate", confidence: "High" },
  { symbol: "TCS", action: "Hold", confidence: "Medium" },
  { symbol: "INFY", action: "Watch breakout", confidence: "Medium" },
  { symbol: "HDFCBANK", action: "Gradual add", confidence: "High" },
]

export default function AiAnalysisPage() {
  return (
    <main className="min-h-screen bg-mist-50 text-ink-900">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
          Post-login workspace
        </p>
        <h1 className="display-font text-3xl md:text-4xl mt-3">AI analysis</h1>
        <p className="text-sm text-ink-500 mt-3 max-w-2xl">
          Your personalized analysis room with actionable AI insights, risk cues,
          and a focused watchlist for the next session.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {analysisCards.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-ink-200 bg-white p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
                {item.title}
              </p>
              <h2 className="text-xl font-semibold mt-3">{item.value}</h2>
              <p className="text-sm text-ink-500 mt-3">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-ink-200 bg-white p-6 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">AI watchlist actions</h2>
            <Link
              href="/dashboard"
              className="text-xs uppercase tracking-[0.3em] text-ink-500 hover:text-ink-900"
            >
              Open dashboard
            </Link>
          </div>
          <div className="mt-6 space-y-3">
            {watchlist.map((item) => (
              <div
                key={item.symbol}
                className="rounded-2xl bg-mist-50 px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{item.symbol}</p>
                  <p className="text-xs text-ink-500">{item.action}</p>
                </div>
                <span className="text-xs rounded-full border border-ink-200 px-3 py-1 bg-white">
                  {item.confidence} confidence
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
