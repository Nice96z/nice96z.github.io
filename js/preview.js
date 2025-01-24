// js/preview.js

import { hexToRgba, rgbToHsl, rgbToHex, hslToRgb} from './utility.js';
let elements;

const init = (options = {}) => {
  elements = {
      previewBox: options.previewBox || document.getElementById('preview'),
      customPreviewBox: options.customPreviewBox || document.getElementById('custom-preview-box'),
        colorInput1: options.colorInput1 || document.getElementById('color1'),
          colorInput2: options.colorInput2 || document.getElementById('color2'),
            gradientTypeSelect: options.gradientTypeSelect || document.getElementById('gradient-type'),
              gradientDirectionSelect: options.gradientDirectionSelect || document.getElementById('gradient-direction-select'),
            opacityInput: options.opacityInput || document.getElementById('opacity'),
    }
}

const updatePreview = (color) => {
    elements.previewBox.style.backgroundColor = hexToRgba(color, elements.opacityInput.value);
    elements.previewBox.setAttribute('aria-label', `Color Preview: ${color}`);
    updateGradientPreview();
    updateCustomPreview();
}


const updateCustomPreview = () => {
  elements.customPreviewBox.style.backgroundColor = hexToRgba(elements.colorInput1.value, elements.opacityInput.value);
}

const updateGradientPreview = () => {
    const color1 = elements.colorInput1.value;
    const color2 = elements.colorInput2.value;
    const gradientType = elements.gradientTypeSelect.value;
    const gradientDirection = elements.gradientDirectionSelect.value;
    const opacity = parseFloat(elements.opacityInput.value);

    const rgba1 = hexToRgba(color1, opacity);
    const rgba2 = hexToRgba(color2, opacity);

    let gradientString;
    if (gradientType === 'linear') {
        gradientString = `linear-gradient(${gradientDirection}, ${rgba1}, ${rgba2})`;
    } else if (gradientType === 'radial') {
        gradientString = `radial-gradient(circle, ${rgba1}, ${rgba2})`;
    } else if (gradientType === 'conic') {
        gradientString = `conic-gradient(${rgba1}, ${rgba2})`;
    }
    elements.previewBox.style.background = gradientString;
};

const setGradient = () => {
        updateGradientPreview();
}


export { init, updatePreview, setGradient };