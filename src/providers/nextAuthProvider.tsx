"use client";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface NextAuthProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function NextAuthProvider({
  children,
  session,
}: Readonly<NextAuthProviderProps>) {
  useEffect(() => {
    const statusUser = async () => {
      const res = await fetch("/api/user-status");

      const status = await res.json();

      console.log(status, "status user res NextAuthProvider");
    };

    statusUser();
  }, []);

  console.log(session, "session session");

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
