import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [], // Will be merged with actual providers in route.ts
  // You can add callbacks, pages, events, etc.
  pages: {
    signIn: "/signin",
  },
  // You don't need to include providers or adapter here — they get merged in route.ts
};
