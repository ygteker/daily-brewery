import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
    });
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    return new NextResponse(
      JSON.stringify({ message: 'All fields are required' }),
      {
        status: 400,
      }
    );
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return new NextResponse(
        JSON.stringify({ message: 'Email already exists' }),
        { status: 400 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong' }),
      { status: 500 }
    );
  }
};
