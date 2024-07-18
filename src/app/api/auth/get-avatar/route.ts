import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';


export async function GET(req: NextRequest) {
  try {
    await connect();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });


    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'ok', data: { avatar: user.avatar } });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
