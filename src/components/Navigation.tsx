import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl tracking-tighter">
          유하영
        </Link>
        <div className="flex gap-8 items-center text-sm font-bold tracking-tight">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <Link to="/work" className="hover:text-brand transition-colors">Work</Link>
          <Link to="/logs" className="hover:text-brand transition-colors">Log</Link>
          <Link to="/admin" className="px-3 py-1 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
