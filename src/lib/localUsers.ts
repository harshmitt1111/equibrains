import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import path from "node:path"
import { randomUUID } from "node:crypto"

export type LocalUser = {
  id: string
  name: string | null
  email: string
  hashedPassword: string
  createdAt: string
}

const USERS_FILE_PATH = path.join(process.cwd(), ".data", "users.json")

async function readUsers(): Promise<LocalUser[]> {
  try {
    const raw = await readFile(USERS_FILE_PATH, "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as LocalUser[]) : []
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return []
    }
    throw error
  }
}

async function writeUsers(users: LocalUser[]): Promise<void> {
  await mkdir(path.dirname(USERS_FILE_PATH), { recursive: true })

  const tempPath = `${USERS_FILE_PATH}.tmp`
  await writeFile(tempPath, JSON.stringify(users, null, 2), "utf8")
  await rename(tempPath, USERS_FILE_PATH)
}

export async function findLocalUserByEmail(email: string): Promise<LocalUser | null> {
  const normalizedEmail = email.toLowerCase().trim()
  const users = await readUsers()
  return users.find((user) => user.email === normalizedEmail) ?? null
}

export async function createLocalUser(input: {
  email: string
  name?: string | null
  hashedPassword: string
}): Promise<LocalUser> {
  const normalizedEmail = input.email.toLowerCase().trim()
  const users = await readUsers()

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("USER_EXISTS")
  }

  const nextUser: LocalUser = {
    id: randomUUID(),
    email: normalizedEmail,
    name: input.name?.trim() || null,
    hashedPassword: input.hashedPassword,
    createdAt: new Date().toISOString(),
  }

  users.push(nextUser)
  await writeUsers(users)
  return nextUser
}
