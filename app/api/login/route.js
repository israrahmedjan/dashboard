import { NextResponse } from 'next/server';
import { validateUser } from '@/lib/users';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  const { email, password } = await req.json();

  const isValid = await validateUser(email, password);

  console.log("Is valied Sttus", isValid);
  if (!isValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = signToken({ email });

  const response = NextResponse.json({ message: 'Login successful',token:token });
  response.cookies.set('token', token, {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
