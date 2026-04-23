import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import WorkLogDetail from './pages/WorkLogDetail';
import Admin from './pages/Admin';
import Work from './pages/Work';
import Logs from './pages/Logs';
import { DataProvider } from './context/DataContext';

export default function App() {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen pt-16">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/log/:slug" element={<WorkLogDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}
