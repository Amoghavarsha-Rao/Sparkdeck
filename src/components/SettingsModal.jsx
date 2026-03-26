import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './SettingsModal.css';

export default function SettingsModal({ onClose }) {
  const { apiKey, updateApiKey } = useAppContext();
  const [key, setKey] = useState(apiKey);

  const handleSave = () => {
    updateApiKey(key.trim());
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Settings</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <label className="modal-label">Gemini API Key</label>
          <input
            type="password"
            className="modal-input"
            value={key}
            onChange={e => setKey(e.target.value)}
            placeholder="Enter your Gemini API key (optional)"
          />
          <p className="modal-help">
            Get a free API key at{' '}
            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">
              aistudio.google.com
            </a>
          </p>
          <p className="modal-help">
            A default key is NOT used now. You must set your own Gemini API key, and ensure billing is enabled for enough quota.
          </p>
        </div>

        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="modal-save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
