import { prisma } from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const skip = requestUrl.searchParams.get('skip');

  try {
    const posts = await prisma.post.findMany({
      skip: parseInt(skip || '0'),
      take: 5,
      where: {
        published: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        posts,
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
