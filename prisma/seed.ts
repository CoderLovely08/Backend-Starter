import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { Pool } from 'pg';
import { PERMISSION_DEFINITIONS } from '../src/utils/constants/permissions.constant.js';
import bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  console.log('🌱 Starting seed...');

  // Seed User Types
  console.log('📝 Seeding user types...');
  const userTypes = await prisma.userType.createMany({
    data: [
      { name: 'SuperAdmin', description: 'Super Administrator with full system access' },
      { name: 'Admin', description: 'Administrator with management privileges' },
      { name: 'User', description: 'Standard user with basic access' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ User types created');

  // Seed Permissions
  console.log('📝 Seeding permissions...');
  for (const permission of PERMISSION_DEFINITIONS) {
    await prisma.permission.upsert({
      where: { slug: permission.slug },
      update: {
        name: permission.name,
        description: permission.description,
      },
      create: permission,
    });
  }
  console.log(`✅ ${PERMISSION_DEFINITIONS.length} permissions seeded`);

  console.log('🎉 Seed completed successfully!');

  // Create an initial SuperAdmin user
  const superAdminType = await prisma.userType.findUnique({
    where: { name: 'SuperAdmin' },
  });
  const hashedPassword = bcrypt.hashSync('Pass@123', 10);

  if (superAdminType) {
    const superAdminUser = await prisma.systemUser.upsert({
      where: { email: 'admin@gmail.com' },
      update: {},
      create: {
        fullName: 'Super Admin',
        email: 'admin@gmail.com',
        userTypeId: 1, // Assuming SuperAdmin has ID 1
        password: hashedPassword,
      },
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
