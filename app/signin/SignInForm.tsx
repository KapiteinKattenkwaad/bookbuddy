'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styles from './SignInForm.module.css';

export default function SignInForm() {
  const [email, setEmail] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn('email', { email, callbackUrl: '/' });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Sign In to BookBuddy</h2>
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Send Magic Link
      </button>
    </form>
  );
}
