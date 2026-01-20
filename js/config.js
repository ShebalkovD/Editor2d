export const CONFIG = {
    FRAME_WIDTH: 8,
    FRAME_HEIGHT: 8,

    TOOLS: [
        {
            name: 'brush',
            label: 'Кисть'
        },
        {
            name: 'eraser',
            label: 'Ластик'
        }
    ],
    DEFAULT_TOOL: 'pen',

    DEFAULT_COLOR: '#000000'
};

CONFIG.PIXEL_AMOUNT = CONFIG.FRAME_WIDTH * CONFIG.FRAME_HEIGHT;
