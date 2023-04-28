class Keyboard {
  constructor() {
    this.language = 'ru';
    this.languageKeys = {
      ctrl: false,
      alt: false,
    };
    this.upperCase = false;
    this.shiftIsDown = false;
    this.specialSymbols = {
      '[': '{',
      ']': '}',
      ';': ':',
      '\'': '"',
      ',': '<',
      '.': '>',
      '/': '?',
    };
    this.ruAlphabet = {
      Q: 'Й',
      W: 'Ц',
      E: 'У',
      R: 'К',
      T: 'Е',
      Y: 'Н',
      U: 'Г',
      I: 'Ш',
      O: 'Щ',
      P: 'З',
      '[': 'Х',
      ']': 'Ъ',
      A: 'Ф',
      S: 'Ы',
      D: 'В',
      F: 'А',
      G: 'П',
      H: 'Р',
      J: 'О',
      K: 'Л',
      L: 'Д',
      ';': 'Ж',
      '\'': 'Э',
      Z: 'Я',
      X: 'Ч',
      C: 'С',
      V: 'М',
      B: 'И',
      N: 'Т',
      M: 'Ь',
      ',': 'Б',
      '.': 'Ю',
      '/': ',',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      0: '0',
      '`': 'Ё',
    };
  }

  identifyKeyDown(event) {
    event.preventDefault();
    if (event.code === 'AltLeft') {
      this.languageKeys.alt = true;
    }
    if (event.code === 'ControlLeft') {
      this.languageKeys.ctrl = true;
    }
    if (this.languageKeys.alt && this.languageKeys.ctrl) {
      this.switchLanguage();
    }
    if (event.code === 'ShiftLeft') {
      this.toggleUpper();
      this.shiftIsDown = true;
    }
    if (event.code === 'CapsLock') {
      this.toggleUpper();
    }
    if (event.code === 'BracketLeft') {
      this.typeSymbol('[');
      return;
    }
    if (event.code === 'BracketRight') {
      this.typeSymbol(']');
      return;
    }
    if (event.code === 'Semicolon') {
      this.typeSymbol(';');
      return;
    }
    if (event.code === 'Quote') {
      this.typeSymbol('\'');
      return;
    }
    if (event.code === 'Comma') {
      this.typeSymbol(',');
      return;
    }
    if (event.code === 'Period') {
      this.typeSymbol('.');
      return;
    }
    if (event.code === 'Slash') {
      this.typeSymbol('/');
      return;
    }
    if (event.code === 'Backquote') {
      this.typeSymbol('`');
      return;
    }
    this.typeSymbol(event.code.at(-1));
  }

  typeSymbol(key) {
    this.textarea = document.querySelector('textarea');
    if (this.language === 'ru') {
      if (this.upperCase === true) {
        this.textarea.value += this.ruAlphabet[key];
        return;
      } this.textarea.value += this.ruAlphabet[key].toLowerCase();
      return;
    }
    if (this.shiftIsDown && Object.keys(this.specialSymbols).includes(key)) {
      this.textarea.value += this.specialSymbols[key];
      return;
    }
    if (this.upperCase === true) {
      this.textarea.value += key;
    } else {
      this.textarea.value += key.toLowerCase();
    }
  }

  switchLanguage() {
    if (this.language === 'ru') {
      this.language = 'en';
    } else {
      this.language = 'ru';
    }
  }

  identifyKeyUp(event) {
    event.preventDefault();
    if (event.code === 'AltLeft' || event.code === 'ControlLeft') {
      this.nullifyLanguageKeys();
    }
    if (event.code === 'ShiftLeft') {
      this.shiftIsDown = false;
      this.toggleUpper();
    }
  }

  nullifyLanguageKeys() {
    this.languageKeys = {
      ctrl: false,
      alt: false,
    };
  }

  toggleUpper() {
    if (this.upperCase) {
      this.upperCase = false;
    } else {
      this.upperCase = true;
    }
  }
}

const keyboard = new Keyboard();

export default keyboard;
