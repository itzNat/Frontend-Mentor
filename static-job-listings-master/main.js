
  let loadedJobs = []
  let currentFilter = []
  let filteredJobs = []
  const jobContainer = document.querySelector('.job-container')
  const jobFilteredContainer = document.querySelector('.job-filtered-container')
      async function renderJobs(Jobs) {
      jobContainer.innerHTML = ''
      Jobs.forEach(job => {
        const jobDiv = document.createElement('div')
        jobDiv.className = `relative flex items-center p-5 bg-white shadow-md rounded-md ${job.featured ? "border-l-4 border-[--desaturated-dark-cyan] bg-[--light-grayish-cyan-bg]" : ""}`
        jobDiv.innerHTML = `
          <img class="absolute -top-[44px] md:-top-[0] transform md:static md:mr-5" src='${job.logo}'></img>
          <div class = "pt-7 flex flex-col md:flex-row gap-3 w-full justify-between md:pt-0">
            <div class = "flex flex-col gap-3">
              <div>
                <p>
                  <span class="text-[--desaturated-dark-cyan] font-semibold">${job.company}</span>
                  ${job.new ? `<span class="new text-white font-semibold rounded-[99px] py-1 px-2 mr-2 ml-4 bg-[--desaturated-dark-cyan]">NEW!</span>` : ''}
                  ${job.featured ? `<span class="featured text-white font-semibold rounded-[99px] py-1 px-2 bg-[--very-dark-grayish-cyan]">FEATURED</span>` : ''}
                </p>
              </div>
              <p class="text-[--very-dark-grayish-cyan] font-semibold">${job.position}</p>
              <div>
                <p class="text-[--very-dark-grayish-cyan] font-normal">
                  ${job.postedAt} . ${job.contract} . ${job.location}
                </p>
              </div>
            </div>
            <hr class="md:hidden h-[2px] w-full my-2">
            <div class="flex md:items-center">
              <div class="flex flex-wrap gap-4">
                ${job.role ? `<button data-filter="${job.role}" class="font-semibold px-3 rounded-md py-1 bg-[--light-grayish-cyan-bg] text-[--desaturated-dark-cyan]">${job.role}</button>` : ''} 
                ${job.level ? `<button data-filter="${job.level}" class="font-semibold px-3 rounded-md py-1 bg-[--light-grayish-cyan-bg] text-[--desaturated-dark-cyan]">${job.level}</button>` : ''}
                ${job.languages.length > 0 ? job.languages.map(lang => `<button data-filter="${lang}" class="font-semibold px-3 rounded-md py-1 bg-[--light-grayish-cyan-bg] text-[--desaturated-dark-cyan]">${lang}</button>`).join(' ') : ''} 
                ${job.tools.length > 0 ? job.tools.map(tool => `<button data-filter="${tool}" class="font-semibold px-3 rounded-md py-1 bg-[--light-grayish-cyan-bg] text-[--desaturated-dark-cyan]">${tool}</button>`).join(' ') : ''} 
              </div>
            </div>
          </div>
        `;
        jobContainer.appendChild(jobDiv)
      });      
    }

    jobFilteredContainer.addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
        const dataFilter = event.target.getAttribute('data-filter');
        if (currentFilter.includes(dataFilter)) {
          currentFilter = currentFilter.filter(filter => filter !== dataFilter);
        };
        filteredJobs = filteringJobs(loadedJobs, currentFilter);
        renderJobs(filteredJobs);
        renderFilteredjobs(currentFilter);
      }
    });

    jobContainer.addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
        const dataFilter = event.target.getAttribute('data-filter');
        if (!currentFilter.includes(dataFilter)) {
          currentFilter.push(dataFilter);
        }
        console.log("Current Filter:", currentFilter);
        filteredJobs = filteringJobs(loadedJobs, currentFilter);
        renderJobs(filteredJobs);
        renderFilteredjobs(currentFilter)
      }
    });

    function doesJobMatchFilters(job, filters) {
  // Combine all relevant properties into one array
  const jobProperties = [
    job.role,
    job.level,
    ...job.languages,
    ...job.tools
  ];
  

  return filters.every(filter => 
    jobProperties.some(property => 
      property.toLowerCase() === filter.toLowerCase()
    )
  );
}

function filteringJobs(jobs, filters) {
  return jobs.filter(job => doesJobMatchFilters(job, filters));
}

function renderFilteredjobs(filters){
  jobFilteredContainer.className = `job-filtered-container bg-white mx-8 p-7 relative -top-12 gap-6 flex-wrap ${filters.length > 0 ? 'flex' : 'hidden'}`
  
  jobFilteredContainer.innerHTML = '';
  filters.forEach(filter => {
    const html = `
      <div class="flex items-center bg-[--light-grayish-cyan-bg]">
        <p class="text-[--desaturated-dark-cyan] font-bold px-3 py-2">${filter}</p>
        <button data-filter="${filter}" class="font-semibold px-3 rounded-r-md ml-1 py-1 bg-[var(--desaturated-dark-cyan)] text-[--light-grayish-cyan-bg]">X</button>
      </div>
    `;
    jobFilteredContainer.innerHTML += (html)
  })

}


  document.addEventListener("DOMContentLoaded", async function(){
    
    loadedJobs = await fetch('data.json')
      .then(response => response.json())
    console.log(loadedJobs)
    renderJobs(loadedJobs)
  });

