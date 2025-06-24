'use client'
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;

  const getUser = async () => {
    try {
      const res = await fetch(`${domain}/api/me`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || res.statusText);
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    }
  };


  useEffect(() => {
    
    getUser();
  }, []);
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading profile…</p>;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>Token issued at: {new Date(user.iat * 1000).toLocaleString()}</p>
    </div>
  );
}
