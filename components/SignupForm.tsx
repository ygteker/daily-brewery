'use client';

import { Stack, Input, Button, TextField } from '@mui/material';
import { registerUser } from '@/lib/actions';
import { useState } from 'react';

export default function SignupForm() {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formValues);
    registerUser(formValues);
  };
  return (
    <div className='flex flex-col p-96'>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name='username' label='Username' onChange={handleChange} />
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
