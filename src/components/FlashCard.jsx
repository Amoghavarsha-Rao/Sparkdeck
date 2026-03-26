import { useState } from 'react';
import './FlashCard.css';

export default function FlashCard({ card, type }) {
  const [flipped, setFlipped] = useState(false);
  const isFlashcard = type === 'flashcards';

  return (
    <div className="flashcard-wrapper">
      {isFlashcard ? (
        <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
          <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
            <div className="flashcard-front">
              <div className="card-label">Question</div>
              <p>{card.question}</p>
              <div className="card-hint">Tap to reveal answer</div>
            </div>
            <div className="flashcard-back">
              <div className="card-label">Answer</div>
              <p>{card.answer}</p>
              <div className="card-hint">Tap to see question</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="factcard-container">
          <div className="factcard">
            <div className="card-label">Fact</div>
            <p>{card.fact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
