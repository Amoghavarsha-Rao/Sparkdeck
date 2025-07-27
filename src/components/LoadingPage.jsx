import React from 'react';
import './LoadingPage.css';

export default function LoadingPage() {
  return (
    <div className="loading-container">
      {/* Render exactly the four cards your CSS expects */}
      <div className="card card4" />
      <div className="card card3" />
      <div className="card card2" />
      <div className="card card1" />

      <p className="loading-text">Generating flashcards...</p>
    </div>
  );
}
