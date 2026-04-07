import { prisma } from "@/lib/prisma";

export async function getClassSessions() {
  return prisma.classSession.findMany({
    orderBy: {
      startDate: "asc",
    },
  });
}

export async function getClassSessionById(id: string) {
  return prisma.classSession.findUnique({
    where: { id },
  });
}
