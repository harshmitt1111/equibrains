import SignInForm from "@/app/auth/signin/SignInForm"

export default function SignInPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  )

  return (
    <main className="min-h-screen bg-mist-50 text-ink-900">
      <section className="max-w-5xl mx-auto px-6 py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
            Secure Access
          </p>
          <h1 className="display-font text-3xl md:text-4xl mt-4">
            Welcome back to EquiBrains.
          </h1>
          <p className="text-ink-500 mt-4 text-lg">
            Sign in to view AI-powered portfolio insights and your latest
            prediction runs.
          </p>
          {googleEnabled ? (
            <div className="mt-8 rounded-[24px] border border-ink-200 bg-white p-6">
              <p className="text-sm text-ink-600">
                Tip: use Google sign-in for instant access and secure SSO.
              </p>
            </div>
          ) : null}
        </div>
        <SignInForm googleEnabled={googleEnabled} />
      </section>
    </main>
  )
}
