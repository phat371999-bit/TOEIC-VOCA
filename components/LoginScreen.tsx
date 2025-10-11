import React, { useState } from 'react';
import { LogoIcon, LoadingIcon } from './icons';
import { User } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
  users: User[];
  isLoggingIn?: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, users, isLoggingIn = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;
    
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      onLoginSuccess(user);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 space-y-8">
        <div className="text-center">
            <div className="flex items-center justify-center mb-4">
                <LogoIcon className="h-12 w-12 text-blue-600" />
                <h1 className="ml-3 text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">TOEIC Zone</h1>
            </div>
            <h2 className="text-xl text-slate-600 dark:text-slate-300">Sign in to your account</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-sm font-bold text-slate-600 dark:text-slate-300 block">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-2 p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-black dark:text-white disabled:bg-slate-200 dark:disabled:bg-slate-600"
              placeholder="Enter your username"
              autoComplete="username"
              disabled={isLoggingIn}
            />
          </div>
          <div>
            <label htmlFor="password"  className="text-sm font-bold text-slate-600 dark:text-slate-300 block">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-black dark:text-white disabled:bg-slate-200 dark:disabled:bg-slate-600"
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoggingIn}
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold text-lg transition-colors disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-wait"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center">
                    <LoadingIcon className="h-6 w-6 animate-spin mr-3" />
                    <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
