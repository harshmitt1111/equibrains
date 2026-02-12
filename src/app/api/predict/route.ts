import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { runHostedModel } from "@/lib/model"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const symbol = String(body?.symbol ?? "").toUpperCase().trim()
  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required." }, { status: 400 })
  }

  try {
    const result = await runHostedModel(symbol)

    const prediction = {
      symbol,
      direction: result.direction,
      confidence: result.confidence,
      createdAt: new Date().toISOString(),
      rawOutput: JSON.stringify(result.raw ?? null),
    }

    return NextResponse.json({ prediction })
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Prediction failed."
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
