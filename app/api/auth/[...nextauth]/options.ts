import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { getCurrentUser, getUser, login } from "@/lib/api/api";
interface User {
  id: string;
  customField: string;
  accessToken: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // Error code passed in query string as ?error=
    verifyRequest: "/auth/confirmEmail", // (used for check email message)
    newUser: "/", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "Ваш email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Ваш пароль",
        },
      },
      async authorize(credentials) {
        // Авторизация юзера на бэкенде

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        if (data) {
          return {
            id: data.id,
            email: data.email,
            isAdmin: data.is_admin,
            accessToken: "",
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      //console.log({ token, user });
      return { ...token, ...user };
    },
    async session({ session, token }) {
      //console.log("Session", session);
      session.user = {
        id: token.id,
        email: token.email,
        isAdmin: token.isAdmin,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
};
