// js/colorWheel.js
import { clamp, hslToRgb, rgbToHex } from './utility.js';

const INDICATOR_RADIUS = 8;

let currentHue = 0;
let currentSaturation = 0.5;
let currentBrightness = 0.5;
let isDragging = false;
let wheelSize;
let colorWheelCache = null;
let ctx = null;

// Store the DOM elements you're using inside the module
let elements;
const init = (options = {}) => {
  elements = {
    colorWheel: options.colorWheel || document.getElementById('color-wheel'),
    previewBox: options.previewBox || document.getElementById('preview')
    // color inputs need no setup here, color picker module deals with them, but it might change later, so a way to set them would be good for refactoring.
  }
  // make a context as we cannot be sure what gets sent through to options
  ctx = elements.colorWheel.getContext('2d')
  wheelSize = elements.colorWheel.offsetWidth
}


// export const setColorInputs = ({colorInput1, colorInput2}) => {

// }

const drawColorWheel = () => {
    wheelSize = elements.colorWheel.offsetWidth;
    const centerX = wheelSize / 2;
    const centerY = wheelSize / 2;
    const radius = wheelSize / 2;

    ctx.clearRect(0, 0, wheelSize, wheelSize);
     // Use cache to draw wheel quicker
    if (colorWheelCache) {
        ctx.putImageData(colorWheelCache, 0, 0);
    } else {
        for (let y = 0; y < wheelSize; y++) {
            for (let x = 0; x < wheelSize; x++) {
                const dx = x - centerX;
                const dy = y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= radius) {
                    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                    const hue = (angle + 360) % 360;
                    const saturation = distance / radius;
                    const rgb = hslToRgb({ h: hue, s: saturation, l: 0.5 });
                    ctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
       colorWheelCache = ctx.getImageData(0, 0, wheelSize, wheelSize);
    }

    drawSelectionIndicator();
}

const drawSelectionIndicator = () => {
  const { offsetWidth: wheelSize } = elements.colorWheel;
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const radius = wheelSize / 2;

  const rad = currentHue * Math.PI / 180;
  const indicatorRadius = radius * currentSaturation;
  const indicatorX = centerX + indicatorRadius * Math.cos(rad);
  const indicatorY = centerY + indicatorRadius * Math.sin(rad);

  ctx.beginPath();
  ctx.arc(indicatorX, indicatorY, INDICATOR_RADIUS, 0, 2 * Math.PI);

  // Set the stroke style to provide contrast
  ctx.strokeStyle = document.body.classList.contains('dark-mode') ? 'white' : 'black';
  ctx.lineWidth = 2; // Add a line width for better visibility


  ctx.stroke();
}

const handleWheelClick = (event) => {
  const bounds = elements.colorWheel.getBoundingClientRect();
  const x = event.clientX - bounds.left - (wheelSize / 2);
  const y = event.clientY - bounds.top - (wheelSize / 2);
  const distance = Math.sqrt(x * x + y * y);
  if (distance <= wheelSize / 2) {
      let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      currentHue = (angle + 360) % 360;
      currentSaturation = clamp(distance / (wheelSize / 2), 0, 1);
      drawColorWheel();
      // Update Preview should be handled from main.js to prevent over use and re writing modules
       elements.previewBox.dispatchEvent(new CustomEvent('colorWheelMove', {
           detail: getSelectedColorValues()
       }))
   }
};

const handleKeyDown = (event) => {
    switch (event.key) {
        case 'ArrowLeft': currentHue = (currentHue - 5 + 360) % 360; break;
        case 'ArrowRight': currentHue = (currentHue + 5) % 360; break;
        case 'ArrowUp': currentSaturation = Math.min(1, currentSaturation + 0.05); break;
        case 'ArrowDown': currentSaturation = Math.max(0, currentSaturation - 0.05); break;
        default: return;
    }
  drawColorWheel();
      // Update Preview should be handled from main.js to prevent over use and re writing modules
  elements.previewBox.dispatchEvent(new CustomEvent('colorWheelMove', {
      detail: getSelectedColorValues()
    }))
}
// move to global settings object.
const rotateWheel = (event, THROTTLE_DELAY) => {
   // Set a drag var to prevent overuse if this runs quickly
    if (!isDragging) return;
     const bounds = elements.colorWheel.getBoundingClientRect();
    const clientX = event.clientX !== undefined ? event.clientX : event.touches[0].clientX;
    const clientY = event.clientY !== undefined ? event.clientY : event.touches[0].clientY;

    const x = clientX - bounds.left - (wheelSize / 2);
    const y = clientY - bounds.top - (wheelSize / 2);

    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    currentHue = (angle + 360) % 360;
    currentSaturation = clamp(Math.sqrt(x * x + y * y) / (wheelSize / 2), 0, 1);
    drawColorWheel();
        // Update Preview should be handled from main.js to prevent over use and re writing modules
  elements.previewBox.dispatchEvent(new CustomEvent('colorWheelMove', {
          detail: getSelectedColorValues()
        }))
  }
  const startDrag = () => isDragging = true
  const endDrag = () => isDragging = false

    const getSelectedColorValues = () => ({ currentHue, currentSaturation, currentBrightness})


export { init, drawColorWheel, startDrag, rotateWheel, endDrag, handleWheelClick, handleKeyDown, getSelectedColorValues };