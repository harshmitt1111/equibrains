type ModelOutput = {
  direction: string
  confidence: number
  raw?: unknown
}

function normalizeConfidence(value: number) {
  if (Number.isNaN(value)) return 0
  if (value > 1) return Math.min(value / 100, 1)
  return Math.max(value, 0)
}

export async function runHostedModel(symbol: string): Promise<ModelOutput> {
  const url = process.env.MODEL_URL
  if (!url) {
    throw new Error("MODEL_URL is not configured.")
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbol }),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.error ?? "Model request failed.")
  }

  const direction = String(payload?.direction ?? "").toUpperCase()
  if (!direction) {
    throw new Error("Model output missing direction.")
  }

  const confidence = normalizeConfidence(Number(payload?.confidence ?? 0))

  return {
    direction,
    confidence,
    raw: payload,
  }
}
