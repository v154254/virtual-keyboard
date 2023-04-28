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
      BracketLeft: 'Х',
      BracketRight: 'Ъ',
      A: 'Ф',
      S: 'Ы',
      D: 'В',
      F: 'А',
      G: 'П',
      H: 'Р',
      J: 'О',
      K: 'Л',
      L: 'Д',
      Semicolon: 'Ж',
      Quote: 'Э',
      Z: 'Я',
      X: 'Ч',
      C: 'С',
      V: 'М',
      B: 'И',
      N: 'Т',
      M: 'Ь',
      Comma: 'Б',
      Period: 'Ю',
      Slash: ',',
    };
  }

  identifyKey(event) {
    event.preventDefault();
    if (event.code.includes('AltLeft')) {
      this.languageKeys.alt = true;
    }
    if (event.code.includes('ControlLeft')) {
      this.languageKeys.ctrl = true;
    }
    if (this.languageKeys.alt && this.languageKeys.ctrl) {
      this.switchLanguage();
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
