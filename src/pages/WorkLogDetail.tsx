import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function WorkLogDetail() {
  const { slug } = useParams();
  const { logs } = useData();
  
  const sortedLogs = useMemo(() => {
    const published = logs.filter(l => l.published);
    const pinned = published.filter(l => l.pinned).slice(0, 3);
    const others = published.filter(l => !pinned.find(p => p.id === l.id));
    others.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return [...pinned, ...others];
  }, [logs]);

  const currentIndex = sortedLogs.findIndex(l => l.slug === slug);
  const log = sortedLogs[currentIndex];
  
  const nextLog = currentIndex > 0 ? sortedLogs[currentIndex - 1] : null;
  const prevLog = currentIndex < sortedLogs.length - 1 ? sortedLogs[currentIndex + 1] : null;

  if (!log) return <div className="min-h-screen flex items-center justify-center font-bold">로그를 찾을 수 없습니다.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-screen-md mx-auto px-6 py-24"
    >
      <Link to="/logs" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-black mb-12 transition-colors font-bold uppercase tracking-tight">
        <ArrowLeft size={16} /> 목록으로 돌아가기
      </Link>

      <header className="mb-16">
        <div className="flex gap-2 mb-6">
          {log.tags.map(tag => (
            <span key={tag} className="text-[8px] font-bold uppercase tracking-tighter bg-neutral-100 px-2 py-1 rounded-md text-neutral-600">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4 uppercase">
          {log.title}
        </h1>
        <div className="text-xs font-mono text-neutral-400 font-bold">
          Published on {log.date}
        </div>
      </header>

      <div className="markdown-body font-normal text-neutral-800 leading-relaxed text-base prose prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {log.content}
        </ReactMarkdown>
      </div>

      <footer className="mt-32 pt-12 border-t border-neutral-100">
        <div className="flex justify-between items-center mb-20">
          <div>
            {prevLog ? (
              <Link to={`/log/${prevLog.slug}`} className="group block">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">이전 글</span>
                <span className="text-sm font-bold group-hover:text-brand transition-colors flex items-center gap-2">
                  <ChevronLeft size={16} /> {prevLog.title}
                </span>
              </Link>
            ) : (
              <div className="opacity-20 pointer-events-none">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">이전 글</span>
                <span className="text-sm font-bold flex items-center gap-2">
                  <ChevronLeft size={16} /> 이전 글이 없습니다.
                </span>
              </div>
            )}
          </div>
          <div className="text-right">
            {nextLog ? (
              <Link to={`/log/${nextLog.slug}`} className="group block">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">다음 글</span>
                <span className="text-sm font-bold group-hover:text-brand transition-colors flex items-center gap-2 justify-end">
                  {nextLog.title} <ChevronRight size={16} />
                </span>
              </Link>
            ) : (
              <div className="opacity-20 pointer-events-none">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">다음 글</span>
                <span className="text-sm font-bold flex items-center gap-2 justify-end">
                  다음 글이 없습니다. <ChevronRight size={16} />
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="pt-20">
          <div className="h-0.5 bg-black w-full mb-8" />
          <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            <span>© 2026 HA YOU</span>
            <Link to="/admin" className="hover:text-black transition-colors">admin</Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
