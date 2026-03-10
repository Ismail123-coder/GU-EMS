import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@gems.com";

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: email,
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log("✅ Admin created successfully");
}

main()
  .catch(err => console.error(err))
  .finally(() => prisma.$disconnect());
