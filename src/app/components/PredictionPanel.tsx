"use client"

import { useState } from "react"

type Prediction = {
  symbol: string
  direction: string
  confidence: number
  createdAt: string
}

export default function PredictionPanel() {
  const [symbol, setSymbol] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<Prediction | null>(null)

  const runPrediction = async () => {
    setError(null)
    setLoading(true)
    setPrediction(null)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol }),
      })

      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload?.error ?? "Prediction failed.")
      }

      setPrediction(payload.prediction)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Prediction failed."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-[28px] border border-ink-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
            AI Model
          </p>
          <h3 className="text-lg font-semibold mt-2">
            Up or down prediction
          </h3>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-ink-900 text-white">
          Hosted API
        </span>
      </div>

      <div className="mt-6 grid gap-3">
        <input
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm"
          placeholder="Ticker symbol (e.g. AAPL)"
          value={symbol}
          onChange={(event) => setSymbol(event.target.value.toUpperCase())}
        />
        <button
          className="rounded-xl bg-ink-900 text-white py-3 text-sm"
          onClick={runPrediction}
          disabled={!symbol || loading}
        >
          {loading ? "Running model..." : "Run prediction"}
        </button>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      {prediction ? (
        <div className="mt-6 rounded-2xl bg-mist-50 px-4 py-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{prediction.symbol}</span>
            <span className="text-ink-500">
              {new Date(prediction.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-ink-500">Direction</span>
            <span className="font-semibold">{prediction.direction}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-ink-500">Confidence</span>
            <span className="font-semibold">
              {(prediction.confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
