import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Logs() {
  const { logs } = useData();

  return (
    <main className="max-w-screen-xl mx-auto px-6 py-24">
      <header className="mb-20">
        <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight uppercase">
          Work<br />Logs
        </h1>
        <p className="text-neutral-500 mt-6 max-w-xl font-normal leading-relaxed">
          제품을 만들며 배우고 느낀 점들을 기록합니다.
        </p>
      </header>

      <section className="space-y-0">
        {logs.filter(l => l.published).map((log, idx) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              to={`/log/${log.slug}`}
              className="flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-neutral-100 group gap-4 px-2 hover:bg-neutral-50 transition-colors rounded-xl"
            >
              <div className="flex-1">
                <span className="text-[10px] font-bold text-neutral-400 mb-2 block">{log.date}</span>
                <h3 className="text-2xl font-bold group-hover:text-brand transition-colors uppercase tracking-tight leading-none">
                  {log.title}
                </h3>
                <div className="flex gap-2 mt-4">
                  {log.tags.map(tag => (
                    <span key={tag} className="text-[8px] uppercase font-bold px-2 py-1 bg-neutral-100 rounded text-neutral-500">#{tag}</span>
                  ))}
                </div>
              </div>
              <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand" />
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
