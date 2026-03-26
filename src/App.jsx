import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Hero from './components/Hero';
import LoadingPage from './components/LoadingPage';
import ResultsPage from './components/ResultsPage';
import SavedDecks from './components/SavedDecks';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/saved" element={<SavedDecks />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
