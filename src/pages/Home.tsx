import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../context/DataContext';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const { projects, logs, contact } = useData();

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-screen-xl mx-auto px-6 pb-24">
      {/* Hero Section */}
      <section className="-mx-6 px-6 py-24 md:py-40 bg-black text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="text-[10px] font-bold text-white uppercase tracking-widest mb-6 block">
            Product Manager
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-bold leading-[0.95] tracking-tight mb-12 text-white">
            사용자의 <span className="text-point">맥락</span>을 읽고,<br />
            실행 가능한 구조로 바꿉니다.
          </h1>
          <div className="flex gap-6">
            <a href="#work" className="bg-brand text-white px-[29px] py-[13px] rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
              프로젝트 보기
            </a>
            <a href="#contact" className="border border-white/20 px-[29px] py-[13px] rounded-full font-bold hover:bg-white/10 transition-colors">
              연락하기
            </a>
          </div>
        </motion.div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-20 border-t border-neutral-100">
        <h2 className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 mb-12">Selected Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.filter(p => p.published).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Link to={`/project/${project.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100 mb-6 rounded-2xl">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:underline">{project.title}</h3>
                <p className="text-neutral-500 leading-relaxed font-normal">{project.summary}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work Log */}
      <section className="py-20 border-t border-neutral-100">
        <h2 className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 mb-12">Work Log</h2>
        <div className="space-y-0">
          {logs.filter(l => l.published).map((log) => (
            <Link
              key={log.id}
              to={`/log/${log.slug}`}
              className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-neutral-100 group gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold group-hover:text-brand transition-colors uppercase tracking-tight">
                  {log.title}
                </h3>
                <div className="flex gap-2 mt-2">
                  {log.tags.map(tag => (
                    <span key={tag} className="text-[7px] uppercase font-bold text-neutral-400">#{tag}</span>
                  ))}
                </div>
              </div>
              <div className="text-xs font-mono text-neutral-400 flex items-center gap-4">
                {log.date}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 border-t border-neutral-100 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-display font-bold mb-8 uppercase tracking-tight">함께 고민하고 성장하고 싶습니다.</h2>
          <button
            onClick={copyEmail}
            className="group relative bg-brand text-white px-[34px] py-[17px] rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
          >
            {contact.ctaText}
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="opacity-50 group-hover:opacity-100" />}
          </button>
          <div className="flex justify-center gap-8 mt-12 text-xs text-neutral-400">
            {contact.links.map(link => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline underline-offset-4">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>

  );
}
