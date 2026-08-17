import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Map, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md"
      >
        <div className="text-7xl font-mono font-bold text-primary/40 mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-text mb-2">
          Page Not Found
        </h1>
        <p className="text-text-muted text-sm mb-6">
          The requested path doesn't exist or is currently being updated in our curriculum.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="primary"
            size="sm"
            icon={<Home size={14} />}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Map size={14} />}
            onClick={() => navigate('/roadmap')}
          >
            Roadmap
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
