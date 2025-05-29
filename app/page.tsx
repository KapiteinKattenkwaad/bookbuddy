// app/page.tsx
import { getServerSession } from 'next-auth';
import { authConfig } from '../auth';

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  return (
    <main>
      <h1>Hello {session?.user?.email || 'guest'}!</h1>
    </main>
  );
}
