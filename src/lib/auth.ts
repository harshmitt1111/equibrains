import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { findLocalUserByEmail } from "@/lib/localUsers"

const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim()
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    ...(googleClientId && googleClientSecret
      ? [
          GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim()
        const password = credentials?.password ?? ""

        if (!email || !password) return null

        const user = await findLocalUserByEmail(email)

        if (!user?.hashedPassword) return null

        const isValid = await bcrypt.compare(password, user.hashedPassword)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: null,
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
}
