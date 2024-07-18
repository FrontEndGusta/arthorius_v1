import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  try {
    await connect();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await User.find({}, 'calls');
    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'No users found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'ok', data: users });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
