// js/main.js

// Import all module intializers first and event listener logic last to correctly build objects.
import * as colorWheel from './colorWheel.js';
import * as preview from './preview.js';
import * as recentColors from './recentColors.js';
import * as colorAdjustments from './colorAdjustments.js';
import * as aiSuggestions from './aiSuggestions.js';
import * as exportImport from './exportImport.js';
import * as eventListeners from './eventListeners.js';
import * as utility from './utility.js';
import * as colorDisplay from './colorDisplay.js'
import * as minimize from './minimize.js'
import * as theme from './theme.js'


const THROTTLE_DELAY = 50;

const el = {
    colorWheel: document.getElementById('color-wheel'),
    colorInput1: document.getElementById('color1'),
    colorInput2: document.getElementById('color2'),
    previewBox: document.getElementById('preview'),
    recentColorsContainer: document.getElementById('recent-colors-container'),
    gradientTypeSelect: document.getElementById('gradient-type'),
    gradientDirectionSelect: document.getElementById('gradient-direction-select'),
    brightnessInput: document.getElementById('brightness'),
    saturationInput: document.getElementById('saturation'),
    hueInput: document.getElementById('hue'),
    opacityInput: document.getElementById('opacity'),
    toggleThemeButton: document.getElementById('toggle-theme'),
    exportJsonButton: document.getElementById('export-json'),
    exportScssButton: document.getElementById('export-scss'),
    copyColorsButton: document.getElementById('copy-colors'),
    generateAiSuggestionsButton: document.getElementById('generate-ai-suggestions'),
    aiSuggestionsPanel: document.getElementById('ai-suggestions-panel'),
    aiSuggestionsList: document.getElementById('ai-suggestions-list'),
    selection1: document.getElementById('selection-1'),
    selection2: document.getElementById('selection-2'),
    maxRecentColorsInput: document.getElementById('maxRecentColors'),
    loadingIndicator: document.getElementById('loading'),
    hslValueDisplay: document.getElementById('hsl-value'),
    hexValueDisplay: document.getElementById('hex-value'),
    rgbValueDisplay: document.getElementById('rgb-value'),
    customPreviewBox: document.getElementById('custom-preview-box'),
    aiSuggestionTemplate: document.getElementById('ai-suggestion-item'), // Assuming you added this template
    minimizeButtons: document.querySelectorAll('.minimize-button'),
    minimizedTabsContainer: document.getElementById('minimized-tabs'),
    hamburgerIcon: document.getElementById('hamburger-icon'),
    minimizedTabs: document.getElementById('minimized-tabs')
};

// Initialize Modules passing all DOM elements they might need.

colorWheel.init({ colorWheel: el.colorWheel, previewBox: el.previewBox })
preview.init({ previewBox: el.previewBox, customPreviewBox: el.customPreviewBox, colorInput1: el.colorInput1, colorInput2: el.colorInput2, gradientTypeSelect: el.gradientTypeSelect, gradientDirectionSelect: el.gradientDirectionSelect, opacityInput: el.opacityInput })
recentColors.init({ recentColorsContainer: el.recentColorsContainer, maxRecentColorsInput: el.maxRecentColorsInput })
colorAdjustments.init({ brightnessInput: el.brightnessInput, saturationInput: el.saturationInput, hueInput: el.hueInput, colorInput1: el.colorInput1, colorInput2: el.colorInput2 })
aiSuggestions.init({ loadingIndicator: el.loadingIndicator, aiSuggestionsPanel: el.aiSuggestionsPanel, aiSuggestionsList: el.aiSuggestionsList, aiSuggestionTemplate: el.aiSuggestionTemplate })
exportImport.init({ exportJsonButton: el.exportJsonButton, exportScssButton: el.exportScssButton, copyColorsButton: el.copyColorsButton, colorInput1: el.colorInput1, colorInput2: el.colorInput2, opacityInput: el.opacityInput, brightnessInput: el.brightnessInput, saturationInput: el.saturationInput, hueInput: el.hueInput, gradientTypeSelect: el.gradientTypeSelect, gradientDirectionSelect: el.gradientDirectionSelect });
colorDisplay.init({ hslValueDisplay: el.hslValueDisplay, hexValueDisplay: el.hexValueDisplay, rgbValueDisplay: el.rgbValueDisplay })
minimize.init({ minimizeButtons: el.minimizeButtons, minimizedTabsContainer: el.minimizedTabsContainer, minimizedTabs: el.minimizedTabs });

eventListeners.init(el);

// Helper functions for module logic
const setActiveColor = (color) => {
    if (activeSelection === el.selection1) {
        el.colorInput1.value = color;
    } else {
        el.colorInput2.value = color;
    }
   updateAll()
};
const getActiveColor = () => activeSelection === el.selection1 ? el.colorInput1.value : el.colorInput2.value;

function updateAll() {
    preview.updatePreview(getActiveColor());
    updateColorDisplay(utility.hexToRgb(getActiveColor())); // call made here instead.
}

let activeSelection = el.selection1;

function setActiveSelection(selection) {
    if (activeSelection) activeSelection.classList.remove('active');
    activeSelection = selection;
    activeSelection.classList.add('active');
    updateAll()
}

// Event Listener Setup -- all Event handlers that are imported are called with currect logic modules.
// All calls made by listener are now redirected correctly

// Set Up Wheel Interactions (Moved eventListeners, they do nothing but handle the initial function called for events.)
eventListeners.attachWheelHandlers(
    {
        startDrag: colorWheel.startDrag,
        rotateWheel: colorWheel.rotateWheel,
        endDrag: colorWheel.endDrag,
        handleWheelClick: colorWheel.handleWheelClick,
        handleKeyDown: colorWheel.handleKeyDown
    },
    THROTTLE_DELAY);

eventListeners.attachColorInputHandlers(handleColorInputChange)
eventListeners.attachGradientHandlers(preview.setGradient);
eventListeners.attachOpacityHandler(updateAll);

eventListeners.attachAdjustmentsHandler(() => colorAdjustments.applyColorAdjustments(activeSelection, setActiveColor, preview.updatePreview, updateColorDisplay), colorAdjustments.updateAdjustmentDisplay) // remove other calls made else where as this now the master updater.

eventListeners.attachRecentColorHandlers(recentColors.setMaxRecentColors, () => recentColors.updateRecentColorsDisplay(setActiveColor)); // Update color function that changes based on recent selections
eventListeners.attachAiHandlers(() => aiSuggestions.generateAiColorSuggestions(setActiveColor));
eventListeners.attachExportHandlers(exportImport.exportJson, exportImport.exportScss, exportImport.copyColors, recentColors.recentColors);
eventListeners.attachThemeToggle(theme.toggleTheme);

eventListeners.attachActiveSelectionHandlers(setActiveSelection, setActiveSelection) // handles active selections logic.
eventListeners.attachHamburgerHandlers(minimize.toggleMinimizedTabs) //  for burger function;
// Logic set for minimize buttons and all relative function are in the `js/minimize.js module;`
minimize.attachMinimizeListeners()


// Handle setting Active and preview updates;
preview.setGradient();

// set intial state;
const init = () => {

    // all these will update by main on initial load. This logic here prevents re writes on intialize function.
    el.colorWheel.width = el.colorWheel.offsetWidth;
    el.colorWheel.height = el.colorWheel.offsetHeight
    colorWheel.drawColorWheel()

    updateAll();
    recentColors.updateRecentColorsDisplay(setActiveColor) // init recents display to stop uncalled functions and calls else where.
    minimize.updateMinimizedTabsVisibility()
}
init()

function handleColorInputChange(event) {
    const color = event.target.value;
    if (utility.isValidColor(color)) {
        setActiveColor(color);
        recentColors.addToRecentColors(color);
        if (event.target === el.colorInput2) {
            preview.setGradient();
        }
    }

}


// Colorwheel updates state for preview.
el.previewBox.addEventListener('colorWheelMove', (e) => {
  const { currentHue, currentSaturation } = e.detail;

    let rgb = utility.hslToRgb({ h: currentHue, s: currentSaturation, l: 0.5 })
    setActiveColor(utility.rgbToHex(rgb));

})


// Initial draw when the page loads to render all module initial settings.
document.addEventListener('DOMContentLoaded', init);
// Color Dislpay to module as logic
function updateColorDisplay (rgb) {
 colorDisplay.updateColorDisplay(rgb); // Updates colors for user display in the main UI element for user.
 }