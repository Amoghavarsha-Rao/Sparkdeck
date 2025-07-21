
import logo from '../assets/White Logo SVG.svg';
import bookmarkIcon from '../assets/Bookmark Icon.svg';
import './Hero.css';

function Hero() {
  return (
    <>
      <div className="top-bar">
        <img src={logo} className="logo" alt="logo" />
        <img src={bookmarkIcon} className="bookmark-icon" alt="bookmark icon" />
      </div>

      <main className="main">
        <div className="content">
          <div className="subtitle">
            Generate flashcards within seconds
          </div>

          <textarea
            className="input-box"
            placeholder="Paste or drag your text here"
          />

          <div className="button-section">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: 16,
                color: "#ffffff",
              }}
            >
              Generate:
            </p>

            <button className="generate-button">Factcards</button>
            <button className="generate-button">Flashcards</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Hero;
