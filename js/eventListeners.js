// js/eventListeners.js
import {throttle, debounce} from './utility.js';
let elements = {};

const init = (options) => {
    elements = {
      colorWheel: options.colorWheel || document.getElementById('color-wheel'),
        colorInput1: options.colorInput1 || document.getElementById('color1'),
       colorInput2: options.colorInput2 || document.getElementById('color2'),
      gradientTypeSelect: options.gradientTypeSelect || document.getElementById('gradient-type'),
        gradientDirectionSelect: options.gradientDirectionSelect || document.getElementById('gradient-direction-select'),
      opacityInput: options.opacityInput || document.getElementById('opacity'),
       brightnessInput: options.brightnessInput || document.getElementById('brightness'),
      saturationInput: options.saturationInput || document.getElementById('saturation'),
     hueInput: options.hueInput || document.getElementById('hue'),
      maxRecentColorsInput: options.maxRecentColorsInput || document.getElementById('maxRecentColors'),
       generateAiSuggestionsButton: options.generateAiSuggestionsButton || document.getElementById('generate-ai-suggestions'),
      exportJsonButton: options.exportJsonButton || document.getElementById('export-json'),
     exportScssButton: options.exportScssButton || document.getElementById('export-scss'),
     copyColorsButton: options.copyColorsButton || document.getElementById('copy-colors'),
     toggleThemeButton: options.toggleThemeButton || document.getElementById('toggle-theme'),
     selection1: options.selection1 || document.getElementById('selection-1'),
    selection2: options.selection2 || document.getElementById('selection-2'),
        previewBox: options.previewBox || document.getElementById('preview'), // Added this line.
          minimizedTabs:  options.minimizedTabs  ||  document.getElementById('minimized-tabs'),
      hamburgerIcon:  options.hamburgerIcon || document.getElementById('hamburger-icon')
    }
};
// Helper for this specific use case. this will only affect colorwheel.js logic
const attachWheelHandlers = ({startDrag, rotateWheel, endDrag, handleWheelClick, handleKeyDown},THROTTLE_DELAY ) => {
      elements.colorWheel.addEventListener('mousedown', (e) => { startDrag(); rotateWheel(e,THROTTLE_DELAY); elements.colorWheel.focus(); });
    elements.colorWheel.addEventListener('mousemove', (e) => rotateWheel(e,THROTTLE_DELAY) );
      window.addEventListener('mouseup', endDrag);
      elements.colorWheel.addEventListener('touchstart', (e) => { startDrag(); rotateWheel(e,THROTTLE_DELAY); e.preventDefault(); elements.colorWheel.focus(); });
    elements.colorWheel.addEventListener('touchmove', (e) => { rotateWheel(e,THROTTLE_DELAY); e.preventDefault(); });
    elements.colorWheel.addEventListener('touchend',  endDrag);
    elements.colorWheel.addEventListener('click',  handleWheelClick);
    elements.colorWheel.addEventListener('keydown', handleKeyDown);
    elements.colorWheel.addEventListener('blur', () => elements.colorWheel.style.outline = '');
    elements.colorWheel.addEventListener('focus', () => elements.colorWheel.style.outline = '2px solid var(--color-accent)');
};
const attachColorInputHandlers = (handleColorInputChange) => {
    elements.colorInput1.addEventListener('input', handleColorInputChange);
  elements.colorInput2.addEventListener('input', handleColorInputChange);
};
const attachGradientHandlers = (setGradient) => {
        elements.gradientTypeSelect.addEventListener('change', setGradient);
    elements.gradientDirectionSelect.addEventListener('change', setGradient);
}
const attachOpacityHandler = (updatePreview) => {
   elements.opacityInput.addEventListener('input', (e) => {
        updatePreview();
         elements.previewBox.setAttribute('aria-valuenow', e.target.value);
});
}
const attachAdjustmentsHandler = (applyColorAdjustments, updateAdjustmentDisplay) => {
    elements.brightnessInput.addEventListener('input', () => {
        updateAdjustmentDisplay()
        applyColorAdjustments()});
     elements.saturationInput.addEventListener('input',() => {
      updateAdjustmentDisplay();
        applyColorAdjustments()});
    elements.hueInput.addEventListener('input',() => {
         updateAdjustmentDisplay();
          applyColorAdjustments()});
}
const attachRecentColorHandlers = (setMaxRecentColors,updateRecentColorsDisplay) => {
     elements.maxRecentColorsInput.addEventListener('input', debounce(() => {
         setMaxRecentColors();
         updateRecentColorsDisplay();
      }, 300));
}

const attachAiHandlers = (generateAiColorSuggestions) => {
   elements.generateAiSuggestionsButton.addEventListener('click', generateAiColorSuggestions);
};

const attachExportHandlers = (exportJson,exportScss,copyColors, recentColors) => {
    elements.exportJsonButton.addEventListener('click', () =>  exportJson(recentColors));
   elements.exportScssButton.addEventListener('click',  exportScss);
   elements.copyColorsButton.addEventListener('click', copyColors);

}
const attachThemeToggle = (toggleTheme) => {
  elements.toggleThemeButton.addEventListener('click', () => toggleTheme());

};

const attachActiveSelectionHandlers = (setActiveSelection, setActive) => {
    elements.selection1.addEventListener('click', () => setActiveSelection(elements.selection1));
     elements.selection2.addEventListener('click', () => setActiveSelection(elements.selection2));
      setActive(elements.selection1) // intialize active style;
}
const attachHamburgerHandlers = (toggleMinimizedTabs) => {
    elements.hamburgerIcon.addEventListener('click', toggleMinimizedTabs);

}



export {init, attachWheelHandlers, attachColorInputHandlers, attachGradientHandlers,
        attachOpacityHandler,attachAdjustmentsHandler,
        attachRecentColorHandlers, attachAiHandlers, attachExportHandlers,
        attachThemeToggle,attachActiveSelectionHandlers,attachHamburgerHandlers};