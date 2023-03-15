'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/apu/auth/signin');
    },
  });

  if (status === 'loading') return <main>Loading...</main>;

  return <main>Dashboard</main>;
}
