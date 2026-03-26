import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { generateCards } from '../utils/generateCards';
import './LoadingPage.css';

export default function LoadingPage() {
  const navigate = useNavigate();
  const { inputText, generationType, setGeneratedCards } = useAppContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inputText?.trim()) {
      navigate('/');
      return;
    }

    let cancelled = false;

    generateCards(inputText, generationType)
      .then(cards => {
        if (cancelled) return;
        setGeneratedCards(cards);
        navigate('/results', { state: { source: 'new' } });
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message || 'Generation failed. Please try again.');
      });

    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <div className="loading-container">
        <div className="error-box">
          <p className="error-text">{error}</p>
          <button className="retry-button" onClick={() => navigate('/')}>
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-container">
      {/* Render exactly the four cards your CSS expects */}
      <div className="card card4" />
      <div className="card card3" />
      <div className="card card2" />
      <div className="card card1" />

      <p className="loading-text">
        Generating {generationType === 'flashcards' ? 'flashcards' : 'summary cards'}
      </p>
    </div>
  );
}
