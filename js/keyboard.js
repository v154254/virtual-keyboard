class Keyboard {
  constructor() {
    this.language = 'ru';
    this.languageKeys = {
      ctrl: false,
      alt: false,
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
      '{': 'Х',
      '}': 'Ъ',
      A: 'Ф',
      S: 'Ы',
      D: 'В',
      F: 'А',
      G: 'П',
      H: 'Р',
      J: 'О',
      K: 'Л',
      L: 'Д',
      ':': 'Ж',
      '"': 'Э',
      Z: 'Я',
      X: 'Ч',
      C: 'С',
      V: 'М',
      B: 'И',
      N: 'Т',
      M: 'Ь',
      '<': 'Б',
      '>': 'Ю',
      '?': ',',
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
    };
  }

  identifyKey(event) {
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
    if (event.code === 'BracketLeft') {
      this.typeSymbol('{');
      return;
    }
    if (event.code === 'BracketRight') {
      this.typeSymbol('}');
      return;
    }
    if (event.code === 'Semicolon') {
      this.typeSymbol(':');
      return;
    }
    if (event.code === 'Quote') {
      this.typeSymbol('"');
      return;
    }
    if (event.code === 'Comma') {
      this.typeSymbol('<');
      return;
    }
    if (event.code === 'Period') {
      this.typeSymbol('>');
      return;
    }
    if (event.code === 'Slash') {
      this.typeSymbol('?');
      return;
    }
    this.typeSymbol(event.code.at(-1));
  }

  typeSymbol(key) {
    this.textarea = document.querySelector('textarea');
    if (this.language === 'ru') {
      this.textarea.value += this.ruAlphabet[key];
      return;
    }
    this.textarea.value += key;
  }

  switchLanguage() {
    if (this.language === 'ru') {
      this.language = 'en';
    } else {
      this.language = 'ru';
    }
  }

  cancelLangSwitch() {
    this.languageKeys = {
      ctrl: false,
      alt: false,
    };
  }
}

const keyboard = new Keyboard();

export default keyboard;
