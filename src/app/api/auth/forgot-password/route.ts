import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const emailTransporter = process.env.EMAIL;
  const passwordTransporter = process.env.PASSWORD;
  const { email } = await req.json();

  await connect();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({
      message: "Esse e-mail não existe",
      status: 400,
    });
  }

  let verificationCode = "";
  while (verificationCode.length < 6) {
    verificationCode += Math.floor(Math.random() * 10).toString();
  }

  // Definir data de expiração do código (por exemplo, 1 hora a partir de agora)
  const codeExpiration = new Date(Date.now() + 3600000); // 1 hora

  // Atualizar o usuário com o código de verificação e a data de expiração
  user.code = verificationCode;
  user.codeExpiration = codeExpiration;

  const transporter = nodemailer.createTransport({
    service: "gmail", // ou outro serviço de e-mail que você estiver usando
    auth: {
      user: emailTransporter,
      pass: passwordTransporter,
    },
  });

  const mailOptions = {
    from: 'no-reply',
    to: email,
    subject: "Código de Verificação",
    text: `Seu código de verificação é: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await user.save();
    return new NextResponse(
      user.email,
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Unknown error",
      {
        status: 500,
      }
    );
  }
}
