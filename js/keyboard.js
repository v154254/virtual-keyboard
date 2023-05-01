class Keyboard {
  constructor() {
    this.language = 'en';
    this.languageKeys = {
      ctrl: false,
      alt: false,
    };
    this.upperCase = false;
    this.shiftIsDown = false;
    this.shiftIsClick = false;
    this.formattingKeys = {
      Enter: '\n',
      Tab: '    ',
      Space: ' ',
    };
    this.specialKeys = ['AltLeft', 'ControlLeft', 'ShiftLeft', 'CapsLock', 'MetaLeft', 'ShiftRight', 'AltRight', 'ControlRight'];
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
    event.preventDefault();
    if (Object.keys(this.alphabet).includes(event.code.at(-1))) {
      this.highlightAdd(event.code.at(-1).toLowerCase());
    } else {
      this.highlightAdd(event.code);
    }
    event.preventDefault();
    if (event.code === 'AltLeft' || event.code === 'AltRight') {
      this.languageKeys.alt = true;
    }
    if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
      this.languageKeys.ctrl = true;
    }
    if (this.languageKeys.alt && this.languageKeys.ctrl) {
      this.switchLanguage();
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      if (this.shiftIsDown) {
        return;
      }
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
    if (Object.keys(this.formattingKeys).includes(event.code) || event.code === 'Delete' || event.code === 'Backspace') {
      this.typeSymbol(event.code);
      return;
    }
    if (Object.keys(this.specialCharacters).includes(event.code)
      || Object.keys(this.numbers).includes(event.code)) {
      this.typeSymbol(event.code);
      return;
    }
    this.typeSymbol(event.code.at(-1));
  }

  identifyMouseDown(event) {
    const keys = Array.from(document.querySelectorAll('.key'));
    if (!keys.includes(event.target)) {
      return;
    }
    event.preventDefault();
    this.highlightAddClick(event.target);
    const target = event.target.innerText;
    this.textarea = document.querySelector('textarea');
    if (target === 'Shift') {
      if (this.shiftIsDown) {
        return;
      }
      this.shiftIsClick = true;
      this.toggleUpper();
      this.shiftIsDown = true;
      this.changeKeyboardLayout();
    }
    if (target === 'CapsLock') {
      this.toggleUpper();
      this.changeKeyboardLayout();
    }
    if (this.specialKeys.includes(target) || target === 'Ctrl'
     || target === 'Alt' || target === 'Win' || target === 'Shift') {
      return;
    }
    if (Object.keys(this.formattingKeys).includes(target) || target === 'Delete' || target === 'Backspace') {
      this.typeSymbol(target);
    } else if (target === '') {
      this.textarea = document.querySelector('textarea');
      this.textarea.setRangeText(' ', this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
    } else {
      this.textarea = document.querySelector('textarea');
      this.textarea.setRangeText(target, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
    }
  }

  identifyMouseUp(event) {
    this.removeHighlightClick(event);
    if (this.shiftIsClick) {
      this.shiftIsDown = false;
      this.shiftIsClick = false;
      this.toggleUpper();
      this.changeKeyboardLayout();
    }
  }

  highlightAddClick(event) {
    this.target = event;
    this.target.classList.add('highlight');
    this.target.addEventListener('mouseleave', this.removeHighlightClick);
  }

  removeHighlightClick(event) {
    this.target = event.target;
    this.target.classList.remove('highlight');
  }

  typeSymbol(key) {
    this.textarea = document.querySelector('textarea');
    if (Object.keys(this.formattingKeys).includes(key)) {
      this.textarea.setRangeText(this.formattingKeys[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      return;
    }
    if (Object.keys(this.numbers).includes(key) && !this.shiftIsDown) {
      this.textarea.setRangeText(this.numbers[key], this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      return;
    }
    if (key === 'Delete') {
      this.textarea.setRangeText('', this.textarea.selectionStart, this.textarea.selectionEnd + 1, 'start');
      return;
    }
    if (key === 'Backspace') {
      this.textarea.setSelectionRange(this.textarea.selectionStart, this.textarea.selectionStart - 1, 'backward');
      this.textarea.setRangeText('', this.textarea.selectionStart, this.textarea.selectionEnd + 1, 'end');
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
      this.setLanguage('en');
    } else {
      this.setLanguage('ru');
    }
  }

  setLanguage(lang) {
    this.language = lang;
    this.changeKeyboardLayout();
  }

  getLanguage() {
    return this.language;
  }

  identifyKeyUp(event) {
    event.preventDefault();
    if (Object.keys(this.alphabet).includes(event.code.at(-1))) {
      this.highlightRemove(event.code.at(-1).toLowerCase());
    } else {
      this.highlightRemove(event.code);
    }
    if (event.code === 'AltLeft' || event.code === 'ControlLeft' || event.code === 'AltRight' || event.code === 'ControlRight') {
      this.nullifyLanguageKeys();
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
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
