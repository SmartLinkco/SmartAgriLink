# SmartAgriLink Landing Page

A modern, responsive, and interactive landing page for SmartAgriLink — A Digital Agriculture Supply Chain Platform.

## 🌾 Overview

SmartAgriLink aims to build and deploy a scalable digital supply chain platform that connects farmers directly with buyers, processors, and logistics services, while using AI-driven demand forecasting to align production with market needs across Ghana and Africa.

## 📁 Project Structure

```
SmartAgriLink/
│
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete styling with animations
├── script.js           # Interactive functionality and animations
├── logo.svg           # SmartAgriLink logo
└── README.md          # This file
```

## ✨ Features

### 🎯 Sections Included

1. **Hero Section**
   - Bold headline and compelling subtitle
   - Animated gradient background with network overlay
   - Dual CTA buttons ("Join the Waitlist" and "Learn More")
   - Parallax scroll effects

2. **Implementation Framework**
   - Clear explanation of SmartAgriLink's mission
   - Interactive stakeholder cards (Farmers, Buyers, Processors, Logistics, NGOs)
   - Hover animations and scroll reveals

3. **Waitlist & Onboarding**
   - Segmented signup options for different user types
   - Interactive cards with modal forms
   - Category-specific form customization

4. **Benefits Section**
   - Key value propositions with icons
   - Transparency, Fair Pricing, AI Insights, etc.
   - Smooth hover effects

5. **Final Call-to-Action**
   - Bold statement and prominent CTA
   - Eye-catching gradient background

6. **Footer**
   - Newsletter subscription
   - Social media links
   - Quick navigation links

### 🎨 Design Features

- **Color Scheme**: Green, gold, and navy tones (agriculture + technology)
- **Typography**: Poppins font for modern, clean look
- **Animations**: 
  - Fade-in on page load
  - Scroll reveal effects
  - Hover transformations
  - Parallax scrolling
- **Responsive**: Mobile-first design that works on all devices

### ⚙️ Interactive Elements

- **Sticky Navigation**: Navbar with scroll highlighting
- **Mobile Menu**: Hamburger menu for mobile devices
- **Modal Forms**: Category-specific waitlist signup forms
- **Smooth Scrolling**: Animated navigation between sections
- **Network Animation**: Animated grid pattern background
- **Scroll Indicators**: Visual cues for user engagement

## 🚀 Getting Started

### Quick Start

1. Open `index.html` in your web browser
2. The page is fully functional with client-side JavaScript
3. No build process or dependencies required

### Customization

#### Update Content

- **Text**: Edit content directly in `index.html`
- **Colors**: Modify CSS variables in `:root` section of `styles.css`
- **Images**: Replace `logo.svg` with your own logo

#### CSS Variables (in styles.css)

```css
:root {
    --primary-green: #6fbd43;
    --dark-green: #4a8f2e;
    --gold: #f4a300;
    --navy: #1e3a5f;
    /* ... more variables */
}
```

#### Add Backend Integration

The forms are currently set up with console logging. To connect to a backend:

**Waitlist Form** (in `script.js`):
```javascript
function submitWaitlist(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Replace with your API endpoint
    fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('Success! Check your email for confirmation.');
        closeModal();
    })
    .catch(error => {
        alert('Something went wrong. Please try again.');
    });
    
    return false;
}
```

**Newsletter Form** (in `script.js`):
```javascript
function subscribeNewsletter(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Replace with your API endpoint
    fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(result => {
        alert('Successfully subscribed!');
        emailInput.value = '';
    })
    .catch(error => {
        alert('Something went wrong. Please try again.');
    });
    
    return false;
}
```

## 📱 Responsive Breakpoints

- **Desktop**: > 968px
- **Tablet**: 640px - 968px
- **Mobile**: < 640px

## 🎨 Icons

The page uses Font Awesome 6.4.0 for icons. Icons are loaded via CDN:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### Icon Classes Used:
- `fa-tractor` - Farmers
- `fa-shopping-cart` - Buyers
- `fa-industry` - Processors
- `fa-truck` - Logistics
- `fa-handshake` - NGOs
- `fa-eye` - Transparency
- `fa-balance-scale` - Fair Pricing
- And more...

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Optimization

- **Lazy Loading**: Scroll reveal animations load content as users scroll
- **CSS Animations**: Hardware-accelerated transforms
- **Optimized Images**: SVG logo for scalability
- **Minimal Dependencies**: Only Font Awesome for icons

## 🔧 Future Enhancements

Consider adding:
- [ ] Analytics integration (Google Analytics, Mixpanel)
- [ ] SEO meta tags and Open Graph tags
- [ ] Backend API for form submissions
- [ ] Email service integration (SendGrid, Mailchimp)
- [ ] Multilingual support
- [ ] A/B testing for CTAs
- [ ] Blog/news section
- [ ] Success stories/testimonials
- [ ] Partner logos section

## 📞 Support

For questions or support, contact:
- Email: info@smartagrilink.com
- Website: www.smartagrilink.com

## 📄 License

Copyright © 2025 SmartAgriLink. All rights reserved.

---

**Built with ❤️ for African Agriculture**

*Connecting Farms, Empowering Futures.*
