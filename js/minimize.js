//js/minimize.js
let elements;

const init = (options = {}) => {
    elements = {
         minimizeButtons: options.minimizeButtons || document.querySelectorAll('.minimize-button'),
         minimizedTabsContainer: options.minimizedTabsContainer || document.getElementById('minimized-tabs'),
        minimizedTabs: options.minimizedTabs ||  document.getElementById('minimized-tabs')
    };
};

// Function to handle minimizing a section
const minimizeSection = (section) => {
    const sectionId = section.getAttribute('data-section-id');
    section.classList.add('minimized'); // Hide the section

    // Create a tab in the hamburger menu
    const tabButton = document.createElement('button');
    tabButton.classList.add('minimized-tab-button');
    const sectionTitle = section.querySelector('.section-title').textContent;
    tabButton.textContent = sectionTitle;
    tabButton.setAttribute('data-section-id', sectionId); // Store the section ID

    // Event listener for the tab button to restore the section
    tabButton.addEventListener('click', () => {
        restoreSection(sectionId);
    });

    elements.minimizedTabsContainer.appendChild(tabButton);
    updateMinimizedTabsVisibility();
};

// Function to restore a minimized section
const restoreSection = (sectionId) => {
    const sectionToRestore = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (sectionToRestore) {
        sectionToRestore.classList.remove('minimized'); // Show the section

        // Remove the tab from the hamburger menu
        const tabToRemove = elements.minimizedTabsContainer.querySelector(`[data-section-id="${sectionId}"]`);
        if (tabToRemove) {
           elements.minimizedTabsContainer.removeChild(tabToRemove);
        }
      updateMinimizedTabsVisibility();
    }
};

// Function to toggle the visibility of the minimized tabs
const toggleMinimizedTabs = () => {
   const isHidden = elements.minimizedTabs.getAttribute('aria-hidden') === 'true';
      elements.minimizedTabs.setAttribute('aria-hidden', !isHidden);
};
const attachMinimizeListeners = () => {

// Event listeners for minimize buttons
     elements.minimizeButtons.forEach(button => {
        button.addEventListener('click', () => {
             const section = button.closest('.section-container');
        if (section) {
        minimizeSection(section);
     }
});
});
}
function updateMinimizedTabsVisibility(){

      if ( elements.minimizedTabsContainer.children.length <= 0){
       elements.minimizedTabs.setAttribute('aria-hidden','true')

}
}


export { init,  attachMinimizeListeners, toggleMinimizedTabs, updateMinimizedTabsVisibility, restoreSection, minimizeSection };