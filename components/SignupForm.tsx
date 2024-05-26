'use client';

import { Stack, Input, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //todo check formVales if they match the pattern in api
      body: JSON.stringify(formValues),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }

    setSuccess('Registration successful');
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
            defaultValue='gunes.teker@gmail.com'
          />
          <TextField
            name='password'
            label='Passwprd'
            onChange={handleChange}
            type='password'
            defaultValue='12345'
          />
          <Button type='submit'>Sign Up</Button>
        </Stack>
      </form>
    </div>
  );
}
