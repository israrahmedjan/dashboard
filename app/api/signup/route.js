import { NextResponse } from 'next/server';
import { addUser } from '@/lib/users';

export async function POST(req) {
  const { email, password } = await req.json();
  await addUser(email, password);
  return NextResponse.json({ message: 'User created successfully' });
}
