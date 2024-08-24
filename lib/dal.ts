import 'server only';

import { cookies } from 'next/headers';
import { decrypt } from './session';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { prisma } from './prisma';

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await prisma.user.findMany({
      where: {
        email: session.userId,
      },
      select: {
        email: true,
        password: true,
        name: true,
        isAdmin: true,
        team: true,
      },
    });

    const user = data[0];
    return user;
  } catch (error) {
    console.log('Failed to fatch user');
    return null;
  }
});
