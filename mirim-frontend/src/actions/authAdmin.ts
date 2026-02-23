"use server";

import { api } from "@/lib/api";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    redirect("/login-admin");
  }

  try {
    const res = await api.post(
      "/auth/validate",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.user;
  } catch (error) {
    redirect("/login-admin");
  }
}
