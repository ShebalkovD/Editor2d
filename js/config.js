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
        },
        {
            name: 'fill',
            label: 'Заливка'
        }
    ],
    DEFAULT_TOOL: 'brush',

    DEFAULT_COLOR: 'rgb(0, 0, 0)'
};

CONFIG.PIXEL_AMOUNT = CONFIG.FRAME_WIDTH * CONFIG.FRAME_HEIGHT;
