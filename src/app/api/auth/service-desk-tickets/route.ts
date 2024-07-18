import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  await connect();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.error("Token não encontrado");
    return NextResponse.json(
      { message: "Token não encontrado" },
      { status: 401 }
    );
  }

  const {
    name,
    locale,
    priority,
    telephone,
    department,
    summary,
    category,
    item,
    type,
  } = await req.json();

  if (
    !name ||
    !telephone ||
    !locale ||
    !priority ||
    !department ||
    !summary ||
    !category ||
    !item ||
    !type
  ) {
    console.error("Campos obrigatórios não preenchidos");
    return NextResponse.json(
      { message: "Necessário preencher todos os campos!" },
      { status: 400 }
    );
  }

  try {
    // Procura pelo usuário com base no email do token
    const user = await User.findOne({ email: token.email });

    if (!user) {
      console.error("Usuário não encontrado");
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se calls é um array e inicializa se não for
    if (!Array.isArray(user.calls)) {
      user.calls = [];
    }

    // Gera um número de ticket único
    const ticketNumber = `TICKET-${Math.floor(1000 + Math.random() * 9000)}`;

    // Cria um novo objeto de chamada
    const newCall = {
      name,
      locale,
      priority,
      telephone,
      department,
      summary,
      category,
      item,
      type,
      ticketNumber,
    };

    // Adiciona o novo objeto de chamada ao array user.calls
    user.calls.push(newCall);

    // Salva o usuário com a nova chamada
    await user.save();

    console.log("Chamado salvo com sucesso no banco de dados", user);
    return NextResponse.json(
      { message: "Chamado salvo com sucesso", ticketNumber },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao salvar o chamado:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
