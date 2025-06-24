'use client';
import React from 'react';
import Cookies from 'js-cookie';

export default function LogoutButton() {
  const handleLogout = () => {
    Cookies.remove('token');
    // Optionally redirect to login or homepage
    window.location.href = '/login';
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
