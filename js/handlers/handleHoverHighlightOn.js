import { APP_STATE } from '../main.js';

export function handleHoverHighlightOn(e) {
    e.preventDefault();
    const el = e.target;
    el.dataset.initialBG = el.style.backgroundColor;
    el.style.backgroundColor = APP_STATE.currentColor;
}
