import { APP_STATE } from '../main.js';

function brushClick(e) {
    if (e.button === 0) {
        e.target.style.backgroundColor = APP_STATE.currentColor;
        e.target.dataset.initialBG = APP_STATE.currentColor;
    }

    if (e.button === 2) {
        e.target.style.backgroundColor = 'transparent';
        e.target.dataset.initialBG = 'transparent';
    }
}

function eraserClick(e) {
    e.target.style.backgroundColor = 'transparent';
    e.target.dataset.initialBG = 'transparent';
}

export function handlePixelClick(e) {
    e.preventDefault();

    switch (APP_STATE.tool) {
        case 'brush':
            brushClick(e);
            break;
        case 'eraser':
            eraserClick(e);
            break;

        default:
            break;
    }
}
