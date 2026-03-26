import { createContext, useContext, useState, useEffect } from 'react';
import {
  loadSavedDecks,
  saveDeck as persistDeck,
  deleteDeck as removeDeck,
  getApiKey,
  setApiKey as storeApiKey,
} from '../utils/storage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [inputText, setInputText] = useState('');
  const [generationType, setGenerationType] = useState('flashcards');
  const [generatedCards, setGeneratedCards] = useState(null);
  const [savedDecks, setSavedDecks] = useState([]);
  const [apiKey, setApiKeyState] = useState('');

  useEffect(() => {
    setSavedDecks(loadSavedDecks());
    setApiKeyState(getApiKey());
  }, []);

  const saveDeckToProfile = () => {
    if (!generatedCards) return;
    const deck = {
      title: inputText.slice(0, 60).trim() + (inputText.length > 60 ? '...' : ''),
      type: generationType,
      cards: generatedCards,
    };
    const updated = persistDeck(deck);
    setSavedDecks(updated);
  };

  const deleteDeckFromProfile = (deckId) => {
    const updated = removeDeck(deckId);
    setSavedDecks(updated);
  };

  const updateApiKey = (key) => {
    storeApiKey(key);
    setApiKeyState(key);
  };

  return (
    <AppContext.Provider value={{
      inputText, setInputText,
      generationType, setGenerationType,
      generatedCards, setGeneratedCards,
      savedDecks, saveDeckToProfile, deleteDeckFromProfile,
      apiKey, updateApiKey,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
