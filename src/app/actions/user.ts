"use server"; // 👈 обязательно

import { prisma } from "@/lib/prisma";

export async function createUser(data: { email: string; name: string; iin: string, password: string }) {
  return prisma.user.create({
    data,
  });
}