import { CONFIG } from '../config.js';

export function handleResizeFrame(ui) {
    const width = ui.frameWidthField.value;
    const height = ui.frameHeightField.value;

    CONFIG.FRAME_WIDTH = width;
    CONFIG.FRAME_HEIGHT = height;

    ui.frameBG.innerHTML = '';
    ui.frame.innerHTML = '';
    ui.fillFrameBG();
    ui.fillFrame();
}
