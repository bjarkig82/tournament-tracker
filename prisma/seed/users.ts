import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function seedUsers() { 
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice Smith',
        username: 'alice',
        password: 'password123',
        email: 'alice@example.com',
        role: 'admin',
      },
      {
        name: 'Bob Johnson',
        username: 'bob',
        password: 'password123',
        email: 'bob@example.com',
        role: 'coach',
      },
      {
        name: 'Charlie Brown',
        username: 'charlie',
        password: 'password123',
        email: 'charlie@example.com',
        role: 'participant',
      },
    ],
  });
}
