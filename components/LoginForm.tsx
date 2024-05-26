'use client';

import { Input, Stack, Button, TextField } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import { useState } from 'react';
import { HtmlContext } from 'next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', formValues.email);
    formData.append('password', formValues.password);
    dispatch(formData);
  };
  return (
    <div className='flex flex-col p-96'>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name='email'
            label='Email'
            onChange={handleChange}
            type='email'
          />
          <TextField
            name='password'
            label='Passwprd'
            onChange={handleChange}
            type='password'
          />
          <Button type='submit'>Sign Up</Button>
        </Stack>
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
