import { APP_STATE } from '../main.js';

export function handleDrawOnClick(e) {
    e.preventDefault();

    if (e.button === 0) {
        e.target.style.backgroundColor = APP_STATE.currentColor;
        e.target.dataset.initialBG = APP_STATE.currentColor;
    }

    if (e.button === 2) {
        e.target.style.backgroundColor = 'transparent';
        e.target.dataset.initialBG = 'transparent';
    }
}
