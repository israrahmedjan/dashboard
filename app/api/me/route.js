import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const user = verifyToken(token);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
