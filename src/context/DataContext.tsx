import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, WorkLog, ContactInfo } from '../types';
import { INITIAL_PROJECTS, INITIAL_LOGS, INITIAL_CONTACT } from '../data';

interface DataContextType {
  projects: Project[];
  logs: WorkLog[];
  contact: ContactInfo;
  updateProjects: (projects: Project[]) => void;
  updateLogs: (logs: WorkLog[]) => void;
  updateContact: (contact: ContactInfo) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('pm_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [logs, setLogs] = useState<WorkLog[]>(() => {
    const saved = localStorage.getItem('pm_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [contact, setContact] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('pm_contact');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT;
  });

  useEffect(() => {
    localStorage.setItem('pm_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('pm_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('pm_contact', JSON.stringify(contact));
  }, [contact]);

  return (
    <DataContext.Provider value={{ 
      projects, 
      logs, 
      contact, 
      updateProjects: setProjects, 
      updateLogs: setLogs, 
      updateContact: setContact 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
