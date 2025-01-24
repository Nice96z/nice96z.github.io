import { rgbToHex, rgbToHsl } from "./utility.js";
let elements;

const init = (options = {}) => {
     elements = {
          hslValueDisplay: options.hslValueDisplay || document.getElementById('hsl-value'),
        hexValueDisplay: options.hexValueDisplay || document.getElementById('hex-value'),
        rgbValueDisplay: options.rgbValueDisplay || document.getElementById('rgb-value'),

      };
};


const updateColorDisplay = ({r, g, b}) => {

      const hex = rgbToHex({r,g,b});
  const hsl = rgbToHsl({r,g,b});
    elements.hslValueDisplay.textContent = `(${hsl.h.toFixed(0)}, ${(hsl.s*100).toFixed(0)}%, ${(hsl.l*100).toFixed(0)}%)`;
     elements.hexValueDisplay.textContent = hex;
    elements.rgbValueDisplay.textContent = `(${r}, ${g}, ${b})`;

}


export {init, updateColorDisplay}