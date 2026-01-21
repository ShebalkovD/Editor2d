import { APP_STATE } from '../main.js';
import { hexToRGB } from '../utils/hexToRGB.js';

const FRAME = document.querySelector('.frame');

function brushClick(e) {
    if (e.button === 0) {
        e.target.style.backgroundColor = hexToRGB(APP_STATE.currentColor);
        e.target.dataset.initialBG = hexToRGB(APP_STATE.currentColor);
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

function fillClick(el, startColor, currentColor, timeoutID) {
    if (!el) return;

    if (!startColor) {
        startColor = hexToRGB(el.dataset.initialBG);
    }

    if (!currentColor) {
        currentColor = hexToRGB(APP_STATE.currentColor);
    }

    if (startColor === currentColor) return;

    if (timeoutID) {
        clearTimeout(timeoutID);
    }

    el.style.backgroundColor = currentColor;
    el.dataset.initialBG = currentColor;

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

    if (pixelsAround.length <= 0) return;

    pixelsAround.forEach((pixel) => {
        if (!pixel) return;
        pixel.style.backgroundColor = currentColor;
        pixel.dataset.initialBG = currentColor;
        const timeout = setTimeout(() => fillClick(pixel, startColor, currentColor, timeout), 5);
    });
}

export function handlePixelClick(e) {
    e.preventDefault();

    if (!e.target.classList.contains('pixel')) return;

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
