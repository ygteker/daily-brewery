'use client';

import { Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }

    setSuccess('Login successful');
    setFormValues({ email: '', password: '' });
    setError('');
    router.push('/');
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
