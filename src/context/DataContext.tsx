import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, WorkLog, ContactInfo } from '../types';
import { INITIAL_PROJECTS, INITIAL_LOGS, INITIAL_CONTACT } from '../data';
import { db } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc,
  query, 
  orderBy,
  runTransaction
} from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface DataContextType {
  projects: Project[];
  logs: WorkLog[];
  contact: ContactInfo;
  updateProjects: (projects: Project[]) => Promise<void>;
  updateLogs: (logs: WorkLog[]) => Promise<void>;
  updateContact: (contact: ContactInfo) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  deleteLog: (id: string) => Promise<void>;
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
      setProjects(projectsData.length > 0 ? projectsData : INITIAL_PROJECTS);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'projects');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync Logs
  useEffect(() => {
    const q = query(collection(db, 'logs'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs.map(doc => doc.data() as WorkLog);
      setLogs(logsData.length > 0 ? logsData : INITIAL_LOGS);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'logs');
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
      handleFirestoreError(error, OperationType.GET, 'settings/contact');
    });
    return () => unsubscribe();
  }, []);

  const updateProjects = async (newProjects: Project[]) => {
    try {
      await runTransaction(db, async (transaction) => {
        newProjects.forEach((p, idx) => {
          const docRef = doc(db, 'projects', p.id);
          transaction.set(docRef, { ...p, order: idx });
        });
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'projects');
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  };

  const updateLogs = async (newLogs: WorkLog[]) => {
    try {
      await runTransaction(db, async (transaction) => {
        newLogs.forEach(l => {
          const docRef = doc(db, 'logs', l.id);
          transaction.set(docRef, l);
        });
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'logs');
    }
  };

  const deleteLog = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'logs', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `logs/${id}`);
    }
  };

  const updateContact = async (newContact: ContactInfo) => {
    try {
      await setDoc(doc(db, 'settings', 'contact'), newContact);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/contact');
    }
  };

  return (
    <DataContext.Provider value={{ 
      projects, 
      logs, 
      contact, 
      updateProjects, 
      updateLogs, 
      updateContact,
      deleteProject,
      deleteLog
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
