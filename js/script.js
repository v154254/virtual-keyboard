const body = document.querySelector('body');

function createPage() {
  function createHeader() {
    const header = document.createElement('header');
    const container = document.createElement('div');
    const title = document.createElement('h1');
    header.classList.add('header');
    container.classList.add('container');
    title.classList.add('title');
    title.innerText = 'Virtual keyboard';
    body.appendChild(header);
    header.appendChild(container);
    container.appendChild(title);
  }
  function createMain() {
    const main = document.createElement('main');
    const container = document.createElement('div');
    const textArea = document.createElement('textarea');
    const keyboard = document.createElement('div');
    const firstRowKeys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'];
    const secondRowKeys = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'];
    const thirdRowKeys = ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'];
    const fourthRowKeys = ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'];
    const fifthRowKeys = ['Ctrl', 'Win', 'Alt', ' ', '◄', '▼', '►', 'Ctrl'];
    main.classList.add('main');
    container.classList.add('container');
    textArea.classList.add('main__textarea');
    keyboard.classList.add('keyboard');
    body.appendChild(main);
    main.appendChild(container);
    container.appendChild(textArea);
    container.appendChild(keyboard);
    function createKeyboard() {
      function createRow(addRow, rowKeys) {
        rowKeys.forEach((item) => {
          const key = document.createElement('div');
          key.classList.add('key', `${item}`);
          key.innerText = `${item}`;
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
  createHeader();
  createMain();
}
window.addEventListener('load', createPage);
