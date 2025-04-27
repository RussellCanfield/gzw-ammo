import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Ammunition from './pages/Ammunition';
import Compare from './pages/Compare';
import AmmoDetail from './pages/AmmoDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Ammunition />} />
            <Route path="/ammunition/:id" element={<AmmoDetail />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </main>
        <footer className="mt-12 py-6 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted">
            <p>Gray Zone Warfare Ammunition Analyzer</p>
            <p className="text-sm mt-1">Data for educational purposes only. Not affiliated with Gray Zone Warfare or MADFINGER Games.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;