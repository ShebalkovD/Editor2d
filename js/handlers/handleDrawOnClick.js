export function handleDrawOnClick(e) {
    e.preventDefault();

    if (e.button === 0) {
        e.target.style.backgroundColor = this.currentColor;
        e.target.dataset.initialBG = this.currentColor;
    }

    if (e.button === 2) {
        e.target.style.backgroundColor = 'transparent';
        e.target.dataset.initialBG = 'transparent';
    }
}
