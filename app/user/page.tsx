import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Inter } from 'next/font/google';

//const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com',
    },
  });

  return <main>{user?.name}</main>;
}
