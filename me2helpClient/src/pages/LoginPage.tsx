import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import { AuthFormData } from '../types';
import { loginApi } from '../api/user.api';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (data: AuthFormData) => {
    setIsLoading(true);
    setError('');
    try {
      const user = await loginApi({ email: data.email, password: data.password });
      login(user);
      navigate('/chat');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-16 sm:py-4">
      <Link
        to="/"
        className="fixed top-6 left-6 flex items-center gap-2 text-[#6B5B95] hover:text-[#4A4E69] transition-colors text-sm font-medium"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel rounded-3xl p-5 sm:p-8 shadow-xl"
      >
        <div className="text-center mb-8">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="text-pink-400 flex justify-center mb-3">
            <Heart size={36} fill="currentColor" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-serif-soft text-[#6B5B95]">Welcome Back</h2>
          <p className="text-sm text-[#4A4E69]/60 mt-1">Your safe space is waiting for you</p>
        </div>

        <AuthForm mode="login" onSubmit={handleLogin} isLoading={isLoading} error={error} />

        <p className="text-center text-sm text-[#4A4E69]/60 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#6B5B95] font-medium hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;