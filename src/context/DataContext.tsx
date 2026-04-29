import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, WorkLog, ContactInfo } from '../types';
import { INITIAL_PROJECTS, INITIAL_LOGS, INITIAL_CONTACT } from '../data';
import { db } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  query, 
  orderBy,
  runTransaction
} from 'firebase/firestore';

interface DataContextType {
  projects: Project[];
  logs: WorkLog[];
  contact: ContactInfo;
  updateProjects: (projects: Project[]) => Promise<void>;
  updateLogs: (logs: WorkLog[]) => Promise<void>;
  updateContact: (contact: ContactInfo) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [logs, setLogs] = useState<WorkLog[]>(INITIAL_LOGS);
  const [contact, setContact] = useState<ContactInfo>(INITIAL_CONTACT);
  const [loading, setLoading] = useState(true);

  // Sync Projects
  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => doc.data() as Project);
      if (projectsData.length > 0) {
        setProjects(projectsData);
      } else if (loading) {
        // Seed if empty and admin (optional, already handled partially)
        // But we already have the fallback from INITIAL_PROJECTS
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore sync error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync Logs
  useEffect(() => {
    const q = query(collection(db, 'logs'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs.map(doc => doc.data() as WorkLog);
      if (logsData.length > 0) {
        setLogs(logsData);
      }
    }, (error) => {
      console.error("Logs sync error:", error);
    });
    return () => unsubscribe();
  }, []);

  // Sync Contact
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'contact'), (snapshot) => {
      if (snapshot.exists()) {
        setContact(snapshot.data() as ContactInfo);
      }
    }, (error) => {
      console.error("Contact sync error:", error);
    });
    return () => unsubscribe();
  }, []);
  const updateProjects = async (newProjects: Project[]) => {
    await runTransaction(db, async (transaction) => {
      newProjects.forEach((p, idx) => {
        const docRef = doc(db, 'projects', p.id);
        transaction.set(docRef, { ...p, order: idx });
      });
    });
  };

  const updateLogs = async (newLogs: WorkLog[]) => {
    await runTransaction(db, async (transaction) => {
      newLogs.forEach(l => {
        const docRef = doc(db, 'logs', l.id);
        transaction.set(docRef, l);
      });
    });
  };

  const updateContact = async (newContact: ContactInfo) => {
    await setDoc(doc(db, 'settings', 'contact'), newContact);
  };

  return (
    <DataContext.Provider value={{ 
      projects, 
      logs, 
      contact, 
      updateProjects, 
      updateLogs, 
      updateContact 
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
