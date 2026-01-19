const frame = document.querySelector('.frame')

const CURRENT_COLOR = 'red'

// fill frame with pixels
const FRAME_WIDTH = 8
const FRAME_HEIGHT = 8
const PIXEL_AMOUNT = FRAME_HEIGHT * FRAME_WIDTH

function fillFrame() {
    frame.style.gridTemplateColumns = `repeat(${FRAME_WIDTH}, 1fr)`
    
    for (let i = 0; i < PIXEL_AMOUNT; i++) {
        const newPixel = document.createElement('div')
        newPixel.className = 'pixel' 
        newPixel.setAttribute('oncontextmenu', 'return false;')
        newPixel.addEventListener(('mousedown'), (e) => {
            e.preventDefault()
    
            if (e.button === 0) {
                console.log('left')
                e.target.style.backgroundColor = CURRENT_COLOR
            }
    
            if (e.button === 2) {
                console.log('right')
                e.target.style.backgroundColor = 'transparent'
            }
        })
        frame.appendChild(newPixel)
    }
}

fillFrame()

// clear frame
const clearButton = document.getElementById('clear_button')
clearButton.addEventListener('click', () => {
    frame.innerHTML = ''
    fillFrame()
})