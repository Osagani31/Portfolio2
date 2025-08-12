// Dark/White mode toggle
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

function setMode(isWhite) {
  if (isWhite) {
    body.classList.add('white-mode');
    modeToggle.textContent = '🌞';
  } else {
    body.classList.remove('white-mode');
    modeToggle.textContent = '🌙';
  }
}

// Load mode from localStorage
const savedMode = localStorage.getItem('mode');
setMode(savedMode === 'white');

modeToggle.addEventListener('click', () => {
  const isWhite = !body.classList.contains('white-mode');
  setMode(isWhite);
  localStorage.setItem('mode', isWhite ? 'white' : 'dark');
});

// Projects carousel logic (scrollable row)
const projectsTrackContainer = document.querySelector('#projects-carousel .carousel-track-container');
const projectsTrack = document.getElementById('projects-track');
const projectsPrevBtn = document.getElementById('projects-prev');
const projectsNextBtn = document.getElementById('projects-next');

function getCardScrollAmount() {
  const card = projectsTrack.querySelector('.project-card');
  if (!card) return 0;
  const cardWidth = card.offsetWidth;
  const gap = parseInt(getComputedStyle(projectsTrack).gap) || 0;
  return cardWidth + gap;
}

projectsPrevBtn.addEventListener('click', () => {
  const scrollAmount = getCardScrollAmount();
  projectsTrackContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});
projectsNextBtn.addEventListener('click', () => {
  const scrollAmount = getCardScrollAmount();
  projectsTrackContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});
window.addEventListener('resize', () => {
  // Re-calculate cardWidth on resize to account for potential changes in gap
  const newCardWidth = 340 + 32;
  projectsTrackContainer.style.gridTemplateColumns = `repeat(auto-fill, ${newCardWidth}px)`;
});

// Projects tab filtering (static)
const projectsTabs = document.querySelectorAll('.projects-tab');
function filterProjects(category) {
  const cards = document.querySelectorAll('#projects-track .project-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
  // Reset scroll position to the beginning of the container
  projectsTrackContainer.scrollLeft = 0;
}
projectsTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    projectsTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.getAttribute('data-category');
    filterProjects(category);
  });
});
// Initialize carousel and filter
filterProjects('all');

// Contact form handler
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Prepare form data
  const formData = new FormData(contactForm);
  
  // Submit form using fetch
  fetch('submit_contact.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Success message
      formMessage.style.display = 'block';
      formMessage.style.backgroundColor = '#d4edda';
      formMessage.style.color = '#155724';
      formMessage.style.border = '1px solid #c3e6cb';
      formMessage.textContent = data.message;
      contactForm.reset();
    } else {
      // Error message
      formMessage.style.display = 'block';
      formMessage.style.backgroundColor = '#f8d7da';
      formMessage.style.color = '#721c24';
      formMessage.style.border = '1px solid #f5c6cb';
      formMessage.textContent = data.message;
    }
  })
  .catch(error => {
    // Network error
    formMessage.style.display = 'block';
    formMessage.style.backgroundColor = '#f8d7da';
    formMessage.style.color = '#721c24';
    formMessage.style.border = '1px solid #f5c6cb';
    formMessage.textContent = 'Network error. Please try again later.';
    console.error('Error:', error);
  })
  .finally(() => {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  });
});

// Certificates carousel logic
const track = document.getElementById('carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
let currentIndex = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);

// Initialize carousel position
updateCarousel();

// Live typing effect for Home section
const typingText = document.getElementById('typing-text');
const typingCursor = document.getElementById('typing-cursor');
const fullText = "I'm Osagani Perera";
let typingIndex = 0;

const typingText2 = document.getElementById('typing-text-2');
const typingCursor2 = document.getElementById('typing-cursor-2');
const fullText2 = "Computer Science undergraduate";
let typingIndex2 = 0;

function typeWriter() {
  if (typingIndex <= fullText.length) {
    typingText.textContent = fullText.slice(0, typingIndex);
    typingIndex++;
    setTimeout(typeWriter, 100);
  } else {
    typeWriter2();
  }
}
function typeWriter2() {
  if (typingIndex2 <= fullText2.length) {
    typingText2.textContent = fullText2.slice(0, typingIndex2);
    typingIndex2++;
    setTimeout(typeWriter2, 100);
  }
}
typeWriter();

// Live typing effect for Skills heading
const skillsTyping = document.getElementById('skills-typing');
const skillsCursor = document.getElementById('skills-cursor');
const skillsHeadingText = 'Skills';
let skillsTypingIndex = 0;

function typeSkillsHeading() {
  if (skillsTypingIndex <= skillsHeadingText.length) {
    skillsTyping.textContent = skillsHeadingText.slice(0, skillsTypingIndex);
    skillsTypingIndex++;
    setTimeout(typeSkillsHeading, 100);
  }
}
typeSkillsHeading();

// Skills tab filtering
const skillsTabs = document.querySelectorAll('.skills-tab');
const skillsListItems = document.querySelectorAll('#skills ul li');

skillsTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillsTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.getAttribute('data-category');
    skillsListItems.forEach(li => {
      if (category === 'all' || li.getAttribute('data-category') === category) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    });
  });
});

// Live typing effect for Projects heading
const projectsTyping = document.getElementById('projects-typing');
const projectsCursor = document.getElementById('projects-cursor');
const projectsHeadingText = 'Featured Projects';
let projectsTypingIndex = 0;

function typeProjectsHeading() {
  if (projectsTypingIndex <= projectsHeadingText.length) {
    projectsTyping.textContent = projectsHeadingText.slice(0, projectsTypingIndex);
    projectsTypingIndex++;
    setTimeout(typeProjectsHeading, 100);
  }
}
typeProjectsHeading();

// Make project cards clickable to go to their detail pages
const projectCards = document.querySelectorAll('.project-card');
const projectPages = [
  'project1.html', // Ceylon Coir E-commerce Platform
  'project2.html', // Portfolio Website
  'project3.html', // Fitness Tracker App
  'project4.html', // Recipe Finder Mobile
  // Add more as you create more detail pages
];
projectCards.forEach((card, idx) => {
  // Only link main projects, not mini projects or design-only
  const category = card.getAttribute('data-category');
  if (category !== 'mini projects' && idx < projectPages.length) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Prevent double navigation if the button is clicked
      if (e.target.tagName.toLowerCase() !== 'a') {
        window.location.href = projectPages[idx];
      }
    });
  }
});

// About Me tab and carousel logic
const aboutTabs = document.querySelectorAll('.about-tab');
const volunteeringCarousel = document.getElementById('volunteering-carousel');
const workshopsCarousel = document.getElementById('workshops-carousel');
const competitionsCarousel = document.getElementById('competitions-carousel');

aboutTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    aboutTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.getAttribute('data-category');
    if (cat === 'all') {
      volunteeringCarousel.style.display = '';
      workshopsCarousel.style.display = '';
      competitionsCarousel.style.display = '';
    } else if (cat === 'volunteering') {
      volunteeringCarousel.style.display = '';
      workshopsCarousel.style.display = 'none';
      competitionsCarousel.style.display = 'none';
    } else if (cat === 'workshops') {
      volunteeringCarousel.style.display = 'none';
      workshopsCarousel.style.display = '';
      competitionsCarousel.style.display = 'none';
    } else if (cat === 'competitions') {
      volunteeringCarousel.style.display = 'none';
      workshopsCarousel.style.display = 'none';
      competitionsCarousel.style.display = '';
    } else {
      volunteeringCarousel.style.display = 'none';
      workshopsCarousel.style.display = 'none';
      competitionsCarousel.style.display = 'none';
    }
  });
});
// Volunteering carousel logic
(function() {
  const track = document.getElementById('volunteering-track');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('volunteering-prev');
  const nextBtn = document.getElementById('volunteering-next');
  let currentIndex = 0;
  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
})();
// Workshops carousel logic
(function() {
  const track = document.getElementById('workshops-track');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('workshops-prev');
  const nextBtn = document.getElementById('workshops-next');
  let currentIndex = 0;
  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
})();
// Competitions carousel logic
(function() {
  const track = document.getElementById('competitions-track');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('competitions-prev');
  const nextBtn = document.getElementById('competitions-next');
  let currentIndex = 0;
  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
})();

// Certificate modal/lightbox logic
const certImgs = document.querySelectorAll('.certificate-img');
const certModal = document.getElementById('certificate-modal');
const certModalImg = document.getElementById('certificate-modal-img');
const certModalClose = document.getElementById('certificate-modal-close');
certImgs.forEach(img => {
  img.addEventListener('click', () => {
    certModal.style.display = 'flex';
    certModalImg.src = img.getAttribute('data-full');
    certModalImg.alt = img.alt;
  });
});
certModalClose.addEventListener('click', () => {
  certModal.style.display = 'none';
  certModalImg.src = '';
});
certModal.addEventListener('click', (e) => {
  if (e.target === certModal) {
    certModal.style.display = 'none';
    certModalImg.src = '';
  }
});

// About Me section fade-in animation
window.addEventListener('DOMContentLoaded', () => {
  const aboutParts = [
    ...document.querySelectorAll('.about-fade-in')
  ];
  aboutParts.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 400 + i * 1800);
  });
}); 