class Keyboard {
  constructor() {
    this.language = 'ru';
    this.languageKeys = {
      ctrl: false,
      alt: false,
    };
    this.upperCase = false;
    this.shiftIsDown = false;
    this.specialKeys = ['AltLeft', 'ControlLeft', 'ShiftLeft', 'CapsLock'];
    this.digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.specialSymbols = {
      '[': '{',
      ']': '}',
      ';': ':',
      '\'': '"',
      ',': '<',
      '.': '>',
      '/': '?',
      '`': '~',
      1: '!',
      2: '@',
      3: '#',
      4: '$',
      5: '%',
      6: '^',
      7: '&',
      8: '*',
      9: '(',
      0: ')',
      '-': '_',
      '=': '+',
      '\\': '|',
    };
    this.specialSymbolsRu = {
      1: '!',
      2: '"',
      3: '№',
      4: ';',
      5: '%',
      6: ':',
      7: '?',
      8: '*',
      9: '(',
      0: ')',
      '-': '_',
      '=': '+',
      '\\': '/',
      '/': ',',
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
      '/': '.',
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
      '-': '-',
      '=': '=',
      '\\': '\\',
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
    if (this.specialKeys.includes(event.code)) {
      return;
    }
    switch (event.code) {
      case 'BracketLeft':
        this.typeSymbol('[');
        break;
      case 'BracketRight':
        this.typeSymbol(']');
        break;
      case 'Semicolon':
        this.typeSymbol(';');
        break;
      case 'Quote':
        this.typeSymbol('\'');
        break;
      case 'Comma':
        this.typeSymbol(',');
        break;
      case 'Period':
        this.typeSymbol('.');
        break;
      case 'Slash':
        this.typeSymbol('/');
        break;
      case 'Backquote':
        this.typeSymbol('`');
        break;
      case 'Minus':
        this.typeSymbol('-');
        break;
      case 'Equal':
        this.typeSymbol('=');
        break;
      case 'Backslash':
        this.typeSymbol('\\');
        break;
      default:
        this.typeSymbol(event.code.at(-1));
        break;
    }
  }

  typeSymbol(key) {
    this.textarea = document.querySelector('textarea');
    if (this.language === 'ru') {
      if (this.shiftIsDown && Object.keys(this.specialSymbolsRu).includes(key)) {
        this.textarea.value += this.specialSymbolsRu[key];
        return;
      }
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
