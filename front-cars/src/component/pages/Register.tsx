import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserMutation({
        variables: {
          input: {
            users: newUser,
          },
        },
      });
      console.log('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
    }

    console.log('Registering with:', username, email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-3 border rounded-md w-full bg-cyan-100 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border rounded-md w-full bg-cyan-100 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 border rounded-md w-full bg-cyan-100 focus:outline-none focus:border-blue-500"
              required
            />
            <Link to={'/loginForm'} className="text-red-500">
              I have an account
            </Link>
          </div>
          <button
            type="submit"
            className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-400 focus:outline-none focus:bg-cyan-600 active:bg-cyan-700 relative"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
