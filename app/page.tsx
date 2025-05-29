// app/page.tsx
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth';
import Link from 'next/link';

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  if (!session) {
    return (
      <main>
        <p>You must be signed in to view this page.</p>
        <Link href="/signin">Go to Sign In</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome, {session.user?.email}!</h1>
    </main>
  );
}
