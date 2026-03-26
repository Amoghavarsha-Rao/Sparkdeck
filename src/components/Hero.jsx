import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SettingsModal from './SettingsModal';
import logo from '../assets/White Logo SVG.svg';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();
  const { inputText, setInputText, setGenerationType } = useAppContext();
  const [showSettings, setShowSettings] = useState(false);

  const handleGenerate = (type) => {
    if (!inputText.trim()) return;
    setGenerationType(type);
    navigate('/loading');
  };

  return (
    <>
      <div className="top-bar">
        <img src={logo} className="logo" alt="SparkDeck" />
        <div className="top-bar-actions">
          <button
            className="icon-button"
            onClick={() => setShowSettings(true)}
            title="Settings"
            aria-label="Settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
          <button
            className="icon-button"
            onClick={() => navigate('/saved')}
            title="Saved decks"
            aria-label="Saved decks"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
      </div>

      <main className="main">
        <div className="content">
          <div className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            AI-Powered
          </div>

          <h1 className="hero-title">
            Generate flashcards<br />within seconds
          </h1>
          <p className="hero-subtitle">
            Paste any text and let AI create study-ready flashcards or bite-sized fact cards for you.
          </p>

          <textarea
            className="input-box"
            placeholder="Paste your notes, articles, or any study material here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="char-counter">
            {inputText.length > 0 && (
              <span>{inputText.length.toLocaleString()} characters</span>
            )}
          </div>

          <div className="button-section">
            <button
              className="generate-button summary-btn"
              onClick={() => handleGenerate('summary')}
              disabled={!inputText.trim()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Summary Cards
            </button>
            <button
              className="generate-button flashcard-btn"
              onClick={() => handleGenerate('flashcards')}
              disabled={!inputText.trim()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Flashcards
            </button>
          </div>
        </div>
      </main>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );
}

export default Hero;
