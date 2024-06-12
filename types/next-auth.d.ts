import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Данны внутри объекта юзера (сессии)
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    isAdmin: number;
    accessToken: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      isAdmin: number;
      accessToken: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    email: string;
    isAdmin: number;
    accessToken: string;
  }
}
