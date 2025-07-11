'use strict';

// Title transition effect
document.addEventListener('DOMContentLoaded', function() {
  const titleElement = document.getElementById('changing-title');
  const titles = ['Software Engineer', 'Mechanical Engineer'];
  let currentIndex = 0;
  
  // Create a span for the changing text inside the title element
  titleElement.innerHTML = '<span class="changing-text">' + titles[currentIndex] + '</span>';
  const textSpan = titleElement.querySelector('.changing-text');
  
  // Add CSS for the text transition
  const style = document.createElement('style');
  style.textContent = `
    .changing-text {
      display: inline-block;
      transition: transform 0.5s ease, opacity 0.5s ease;
    }
    .changing-text.fade-out {
      opacity: 0;
      transform: translateY(10px);
    }
    .changing-text.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  function changeTitle() {
    // Fade out text only
    textSpan.classList.add('fade-out');
    
    // After fade out, change text and fade in
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % titles.length;
      textSpan.textContent = titles[currentIndex];
      textSpan.classList.remove('fade-out');
      textSpan.classList.add('fade-in');
      
      // Remove the fade-in class after animation completes
      setTimeout(() => {
        textSpan.classList.remove('fade-in');
      }, 500);
    }, 500);
  }
  
  // Change title every 5 seconds
  setInterval(changeTitle, 5000);
});


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
    
    // Update URL with the category parameter
    const url = new URL(window.location);
    if (selectedValue === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', selectedValue);
    }
    window.history.pushState({}, '', url);
    
    // Update the active filter button
    for (let j = 0; j < filterBtn.length; j++) {
      if (filterBtn[j].innerText.toLowerCase() === selectedValue) {
        lastClickedBtn.classList.remove("active");
        filterBtn[j].classList.add("active");
        lastClickedBtn = filterBtn[j];
        break;
      }
    }

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    // Update URL with the category parameter
    const url = new URL(window.location);
    if (selectedValue === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', selectedValue);
    }
    window.history.pushState({}, '', url);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to navigate to a specific page
function navigateToPage(pageName, category = null) {
  // Update URL with the page parameter
  const url = new URL(window.location);
  url.searchParams.set('tab', pageName);
  
  // Add category parameter if provided
  if (category) {
    url.searchParams.set('category', category);
  } else {
    url.searchParams.delete('category');
  }
  
  window.history.pushState({}, '', url);

  // Activate the correct page and navigation link
  for (let i = 0; i < pages.length; i++) {
    if (pageName === pages[i].dataset.page) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
      window.scrollTo(0, 0);
      
      // If we're navigating to portfolio and have a category, filter the projects
      if (pageName === 'portfolio' && category) {
        // Apply the filter after a short delay to ensure the page is loaded
        setTimeout(() => {
          filterFunc(category);
          
          // Update the filter buttons UI
          for (let j = 0; j < filterBtn.length; j++) {
            if (filterBtn[j].innerText.toLowerCase() === category) {
              lastClickedBtn.classList.remove("active");
              filterBtn[j].classList.add("active");
              lastClickedBtn = filterBtn[j];
              
              // Update select value if it exists
              if (selectValue) {
                selectValue.innerText = filterBtn[j].innerText;
              }
              break;
            }
          }
        }, 100);
      }
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
}

// Check URL parameters on page load
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  const categoryParam = urlParams.get('category');
  
  if (tabParam) {
    // Check if the tab parameter matches any page
    let pageExists = false;
    for (let i = 0; i < pages.length; i++) {
      if (tabParam === pages[i].dataset.page) {
        pageExists = true;
        break;
      }
    }
    
    if (pageExists) {
      navigateToPage(tabParam, categoryParam);
    }
  }
});

// add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.innerHTML.toLowerCase();
    
    // Clear category parameter when navigating away from portfolio
    if (pageName !== 'portfolio') {
      navigateToPage(pageName);
    } else {
      // When navigating to portfolio, check if there's a category in the URL to preserve
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get('category');
      navigateToPage(pageName, categoryParam);
    }
  });
}