import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Work() {
  const { projects } = useData();

  return (
    <main className="max-w-screen-xl mx-auto px-6 py-24">
      <header className="mb-20">
        <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight uppercase">
          Selected<br />Works
        </h1>
        <p className="text-neutral-500 mt-6 max-w-xl font-normal leading-relaxed">
          사용자의 맥락을 읽고 구조화된 해결책을 제시한 주요 프로젝트 목록입니다.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {projects.filter(p => p.published).map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            <Link to={`/project/${project.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-neutral-100 mb-6 rounded-md relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/20 transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:underline uppercase tracking-tight">{project.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-normal">{project.summary}</p>
            </Link>
          </motion.div>
        ))}
      </section>

      <footer className="mt-40">
        <div className="h-0.5 bg-black w-full mb-8" />
        <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          <span>© 2026 HA YOU</span>
          <Link to="/admin" className="hover:text-black transition-colors">admin</Link>
        </div>
      </footer>
    </main>
  );
}
