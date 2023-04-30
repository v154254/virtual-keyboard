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
      ArrowUp: '▲',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
      Tab: '    ',
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
      ArrowUp: '▲',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
      Tab: '    ',
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
      Minus: '-',
      Equal: '=',
      Backslash: '\\',
      Slash: '.',
      ArrowUp: '▲',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
      Tab: '    ',
    };
    this.specialCharactersShiftRu = {
      Minus: '_',
      Equal: '+',
      Backslash: '/',
      Slash: ',',
      ArrowUp: '▲',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
      Tab: '    ',
    };
    this.lettersUpperRu = {
      Backquote: 'Ё',
      BracketLeft: 'Х',
      BracketRight: 'Ъ',
      Semicolon: 'Ж',
      Quote: 'Э',
      Comma: 'Б',
      Period: 'Ю',
    };
    this.lettersLowerRu = {
      Backquote: 'ё',
      BracketLeft: 'х',
      BracketRight: 'ъ',
      Semicolon: 'ж',
      Quote: 'э',
      Comma: 'б',
      Period: 'ю',
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
    if (Object.keys(this.alphabet).includes(event.code.at(-1))) {
      this.highlightAdd(event.code.at(-1).toLowerCase());
    } else {
      this.highlightAdd(event.code);
    }
    switch (event.code) {
      case 'Enter':
        return;
      case 'Space':
        return;
      case 'Delete':
        return;
      case 'Backspace':
        return;
      default:
        event.preventDefault();
    }
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
      this.changeKeyboardLayout();
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
      if (Object.keys(this.specialCharactersRu).includes(key) && !this.shiftIsDown) {
        this.textarea.setRangeText(this.specialCharactersRu[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else if (Object.keys(this.specialCharactersRu).includes(key)) {
        this.textarea.setRangeText(this.specialCharactersShiftRu[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else if (Object.keys(this.numbers).includes(key)) {
        this.textarea.setRangeText(this.numbersShiftRu[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else if (this.upperCase) {
        if (Object.keys(this.lettersUpperRu).includes(key)) {
          this.textarea.setRangeText(this.lettersUpperRu[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        } else {
          this.textarea.setRangeText(this.alphabet[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        }
      } else if (Object.keys(this.lettersLowerRu).includes(key)) {
        this.textarea.setRangeText(this.lettersLowerRu[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      } else {
        this.textarea.setRangeText(this.alphabet[key].toLowerCase(), this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      }
    }
  }

  highlightAdd(key) {
    this.target = document.querySelector(`.${key}`);
    this.target.classList.add('highlight');
  }

  highlightRemove(key) {
    this.target = document.querySelector(`.${key}`);
    this.target.classList.remove('highlight');
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
    if (Object.keys(this.alphabet).includes(event.code.at(-1))) {
      this.highlightRemove(event.code.at(-1).toLowerCase());
    } else {
      this.highlightRemove(event.code);
    }
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
          key.innerText = item;
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
        document.querySelector('.Tab').innerText = 'Tab';
        Object.keys(this.numbers).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.numbersShift[item];
        });
      } else {
        Object.keys(this.specialCharacters).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.specialCharacters[item];
        });
        document.querySelector('.Tab').innerText = 'Tab';
        Object.keys(this.numbers).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.numbers[item];
        });
      }
    } else {
      if (this.upperCase) {
        Object.keys(this.alphabet).forEach((item) => {
          const key = document.querySelector(`.${item.toLowerCase()}`);
          key.innerText = this.alphabet[item];
        });
        Object.keys(this.lettersUpperRu).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.lettersUpperRu[item];
        });
      } else {
        Object.keys(this.alphabet).forEach((item) => {
          const key = document.querySelector(`.${item.toLowerCase()}`);
          key.innerText = this.alphabet[item].toLowerCase();
        });
        Object.keys(this.lettersLowerRu).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.lettersLowerRu[item];
        });
      }
      if (this.shiftIsDown) {
        Object.keys(this.specialCharactersRu).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.specialCharactersShiftRu[item];
        });
        document.querySelector('.Tab').innerText = 'Tab';
        Object.keys(this.numbers).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.numbersShiftRu[item];
        });
        Object.keys(this.lettersUpperRu).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.lettersUpperRu[item];
        });
      } else {
        Object.keys(this.specialCharactersRu).forEach((item) => {
          const key = document.querySelector(`.${item}`);
          key.innerText = this.specialCharactersRu[item];
        });
        document.querySelector('.Tab').innerText = 'Tab';
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
