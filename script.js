// ==================== NAVIGATION ==================== 
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.getElementById('navLinks');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80; // Account for fixed navbar
        const sectionTop = section.offsetTop - offset;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Add smooth scroll to all nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ==================== SCROLL REVEAL ANIMATION ==================== 
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
};

// Initial check on page load
window.addEventListener('load', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ==================== WAITLIST MODAL ==================== 
const modal = document.getElementById('waitlistModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const categoryInput = document.getElementById('category');

const categoryData = {
    farmers: {
        title: 'Join as Farmer or Input Supplier',
        description: 'Get direct access to buyers and receive fair prices for your produce'
    },
    buyers: {
        title: 'Join as Buyer or Processor',
        description: 'Source quality produce directly from farmers with transparent pricing'
    },
    logistics: {
        title: 'Join as Logistics Partner',
        description: 'Optimize your delivery routes and join our efficient network'
    },
    ngos: {
        title: 'Join as NGO or Researcher',
        description: 'Access data and insights to drive agricultural innovation'
    }
};

function openModal(category) {
    const data = categoryData[category];
    
    if (data) {
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        categoryInput.value = category;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Reset form
    document.querySelector('.waitlist-form').reset();
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ==================== FORM SUBMISSION ==================== 
function submitWaitlist(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to your backend
    console.log('Waitlist submission:', data);
    
    // Show success message
    alert(`Thank you for joining the waitlist! We'll be in touch soon at ${data.email}`);
    
    // Close modal and reset form
    closeModal();
    
    // In production, you would send this to your backend API
    // Example:
    // fetch('/api/waitlist', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //     alert('Success! Check your email for confirmation.');
    //     closeModal();
    // })
    // .catch(error => {
    //     alert('Something went wrong. Please try again.');
    // });
    
    return false;
}

// ==================== NEWSLETTER SUBSCRIPTION ==================== 
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Here you would typically send the email to your backend
    console.log('Newsletter subscription:', email);
    
    // Show success message
    alert(`Thank you for subscribing! You'll receive updates at ${email}`);
    
    // Reset form
    emailInput.value = '';
    
    // In production, you would send this to your backend API
    // Example:
    // fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    // })
    // .then(response => response.json())
    // .then(result => {
    //     alert('Successfully subscribed to newsletter!');
    //     emailInput.value = '';
    // })
    // .catch(error => {
    //     alert('Something went wrong. Please try again.');
    // });
    
    return false;
}

// ==================== PARALLAX EFFECT ==================== 
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ==================== NETWORK ANIMATION ENHANCEMENT ==================== 
// Create floating particles for visual enhancement
function createParticles() {
    const networkAnimation = document.querySelector('.network-animation');
    
    if (!networkAnimation) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(111, 189, 67, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        networkAnimation.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(style);

// Initialize particles when page loads
window.addEventListener('load', createParticles);

// ==================== CARD HOVER EFFECTS ==================== 
const cards = document.querySelectorAll('.waitlist-card, .stakeholder-card, .benefit-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== TYPING EFFECT FOR HERO TITLE ==================== 
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing effect on hero title
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 30);
// });

// ==================== COUNTER ANIMATION ==================== 
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// ==================== INTERSECTION OBSERVER FOR PERFORMANCE ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
scrollRevealElements.forEach(element => {
    observer.observe(element);
});

// ==================== PRELOADER (Optional) ==================== 
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any preloader if you add one
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// ==================== CONSOLE MESSAGE ==================== 
console.log('%c🌾 SmartAgriLink - Connecting Farms, Empowering Futures 🌾', 'color: #6fbd43; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to SmartAgriLink! Interested in joining our team? Contact us at careers@smartagrilink.com', 'color: #1e3a5f; font-size: 14px;');
