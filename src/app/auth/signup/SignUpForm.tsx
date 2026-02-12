"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpForm({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setError(payload?.error ?? "Unable to create account.")
        return
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/ai-analysis",
      })

      if (result?.error) {
        setError("Account created. Please sign in to continue.")
        router.push("/auth/signin")
        return
      }

      if (result?.url) {
        router.push(result.url)
      }
    } catch {
      setError("Unable to create account.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-[28px] border border-ink-200 bg-white p-8 shadow-xl">
      <h1 className="display-font text-2xl">Create your account</h1>
      <p className="text-sm text-ink-500 mt-2">
        Start with email and password, or sign up with Google.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm"
          placeholder="Full name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
          placeholder="Password (min 8 chars)"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
        />

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <button
          className="rounded-xl bg-ink-900 text-white py-3 text-sm"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create account"}
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
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-ink-900 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
