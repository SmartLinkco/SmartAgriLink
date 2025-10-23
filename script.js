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

// ==================== CONFIGURATION ====================
// Replace this with your Google Apps Script Web App URL
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx_vwex0oclj8TtuCqD7NlfRzPf52vMEo2ihHcDJysfmOPPtupLb5ZoILeEf5ONerst9w/exec';

// ==================== FORM SUBMISSION ==================== 
async function submitWaitlist(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    const formData = new FormData(form);
    const data = {
        action: 'waitlist',
        ...Object.fromEntries(formData.entries())
    };
    
    try {
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Note: With no-cors mode, we can't read the response
        // So we assume success if no error is thrown
        
        // Close modal
        closeModal();
        
        // Show success notification
        showSuccessNotification('waitlist', data.fullName, data.category);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showErrorNotification('Failed to submit. Please try again or contact support@smartagrilink.com');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
    
    return false;
}

// ==================== NEWSLETTER SUBSCRIPTION ==================== 
async function subscribeNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    const data = {
        action: 'newsletter',
        email: emailInput.value,
        source: 'Footer Form'
    };
    
    try {
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Reset form
        emailInput.value = '';
        
        // Show success notification
        showSuccessNotification('newsletter', data.email);
        
    } catch (error) {
        console.error('Error subscribing:', error);
        showErrorNotification('Failed to subscribe. Please try again.');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
    }
    
    return false;
}

// ==================== SUCCESS NOTIFICATION ==================== 
function showSuccessNotification(type, name, category = '') {
    // Create notification container
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.id = 'successNotification';
    
    const categoryNames = {
        farmers: 'Farmers & Input Suppliers',
        buyers: 'Buyers & Processors',
        logistics: 'Logistics Partners',
        ngos: 'Agri NGOs & Researchers'
    };
    
    let content = '';
    
    if (type === 'waitlist') {
        content = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="notification-body">
                    <h3>Welcome to SmartAgriLink! 🎉</h3>
                    <p>Thank you, <strong>${name}</strong>! You've successfully joined our waitlist as <strong>${categoryNames[category]}</strong>.</p>
                    <div class="notification-details">
                        <p><i class="fas fa-envelope"></i> Check your email for a confirmation message with next steps.</p>
                        <p><i class="fas fa-bell"></i> We'll notify you when we're ready to onboard your category.</p>
                    </div>
                    <div class="notification-actions">
                        <button class="btn-notification-primary" onclick="closeSuccessNotification()">
                            Got it!
                        </button>
                        <button class="btn-notification-secondary" onclick="window.location.href='#home'">
                            Back to Home
                        </button>
                    </div>
                </div>
                <button class="notification-close" onclick="closeSuccessNotification()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    } else if (type === 'newsletter') {
        content = `
            <div class="notification-content notification-compact">
                <div class="notification-icon-small">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="notification-body-compact">
                    <h4>Successfully Subscribed! 📬</h4>
                    <p>Thank you! We've added <strong>${name}</strong> to our newsletter.</p>
                </div>
                <button class="notification-close-small" onclick="closeSuccessNotification()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }
    
    notification.innerHTML = content;
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-close newsletter notification after 5 seconds
    if (type === 'newsletter') {
        setTimeout(() => {
            closeSuccessNotification();
        }, 5000);
    }
}

function closeSuccessNotification() {
    const notification = document.getElementById('successNotification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// ==================== ERROR NOTIFICATION ==================== 
function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.id = 'errorNotification';
    
    notification.innerHTML = `
        <div class="notification-content notification-compact">
            <div class="notification-icon-small error">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="notification-body-compact">
                <h4>Oops! Something went wrong</h4>
                <p>${message}</p>
            </div>
            <button class="notification-close-small" onclick="closeErrorNotification()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-close after 7 seconds
    setTimeout(() => {
        closeErrorNotification();
    }, 7000);
}

function closeErrorNotification() {
    const notification = document.getElementById('errorNotification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
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
