
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const API = 'http://localhost:8080';

function App() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const endpoint =
        mode === 'login' ? '/api/auth/login' : '/api/auth/register';

      const response = await fetch(API + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Request failed. Check backend API.');
      }

      if (mode === 'login') {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        setMessage('Login successful!');
      } else {
        setMessage('Registration successful! You can now log in.');
        setMode('login');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <div className="logo">SP</div>
        <h1>Secure Auth Portal</h1>
        <p className="subtitle">
          {mode === 'login'
            ? 'Welcome back! Sign in to continue.'
            : 'Create your account to get started.'}
        </p>

        <div className="tabs">
          <button
            type="button"
            className={mode === 'login' ? 'active' : 'secondary'}
            onClick={() => { setMode('login'); setMessage(''); }}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : 'secondary'}
            onClick={() => { setMode('register'); setMessage(''); }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="footer">Exp-8 · Secure Auth Portal</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
