import Keyboard from './keyboard.js';

export default function identifyKey(event) {
  event.preventDefault();
  const keyboard = new Keyboard();
  if (event.code.includes('altKey')) {
    if (event.code.includes('ctrlKey')) {
      keyboard.switchLanguage();
    }
  } else {
    keyboard.keySymbol(event.code.at(-1));
  }
}
