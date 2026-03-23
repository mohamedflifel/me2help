import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, Brain } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-pink-400 flex justify-center mb-6"
          >
            <Heart size={52} fill="currentColor" />
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-soft text-[#6B5B95] mb-6 leading-tight">
            Your Safe Space to<br />
            <span className="text-pink-400">Be Heard</span>
          </h1>

          <p className="text-base sm:text-lg text-[#4A4E69]/70 mb-8 sm:mb-10 leading-relaxed px-2">
            me2help Ai is your compassionate digital companion — here to listen, reflect, and guide you through every feeling, any time of day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-[#6B5B95] text-white rounded-full text-lg font-medium hover:bg-[#4A4E69] transition-colors shadow-lg"
            >
              Start Your Journey
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white/60 text-[#6B5B95] rounded-full text-lg font-medium hover:bg-white/80 transition-colors border border-[#6B5B95]/20"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Brain size={28} />, title: 'AI-Powered Empathy', desc: 'Intelligent responses that truly understand your emotions.' },
            { icon: <ShieldCheck size={28} />, title: 'Private & Safe', desc: 'Your conversations are yours alone. Always confidential.' },
            { icon: <Sparkles size={28} />, title: 'Monthly Insights', desc: 'Track your emotional growth over time with summaries.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="glass-panel p-6 rounded-3xl text-center"
            >
              <div className="text-[#6B5B95] flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[#6B5B95] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#4A4E69]/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;