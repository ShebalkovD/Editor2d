import { CONFIG } from './config.js';
import { UI } from './UI.js';

export const APP_STATE = {
    currentColor: CONFIG.DEFAULT_COLOR,
    tool: CONFIG.DEFAULT_TOOL,
    draw: false
};

const ui = new UI();
ui.init();
