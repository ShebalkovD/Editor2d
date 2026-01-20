import { CONFIG } from './config.js';
import { UI } from './UI.js';

export const APP_STATE = {
    currentColor: CONFIG.DEFAULT_COLOR
};

const screen = new UI();
screen.init();
