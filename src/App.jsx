import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Hero from './components/Hero';
import LoadingPage from './components/LoadingPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
