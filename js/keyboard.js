class Keyboard {
  constructor() {
    this.language = 'en';
    this.languageKeys = {
      ctrl: false,
      alt: false,
    };
    this.upperCase = false;
    this.shiftIsDown = false;
    this.specialKeys = ['AltLeft', 'ControlLeft', 'ShiftLeft', 'CapsLock'];
    this.alphabet = {
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
      A: 'Ф',
      S: 'Ы',
      D: 'В',
      F: 'А',
      G: 'П',
      H: 'Р',
      J: 'О',
      K: 'Л',
      L: 'Д',
      Z: 'Я',
      X: 'Ч',
      C: 'С',
      V: 'М',
      B: 'И',
      N: 'Т',
      M: 'Ь',
    };
    this.specialCharacters = {
      Backquote: '`',
      Minus: '-',
      Equal: '=',
      BracketLeft: '[',
      BracketRight: ']',
      Backslash: '\\',
      Semicolon: ';',
      Quote: '\'',
      Comma: ',',
      Period: '.',
      Slash: '/',
      Space: ' ',
    };
    this.numbers = {
      Digit0: '0',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
    };
    this.specialCharactersShift = {
      Backquote: '~',
      Minus: '_',
      Equal: '+',
      BracketLeft: '{',
      BracketRight: '}',
      Backslash: '|',
      Semicolon: ':',
      Quote: '"',
      Comma: '<',
      Period: '>',
      Slash: '?',
      Space: ' ',
    };
    this.numbersShift = {
      Digit0: ')',
      Digit1: '!',
      Digit2: '@',
      Digit3: '#',
      Digit4: '$',
      Digit5: '%',
      Digit6: '^',
      Digit7: '&',
      Digit8: '*',
      Digit9: '(',
    };
    this.specialCharactersRu = {
      Backquote: 'ё',
      Minus: '-',
      Equal: '=',
      BracketLeft: 'х',
      BracketRight: 'ъ',
      Backslash: '\\',
      Semicolon: 'ж',
      Quote: 'э',
      Comma: 'б',
      Period: 'ю',
      Slash: '.',
      Space: ' ',
    };
    this.specialCharactersShiftRu = {
      Backquote: 'Ё',
      Minus: '_',
      Equal: '+',
      BracketLeft: 'Х',
      BracketRight: 'Ъ',
      Backslash: '/',
      Semicolon: 'Ж',
      Quote: 'Э',
      Comma: 'Б',
      Period: 'Ю',
      Slash: ',',
      Space: ' ',
    };
    this.numbersShiftRu = {
      Digit0: ')',
      Digit1: '!',
      Digit2: '"',
      Digit3: '№',
      Digit4: ';',
      Digit5: '%',
      Digit6: ':',
      Digit7: '?',
      Digit8: '*',
      Digit9: '(',
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
    if (Object.keys(this.specialCharacters).includes(event.code)
      || Object.keys(this.numbers).includes(event.code)) {
      this.typeSymbol(event.code);
      return;
    }
    this.typeSymbol(event.code.at(-1));
  }

  typeSymbol(key) {
    this.textarea = document.querySelector('textarea');
    if (Object.keys(this.numbers).includes(key) && !this.shiftIsDown) {
      this.textarea.value += this.numbers[key];
      return;
    }
    if (this.language === 'en') {
      if (Object.keys(this.specialCharacters).includes(key) && !this.shiftIsDown) {
        this.textarea.value += this.specialCharacters[key];
      } else if (Object.keys(this.specialCharacters).includes(key)) {
        this.textarea.value += this.specialCharactersShift[key];
      } else if (Object.keys(this.numbers).includes(key)) {
        this.textarea.value += this.numbersShift[key];
      } else if (this.upperCase) {
        this.textarea.value += key;
      } else {
        this.textarea.value += key.toLowerCase();
      }
    }
    if (this.language === 'ru') {
      if (Object.keys(this.specialCharacters).includes(key) && !this.shiftIsDown) {
        this.textarea.value += this.specialCharactersRu[key];
      } else if (Object.keys(this.specialCharacters).includes(key)) {
        this.textarea.value += this.specialCharactersShiftRu[key];
      } else if (Object.keys(this.numbers).includes(key)) {
        this.textarea.value += this.numbersShiftRu[key];
      } else if (this.upperCase) {
        this.textarea.value += this.alphabet[key];
      } else {
        this.textarea.value += this.alphabet[key].toLowerCase();
      }
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
