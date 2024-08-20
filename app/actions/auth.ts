import { SignupFormSchema, FormState } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';

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
  const data = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });

  if (!data) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }
}
