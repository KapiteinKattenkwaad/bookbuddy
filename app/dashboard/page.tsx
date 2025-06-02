// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', status: 'want-to-read' });
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books');
      if (!res.ok) throw new Error('Failed to fetch books');
  
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setForm({ title: '', author: '', status: 'want-to-read' });
      fetchBooks();
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📚 Your Book Tracker</h1>

      <form className={styles.form} onSubmit={addBook}>
        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <select
          className={styles.select}
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="want-to-read">Want to Read</option>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
        </select>
        <button className={styles.button} type="submit">Add Book</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.bookList}>
          {books.map((book: any) => (
            <li key={book.id} className={styles.bookItem}>
              <strong>{book.title}</strong> by {book.author} — <em>{book.status}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
