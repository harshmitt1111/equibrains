const holdings = [
  { name: "Reliance Industries", symbol: "RELIANCE", weight: "18%", signal: "Conviction" },
  { name: "Tata Consultancy", symbol: "TCS", weight: "12%", signal: "Watch" },
  { name: "HDFC Bank", symbol: "HDFCBANK", weight: "9%", signal: "Accumulating" },
  { name: "Infosys", symbol: "INFY", weight: "7%", signal: "Hold" },
]

const insights = [
  {
    title: "AI Recommendation",
    value: "Increase large-cap AI exposure by 6%",
  },
  {
    title: "Risk Flag",
    value: "High correlation between semis and cloud positions",
  },
  {
    title: "Cash Strategy",
    value: "Hold 10-12% cash through earnings cycle",
  },
]

const sentiment = [
  { sector: "AI Infrastructure", score: 86, trend: "Strong" },
  { sector: "Cloud Software", score: 74, trend: "Stable" },
  { sector: "Fintech", score: 61, trend: "Cooling" },
]

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-mist-50 text-ink-900">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
              Portfolio Command Center
            </p>
            <h1 className="display-font text-3xl md:text-4xl mt-3">
              Insight workspace
            </h1>
            <p className="text-ink-500 mt-3 text-sm max-w-xl">
              Personalized AI signals, portfolio health, and market pulse for the
              next 24 hours.
            </p>
          </div>
          <div className="glass-panel rounded-[24px] p-4 flex items-center gap-6">
            <div>
              <p className="text-xs text-ink-500 uppercase tracking-[0.3em]">
                Conviction Score
              </p>
              <p className="text-2xl font-semibold">84</p>
            </div>
            <div className="h-12 w-px bg-ink-200" />
            <div>
              <p className="text-xs text-ink-500 uppercase tracking-[0.3em]">
                Today
              </p>
              <p className="text-2xl font-semibold">+1.6%</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mt-12">
          <div className="rounded-[28px] border border-ink-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Holdings overview</h2>
              <button className="text-xs uppercase tracking-[0.3em] text-ink-500">
                Manage
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {holdings.map((item) => (
                <div
                  key={item.symbol}
                  className="flex items-center justify-between rounded-2xl bg-mist-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}{" "}
                      <span className="text-xs text-ink-500">
                        ({item.symbol})
                      </span>
                    </p>
                    <p className="text-xs text-ink-500">{item.signal}</p>
                  </div>
                  <div className="text-sm font-semibold">{item.weight}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-ink-900 text-white p-6">
            <h2 className="text-lg font-semibold">AI risk map</h2>
            <p className="text-sm text-white/70 mt-2">
              3 key alerts detected in your allocation.
            </p>
            <div className="mt-6 space-y-3">
              {insights.map((item) => (
                <div key={item.title} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {item.title}
                  </p>
                  <p className="text-sm mt-2">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {sentiment.map((item) => (
            <div
              key={item.sector}
              className="rounded-[24px] border border-ink-200 bg-white p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
                Sector Pulse
              </p>
              <h3 className="text-lg font-semibold mt-3">{item.sector}</h3>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span>AI Score</span>
                <span className="font-semibold">{item.score}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-ink-500">
                <span>Trend</span>
                <span>{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
