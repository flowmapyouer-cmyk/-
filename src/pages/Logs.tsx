import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pin } from 'lucide-react';
import { useData } from '../context/DataContext';

const ITEMS_PER_PAGE = 5;

export default function Logs() {
  const { logs } = useData();
  const [currentPage, setCurrentPage] = useState(1);

  const sortedLogs = useMemo(() => {
    const published = logs.filter(l => l.published);
    
    // Split into pinned and others
    const pinned = published.filter(l => l.pinned).slice(0, 3); // Max 3 pinned
    const others = published.filter(l => !pinned.find(p => p.id === l.id));
    
    // Sort others by date descending
    others.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return [...pinned, ...others];
  }, [logs]);

  const totalPages = Math.ceil(sortedLogs.length / ITEMS_PER_PAGE);
  const currentLogs = sortedLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main className="max-w-screen-xl mx-auto px-6 py-24">
      <header className="mb-20">
        <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight uppercase">
          Work<br />Labs
        </h1>
        <p className="text-neutral-500 mt-6 max-w-xl font-normal leading-relaxed text-sm">
          제품을 만들며 배우고 느낀 점들을 기록합니다.
        </p>
      </header>

      <section className="space-y-0 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentLogs.map((log) => (
              <div key={log.id} className="border-b border-neutral-100 last:border-0">
                <Link
                  to={`/log/${log.slug}`}
                  className="flex flex-col md:flex-row md:items-center py-8 group hover:bg-neutral-50 transition-all rounded-md px-4 -mx-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-1">
                    <div className="flex items-center gap-2">
                       {log.pinned && <Pin size={12} className="text-brand fill-brand" />}
                       <h3 className="text-xl font-bold group-hover:text-brand transition-colors tracking-tight uppercase">
                        {log.title}
                      </h3>
                    </div>
                    
                    <div className="hidden md:block w-1 h-1 bg-neutral-200 rounded-full" />
                    
                    <div className="flex gap-2 items-center flex-wrap">
                      {log.tags.map(tag => (
                        <span key={tag} className="text-[9px] uppercase font-bold text-neutral-400">#{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 text-xs font-bold text-neutral-400 font-mono">
                    {log.date}
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-20 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-bold transition-all ${
                  currentPage === num 
                    ? 'bg-black text-white' 
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-black shadow-sm'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </nav>
      )}

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
