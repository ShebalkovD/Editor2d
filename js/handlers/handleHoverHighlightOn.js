export function handleHoverHighlightOn(e) {
    e.preventDefault();
    const el = e.target;
    el.dataset.initialBG = el.style.backgroundColor;
    el.style.backgroundColor = this.currentColor;
}
