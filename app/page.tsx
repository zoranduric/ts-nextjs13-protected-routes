import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from './api/auth/[...nextauth]/route';
import { LoginButton, LogoutButton } from './auth';
import { User } from './user';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <p>Home page</p>
      <LoginButton />
      <LogoutButton />
      <Link href={'api/auth/signin'}>signin</Link>
      <p>server session</p>
      <p>Session: {JSON.stringify(session)}</p>
      <p>Cliet call</p>
      <User />
    </main>
  );
}
