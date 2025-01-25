// js/aiSuggestions.js
import { generateColormindSuggestions } from './api.js';

let elements;

const init = (options = {}) => {
    elements = {
      loadingIndicator: options.loadingIndicator || document.getElementById('loading'),
      aiSuggestionsPanel: options.aiSuggestionsPanel || document.getElementById('ai-suggestions-panel'),
      aiSuggestionsList: options.aiSuggestionsList || document.getElementById('ai-suggestions-list'),
        aiSuggestionTemplate: options.aiSuggestionTemplate || document.getElementById('ai-suggestion-item')
        // other possible options might need refactoring here.
    };
};
async function generateAiColorSuggestions(setActiveColor) {

    elements.loadingIndicator.classList.remove('hidden');
    elements.aiSuggestionsPanel.setAttribute('aria-hidden', 'false');

    try {
        const colormindPalette = await generateColormindSuggestions();
        elements.aiSuggestionsList.innerHTML = '';
       
       if (colormindPalette && colormindPalette.length > 0) {
        colormindPalette.forEach(color => {
             const suggestionElement = elements.aiSuggestionTemplate.content.cloneNode(true).querySelector('.ai-suggestion');
          suggestionElement.style.backgroundColor = color;
            suggestionElement.setAttribute('aria-label', `AI suggested color: ${color}`);
             suggestionElement.addEventListener('click', () => setActiveColor(color)); // function for picking set color to be used by main
          elements.aiSuggestionsList.appendChild(suggestionElement);
           });
           } else {
            elements.aiSuggestionsList.innerHTML = '<p>No Colormind suggestions found.</p>';
         }

    } catch (error) {
        console.error("Error fetching AI suggestions:", error);
       elements.aiSuggestionsList.innerHTML = '<p>Failed to fetch AI color suggestions. Please check your network connection.</p>';
     } finally {
    elements.loadingIndicator.classList.add('hidden');
    }

}


export { init, generateAiColorSuggestions };