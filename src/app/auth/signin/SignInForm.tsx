"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function SignInForm({ googleEnabled }: { googleEnabled: boolean }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/ai-analysis",
    })

    setLoading(false)

    if (result?.error) {
      setError("Invalid email or password.")
      return
    }

    if (result?.url) {
      window.location.href = result.url
    }
  }

  return (
    <div className="rounded-[28px] border border-ink-200 bg-white p-8 shadow-xl">
      <h1 className="display-font text-2xl">Sign in to EquiBrains</h1>
      <p className="text-sm text-ink-500 mt-2">
        Use your email or continue with Google to access your dashboard.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm"
          placeholder="Work email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <button
          className="rounded-xl bg-ink-900 text-white py-3 text-sm"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-4 grid gap-3">
        {googleEnabled ? (
          <button
            className="rounded-xl border border-ink-200 text-ink-700 py-3 text-sm"
            onClick={() => signIn("google", { callbackUrl: "/ai-analysis" })}
          >
            Continue with Google
          </button>
        ) : null}
        <p className="text-xs text-ink-500">
          New here?{" "}
          <Link href="/auth/signup" className="text-ink-900 underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
