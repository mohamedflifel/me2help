import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-8 glass-panel border-b border-white/20 z-20">
      <div className="flex items-center gap-2">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-pink-400">
          <Heart size={22} fill="currentColor" />
        </motion.div>
        <h1 className="text-xl sm:text-2xl font-serif-soft text-[#6B5B95] tracking-tight">
          me2help <span className="text-xs sm:text-sm font-sans font-light opacity-60">Ai</span>
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link to="/login" className="text-sm sm:text-base text-[#6B5B95] hover:text-[#4A4E69] font-medium transition-colors">
          Login
        </Link>
        <Link
          to="/register"
          className="px-3 py-1.5 sm:px-5 sm:py-2 bg-[#6B5B95] text-white rounded-full text-xs sm:text-sm font-medium hover:bg-[#4A4E69] transition-colors shadow-md"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;