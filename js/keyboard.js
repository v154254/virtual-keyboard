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
      ArrowUp: '▲',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
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
      ArrowUp: '▲',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
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
      ArrowUp: '▲',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
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
      ArrowUp: '▲',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
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
      this.changeKeyboardLayout();
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
      this.textarea.setRangeText(this.numbers[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      return;
    }
    if (this.language === 'en') {
      if (Object.keys(this.specialCharacters).includes(key) && !this.shiftIsDown) {
        this.textarea.setRangeText(this.specialCharacters[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else if (Object.keys(this.specialCharacters).includes(key)) {
        this.textarea.setRangeText(this.specialCharactersShift[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else if (Object.keys(this.numbers).includes(key)) {
        this.textarea.setRangeText(this.numbersShift[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else if (this.upperCase) {
        this.textarea.setRangeText(key, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else {
        this.textarea.setRangeText(key.toLowerCase(), this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      }
    }
    if (this.language === 'ru') {
      if (Object.keys(this.specialCharacters).includes(key) && !this.shiftIsDown) {
        this.textarea.setRangeText(this.specialCharactersRu[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else if (Object.keys(this.specialCharacters).includes(key)) {
        this.textarea.setRangeText(this.specialCharactersShiftRu[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else if (Object.keys(this.numbers).includes(key)) {
        this.textarea.setRangeText(this.numbersShiftRu[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else if (this.upperCase) {
        this.textarea.setRangeText(this.alphabet[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else {
        this.textarea.setRangeText(this.alphabet[key].toLowerCase(), this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      }
    }
  }

  switchLanguage() {
    if (this.language === 'ru') {
      this.language = 'en';
      this.changeKeyboardLayout();
    } else {
      this.language = 'ru';
      this.changeKeyboardLayout();
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
      this.changeKeyboardLayout();
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

  changeKeyboardLayout() {
    if (this.language === 'en') {
      if (this.upperCase) {
        Object.keys(this.alphabet).forEach((item) => {
          const key = document.querySelector(`.${item.toLowerCase()}`);
          key.innerText = item.toUpperCase();
        });
      } else {
        Object.keys(this.alphabet).forEach((item) => {
          const key = document.querySelector(`.${item.toLowerCase()}`);
          key.innerText = item.toLowerCase();
        });
      }
      if (this.shiftIsDown) {
        Object.keys(this.specialCharacters).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.specialCharactersShift[item];
        });
        Object.keys(this.numbers).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.numbersShift[item];
        });
      } else {
        Object.keys(this.specialCharacters).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.specialCharacters[item];
        });
        Object.keys(this.numbers).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.numbers[item];
        });
      }
    } else {
      if (this.upperCase) {
        Object.keys(this.alphabet).forEach((item) => {
          const key = document.querySelector(`.${item.toLowerCase()}`);
          key.innerText = this.alphabet[item].toUpperCase();
        });
      } else {
        Object.keys(this.alphabet).forEach((item) => {
          const key = document.querySelector(`.${item.toLowerCase()}`);
          key.innerText = this.alphabet[item].toLowerCase();
        });
      }
      if (this.shiftIsDown) {
        Object.keys(this.specialCharacters).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.specialCharactersShiftRu[item];
        });
        Object.keys(this.numbers).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.numbersShiftRu[item];
        });
      } else {
        Object.keys(this.specialCharacters).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.specialCharactersRu[item];
        });
        Object.keys(this.numbers).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.numbers[item];
        });
      }
    }
  }
}

const keyboard = new Keyboard();

export default keyboard;
