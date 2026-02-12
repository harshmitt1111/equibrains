"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function AuthButtons({ googleEnabled }: { googleEnabled: boolean }) {
  const { status } = useSession()
  const isAuthed = status === "authenticated"

  return (
    <div className="flex items-center gap-3">
      {isAuthed ? (
        <>
          <Link
            href="/ai-analysis"
            className="hidden sm:inline-flex px-4 py-2 text-sm rounded-full border border-ink-200 text-ink-700 hover:border-ink-500"
          >
            AI Analysis
          </Link>
          <button
            className="px-4 py-2 text-sm rounded-full bg-ink-900 text-white shadow-sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button
            className="hidden sm:inline-flex px-4 py-2 text-sm rounded-full border border-ink-200 text-ink-700 hover:border-ink-500"
            onClick={() => signIn(undefined, { callbackUrl: "/ai-analysis" })}
          >
            Sign in
          </button>
          {googleEnabled ? (
            <button
              className="px-4 py-2 text-sm rounded-full bg-ink-900 text-white shadow-sm"
              onClick={() => signIn("google", { callbackUrl: "/ai-analysis" })}
            >
              Continue with Google
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-sm rounded-full bg-ink-900 text-white shadow-sm"
            >
              Continue
            </Link>
          )}
        </>
      )}
    </div>
  )
}
