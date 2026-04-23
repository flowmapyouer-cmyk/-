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
          <Link to="/work" className="hover:text-brand transition-colors">프로젝트</Link>
          <Link to="/logs" className="hover:text-brand transition-colors">로그</Link>
        </div>
      </div>
    </nav>
  );
}
