'use client';

import { Input, Stack, Button } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <div className='flex flex-col p-96'>
      <form action={dispatch}>
        <Stack spacing={2}>
          <Input placeholder='Email' type='email' />
          <Input placeholder='Password' type='password' />
          <Button type='submit'>Login</Button>
        </Stack>
        <div
          className='flex h-8 items-end space-x-1'
          aria-live='polite'
          aria-atomic='true'
        >
          {errorMessage && (
            <>
              <h3>{errorMessage}</h3>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className='mt-4 w-full' aria-disabled={pending}>
      Logout
    </Button>
  );
}
