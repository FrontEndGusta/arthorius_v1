import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { code, email } = await req.json();

  await connect();

  const user = await User.findOne({
    code,
    codeExpiration: { $gt: Date.now() },
  });

  if (!user) {
    return new NextResponse("Código inválido ou expirado.", { status: 400 });
  }

  return new NextResponse(user.email, { status: 200 });
}
