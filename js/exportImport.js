// js/exportImport.js
let elements;
const init = (options = {}) => {
  elements = {
    exportJsonButton: options.exportJsonButton || document.getElementById('export-json'),
    exportScssButton: options.exportScssButton || document.getElementById('export-scss'),
    copyColorsButton: options.copyColorsButton || document.getElementById('copy-colors'),
    colorInput1: options.colorInput1 || document.getElementById('color1'),
    colorInput2: options.colorInput2 || document.getElementById('color2'),
    opacityInput: options.opacityInput || document.getElementById('opacity'),
    brightnessInput: options.brightnessInput || document.getElementById('brightness'),
    saturationInput: options.saturationInput || document.getElementById('saturation'),
    hueInput: options.hueInput || document.getElementById('hue'),
      gradientTypeSelect: options.gradientTypeSelect || document.getElementById('gradient-type'),
       gradientDirectionSelect: options.gradientDirectionSelect || document.getElementById('gradient-direction-select')
    };
};


const downloadFile = (content, fileName, contentType) => {
  const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
};


const exportJson = (recentColors) => {
 const colors = {
      color1: elements.colorInput1.value,
      color2: elements.colorInput2.value,
        opacity: elements.opacityInput.value,
    brightness: elements.brightnessInput.value,
     saturation: elements.saturationInput.value,
      hue: elements.hueInput.value,
       gradientType: elements.gradientTypeSelect.value,
    gradientDirection: elements.gradientDirectionSelect.value,
        recentColors
    };
  downloadFile(JSON.stringify(colors, null, 2), 'colors.json', 'application/json');
};

const exportScss = () => {
   const scssString = `$color1: ${elements.colorInput1.value};\n$color2: ${elements.colorInput2.value};\n$opacity: ${elements.opacityInput.value};\n$brightness: ${elements.brightnessInput.value};\n$saturation: ${elements.saturationInput.value};\n$hue: ${elements.hueInput.value};\n$gradientType: ${elements.gradientTypeSelect.value};\n$gradientDirection: ${elements.gradientDirectionSelect.value};`;
   downloadFile(scssString, 'colors.scss', 'text/scss');
};

const copyColors = () => {
 const colors = {
        color1: elements.colorInput1.value,
        color2: elements.colorInput2.value,
         opacity: elements.opacityInput.value,
          brightness: elements.brightnessInput.value,
        saturation: elements.saturationInput.value,
        hue: elements.hueInput.value,
     gradientType: elements.gradientTypeSelect.value,
   gradientDirection: elements.gradientDirectionSelect.value
   };
  navigator.clipboard.writeText(JSON.stringify(colors, null, 2))
        .then(() => alert('Colors copied to clipboard!'))
    .catch(err => console.error('Failed to copy: ', err));
};


export {init, exportJson, exportScss, copyColors};