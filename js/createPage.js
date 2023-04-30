function createHeader() {
  const header = document.createElement('header');
  const container = document.createElement('div');
  const title = document.createElement('h1');
  header.classList.add('header');
  container.classList.add('container');
  title.classList.add('title');
  title.innerText = 'Virtual keyboard';
  document.body.appendChild(header);
  header.appendChild(container);
  container.appendChild(title);
}

function createMain() {
  const main = document.createElement('main');
  const container = document.createElement('div');
  const textArea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  main.classList.add('main');
  container.classList.add('container');
  textArea.classList.add('main__textarea');
  keyboard.classList.add('keyboard');
  document.body.appendChild(main);
  main.appendChild(container);
  container.appendChild(textArea);
  container.appendChild(keyboard);
  function createKeyboard() {
    const specialCharacters = {
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
      Space: ' ',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
    };
    const firstRowKeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'];
    const secondRowKeys = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'BracketLeft', 'BracketRight', 'Backslash', 'Del'];
    const thirdRowKeys = ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Semicolon', 'Quote', 'Enter'];
    const fourthRowKeys = ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Comma', 'Period', 'Slash', 'ArrowUp', 'Shift'];
    const fifthRowKeys = ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Ctrl'];
    function createRow(addRow, rowKeys) {
      rowKeys.forEach((item) => {
        const key = document.createElement('div');
        if (Object.keys(specialCharacters).includes(item)) {
          key.classList.add('key', `${item}`);
          key.innerText = `${specialCharacters[item]}`;
        } else {
          key.classList.add('key', `${item}`);
          key.innerText = `${item}`;
        }
        addRow.appendChild(key);
      });
    }
    for (let i = 0; i < 5; i += 1) {
      const row = document.createElement('div');
      row.classList.add('row');
      switch (i) {
        case 0:
          keyboard.appendChild(row);
          createRow(row, firstRowKeys);
          break;
        case 1:
          keyboard.appendChild(row);
          createRow(row, secondRowKeys);
          break;
        case 2:
          keyboard.appendChild(row);
          createRow(row, thirdRowKeys);
          break;
        case 3:
          keyboard.appendChild(row);
          createRow(row, fourthRowKeys);
          break;
        case 4:
          keyboard.appendChild(row);
          createRow(row, fifthRowKeys);
          break;
        default:
          throw new Error('Oh no! Something bad happened!');
      }
    }
  }
  createKeyboard();
}

function createFooter() {
  const footer = document.createElement('footer');
  const container = document.createElement('div');
  const description = document.createElement('p');
  const language = document.createElement('p');
  footer.classList.add('footer');
  container.classList.add('container');
  description.classList.add('description');
  language.classList.add('language');
  description.innerText = '⌨️ was made for Windows';
  language.innerText = 'Press Ctrl + Alt to change language';
  document.body.appendChild(footer);
  footer.appendChild(container);
  container.appendChild(description);
  container.appendChild(language);
}

export default function createPage() {
  createHeader();
  createMain();
  createFooter();
}
