import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
    });
  }

  const { email, password } = await req.json();
  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: 'All fields are required' }),
      {
        status: 400,
      }
    );
  } else {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Email not found' }), {
        status: 400,
      });
    } else {
      const match = await compare(password, user.password);
      if (!match) {
        return new Response(JSON.stringify({ message: 'Password incorrect' }), {
          status: 400,
        });
      } else {
        return new Response(JSON.stringify(user), { status: 200 });
      }
    }
  }
};
