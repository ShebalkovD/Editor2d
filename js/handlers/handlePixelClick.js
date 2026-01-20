import { APP_STATE } from '../main.js';

const FRAME = document.querySelector('.frame');

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

// Find an element where 'data-id' is exactly "box1"
// const element2 = document.querySelector('[data-id="box1"]');

function fillClick(el, startColor, timeoutID) {
    if (!el) return;

    if (!startColor) {
        startColor = el.dataset.initialBG;
    }

    el.style.backgroundColor = APP_STATE.currentColor;
    el.dataset.initialBG = APP_STATE.currentColor;

    const start_coordinates = el.dataset.coordinates.split(',');
    const start_x = Number(start_coordinates[0]);
    const start_y = Number(start_coordinates[1]);

    const pixelsAround = [];

    // Найти пиксели вокруг
    const pixelTop = FRAME.querySelector(`[data-coordinates="${start_x},${start_y - 1}"]`);
    const pixelRight = FRAME.querySelector(`[data-coordinates="${start_x + 1},${start_y}"]`);
    const pixelBottom = FRAME.querySelector(`[data-coordinates="${start_x},${start_y + 1}"]`);
    const pixelLeft = FRAME.querySelector(`[data-coordinates="${start_x - 1},${start_y}"]`);

    // Если пиксели того же цвета
    if (!!pixelTop && pixelTop.style.backgroundColor === startColor) {
        pixelsAround.push(pixelTop);
    }
    if (!!pixelRight && pixelRight.style.backgroundColor === startColor) {
        pixelsAround.push(pixelRight);
    }
    if (!!pixelBottom && pixelBottom.style.backgroundColor === startColor) {
        pixelsAround.push(pixelBottom);
    }
    if (!!pixelLeft && pixelLeft.style.backgroundColor === startColor) {
        pixelsAround.push(pixelLeft);
    }

    pixelsAround.forEach((pixel) => {
        if (!pixel) return;
        pixel.style.backgroundColor = APP_STATE.currentColor;
        pixel.dataset.initialBG = APP_STATE.currentColor;
        const timeout = setTimeout(() => fillClick(pixel, startColor, timeout), 5);
    });

    if (timeoutID) {
        clearTimeout(timeoutID);
    }
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
        case 'fill':
            fillClick(e.target);
            break;

        default:
            break;
    }
}
