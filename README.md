EquiBrains is a Next.js app with NextAuth authentication and optional Prisma/Postgres persistence.

## Getting Started

### 1) Configure environment variables

Copy `.env.example` to `.env` and fill in at least:

- `NEXTAUTH_SECRET` (any strong random string)

Google SSO is optional; only set `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` if you want “Continue with Google”.

### 2) Install dependencies

```bash
npm install
```

### 3) Run without a database (default)

Credentials users are stored in a local file at `.data/users.json`, created automatically after sign-up.

### 4) Optional: Create/update the database schema

```bash
npm run db:migrate
```

If you don't want migrations yet, you can use:

```bash
npm run db:push
```

### 5) Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### 6) Create an account + sign in

- Sign up: `/auth/signup`
- Sign in: `/auth/signin`

## Notes

- Auth routes run on the Node.js runtime (required for Prisma + NextAuth).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
