# Netflix Clone

This is a Netflix clone built using modern web technologies including:

- [Next.js](https://nextjs.org) for the frontend framework.
- [NextAuth.js](https://next-auth.js.org) for authentication.
- [Prisma](https://www.prisma.io) as the ORM for database management.
- [TypeScript](https://www.typescriptlang.org) for type safety.
- [TailwindCSS](https://tailwindcss.com) for styling.
- [MongoDB](https://www.mongodb.com) as the database.

## Features

- User authentication (login/register) with NextAuth.js.
- Responsive design using TailwindCSS.
- Integration with MongoDB for data storage.
- Type-safe development with TypeScript.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) (LTS version recommended)
- [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com)
- [MongoDB](https://www.mongodb.com) (local or cloud instance)

### Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/netflix-clone.git
   cd netflix-clone
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:

   Create a `.env` file in the root of the project and add the following:

   ```env
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>?retryWrites=true&w=majority
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Set up Prisma:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### File Structure

```
netflix-clone/
├── app/                # Next.js app directory
├── components/         # Reusable components
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets
├── styles/             # Global styles
├── .env                # Environment variables
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Learn More

To learn more about the tools used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
