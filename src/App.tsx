import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Ammunition from './pages/Ammunition';
import Compare from './pages/Compare';
import AmmoDetail from './pages/AmmoDetail';
import logo from './assets/GZW-Text-logo.webp';

// ScrollToTop component to ensure page scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Main content wrapper with page transitions
function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-primary flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <PageContainer>
                <Ammunition />
              </PageContainer>
            } />
            <Route path="/ammunition/:id" element={
              <PageContainer>
                <AmmoDetail />
              </PageContainer>
            } />
            <Route path="/compare" element={
              <PageContainer>
                <Compare />
              </PageContainer>
            } />
          </Routes>
        </main>
        <footer className="mt-12 py-8 bg-secondary shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-16 mr-2" />
                <span className="text-white text-lg font-bold">GZW</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Add page transition styles */}
      <style>
        {`
        .page-transition {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>
    </Router>
  );
}

export default App;