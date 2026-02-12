import SignUpForm from "@/app/auth/signup/SignUpForm"

export default function SignUpPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  )

  return (
    <main className="min-h-screen bg-mist-50 text-ink-900">
      <section className="max-w-5xl mx-auto px-6 py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
            Launch Access
          </p>
          <h1 className="display-font text-3xl md:text-4xl mt-4">
            Build your EquiBrains account.
          </h1>
          <p className="text-ink-500 mt-4 text-lg">
            Unlock AI-powered stock predictions and portfolio intelligence with
            a secure account.
          </p>
          {googleEnabled ? (
            <div className="mt-8 rounded-[24px] border border-ink-200 bg-white p-6">
              <p className="text-sm text-ink-600">
                Tip: connect Google for frictionless sign-in on any device.
              </p>
            </div>
          ) : null}
        </div>
        <SignUpForm googleEnabled={googleEnabled} />
      </section>
    </main>
  )
}
