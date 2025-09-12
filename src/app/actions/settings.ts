"use server";
import { prisma } from "@/lib/prisma";

type TypeSettingsCreate = {
  token: string;
};

export async function saveTokenToDb(data: TypeSettingsCreate) {
  await prisma.settings.deleteMany();
  return prisma.settings.create({ data });
}

export async function fetchTokenFromDb() {
  return prisma.settings.findFirst();
}
