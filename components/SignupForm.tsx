import { Stack, Input, Button } from '@mui/material';

export default function SignupForm() {
  return (
    <div className='flex flex-col p-96'>
      <form>
        <Stack spacing={2}>
          <Input placeholder='Name' type='text' />
          <Input placeholder='Email' type='email' />
          <Input placeholder='Password' type='password' />
          <Button type='submit'>Sign Up</Button>
        </Stack>
      </form>
    </div>
  );
}
