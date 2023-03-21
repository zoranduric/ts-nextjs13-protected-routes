import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    const cachedValue = await redis.get('Zoki');

    if (cachedValue) {
      console.log('cachedValue');
      return new Response(cachedValue);
    }

    const user = await prisma.user.findFirst();
    console.log('db user', user);
    if (!user) return new Response('User Not Found');

    await redis.set('Zoki', JSON.stringify(user));

    return new Response(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    return new Response('User Not Found');
  }
}
