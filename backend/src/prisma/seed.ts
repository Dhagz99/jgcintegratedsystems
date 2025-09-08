import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Default admin password
  const hashedPassword = await bcrypt.hash("123456", 10);

  // Seed default Admin user
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@example.com",
      username: "admin",
      password: hashedPassword,
      role: Role.Admin,
      position: "System Administrator",
      approver: true,
    },
  }); 

  // Seed default regular User
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Default User",
      email: "user@example.com",
      username: "user",
      password: await bcrypt.hash("user123", 10),
      role: Role.User,
      position: "Staff",
    },
  });

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
