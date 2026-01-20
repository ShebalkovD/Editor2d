import { APP_STATE } from '../main.js';

export function handleDrawOnMove(e) {
    e.preventDefault();
    const el = e.target;
    if (!el.classList.contains('pixel')) {
        return;
    }

    el.style.backgroundColor = APP_STATE.currentColor;
    el.dataset.initialBG = APP_STATE.currentColor;
}
