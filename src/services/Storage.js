let hasLocalStorage = 'localStorage' in global;

export function writeToLocalStorage(key, value) {
  // Older browsers do not support this.
  if (hasLocalStorage) {
    try {
      const storage = global.localStorage;
      storage.removeItem(key);
      storage.setItem(key, JSON.stringify(value));
    } catch (err) {
      hasLocalStorage = false;
    }
  }
}

export function readLocalStorage(key) {
  if (hasLocalStorage) {
    try {
      const storage = global.localStorage;

      return JSON.parse(storage.getItem(key));
    } catch (err) {
      hasLocalStorage = false;
    }
  }
}
