import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ClassSessionStatus } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const adapter = new PrismaPg({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.registration.deleteMany();
  await prisma.classSession.deleteMany();

  await prisma.classSession.createMany({
    data: [
      {
        title: "CAPPA Childbirth Educator Training",
        description:
          "A structured professional training for birth workers and educators seeking a strong foundation in evidence-based childbirth education, teaching skills, and certification readiness.",
        startDate: new Date("2026-06-12T00:00:00.000Z"),
        endDate: new Date("2026-06-14T00:00:00.000Z"),
        durationDays: 3,
        price: 89500,
        capacity: 24,
        status: ClassSessionStatus.open,
      },
      {
        title: "CAPPA Certified Lactation Educator (CLE®) Training",
        description:
          "A professional development training designed for those supporting feeding families and pursuing lactation education with a calm, practical, and certification-focused learning experience.",
        startDate: new Date("2026-08-21T00:00:00.000Z"),
        endDate: new Date("2026-08-23T00:00:00.000Z"),
        durationDays: 3,
        price: 92500,
        capacity: 20,
        status: ClassSessionStatus.open,
      },
      {
        title: "Postpartum Lactation Support Session",
        description:
          "A family-centered support class for new mothers and parents seeking guidance on breastfeeding, recovery, newborn feeding rhythms, and early postpartum confidence.",
        startDate: new Date("2026-05-09T00:00:00.000Z"),
        endDate: new Date("2026-05-10T00:00:00.000Z"),
        durationDays: 2,
        price: 24900,
        capacity: 18,
        status: ClassSessionStatus.open,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
