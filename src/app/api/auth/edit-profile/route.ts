import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";

export async function POST(req: Request) {
  const { name, email, newEmail } = await req.json();

  await connect();

  const user = await User.findOne({
    email,
  });

  if (user) {
    if (user.name === name && user.email === newEmail) {
      return NextResponse.json({
        message: "Nome ou email já cadastrado",
        status: 409,
      });
    }
  }

  if (!user) {
    return new NextResponse("Usuário não encontrado", {
      status: 404,
    });
  }

  // Atualizar o nome e o email do usuário
  user.name = name;
  if (newEmail) {
    user.email = newEmail;
  }

  try {
    await user.save();
    return new NextResponse("Dados atualizados com sucesso", { status: 200 });
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Erro desconhecido",
      { status: 400 }
    );
  }
}
