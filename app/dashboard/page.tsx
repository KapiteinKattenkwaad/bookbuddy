
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./Dashboard.module.css";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  //todo: uncomment this
//   if (!session?.user) {
//     redirect("/signin");
//   }

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>📚 Welcome, {session.user.email}</h1>
      <p>This is your book dashboard.</p>

      <Link href="/api/auth/signout">
        <button className={styles.button}>Sign Out</button>
      </Link>

      <hr />

      <h2>Your Books</h2>
      <p>[We’ll list them here next]</p>
    </main>
  );
}
