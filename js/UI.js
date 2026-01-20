import { CONFIG } from './config.js';
import { APP_STATE } from './main.js';
import {
    handleClearOnMove,
    handleDrawOnMove,
    handlePixelHoverOff,
    handlePixelHoverOn,
    handlePixelClick
} from './handlers/index.js';

export class UI {
    constructor() {
        this.frame = document.querySelector('.frame');
        this.frameBG = document.querySelector('.frame_bg');
        this.paletteField = document.getElementById('color_palette');
        this.clearButton = document.getElementById('clear_button');
        this.toolContainer = document.querySelector('.tools');
    }

    // Заполнить фон холста
    fillFrameBG() {
        this.frameBG.style.gridTemplateColumns = `repeat(${CONFIG.FRAME_WIDTH}, 1fr)`;
        let isShifted = false; // Флаг для сдвига сетки фона

        for (let i = 0; i < CONFIG.PIXEL_AMOUNT; i++) {
            const newPixel = document.createElement('div');
            newPixel.classList = 'pixel_bg';

            // Сдвиг меняется на каждой строке сетки
            isShifted = i % CONFIG.FRAME_WIDTH === 0 ? isShifted : !isShifted;

            if (i % 2 === 0) {
                newPixel.style.backgroundColor = isShifted ? 'gray' : 'darkgray';
            } else {
                newPixel.style.backgroundColor = isShifted ? 'gray' : 'darkgray';
            }

            newPixel.setAttribute('oncontextmenu', 'return false;');

            this.frameBG.appendChild(newPixel);
        }
    }

    // Заполнить сетку холста
    fillFrame() {
        this.frame.style.gridTemplateColumns = `repeat(${CONFIG.FRAME_WIDTH}, 1fr)`;

        for (let i = 0; i < CONFIG.PIXEL_AMOUNT; i++) {
            const newPixel = document.createElement('div');
            newPixel.className = 'pixel';
            newPixel.setAttribute('oncontextmenu', 'return false;');
            newPixel.style.backgroundColor = 'transparent';

            newPixel.addEventListener('mousedown', handlePixelClick);

            // Подсветка пикселя при наведении
            newPixel.addEventListener('mouseenter', handlePixelHoverOn);
            newPixel.addEventListener('mouseleave', handlePixelHoverOff);

            this.frame.appendChild(newPixel);
        }
    }

    renderToolButtons() {
        CONFIG.TOOLS.forEach((tool) => {
            const newTool = document.createElement('button');
            newTool.setAttribute('id', tool.name);
            newTool.innerHTML = tool.label;
            newTool.addEventListener('click', () => {
                APP_STATE.tool = tool.name;
            });

            this.toolContainer.appendChild(newTool);
        });
    }

    // Добавить обработчики событий
    setEventListeners() {
        // Рисование при движении мыши
        this.frame.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                this.frame.addEventListener('mousemove', handleDrawOnMove);
            }

            if (e.button === 2) {
                this.frame.addEventListener('mousemove', handleClearOnMove);
            }
        });

        this.frame.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.frame.removeEventListener('mousemove', handleDrawOnMove);
            }

            if (e.button === 2) {
                this.frame.removeEventListener('mousemove', handleClearOnMove);
            }
        });

        // Выход из зоны холста
        this.frame.addEventListener('mouseleave', () => {
            this.frame.removeEventListener('mousemove', handleDrawOnMove);
            this.frame.removeEventListener('mousemove', handleClearOnMove);
        });

        // Очистка холста
        this.clearButton.addEventListener('click', () => {
            this.frame.innerHTML = '';
            this.fillFrame();
        });

        // Поменять текущий цвет
        this.paletteField.addEventListener('change', (e) => {
            APP_STATE.currentColor = e.target.value;
        });
    }

    // Вывод интерфейса, инициализация обработчиков
    init() {
        this.fillFrameBG();
        this.fillFrame();
        this.setEventListeners();

        this.paletteField.value = CONFIG.DEFAULT_COLOR;
        this.renderToolButtons();
    }
}
