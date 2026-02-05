const mockRecommendations = [
  { symbol: "INFY", confidence: 78, sentiment: "Bullish" },
  { symbol: "TCS", confidence: 72, sentiment: "Neutral" },
  { symbol: "HDFCBANK", confidence: 69, sentiment: "Bullish" },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">AI Equity Insights</h1>
        <p className="text-gray-600 mt-2">
          Generated using data-driven AI models
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {mockRecommendations.map((stock) => (
            <div
              key={stock.symbol}
              className="bg-white p-5 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold">{stock.symbol}</h3>
              <p className="mt-2 text-sm">
                Confidence: <strong>{stock.confidence}%</strong>
              </p>
              <p className="text-sm">
                Sentiment: <strong>{stock.sentiment}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
