export function handleHoverHighlightOff(e) {
    e.preventDefault();
    const el = e.target;
    el.style.backgroundColor = el.dataset.initialBG;
}