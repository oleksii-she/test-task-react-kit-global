'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface NextAuthProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function NextAuthProvider({ children, session }: Readonly<NextAuthProviderProps>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
