import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: unknown;
      email: string;
      name: string;
      lastName: string; // Inclui lastName aqui
      createdAt?: string;
      department?: string
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    email: string;
    name: string;
    lastName: string;
    createdAt?: string;
    department?: string;
  }
}
