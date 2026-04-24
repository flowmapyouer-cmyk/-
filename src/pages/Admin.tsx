import { useState, FormEvent, ChangeEvent } from 'react';
import { Project, WorkLog, ContactInfo } from '../types';
import { Plus, Trash2, Edit3, Save, X, Eye, EyeOff, Upload, Image as ImageIcon, Pin, PinOff } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Admin() {
  const { projects, logs, contact, updateProjects, updateLogs, updateContact } = useData();
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'logs' | 'contact'>('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingLog, setEditingLog] = useState<WorkLog | null>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === '6913') {
      setIsAuthorized(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, isThumbnail: boolean, section?: keyof Project) => {
    const files = e.target.files;
    if (!files || !editingProject) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isThumbnail) {
          setEditingProject(prev => prev ? ({ ...prev, thumbnail: base64String }) : null);
        } else if (section) {
          setEditingProject(prev => {
            if (!prev) return null;
            const currentImages = Array.isArray(prev[section]) ? (prev[section] as string[]) : [];
            if (currentImages.length >= 2) return prev;
            return {
              ...prev,
              [section]: [...currentImages, base64String]
            };
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSectionImage = (section: keyof Project, index: number) => {
    if (!editingProject) return;
    const currentImages = Array.isArray(editingProject[section]) ? (editingProject[section] as string[]) : [];
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    setEditingProject({ ...editingProject, [section]: newImages });
  };

  const startEditingProject = (p: Project) => {
    // Normalize data: convert old string fields to arrays if necessary
    const normalized: Project = {
      ...p,
      problem: Array.isArray(p.problem) ? p.problem : [],
      hypothesis: Array.isArray(p.hypothesis) ? p.hypothesis : [],
      decisionExecution: Array.isArray(p.decisionExecution) ? p.decisionExecution : [],
      result: Array.isArray(p.result) ? p.result : [],
      insight: Array.isArray(p.insight) ? p.insight : [],
      externalLinks: Array.isArray(p.externalLinks) ? p.externalLinks : [],
    };
    setEditingProject(normalized);
  };

  const saveProject = () => {
    if (!editingProject) return;
    if (editingProject.id.startsWith('new-')) {
      const newProject = { ...editingProject, id: Math.random().toString(36).substr(2, 9) };
      updateProjects([newProject, ...projects]);
    } else {
      updateProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    }
    setEditingProject(null);
  };

  const createNewProject = () => {
    const newProject: Project = {
      id: `new-${Date.now()}`,
      slug: '',
      title: '',
      summary: '',
      thumbnail: '',
      problem: [],
      hypothesis: [],
      decisionExecution: [],
      result: [],
      insight: [],
      externalLinks: [{ name: '', url: '' }, { name: '', url: '' }],
      published: true
    };
    setEditingProject(newProject);
  };

  const deleteProject = (id: string) => {
    if (window.confirm('프로젝트를 삭제하시겠습니까?')) {
      updateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleLogFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !editingLog) return;
    
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Inject image markdown into content
        const imageTag = `\n\n![Image](${base64String})\n\n`;
        setEditingLog(prev => prev ? ({
          ...prev,
          content: prev.content + imageTag
        }) : null);
      };
      reader.readAsDataURL(file);
    });
  };

  const saveLog = () => {
    if (!editingLog) return;
    if (editingLog.id.startsWith('new-')) {
      const newLog = { ...editingLog, id: Math.random().toString(36).substr(2, 9) };
      updateLogs([newLog, ...logs]);
    } else {
      updateLogs(logs.map(l => l.id === editingLog.id ? editingLog : l));
    }
    setEditingLog(null);
  };

  const deleteLog = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      updateLogs(logs.filter(l => l.id !== id));
    }
  };

  const createNewLog = () => {
    const newLog: WorkLog = {
      id: `new-${Date.now()}`,
      slug: '',
      title: '',
      date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
      tags: [],
      content: '',
      excerpt: '',
      published: true
    };
    setEditingLog(newLog);
  };

  const toggleLogPin = (id: string) => {
    const log = logs.find(l => l.id === id);
    if (!log) return;
    
    if (!log.pinned && logs.filter(l => l.pinned).length >= 3) {
      alert('고정 항목은 최대 3개까지만 설정할 수 있습니다.');
      return;
    }
    
    updateLogs(logs.map(l => l.id === id ? { ...l, pinned: !l.pinned } : l));
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-md border border-neutral-200 shadow-sm w-full max-w-sm">
          <h1 className="text-xl font-bold mb-6 text-center uppercase tracking-tight">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-neutral-200 rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-brand font-normal"
          />
          <button type="submit" className="w-full bg-brand text-white py-[9px] rounded-md font-bold hover:scale-[1.02] transition-transform">
            LOGIN
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-6 py-12">
      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-md w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-neutral-100 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold uppercase tracking-tight">Edit Project</h2>
              <button onClick={() => setEditingProject(null)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">Project Title</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand font-normal"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">Slug</label>
                  <input
                    type="text"
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({...editingProject, slug: e.target.value})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand font-normal"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">Summary</label>
                <textarea
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({...editingProject, summary: e.target.value})}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand font-normal h-24"
                />
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase mb-4 block tracking-wider">Thumbnail Image</label>
                <div className="flex items-start gap-6">
                  <div className="w-40 rounded-md overflow-hidden bg-neutral-100 border border-neutral-200 shadow-inner">
                    {editingProject.thumbnail ? (
                      <img src={editingProject.thumbnail} className="w-full h-auto object-contain" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300 py-10">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer bg-neutral-100 px-6 py-3 rounded-md font-bold text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2">
                    <Upload size={16} /> 썸네일 업로드
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, true)} />
                  </label>
                </div>
              </div>

              {/* External Links */}
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">External Links (e.g., Video, Prototype, Case Study)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[0, 1].map((idx) => (
                    <div key={idx} className="space-y-4 p-4 bg-neutral-50 rounded-md border border-neutral-100">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-neutral-400">LINK {idx + 1}</span>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Link Name (예: 시연 비디오, Figma 프로토타입)"
                          value={editingProject.externalLinks?.[idx]?.name || ''}
                          onChange={(e) => {
                            const newLinks = [...(editingProject.externalLinks || [{ name: '', url: '' }, { name: '', url: '' }])];
                            if (!newLinks[idx]) newLinks[idx] = { name: '', url: '' };
                            newLinks[idx].name = e.target.value;
                            setEditingProject({...editingProject, externalLinks: newLinks});
                          }}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand font-normal text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Link URL (https://...)"
                          value={editingProject.externalLinks?.[idx]?.url || ''}
                          onChange={(e) => {
                            const newLinks = [...(editingProject.externalLinks || [{ name: '', url: '' }, { name: '', url: '' }])];
                            if (!newLinks[idx]) newLinks[idx] = { name: '', url: '' };
                            newLinks[idx].url = e.target.value;
                            setEditingProject({...editingProject, externalLinks: newLinks});
                          }}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand font-normal text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail Sections (Images only) */}
              <div className="space-y-10 pt-4">
                {([
                  { key: 'problem', label: '01. Problem' },
                  { key: 'hypothesis', label: '02. Hypothesis' },
                  { key: 'decisionExecution', label: '03. Decision & Execution' },
                  { key: 'result', label: '04. Result' },
                  { key: 'insight', label: '05. Insight' },
                ] as const).map((section) => (
                  <div key={section.key} className="border-t border-neutral-100 pt-8">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase mb-4 block tracking-wider">{section.label}</label>
                    <div className="flex flex-col gap-4">
                      {Array.isArray(editingProject[section.key]) && (editingProject[section.key] as string[]).map((img, idx) => (
                        <div key={idx} className="relative rounded-md overflow-hidden group border border-neutral-200 bg-neutral-50 shadow-sm transition-all">
                          <img src={img} className="w-full h-auto object-contain" />
                          <button 
                            onClick={() => removeSectionImage(section.key, idx)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                      {(Array.isArray(editingProject[section.key]) ? (editingProject[section.key] as string[]) : []).length < 2 && (
                        <label className="cursor-pointer rounded-md border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 hover:border-brand hover:text-brand transition-all p-8 h-32 bg-neutral-50/50">
                          <Plus size={20} />
                          <span className="text-[10px] font-bold mt-2 text-center leading-tight uppercase tracking-wider">이미지 추가 (최대 2장)</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            multiple 
                            onChange={(e) => handleFileUpload(e, false, section.key)} 
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-8">
                <button 
                  onClick={() => setEditingProject(null)}
                  className="px-8 py-3 rounded-md font-bold bg-neutral-100 hover:bg-neutral-200 transition-colors"
                >
                  취소
                </button>
                <button 
                  onClick={saveProject}
                  className="px-10 py-3 rounded-md font-bold bg-brand text-white hover:scale-[1.02] transition-transform shadow-lg shadow-brand/20"
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Edit Modal */}
      {editingLog && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-md w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-neutral-100 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold uppercase tracking-tight">Edit Work Log</h2>
              <button onClick={() => setEditingLog(null)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">Log Title</label>
                  <input
                    type="text"
                    value={editingLog.title}
                    onChange={(e) => setEditingLog({...editingLog, title: e.target.value})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">Slug</label>
                  <input
                    type="text"
                    value={editingLog.slug}
                    onChange={(e) => setEditingLog({...editingLog, slug: e.target.value})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">Date (YYYY.MM.DD)</label>
                  <input
                    type="text"
                    value={editingLog.date}
                    onChange={(e) => setEditingLog({...editingLog, date: e.target.value})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={editingLog.tags.join(', ')}
                    onChange={(e) => setEditingLog({...editingLog, tags: e.target.value.split(',').map(t => t.trim())})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 py-4 bg-neutral-50 px-6 rounded-md border border-neutral-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${editingLog.pinned ? 'bg-brand' : 'bg-neutral-200'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editingLog.pinned ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={editingLog.pinned || false}
                    onChange={(e) => {
                      if (e.target.checked && logs.filter(l => l.pinned && l.id !== editingLog.id).length >= 3) {
                        alert('고정 항목은 최대 3개까지만 설정할 수 있습니다.');
                        return;
                      }
                      setEditingLog({...editingLog, pinned: e.target.checked});
                    }}
                  />
                  <span className="text-sm font-bold text-neutral-700">이 로그를 상단에 고정하기 (최대 3개)</span>
                </label>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Content (Markdown)</label>
                  <label className="cursor-pointer flex items-center gap-1.5 text-[10px] font-bold text-brand hover:opacity-70 transition-opacity">
                    <Upload size={12} /> 이미지 삽입
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogFileUpload} />
                  </label>
                </div>
                <textarea
                  value={editingLog.content}
                  onChange={(e) => setEditingLog({...editingLog, content: e.target.value})}
                  placeholder="# 제목\n\n내용을 입력하세요..."
                  className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand font-mono text-sm h-64"
                />
                <div className="mt-2 p-4 bg-neutral-50 rounded-md border border-neutral-100">
                  <h4 className="text-[9px] font-bold text-neutral-400 uppercase mb-2">Markdown Tips</h4>
                  <div className="grid grid-cols-2 gap-4 text-[11px] text-neutral-500 font-normal">
                    <div>
                      <p># Large Title</p>
                      <p>## Medium Title</p>
                      <p>**Bold Text**</p>
                    </div>
                    <div>
                      <p>&lt;span style="color:red"&gt;Colored Text&lt;/span&gt;</p>
                      <p>- Bullet points</p>
                      <p>1. Numbered list</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-8">
                <button 
                  onClick={() => setEditingLog(null)}
                  className="px-8 py-3 rounded-md font-bold bg-neutral-100 hover:bg-neutral-200 transition-colors"
                >
                  취소
                </button>
                <button 
                  onClick={saveLog}
                  className="px-10 py-3 rounded-md font-bold bg-brand text-white hover:scale-[1.02] transition-transform shadow-lg shadow-brand/20"
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 uppercase">Brand Admin</h1>
          <p className="text-xs text-neutral-500 font-normal">개인 브랜드 제품 관리자 패널</p>
        </div>
        <div className="flex gap-2">
          {['projects', 'logs', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-[13px] py-[5px] rounded-md text-xs font-bold transition-colors ${
                activeTab === tab ? 'bg-brand text-white' : 'bg-neutral-100 hover:bg-neutral-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <div className="bg-white border border-neutral-200 rounded-md overflow-hidden shadow-sm">
        {activeTab === 'projects' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold">Selected Works</h2>
              <button 
                onClick={createNewProject}
                className="flex items-center gap-2 bg-brand text-white px-[10px] py-[4px] rounded-md text-xs font-bold hover:scale-105 transition-transform"
              >
                <Plus size={14} /> 프로젝트 추가
              </button>
            </div>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 border border-neutral-100 rounded-md hover:bg-neutral-50 group transition-all">
                  <div className="flex items-center gap-4">
                    <img src={p.thumbnail} alt="" className="w-14 h-10 object-contain rounded-md bg-neutral-200" />
                    <div>
                      <h3 className="font-bold text-sm tracking-tight">{p.title}</h3>
                      <span className="text-[10px] text-neutral-400 font-bold">/{p.slug}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => startEditingProject(p)}
                      className="p-1.5 hover:bg-neutral-200 rounded-md text-neutral-600 transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      onClick={() => updateProjects(projects.map(item => item.id === p.id ? { ...item, published: !item.published } : item))}
                      className="p-1.5 hover:bg-neutral-200 rounded-md text-neutral-600 transition-colors"
                    >
                      {p.published ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button 
                      onClick={() => deleteProject(p.id)}
                      className="p-1.5 hover:bg-red-50 rounded-md text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold">Work Logs</h2>
              <button 
                onClick={createNewLog}
                className="flex items-center gap-2 bg-brand text-white px-[10px] py-[4px] rounded-md text-xs font-bold hover:scale-105 transition-transform"
              >
                <Plus size={14} /> 새 로그 작성
              </button>
            </div>
            <div className="space-y-4">
              {logs.map((l) => (
                <div key={l.id} className="flex items-center justify-between p-3 border border-neutral-100 rounded-md hover:bg-neutral-50 group">
                  <div>
                    <h3 className="font-bold text-sm">{l.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {l.tags.map(t => <span key={t} className="text-[9px] text-neutral-400 font-bold">#{t}</span>)}
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => toggleLogPin(l.id)}
                      className={`p-1.5 rounded-md transition-colors ${l.pinned ? 'bg-brand text-white' : 'hover:bg-neutral-200 text-neutral-600'}`}
                      title="상단 고정"
                    >
                      {l.pinned ? <PinOff size={14} /> : <Pin size={14} />}
                    </button>
                    <button 
                      onClick={() => setEditingLog(l)}
                      className="p-1.5 hover:bg-neutral-200 rounded-md text-neutral-600 transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      onClick={() => deleteLog(l.id)}
                      className="p-1.5 hover:bg-red-50 rounded-md text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="p-8">
            <h2 className="text-lg font-bold mb-8">Contact Settings</h2>
            <div className="space-y-6 max-w-md">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateContact({...contact, email: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand font-normal text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block tracking-wider">CTA Button Text</label>
                <input
                  type="text"
                  value={contact.ctaText}
                  onChange={(e) => updateContact({...contact, ctaText: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand font-normal text-sm"
                />
              </div>
              <button className="bg-brand text-white px-[17px] py-[7px] rounded-md text-xs font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform">
                <Save size={14} /> 변경사항 저장
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
