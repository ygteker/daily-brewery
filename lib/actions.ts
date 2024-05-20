import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function registerUser(formValues: {
  username: string;
  email: string;
  password: string;
}) {
  const bcrypt = require('bcrypt');
  bcrypt.hash(formValues.password, 10, async (err: any, hash: any) => {
    if (err) {
      console.log('Failed to hash password:', err);
      return;
    }
    try {
      await prisma.user.create({
        data: {
          email: formValues.email,
          password: hash,
        },
      });
    } catch (error) {
      console.error('Failed to create user:', error);
      throw new Error('Failed to create user.');
    }
  });
}
