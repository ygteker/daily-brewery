import { SignupFormSchema, FormState } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const valdiateFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!valdiateFields.success) {
    return {
      errors: valdiateFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = valdiateFields.data;
  const hashedPassword = password;
  // 3. Insert the user into database
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // 4. Create user session
  await createSession(user.email); //TODO change to id
  redirect('/profile');
}

export async function logout() {
  deleteSession();
  redirect('/login');
}
