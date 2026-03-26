const DECKS_KEY = 'sparkdeck_saved_decks';
const API_KEY_KEY = 'sparkdeck_api_key';

export function loadSavedDecks() {
  try {
    return JSON.parse(localStorage.getItem(DECKS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveDeck(deck) {
  const decks = loadSavedDecks();
  const newDeck = {
    ...deck,
    id: Date.now(),
    savedAt: new Date().toISOString(),
  };
  const updated = [newDeck, ...decks];
  localStorage.setItem(DECKS_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteDeck(deckId) {
  const decks = loadSavedDecks();
  const updated = decks.filter(d => d.id !== deckId);
  localStorage.setItem(DECKS_KEY, JSON.stringify(updated));
  return updated;
}

export function getApiKey() {
  return localStorage.getItem(API_KEY_KEY) || '';
}

export function setApiKey(key) {
  localStorage.setItem(API_KEY_KEY, key);
}
