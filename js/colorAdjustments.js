// js/colorAdjustments.js
import { clamp, hslToRgb, rgbToHsl, rgbToHex, hexToRgb } from './utility.js';

let elements;

const init = (options = {}) => {
    elements = {
        brightnessInput: options.brightnessInput || document.getElementById('brightness'),
        saturationInput: options.saturationInput || document.getElementById('saturation'),
        hueInput: options.hueInput || document.getElementById('hue'),
        colorInput1: options.colorInput1 || document.getElementById('color1'),
        colorInput2: options.colorInput2 || document.getElementById('color2'),
    }
};


const applyColorAdjustments = (activeSelection, setActiveColor, updatePreview, updateColorDisplay) => {
    const currentHexColor = activeSelection === elements.colorInput1 ? elements.colorInput1.value : elements.colorInput2.value;

    const currentRgb = hexToRgb(currentHexColor);

    if (!currentRgb) return; // Exit if color is invalid

    let hsl = rgbToHsl(currentRgb);

    hsl.l = clamp(parseFloat(elements.brightnessInput.value) / 100 + 0.5, 0, 1);
    hsl.s = clamp(parseFloat(elements.saturationInput.value) / 100 + 0.5, 0, 1);
    hsl.h = parseInt(elements.hueInput.value, 10);

    const rgb = hslToRgb(hsl);
    const hexColor = rgbToHex(rgb);
    setActiveColor(hexColor); // main.js has control of how color selection work.
    updatePreview(hexColor);
    updateColorDisplay(rgb)
};


const updateAdjustmentDisplay = () => {
    elements.brightnessInput.setAttribute('aria-valuenow', elements.brightnessInput.value);
    elements.saturationInput.setAttribute('aria-valuenow', elements.saturationInput.value);
    elements.hueInput.setAttribute('aria-valuenow', elements.hueInput.value);

}


export { init, applyColorAdjustments, updateAdjustmentDisplay};