import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useMemo } from 'react';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects } = useData();
  
  const publishedProjects = useMemo(() => {
    return projects.filter(p => p.published);
  }, [projects]);

  const currentIndex = publishedProjects.findIndex(p => p.slug === slug);
  const project = publishedProjects[currentIndex];

  const prevProject = currentIndex > 0 ? publishedProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < publishedProjects.length - 1 ? publishedProjects[currentIndex + 1] : null;

  if (!project) return <div className="min-h-screen flex items-center justify-center font-bold">프로젝트를 찾을 수 없습니다.</div>;

  const SectionImages = ({ images }: { images: string[] }) => {
    if (!images || !Array.isArray(images) || images.length === 0) return null;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {images.map((img, idx) => (
          <div key={idx} className="w-full rounded-md overflow-hidden border border-neutral-100 bg-white">
            <img src={img} alt="" className="w-full h-auto object-contain" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-screen-md mx-auto px-6 py-24"
    >
      <Link to="/work" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-black mb-12 transition-colors font-bold uppercase tracking-tight">
        <ArrowLeft size={16} /> 전체 프로젝트로 돌아가기
      </Link>

      <header className="mb-20">
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 uppercase">
          {project.title}
        </h1>
        <p className="text-lg text-neutral-500 font-normal leading-relaxed">
          {project.summary}
        </p>
      </header>

      <div className="w-full rounded-md overflow-hidden mb-20 bg-neutral-100">
        <img src={project.thumbnail} alt={project.title} className="w-full h-auto object-contain" />
      </div>

      <article className="space-y-24 pb-32">
        <section>
          <h2 className="text-xl font-bold uppercase tracking-tight text-black mb-6">01. Problem</h2>
          <SectionImages images={project.problem} />
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-tight text-black mb-6">02. Hypothesis</h2>
          <SectionImages images={project.hypothesis} />
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-tight text-black mb-6">03. Decision & Execution</h2>
          <SectionImages images={project.decisionExecution} />
        </section>

        <section className="p-10 bg-neutral-50 rounded-md text-black">
          <h2 className="text-xl font-bold uppercase tracking-tight text-black mb-6">04. Result</h2>
          <SectionImages images={project.result} />
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-tight text-black mb-6">05. Insight</h2>
          <SectionImages images={project.insight} />
        </section>
      </article>

      <footer className="pt-24 border-t border-neutral-100">
        <div className="flex justify-between items-center mb-20">
          <div>
            {prevProject ? (
              <Link to={`/project/${prevProject.slug}`} className="group block">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">이전 프로젝트</span>
                <span className="text-sm font-bold group-hover:text-brand transition-colors flex items-center gap-1">
                  <ChevronLeft size={16} /> {prevProject.title}
                </span>
              </Link>
            ) : (
              <div className="opacity-20 pointer-events-none">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">이전 프로젝트</span>
                <span className="text-sm font-bold flex items-center gap-1">
                  <ChevronLeft size={16} /> 첫 번째 프로젝트입니다.
                </span>
              </div>
            )}
          </div>
          <div className="text-right">
            {nextProject ? (
              <Link to={`/project/${nextProject.slug}`} className="group block">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">다음 프로젝트</span>
                <span className="text-sm font-bold group-hover:text-brand transition-colors flex items-center gap-1 justify-end">
                  {nextProject.title} <ChevronRight size={16} />
                </span>
              </Link>
            ) : (
              <div className="opacity-20 pointer-events-none">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">다음 프로젝트</span>
                <span className="text-sm font-bold flex items-center gap-1 justify-end">
                  마지막 프로젝트입니다. <ChevronRight size={16} />
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
