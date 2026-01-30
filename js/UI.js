import { CONFIG } from './config.js';
import { APP_STATE } from './main.js';
import { hexToRGB } from './utils/hexToRGB.js';

export class UI {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.paletteField = document.getElementById('color_palette');
        this.clearButton = document.getElementById('clear_button');
        this.toolContainer = document.querySelector('.tools');

        this.canvas.setAttribute('width', `${CONFIG.CANVAS_WIDTH}`);
        this.canvas.setAttribute('height', `${CONFIG.CANVAS_HEIGHT}`);

        this.pixelSize = CONFIG.CANVAS_WIDTH / CONFIG.GRID_SIZE;
    }

    setEventListeners() {
        this.canvas.addEventListener('mousedown', () => {
            APP_STATE.draw = true;
        });

        this.canvas.addEventListener('mouseup', () => {
            APP_STATE.draw = false;
        });

        this.canvas.addEventListener('mousemove', (event) => {
            if (APP_STATE.draw) {
                const mouse = {
                    x: event.x - event.target.offsetLeft - 10,
                    y: event.y - event.target.offsetTop - 10
                };

                const pixelX = Math.floor(mouse.x / this.pixelSize);
                const pixelY = Math.floor(mouse.y / this.pixelSize);

                this.ctx.fillRect(
                    pixelX * this.pixelSize,
                    pixelY * this.pixelSize,
                    this.pixelSize,
                    this.pixelSize
                );
            }
        });
    }

    renderToolButtons() {
        CONFIG.TOOLS.forEach((tool) => {
            const newTool = document.createElement('button');
            newTool.classList.add('tool');
            newTool.setAttribute('id', tool.name);
            newTool.innerHTML = tool.label;
            if (tool.name === CONFIG.DEFAULT_TOOL) {
                newTool.classList.add('active');
            }

            newTool.addEventListener('click', (e) => {
                APP_STATE.tool = tool.name;
                this.tools.forEach((tool) => {
                    tool.classList.remove('active');
                });
                e.target.classList.add('active');
            });

            this.toolContainer.appendChild(newTool);
        });

        this.tools = document.querySelectorAll('.tool');
    }

    init() {
        this.ctx.fillStyle = CONFIG.DEFAULT_COLOR;
        this.paletteField.value = hexToRGB(CONFIG.DEFAULT_COLOR);
        this.renderToolButtons();
        this.setEventListeners();
    }
}
