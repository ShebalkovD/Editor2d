const frame = document.querySelector('.frame')
const frameBG = document.querySelector('.frame_bg')

const palette_field = document.getElementById('color_palette')

let currentColor = '#000'
palette_field.value = currentColor

// fill frame with pixels
const FRAME_WIDTH = 8
const FRAME_HEIGHT = 8
const PIXEL_AMOUNT = FRAME_HEIGHT * FRAME_WIDTH

function fillFrameBG() {
    frameBG.style.gridTemplateColumns = `repeat(${FRAME_WIDTH}, 1fr)`

    let isShifted = false // Флаг для сдвига сетки фона

    for (let i = 0; i < PIXEL_AMOUNT; i++) {
        const newPixel = document.createElement('div')
        newPixel.classList = 'pixel_bg' 
        isShifted = i % FRAME_WIDTH === 0 ? isShifted : !isShifted
        
        if ( i % 2 === 0) {
            newPixel.style.backgroundColor = isShifted ? 'gray' : 'darkgray'
        } else {
            newPixel.style.backgroundColor = isShifted ? 'gray' : 'darkgray'
        }
        
        newPixel.setAttribute('oncontextmenu', 'return false;')
        
        frameBG.appendChild(newPixel)
    }
}

function fillFrame() {
    frame.style.gridTemplateColumns = `repeat(${FRAME_WIDTH}, 1fr)`

    for (let i = 0; i < PIXEL_AMOUNT; i++) {
        const newPixel = document.createElement('div')
        newPixel.className = 'pixel' 
        newPixel.setAttribute('oncontextmenu', 'return false;')
        newPixel.style.backgroundColor = 'transparent'
        newPixel.addEventListener('mousedown', (e) => {
            e.preventDefault()
    
            if (e.button === 0) {
                console.log('left')
                e.target.style.backgroundColor = currentColor
                e.target.dataset.initialBG = currentColor
            }
    
            if (e.button === 2) {
                console.log('right')
                e.target.style.backgroundColor = 'transparent'
                e.target.dataset.initialBG = 'transparent'
            }
        })

        newPixel.addEventListener('mouseenter', (e) => {
            e.preventDefault()
            const el = e.target
            el.dataset.initialBG = el.style.backgroundColor
            el.style.backgroundColor = currentColor
        })

        newPixel.addEventListener('mouseleave', (e) => {
            e.preventDefault()
            const el = e.target
            el.style.backgroundColor = el.dataset.initialBG
        })

        frame.appendChild(newPixel)
    }

    function drawOnMove(e) {
        e.preventDefault()
        const el = e.target
        if (!el.classList.contains('pixel')) return
                
        el.style.backgroundColor = currentColor
        el.dataset.initialBG = currentColor
    }

    function clearOnMove(e) {
        e.preventDefault()
        const el = e.target
        if (!el.classList.contains('pixel')) return
                
        el.style.backgroundColor = 'transparent'
        el.dataset.initialBG = 'transparent'
    }

    frame.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            frame.addEventListener('mousemove', drawOnMove)
        }
    
        if (e.button === 2) {
           frame.addEventListener('mousemove', clearOnMove)
        }
    })

    frame.addEventListener('mouseup', (e) => {
       if (e.button === 0) {
            frame.removeEventListener('mousemove', drawOnMove)
        }
    
        if (e.button === 2) {
           frame.removeEventListener('mousemove', clearOnMove)
        }
    })

    frame.addEventListener('mouseleave', () => {
        frame.removeEventListener('mousemove', drawOnMove)
        frame.removeEventListener('mousemove', clearOnMove)
    })
}

palette_field.addEventListener('change', (e) => {
    currentColor = e.target.value
})

fillFrameBG()
fillFrame()

// clear frame
const clearButton = document.getElementById('clear_button')
clearButton.addEventListener('click', () => {
    frame.innerHTML = ''
    fillFrame()
})