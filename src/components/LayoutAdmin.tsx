"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type LayoutAdminProps = {
  children: React.ReactNode;
};

export default function LayoutAdmin({ children }: LayoutAdminProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null; // Or a loading spinner
  }

  if (!session) {
    return null; // Optional, can show a loading spinner here too
    
  }

  return <div className="min-h-screen">{children}</div>;
}
