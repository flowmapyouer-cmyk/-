import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function WorkLogDetail() {
  const { slug } = useParams();
  const { logs } = useData();
  const log = logs.find(l => l.slug === slug);

  if (!log) return <div>Log not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-screen-md mx-auto px-6 py-24"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-black mb-12 transition-colors">
        <ArrowLeft size={16} /> 홈으로 돌아가기
      </Link>

      <header className="mb-16">
        <div className="flex gap-2 mb-6">
          {log.tags.map(tag => (
            <span key={tag} className="text-[8px] font-bold uppercase tracking-tighter bg-neutral-100 px-2 py-1 rounded text-neutral-600">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 uppercase">
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
        <div className="flex justify-between items-center text-sm">
          <Link to="/" className="font-medium hover:underline">PREVIOUS POST</Link>
          <Link to="/" className="font-medium hover:underline">NEXT POST</Link>
        </div>
      </footer>
    </motion.div>
  );
}
