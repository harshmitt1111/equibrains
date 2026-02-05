export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Smarter Equity Decisions,<br />Powered by AI
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          EquiBrains uses artificial intelligence to analyze market data,
          trends, and sentiment — helping investors make data-driven decisions.
        </p>
        <a
          href="/dashboard"
          className="inline-block mt-8 bg-slate-900 text-white px-6 py-3 rounded-lg"
        >
          View AI Insights
        </a>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-semibold text-lg">1. Data Analysis</h3>
            <p className="text-gray-600 mt-2">
              We analyze price action, fundamentals, and market signals.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">2. AI Intelligence</h3>
            <p className="text-gray-600 mt-2">
              Machine learning models detect trends and patterns.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">3. Clear Insights</h3>
            <p className="text-gray-600 mt-2">
              You receive easy-to-understand equity insights.
            </p>
          </div>
        </div>
      </section>

      {/* Why EquiBrains */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Why EquiBrains?</h2>
          <ul className="mt-6 space-y-3 text-gray-600">
            <li>• AI-driven, not tip-based</li>
            <li>• India-first market focus</li>
            <li>• Explainable and transparent insights</li>
            <li>• Built for long-term investors</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-gray-500">
        EquiBrains provides AI-based market insights for educational purposes only.
        Not SEBI-registered investment advice.
      </footer>
    </main>
  )
}
