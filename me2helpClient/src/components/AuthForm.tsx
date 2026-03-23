import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { AuthFormData } from '../types';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: AuthFormData) => void;
  isLoading?: boolean;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    fullname: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-5 w-full"
    >
      {mode === 'register' && (
        <div>
          <label className="block text-sm font-medium text-[#6B5B95] mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full px-4 py-3 rounded-2xl bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#6B5B95]/40 text-[#4A4E69] placeholder:text-[#9A8C98]"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#6B5B95] mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 rounded-2xl bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#6B5B95]/40 text-[#4A4E69] placeholder:text-[#9A8C98]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6B5B95] mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 rounded-2xl bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#6B5B95]/40 text-[#4A4E69] placeholder:text-[#9A8C98] pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8C98] hover:text-[#6B5B95]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-[#6B5B95] text-white rounded-2xl font-medium hover:bg-[#4A4E69] transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isLoading ? <Loader size={18} className="animate-spin" /> : null}
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </button>
    </motion.form>
  );
};

export default AuthForm;