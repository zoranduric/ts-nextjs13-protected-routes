import { prisma } from '@/lib/prisma';
import { authOptions } from './../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let body = await request.json();
  const { title, content, published } = body as {
    title: string;
    content: string;
    published: boolean;
  };
  const getDate = () => {
    return new Date();
  };

  const createdAt = getDate();
  const updatedAt = getDate();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Not Authenticated' });
  const authorId = (
    await prisma.user.findUnique({
      where: { email: session.user?.email ?? '' },
    })
  )?.id;

  if (title.length > 300)
    return NextResponse.json({ message: 'Title too long' });
  if (!title.length)
    return NextResponse.json({ message: 'Please do not leave empty' });

  await prisma.post.create({
    data: {
      title,
      content,
      published,
      author: { connect: { id: authorId } },
      createdAt,
      updatedAt,
    },
  });

  return NextResponse.json(`Great job`);
}
