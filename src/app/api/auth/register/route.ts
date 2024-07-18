import User from "@/models/User";
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import bcrypt from "bcrypt"; 

export async function POST(req: Request) {
  try {
    const { name, email, department, password } = await req.json();

    await connect();

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return NextResponse.json({
        message: "E-mail já cadastrado!",
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
      name,
      email,
      department,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({
      message: "Usuário criado com sucesso!",
      status: 201,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error); // Loga o erro no console
    return NextResponse.json({
      error: "Erro ao cadastrar usuário",
      status: 500,
    });
  }
}
