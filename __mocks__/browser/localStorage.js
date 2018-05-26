class LocalStorage {
  constructor() {
    this.data = {};
  }

  getItem(key) {
    return this.data[key];
  }

  setItem(key, value) {
    this.data[key] = value;
  }

  clear() {
    this.data = {};
  }

  removeItem(key) {
    delete this.data[key];
  }
}

Object.defineProperty(window, 'localStorage', { value: new LocalStorage() });
