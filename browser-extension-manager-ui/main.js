// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light"
  );
});


let extensionsList = [];
let currentFilter = 'all'

const extensionsContainer = document.querySelector('.extensions-container');
const filterContainer = document.querySelector('.filter-container');

document.addEventListener('DOMContentLoaded', async () => { 
  extensionsList = await fetch('json/data.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching extensions data:', error);
      return [];
    })
  extensionsList.map((extension, index) => {
    extension.index = index + 1;
    extension.isHidden = false
})
console.log(extensionsList)
  renderUi(extensionsList)

})

function renderUi(extensions) {
  if (extensionsList.length === 0) {
    extensionsContainer.innerHTML = '<p>No extensions available.</p>';
    return;
  }

  extensionsContainer.innerHTML = '';
  extensions.forEach((extension) => {
    const extensionElement = document.createElement('div');
    extensionElement.className = `extension bg-white rounded-xl p-4 shadow-md m-2 max-w-sm ${extension.isHidden ? 'hidden' : 'flex'} flex-col gap-3 justify-between dark:bg-[var(--Neutral-800)] dark:text-white`;
    extensionElement.innerHTML = `
        <div class="flex gap-4 mb-4">
          <img src="${extension.logo}" alt="${extension.name} icon" class="extension-icon">
          <div class="extension-info">
            <h3 class="extension-name text-xl text-[var(--Neutral-800)] font-bold mb-2 dark:text-[var(--Neutral-100)]">${extension.name}</h3>
            <p class="extension-description font-normal text-[var(--Neutral-600)] dark:text-[var(--Neutral-200)]">${extension.description}</p>
          </div>
        </div>
        <div class="extension-controls flex items-center justify-between">
          <button class="remove border-2 py-1 px-3 rounded-full" id="remove-id${extension.index}">Remove</button>
          <div class="toggle-switch relative inline-block w-[45px] h-[24px] m-[10px]">
            <input class="toggle-input hidden" id="toggle${extension.index}" type="checkbox" ${extension.isActive ? 'data-isActive= true checked' : 'data-isActive=false'} />
            <label class="toggle-label absolute top-0 left-0 w-[45px] h-[24px] bg-neutral-300 rounded-[34px] cursor-pointer transition-colors duration-300" for="toggle${extension.index}"></label>
          </div>
        </div>
    `;
    
    extensionsContainer.appendChild(extensionElement);
  });
};




  const filterButtons = document.querySelectorAll('.filter-container button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-red-500', 'dark:bg-red-500');
        btn.classList.add('bg-white', 'text-[var(--Neutral-800)]', 'dark:bg-[var(--Neutral-800)]', 'text-black');
      });
      
      // Add active class to clicked button
      this.classList.remove('bg-white', 'dark:bg-[var(--Neutral-800)]', 'text-black' );
      this.classList.add('bg-red-700', 'dark:bg-red-500', 'text-white');

      currentFilter = this.dataset.filter;
    if (currentFilter == 'all'){
      return renderUi(extensionsList);
    }
    filterExtensions(extensionsList, currentFilter);
    });
  });

function filterExtensions(list, filter){
  filter = filter=="active" ? true : false;
  const filteredList = list.filter(extension => extension.isActive == filter)
  renderUi(filteredList)
}



document.addEventListener('click', (event) => {
  if (event.target.matches('.remove')) {
    const removeInput = event.target;
    
    extensionIndex = Number(removeInput.id.match(/\d+/)[0]) - 1;
    console.log(extensionIndex)
    
    extensionsList[extensionIndex].isHidden = true
    console.log(extensionsList)
    filterExtensions(extensionsList, currentFilter)
  };
});

document.addEventListener('click', (event) => {
  if (event.target.matches('.toggle-input')) {
    const toggleInput = event.target;
    const isActive = toggleInput.checked;
    extensionIndex = Number(toggleInput.id.match(/\d+/)[0]) - 1;
    
    extensionsList[extensionIndex].isActive = isActive;
  };
});


