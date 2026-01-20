import { APP_STATE } from '../main.js';

export function handlePixelHoverOn(e) {
    e.preventDefault();

    if (APP_STATE.tool === 'eraser') return;

    const el = e.target;
    el.dataset.initialBG = el.style.backgroundColor;
    el.style.backgroundColor = APP_STATE.currentColor;
}
