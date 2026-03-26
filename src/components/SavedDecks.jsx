import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import logo from '../assets/White Logo SVG.svg';
import './SavedDecks.css';

export default function SavedDecks() {
  const navigate = useNavigate();
  const { savedDecks, deleteDeckFromProfile, setGeneratedCards, setGenerationType } = useAppContext();

  const handleView = (deck) => {
    setGeneratedCards(deck.cards);
    setGenerationType(deck.type);
    navigate('/results', { state: { source: 'saved' } });
  };

  const handleDelete = (deckId) => {
    deleteDeckFromProfile(deckId);
  };

  return (
    <div className="saved-page">
      <div className="saved-top-bar">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>
        <img src={logo} className="saved-logo" alt="SparkDeck" />
      </div>

      <div className="saved-content">
        <h2 className="saved-title">Saved Decks</h2>

        {savedDecks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <p className="empty-title">No saved decks yet</p>
            <p className="empty-desc">Generate some flashcards and save them here!</p>
          </div>
        ) : (
          <div className="deck-list">
            {savedDecks.map(deck => (
              <div key={deck.id} className="deck-card">
                <div className="deck-info">
                  <span className="deck-type-badge">
                    {deck.type === 'flashcards' ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                          <line x1="8" y1="21" x2="16" y2="21"/>
                          <line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                        Flashcards
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        Summary
                      </>
                    )}
                  </span>
                  <h3 className="deck-card-title">{deck.title}</h3>
                  <p className="deck-meta">
                    {deck.cards.length} cards · {new Date(deck.savedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="deck-actions">
                  <button className="deck-view-btn" onClick={() => handleView(deck)}>
                    View
                  </button>
                  <button className="deck-delete-btn" onClick={() => handleDelete(deck.id)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
