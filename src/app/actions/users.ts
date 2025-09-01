"use server"; // обязательно

import { prisma } from "@/lib/prisma";
import { IUser } from "@/types/user.interface";

export async function createUser(data: IUser) {
  return prisma.user.create({ data });
}

export async function fetchUsers(){
  return prisma.user.findMany()
}

