import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

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

    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
    if (existing) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: { id: true },
    })

    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    console.error("SIGNUP ERROR:", error)
    return NextResponse.json(
      { error: "Unable to create user." },
      { status: 500 }
    )
  }
}
