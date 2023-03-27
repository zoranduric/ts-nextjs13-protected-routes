import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const postId = requestUrl.searchParams.get('id');

  const session = await getServerSession(authOptions);
  try {
    if (!session) return;
    const post = await prisma.post.findUnique({
      where: {
        id: postId as string,
      },
    });
    return new NextResponse(
      JSON.stringify({
        post,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error,
      }),
      {
        status: 500,
      }
    );
  }
}
