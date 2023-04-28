import createPage from './createPage.js';
import keyboard from './keyboard.js';

window.addEventListener('load', createPage);
window.addEventListener('keydown', keyboard.identifyKeyDown.bind(keyboard));
window.addEventListener('keyup', keyboard.cancelLangSwitch.bind(keyboard));
