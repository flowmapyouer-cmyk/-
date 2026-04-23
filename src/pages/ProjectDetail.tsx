import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects } = useData();
  const project = projects.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-screen-md mx-auto px-6 py-24"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-black mb-12 transition-colors">
        <ArrowLeft size={16} /> 홈으로 돌아가기
      </Link>

      <header className="mb-20">
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 uppercase">
          {project.title}
        </h1>
        <p className="text-lg text-neutral-500 font-normal leading-relaxed">
          {project.summary}
        </p>
      </header>

      <div className="aspect-video w-full rounded-2xl overflow-hidden mb-20 bg-neutral-100">
        <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
      </div>

      <article className="space-y-24 pb-32">
        <section>
          <h2 className="text-[8px] font-bold uppercase tracking-widest text-neutral-300 mb-6 underline underline-offset-8">01. Problem</h2>
          <p className="text-lg leading-relaxed text-neutral-800 font-normal">{project.problem}</p>
        </section>

        <section>
          <h2 className="text-[8px] font-bold uppercase tracking-widest text-neutral-300 mb-6 underline underline-offset-8">02. Hypothesis</h2>
          <p className="text-lg leading-relaxed text-neutral-800 font-normal">{project.hypothesis}</p>
        </section>

        <section>
          <h2 className="text-[8px] font-bold uppercase tracking-widest text-neutral-300 mb-6 underline underline-offset-8">03. Decision & Execution</h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-neutral-800 font-normal">{project.decision}</p>
            <p className="text-lg leading-relaxed text-neutral-800 font-normal">{project.execution}</p>
          </div>
        </section>

        <section className="p-10 bg-neutral-50 rounded-3xl">
          <h2 className="text-[8px] font-bold uppercase tracking-widest text-neutral-300 mb-6 underline underline-offset-8">04. Result</h2>
          <p className="text-2xl font-display font-bold text-black leading-tight mb-12">{project.result}</p>
          
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {project.images.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-[8px] font-bold uppercase tracking-widest text-neutral-300 mb-6 underline underline-offset-8">05. Insight</h2>
          <p className="text-lg italic leading-relaxed text-neutral-500 bg-white border-l-4 border-point pl-8 py-4 font-normal">
            "{project.insight}"
          </p>
        </section>
      </article>

      <footer className="pt-24 border-t border-neutral-100 flex justify-between items-center">
        <Link to="/" className="text-sm font-medium hover:underline">← 이전 프로젝트</Link>
        <Link to="/" className="text-sm font-medium hover:underline">다음 프로젝트 →</Link>
      </footer>
    </motion.div>
  );
}
