import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import FlashCard from './FlashCard';
import logo from '../assets/White Logo SVG.svg';
import './ResultsPage.css';

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { generatedCards, generationType, saveDeckToProfile, inputText } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  const source = location.state?.source || 'new';
  const cards = generatedCards;

  useEffect(() => {
    if (!cards || cards.length === 0) {
      navigate('/');
    }
  }, [cards, navigate]);

  if (!cards || cards.length === 0) return null;

  const goNext = () => {
    if (currentIndex < cards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSave = () => {
    saveDeckToProfile();
    setSaved(true);
  };

  const handleDownload = () => {
    const title = inputText?.slice(0, 50) || 'SparkDeck Cards';
    let content = '';

    if (generationType === 'flashcards') {
      content = `# ${title}\n\n`;
      cards.forEach((card, i) => {
        content += `## Card ${i + 1}\n**Q:** ${card.question}\n**A:** ${card.answer}\n\n`;
      });
    } else {
      content = `# ${title}\n\n`;
      cards.forEach((card, i) => {
        content += `${i + 1}. ${card.fact}\n\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sparkdeck-${generationType}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="results-page">
      <div className="results-top-bar">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>
        <img src={logo} className="results-logo" alt="SparkDeck" />
      </div>

      <div className="results-content">
        <h2 className="results-title">
          {generationType === 'flashcards' ? 'Your Flashcards' : 'Your Summary Cards'}
        </h2>
        <p className="results-subtitle">
          {generationType === 'flashcards' ? 'Tap a card to flip it' : 'Browse through your facts'}
        </p>

        <FlashCard
          key={currentIndex}
          card={cards[currentIndex]}
          type={generationType}
        />

        <div className="card-navigation">
          <button
            className="nav-button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            aria-label="Previous card"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span className="nav-counter">{currentIndex + 1} / {cards.length}</span>
          <button
            className="nav-button"
            onClick={goNext}
            disabled={currentIndex === cards.length - 1}
            aria-label="Next card"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <div className="results-actions">
          {source === 'new' && (
            <button
              className="action-button save-button"
              onClick={handleSave}
              disabled={saved}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {saved ? (
                  <polyline points="20 6 9 17 4 12"/>
                ) : (
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                )}
              </svg>
              {saved ? 'Saved' : 'Save to Profile'}
            </button>
          )}
          <button className="action-button download-button" onClick={handleDownload}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </button>
          <button className="action-button new-button" onClick={() => navigate('/')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Generate More
          </button>
        </div>
      </div>
    </div>
  );
}
