import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connect();

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return new NextResponse("Usuário não encontrado", {
      status: 404,
    });
  }

  const isSamePassword = await bcrypt.compare(password, user.password);
  if (isSamePassword) {
    return new NextResponse("A nova senha não pode ser igual à senha antiga", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  user.password = hashedPassword;
  user.code = undefined;
  user.codeExpiration = undefined;

  try {
    await user.save();
    return new NextResponse("Senha redefinida com sucesso", { status: 200 });
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Unknown error",
      { status: 400 }
    );
  }
}
