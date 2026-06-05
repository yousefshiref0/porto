import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F5EC] flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 404 */}
        <div className="text-[12rem] font-black leading-none mb-6 text-primary [-webkit-text-stroke:4px_#111111]">
          404
        </div>

        {/* Message */}
        <div
          className="bg-white border-8 border-primary p-8 mb-8"
          style={{ boxShadow: '16px 16px 0px 0px #111111' }}
        >
          <h1 className="text-4xl font-black mb-4">PAGE NOT FOUND</h1>
          <p className="text-xl text-gray-700 mb-6">
            Looks like you've wandered into uncharted territory. This page doesn't exist!
          </p>

          {/* Hand-drawn annotation */}
          <div className="handwritten text-2xl text-[#4F46E5] mb-6">
            Let's get you back on track!
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/')}
          >
            <Home size={20} className="inline mr-2" />
            Go Home
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-4">
          <div className="w-16 h-16 border-4 border-[#FF6B35] rotate-12"></div>
          <div className="w-16 h-16 bg-[#FFD93D] border-4 border-primary -rotate-6"></div>
          <div className="w-16 h-16 border-4 border-[#4F46E5] rounded-full rotate-12"></div>
        </div>
      </motion.div>
    </div>
  );
};
