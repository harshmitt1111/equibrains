const insights = [
  {
    title: "Signal Fusion Engine",
    description:
      "Blend fundamentals, technicals, flows, and sentiment into a single conviction score.",
    metric: "128 signals",
  },
  {
    title: "Portfolio Health",
    description:
      "Risk flags, concentration warnings, and volatility controls with one glance.",
    metric: "Real-time risk",
  },
  {
    title: "Smart Watchlists",
    description:
      "AI discovers peers, catalysts, and earnings inflections to stay ahead.",
    metric: "3x faster",
  },
]

const recommendations = [
  { symbol: "RELIANCE", status: "Accumulating", score: 92, change: "+1.8%" },
  { symbol: "TCS", status: "Conviction", score: 89, change: "+1.1%" },
  { symbol: "INFY", status: "Watch", score: 81, change: "+0.6%" },
  { symbol: "HDFCBANK", status: "Speculative", score: 74, change: "-0.4%" },
]

const workflows = [
  "Import holdings in under a minute",
  "Instant AI scorecard per stock",
  "Portfolio stress test scenarios",
  "Auto-generated action plan",
]

export default function Home() {
  return (
    <main className="min-h-screen text-ink-900">
      <section className="hero-grid relative overflow-hidden">
        <div className="floating-orb orb-one" />
        <div className="floating-orb orb-two" />
        <div className="floating-orb orb-three" />

        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          <div className="reveal-up">
            <p className="text-sm uppercase tracking-[0.3em] text-ink-500">
              EquiBrains AI
            </p>
            <h1 className="display-font text-4xl md:text-6xl leading-[1.05] mt-5">
              Modern portfolio intelligence for faster stock decisions.
            </h1>
            <p className="text-lg text-ink-500 mt-6 max-w-xl">
              Build smarter conviction with AI-powered recommendations, portfolio
              risk management, and institutional-grade analysis in one place.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button className="px-6 py-3 rounded-full bg-ink-900 text-white shadow-lg">
                Start free trial
              </button>
              <button className="px-6 py-3 rounded-full border border-ink-200 text-ink-700">
                Watch demo
              </button>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-ink-500">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime-500" />
                Live market sync
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                AI research room
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Secure sign-in
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[32px] p-6 md:p-8 reveal-up reveal-delay-1">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink-500">
              <span>AI Market Pulse</span>
              <span className="text-ink-700">02 Feb 2026</span>
            </div>

            <div className="mt-6 space-y-4">
              {recommendations.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3"
                >
                  <div>
                    <p className="text-lg font-semibold">{stock.symbol}</p>
                    <p className="text-xs text-ink-500">{stock.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-semibold">{stock.score}</p>
                    <p className="text-xs text-ink-500">{stock.change}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-ink-900 text-white p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/70">
                Portfolio Status
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span>Risk balance</span>
                <span className="font-semibold text-lime-500">Strong</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>Cash buffer</span>
                <span className="font-semibold text-cyan-500">11.6%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="pattern-grid">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
            <div className="reveal-up">
              <p className="text-sm uppercase tracking-[0.3em] text-ink-500">
                AI Stack
              </p>
              <h2 className="display-font text-3xl md:text-4xl mt-5">
                Turn signals into clear, explainable actions.
              </h2>
              <p className="text-ink-500 mt-4 text-lg">
                EquiBrains merges quantitative analytics with qualitative insights
                so every recommendation is traceable, compliant, and portfolio-aware.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-ink-700">
                {workflows.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-ink-900" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5">
              {insights.map((item, index) => (
                <div
                  key={item.title}
                  className={`glass-panel rounded-[26px] p-6 reveal-up reveal-delay-${index + 1}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-ink-500 text-sm mt-2">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-ink-900 text-white">
                      {item.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-[24px] p-6 border border-ink-200 bg-white">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
              Stock Analysis
            </p>
            <h3 className="text-xl font-semibold mt-4">Explainable AI notes</h3>
            <p className="text-ink-500 mt-3 text-sm">
              Get the “why” behind every rating with factor attribution, catalysts,
              and peer comparisons.
            </p>
          </div>
          <div className="rounded-[24px] p-6 border border-ink-200 bg-white">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
              Portfolio
            </p>
            <h3 className="text-xl font-semibold mt-4">Risk-aware allocation</h3>
            <p className="text-ink-500 mt-3 text-sm">
              Monitor exposure, scenario stress tests, and rebalance suggestions.
            </p>
          </div>
          <div className="rounded-[24px] p-6 border border-ink-200 bg-white">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
              Sign In
            </p>
            <h3 className="text-xl font-semibold mt-4">Secure access layer</h3>
            <p className="text-ink-500 mt-3 text-sm">
              SSO-ready authentication and audit-ready compliance tracking.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-ink-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div className="reveal-up">
            <h2 className="display-font text-3xl md:text-4xl">
              Choose the plan that matches your investing cadence.
            </h2>
            <p className="text-white/70 mt-4 text-lg">
              Upgrade anytime. No broker lock-in. Built for modern research teams
              and active investors.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <div className="rounded-full border border-white/30 px-4 py-2">
                Team dashboards
              </div>
              <div className="rounded-full border border-white/30 px-4 py-2">
                Portfolio alerts
              </div>
              <div className="rounded-full border border-white/30 px-4 py-2">
                Analyst workspaces
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white text-ink-900 p-8 shadow-2xl reveal-up reveal-delay-1">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
              Launch plan
            </p>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-4xl font-semibold">₹4,199</span>
              <span className="text-ink-500">/month</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              <li>Unlimited AI recommendations</li>
              <li>Portfolio insights & alerts</li>
              <li>Smart earnings calendar</li>
              <li>Secure sign-in + audit logs</li>
            </ul>
            <button className="mt-8 w-full rounded-full bg-ink-900 text-white py-3 text-sm">
              Get started
            </button>
            <p className="text-xs text-ink-500 mt-4">
              7-day trial. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="glass-panel rounded-[30px] p-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
              Trusted by modern teams
            </p>
            <h2 className="display-font text-3xl md:text-4xl mt-4">
              Bring your research team together, faster.
            </h2>
            <p className="text-ink-500 mt-4 text-lg">
              Collaborate with secure workspaces, share AI insights, and stay aligned
              across the entire portfolio lifecycle.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/70 bg-white/70 p-6">
            <div className="text-sm text-ink-500">Sign in to continue</div>
            <div className="mt-4 grid gap-3">
              <input
                className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm"
                placeholder="Work email"
                type="email"
              />
              <input
                className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm"
                placeholder="Password"
                type="password"
              />
              <button className="rounded-xl bg-ink-900 text-white py-3 text-sm">
                Sign in
              </button>
              <button className="rounded-xl border border-ink-200 text-ink-700 py-3 text-sm">
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
