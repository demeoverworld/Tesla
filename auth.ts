import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import { users } from "@/server/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// Ensure NextAuth builds the correct OAuth callback URL in production.
// AUTH_URL takes priority; fall back to the RAILWAY env var already in .env.
if (!process.env.AUTH_URL && process.env.RAILWAY) {
  process.env.AUTH_URL = process.env.RAILWAY.trim();
}

const googleClientId = process.env.AUTH_GOOGLE_ID?.trim();
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET?.trim();
const authSecret = process.env.AUTH_SECRET?.trim();

const hasGoogleConfig = Boolean(googleClientId && googleClientSecret);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: authSecret,
  adapter: db ? DrizzleAdapter(db) : undefined,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await db?.query.users.findFirst({
          where: eq(users.email, String(user.email)),
        });

        if (dbUser) {
          token.role = dbUser.role;
          token.name = user.name ?? dbUser.name ?? token.name;
          token.email = user.email ?? dbUser.email ?? token.email;
        } else {
          token.name = user.name ?? token.name;
          token.email = user.email ?? token.email;
        }
      }

      if (!token.role && token.email && db) {
        const dbUser = await db.query.users.findFirst({
          where: eq(users.email, String(token.email)),
        });

        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as typeof session.user & {
          role?: "user" | "admin";
        };

        sessionUser.name = token.name;
        sessionUser.email = token.email ?? sessionUser.email ?? "";
        sessionUser.role = token.role as "user" | "admin" | undefined;
      }

      return session;
    },
  },

  providers: [
    ...(hasGoogleConfig
      ? [
          Google({
            clientId: googleClientId!,
            clientSecret: googleClientSecret!,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!db) return null;

        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        const user = await db.query.users.findFirst({
          where: eq(users.email, String(email)),
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(String(password), user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name:
            user.name ??
            (user.email ? user.email.split("@")[0] : "User"),
        };
      },
    }),
  ],
});