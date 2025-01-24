// js/recentColors.js
let recentColors = [];
const DEFAULT_MAX_RECENT_COLORS = 5;
let maxRecentColors = DEFAULT_MAX_RECENT_COLORS;
let elements
const init = (options = {}) => {
    elements = {
       recentColorsContainer: options.recentColorsContainer || document.getElementById('recent-colors-container'),
           maxRecentColorsInput: options.maxRecentColorsInput || document.getElementById('maxRecentColors')
       }
}

const updateRecentColorsDisplay = (setActiveColor) => {
  elements.recentColorsContainer.innerHTML = '';
    recentColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.classList.add('color-swatch');
        swatch.style.backgroundColor = color;
        swatch.setAttribute('tabindex', '0');
      swatch.setAttribute('aria-label', `Recent color: ${color}`);
        swatch.addEventListener('click', () => setActiveColor(color));
        elements.recentColorsContainer.appendChild(swatch);
    });
};

const addToRecentColors = (color) => {
   if (!recentColors.includes(color)) {
        recentColors.unshift(color);
        if (recentColors.length > maxRecentColors) {
            recentColors.pop();
        }
    }
};

const setMaxRecentColors = () => {
    maxRecentColors = parseInt(elements.maxRecentColorsInput.value) || DEFAULT_MAX_RECENT_COLORS;
    recentColors = recentColors.slice(0, maxRecentColors);
    // updateRecentColorsDisplay(); Called from main due to callback.
};

export {init, updateRecentColorsDisplay, addToRecentColors, setMaxRecentColors };
export { recentColors };