

window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';

  // After transition (0.5s), remove it from the flow
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500); // Match this time with transition duration
});



window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
});





const links = document.querySelectorAll('a[href^="#"]');


function getHeaderOffset() {
  const header = document.querySelector('header');
  return header ? header.offsetHeight : 0;
}


function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}


function smoothScrollTo(target) {
  const offset = getHeaderOffset();
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}


links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      smoothScrollTo(target);
    }
  });
});






  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header .menu a');
  window.onscroll = () => {
      sections.forEach(sec => {
          let top = window.scrollY;
          let offset = sec.offsetTop - 150;
          let height = sec.offsetHeight;
          let id = sec.getAttribute('id');
          if(top >= offset && top < offset + height) {
              navLinks.forEach(links => {
                  links.classList.remove('active');
                  document.querySelector(`header .menu a[href*=${id}]`).classList.add('active');
              });
          };
      });
  };





function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    sidebar.classList.add('active');
    overlay.classList.add('show');
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    sidebar.classList.remove('active');
    overlay.classList.remove('show');
}


let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');


let countItem = items.length;
let itemActive = 0;

next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}

prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}

let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){

    let itemActiveOld = document.querySelector('.slider .list .item.active ');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

  
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
// function setPositionThumbnail () {
//     let thumbnailActive = document.querySelector('.thumbnail .item.active');
//     let rect = thumbnailActive.getBoundingClientRect();
//     if (rect.left < 0 || rect.right > window.innerWidth) {
//         thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
//     }
// }


// thumbnails.forEach((thumbnail, index) => {
//     thumbnail.addEventListener('click', () => {
//         itemActive = index;
//         showSlider();
//     })
// })




 
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popupImage');
const closeBtn = document.getElementById('close');
const imageTriggers = document.querySelectorAll('.popupImageTrigger');

imageTriggers.forEach(img => {
  img.addEventListener('click', () => {
    popupImage.src = img.src;
    popup.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  popup.classList.remove('active');
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.remove('active');
  }
});


function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress');

  progressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();

    // Only animate the bar if it's in view and hasn't been animated yet
    if (rect.top < window.innerHeight - 100 && !bar.classList.contains('animated')) {
      const progress = bar.getAttribute('data-progress');
      
      // Smooth animation for progress bar width
      let currentWidth = 0;
      let targetWidth = parseInt(progress);
      
      // Function to animate width incrementally
      function animateWidth() {
        if (currentWidth < targetWidth) {
          currentWidth++;
          bar.style.width = currentWidth + '%';
          requestAnimationFrame(animateWidth);
        } else {
          // Once the animation is complete, mark the bar as animated
          bar.classList.add('animated');
        }
      }

      // Start the animation
      animateWidth();
    }
  });
}
// Global scope
const statNumbers = document.querySelectorAll('.stat-number');
let statsStarted = false;

// Function to animate stats
function animateStats() {
  if (statsStarted) return;
  statsStarted = true;

  statNumbers.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    const hasPlus = stat.textContent.includes('+');

    let randomInterval = setInterval(() => {
      stat.textContent = Math.floor(Math.random() * target) + (hasPlus ? '+' : '');
    }, 50);

    setTimeout(() => {
      clearInterval(randomInterval);
      stat.textContent = target + (hasPlus ? '+' : '');
    }, 2000);
  });
}

// IntersectionObserver to trigger when section is visible
const statsSection = document.querySelector('.stats-section');

if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.disconnect(); // Stop observing after animation triggers once
      }
    });
  }, {
    threshold: 0.3 // More lenient for mobile screens
  });

  observer.observe(statsSection);
}
  


// Trigger progress bars on scroll
window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);


 var swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      spaceBetween: 30,
       autoplay: {
           delay: 2500,
           disableOnInteraction: false,
        },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });



    window.addEventListener("load", () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
});





