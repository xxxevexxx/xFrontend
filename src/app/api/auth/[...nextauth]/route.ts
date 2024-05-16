import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/account/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  })
  const response = await res.json()
  return {
    ...token,
    backendTokens: response,
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: {label: "Login", type: "text"},
        password: { label: "Password", type: "password"},
      },
      async authorize(credentials, req) {
        if (!credentials?.login || !credentials?.password) return null
        const { login, password } = credentials
        const res = await fetch(Backend_URL + "/account/authorization", {
          method: "POST",
          body: JSON.stringify({login, password}),
          headers: {"Content-Type": "application/json"}
        })
        if (res.status == 401) {return null}
        return await res.json()
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    signOut: "/auth"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user }
      if (new Date().getTime() < token.backendTokens.expiresIn) {
        return token
      }
      return await refreshToken(token)
    },
    async session({ token, session }) {
      session.backendTokens = token.backendTokens
      const res = await fetch(Backend_URL + "/account", {
        method: "GET",
        headers: {"Content-Type": "application/json", authorization: `Bearer ${token.backendTokens.accessToken}`}
      })
      if (res.status !== 200) {
        session.user = token.user
      } else {
        session.user = await res.json()
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }