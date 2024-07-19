"use client";
import { useEffect } from "react";
import Login from "@/components/forms/form-login/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo/arthorius.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
export default function PageLogin() {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <main className="flex min-h-screen flex-col items-center">
          <Image
            src="/images/arthorius.png"
            width={130} 
            height={130} 
            alt="Logo"
          />
          <div className=" p-4 flex justify-center">
            <div className="z-10 w-full lg:w-4/5 flex justify-center text-sm lg:flex">
              <Login />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
