import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';
import email from 'next-auth/providers/email';



export async function POST(req: NextRequest) {
  await connect();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { file } = await req.json();

  if (!file) {
    return NextResponse.json({ message: 'Necessário anexar uma imagem' }, { status: 400 });
  }
  const user = await User.findOne({ email: token?.email });

  if (!user) {
    return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
  }

  user.avatar = file;
  user.avatarContentType = file.split(';')[0].split(':')[1]; // Extrair tipo de conteúdo da string base64

  try {
    await user.save();
    return NextResponse.json({ message: 'Avatar atualizado com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : 'Erro desconhecido',
    }, { status: 500 });
  }
}
