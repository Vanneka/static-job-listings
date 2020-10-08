// The Algorithm
// fetch data from the local json file and display on the webpage
// flter the items based on tech stack needed ie category
// Click on a filter term, collect the innerTextand assign it as a search term
// Use the term to filter the terms
// If the featured in the term is true, show featured, else, dont show featured, same for new

window.addEventListener('load', fetchData()
    // on load, fetch from the local json file and put it to the screen
)

//functions
// fetch data from local json file
function fetchData() {
    let localFile = 'data.json'
    fetch(localFile)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            // output the data here
            let resultSection = document.querySelector('.all-cards');
            data.forEach(item => {
                job = {
                    companyName: item.company,
                    companyLogo: item.logo,
                    jobPosition: item.position,
                    jobLocation: item.location,
                    jobContract: item.contract,
                    timePosted: item.postedAt,
                    featuredJob: item.featured,
                    newJob: item.new,
                    jobCategory: [...item.tools, ...item.languages, item.role, item.level]
                }
                resultSection.innerHTML += `
            <div class="job-card card">
        <!--    card-img section    -->
        <img src="${job.companyLogo}" alt="company-logo" class="card-img">
        <!--    card-img section    -->

        <!--    job info section    -->
        <div class="job-info">
        <div class="job-status">
        <p class="company-name">${job.companyName}</p>
        ${isTrue(job.newJob, 'new!', 'job-new')}
        ${isTrue(job.featuredJob, 'featured', 'job-featured')}
        </div>

        <div class="job-title">
        <p>${job.jobPosition}</p>
        </div>

        <div class="job-tdl">
        <ul>
        <li class="job-post-day">${job.timePosted}</li>
        <li class="job-duration">${job.jobContract}</li>
        <li class="job-location">${job.jobLocation}</li>
        </ul>
        </div>
        </div>
        <!--    job info section    -->

        <!--    tech-stack section    -->
        <div class="tech-stack">
        ${toolsLoop(job.jobCategory)}
        </div>
        <!--    tech-stack section    -->
        </div>`
        console.log(item)
        //ADDING THE FEATURED BORDER LINE
                let jobCards = document.querySelectorAll('.job-card')
                jobCards.forEach(jobCard => {
                    if (job.featuredJob == true) {
                        jobCard.classList.add('featured')
                    }
                })
            });

            //THE FILTER SECTION
            let filterCats = document.querySelectorAll('.tech');
            let setStorage = new Set();
            filterCats.forEach(filterCat => {
                filterCat.addEventListener('click', () => {
                    // this will get the innertext of all items inside the filter category
                    setStorage.add(filterCat.innerText)
                    filterSection.innerHTML = categoryLoop(setStorage)
                    bannerSection.style.display = 'flex';
                })
            });

            // THE BANNER SECTION
            let bannerSection = document.querySelector('.the-filter')
            let filterSection = document.querySelector('.fil')
            let clrBtn = document.getElementById('clear-btn')

            // eventListeners
            clrBtn.addEventListener('click', () => {
                bannerSection.style.display = "none";
                setStorage.clear();

            })
        })
        .catch(
            (err) => {
                console.log(err)
            }
        )
}

// function, filter the cards
// flter the items based on tech stack needed ie category
// Click on a filter term, collect the innerTextand assign it as a search term
// Use the term to filter the terms


// loop through the array of tools and role, output it as a ul element
function toolsLoop(arrayItems) {
    let ul = document.createElement('ul')
    ul.setAttribute('id', 'tech-list')
    arrayItems.forEach((arrayItem) => {
        let li = document.createElement('li')
        li.setAttribute('class', 'tech')
        li.innerText = arrayItem
        ul.appendChild(li)
    })
    // will return the HTML of the item object
    return ul.outerHTML
}

// function to display new or featured if true
function isTrue(arrayVal, innerValue, classValue) {
    let newUl = document.createElement('ul')
    newUl.setAttribute('class', 'is-true')
    if (arrayVal === true) {
        let newLi = document.createElement('li');
        newLi.innerText = innerValue;
        newLi.setAttribute('class', classValue)
        newUl.appendChild(newLi)
    }
    return newUl.outerHTML
}


//loop through the set and output the li elements to the banner

function categoryLoop(setItem) {
    let section = document.createElement('section')
    section.setAttribute('class', 'filter')
    setItem.forEach((sItem) => {
        let p = document.createElement('p')
        let i = document.createElement('i')
        p.setAttribute('class', 'tech')
        i.setAttribute('class', 'fa fa-close')
        p.innerText = sItem;
        p.appendChild(i)
        section.appendChild(p)
    })
    // will return the HTML of the item object
    return section.outerHTML
}