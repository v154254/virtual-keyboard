import createPage from './createPage.js';
import keyboard from './keyboard.js';

function setLocalStorage() {
  const lang = keyboard.getLanguage();
  localStorage.setItem('language', `${lang}`);
}

function getLocalStorage() {
  const lang = localStorage.getItem('language');
  keyboard.setLanguage(lang);
}

window.addEventListener('load', createPage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('keydown', keyboard.identifyKeyDown.bind(keyboard));
window.addEventListener('keyup', keyboard.identifyKeyUp.bind(keyboard));
window.addEventListener('mousedown', keyboard.identifyMouseDown.bind(keyboard));
window.addEventListener('mouseup', keyboard.identifyMouseUp.bind(keyboard));
