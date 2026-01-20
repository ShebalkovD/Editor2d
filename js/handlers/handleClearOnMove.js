export function handleClearOnMove(e) {
    e.preventDefault();
    const el = e.target;
    if (!el.classList.contains('pixel')) {
        return;
    }

    el.style.backgroundColor = 'transparent';
    el.dataset.initialBG = 'transparent';
}
