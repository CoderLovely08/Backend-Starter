import { PrismaClient } from '@prisma/client';
import { PERMISSION_DEFINITIONS } from '../src/utils/constants/permissions.constant.js';

const prisma = new PrismaClient();

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
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
