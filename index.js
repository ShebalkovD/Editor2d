const frame = document.querySelector('.frame')

// fill frame with pixels
const FRAME_WIDTH = 8
const FRAME_HEIGHT = 8
const PIXEL_AMOUNT = FRAME_HEIGHT * FRAME_WIDTH

frame.style.gridTemplateColumns = `repeat(${FRAME_WIDTH}, 1fr)`

for (let i = 0; i < PIXEL_AMOUNT; i++) {
    const newPixel = document.createElement('div')
    newPixel.className = 'pixel' 
    frame.appendChild(newPixel)
}