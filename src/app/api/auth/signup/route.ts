import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createLocalUser, findLocalUserByEmail } from "@/lib/localUsers"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = String(body?.email ?? "").toLowerCase().trim()
    const password = String(body?.password ?? "")
    const name = String(body?.name ?? "").trim() || null

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      )
    }

    const existing = await findLocalUserByEmail(email)
    if (existing) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await createLocalUser({ email, name, hashedPassword })

    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "USER_EXISTS") {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: "Unable to create user." },
      { status: 500 }
    )
  }
}
