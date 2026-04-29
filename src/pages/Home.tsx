import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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

  const displayLogs = (() => {
    const published = logs.filter(l => l.published);
    const pinned = published.filter(l => l.pinned).slice(0, 3);
    const others = published.filter(l => !pinned.find(p => p.id === l.id));
    others.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return [...pinned, ...others].slice(0, 5);
  })();

  return (
    <main className="max-w-screen-xl mx-auto px-6 pb-24">
      {/* Hero Section */}
      <section className="-mx-6 px-6 py-28 md:py-40 bg-black text-white overflow-hidden flex flex-col justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto w-full"
        >
          <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.2em] mb-10 block opacity-60">
            Product Manager
          </span>
          <h1 className="text-[28px] md:text-[36px] font-display font-bold leading-[1.3] tracking-tight mb-10 text-white">
            사용자도 인식하지 못한 불편을 찾아내고,<br />
            <span className="text-point">검증</span>으로 바꾸는 PM을 지향합니다.
          </h1>
          <p className="text-sm md:text-[18px] text-white/60 font-normal leading-relaxed mb-16 max-w-2xl">
            '왜 이탈했는가'보다 "사용자가 무엇을 예측하지 못했는가"를 먼저 묻습니다.<br />
            표면적인 불만 뒤에 숨은 구조적 원인을 집요하게 파고들고,<br />
            그 결과가 비즈니스 임팩트로 이어지는 구조를 만드는 것에 의미를 둡니다.
          </p>
          <div className="flex gap-6">
            <a href="#work" className="bg-point text-black px-[29px] py-[13px] rounded-md font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-point/10">
              프로젝트 보기
            </a>
            <div className="relative inline-block">
              <button 
                onClick={copyEmail}
                className="border-2 border-point text-point px-[29px] py-[13px] rounded-md font-bold hover:bg-point/10 transition-colors"
              >
                연락하기
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: '-50%' }}
                    animate={{ opacity: 1, y: -10, x: '-50%' }}
                    exit={{ opacity: 0, y: 10, x: '-50%' }}
                    className="absolute left-1/2 -top-12 bg-neutral-800 text-white text-xs py-2 px-4 rounded-md shadow-2xl whitespace-nowrap z-50 font-medium"
                  >
                    메일 주소가 복사되었습니다
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-20 border-t border-neutral-100">
        <h2 className="text-xl font-bold uppercase tracking-tight text-black mb-12">Selected Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {projects.filter(p => p.published).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Link to={`/project/${project.slug}`} className="group block">
                <div className="overflow-hidden bg-neutral-100 mb-6 rounded-md">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:underline">{project.title}</h3>
                <p className="text-neutral-500 leading-relaxed font-normal">{project.summary}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work Lab */}
      <section className="py-20 border-t border-neutral-100">
        <h2 className="text-xl font-bold uppercase tracking-tight text-black mb-12">Work Lab</h2>
        <div className="space-y-0">
          {displayLogs.map((log) => (
            <Link
              key={log.id}
              to={`/log/${log.slug}`}
              className="flex flex-col md:flex-row md:items-center py-6 border-b border-neutral-100 group gap-4 px-2 -mx-2 hover:bg-neutral-50 transition-all rounded-md"
            >
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h3 className="text-lg font-bold group-hover:text-brand transition-colors uppercase tracking-tight">
                  {log.title}
                </h3>
                <div className="hidden md:block w-1 h-1 bg-neutral-200 rounded-full" />
                <div className="flex gap-2">
                  {log.tags.map(tag => (
                    <span key={tag} className="text-[7px] uppercase font-bold text-neutral-400">#{tag}</span>
                  ))}
                </div>
              </div>
              <div className="text-xs font-mono text-neutral-400 flex items-center gap-4 font-bold">
                {log.date}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          ))}
          <div className="mt-12 text-center">
            <Link to="/logs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
              View All Labs <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 border-t border-neutral-100 text-center relative">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-display font-bold mb-8 uppercase tracking-tight">함께 고민하고 성장하고 싶습니다.</h2>
          <div className="relative inline-block">
            <button
              onClick={copyEmail}
              className="bg-brand text-white px-[34px] py-[14px] rounded-md text-lg font-bold transition-all hover:scale-105 active:scale-95 mx-auto flex items-center justify-center shadow-xl"
            >
              연락하기: {contact.email}
            </button>
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: '-50%' }}
                  animate={{ opacity: 1, y: -10, x: '-50%' }}
                  exit={{ opacity: 0, y: 10, x: '-50%' }}
                  className="absolute left-1/2 -top-12 bg-neutral-800 text-white text-xs py-2 px-4 rounded-md shadow-2xl whitespace-nowrap z-50 font-medium"
                >
                  메일 주소가 복사되었습니다
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-20">
            <div className="h-0.5 bg-black w-full mb-8" />
            <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              <span>© 2026 HA YOU</span>
              <Link to="/admin" className="hover:text-black transition-colors">admin</Link>
            </div>
          </div>
        </div>
      </section>
    </main>

  );
}
