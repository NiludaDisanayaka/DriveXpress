// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavLinks();
    initializeProfileIcon();
    initializeFooterLinks();
    initializeForm();
});

// Handle Navigation Links
function initializeNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            console.log('Navigation to:', this.textContent);
        });
    });
}

// Profile Icon click handler
function initializeProfileIcon() {
    const profileIcon = document.querySelector('.profile-icon');
    
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            alert('Profile menu would open here');
            console.log('Profile clicked');
        });
    }
}

// Footer links handler
function initializeFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            alert(`Navigating to ${section.replace('-', ' ')} section`);
            console.log('Footer navigation to:', section);
        });
    });
}

// Initialize Form
function initializeForm() {
    const form = document.getElementById('financeForm');
    const confirmationArea = document.getElementById('confirmationArea');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const vehicleModel = document.getElementById('vehicle-model').value;
            const financeType = document.getElementById('finance-type').value;
            const estimatedPrice = document.getElementById('estimated-price').value.trim();
            const notes = document.getElementById('notes').value.trim();
            
            // Validate form
            if (!name || !phone || !email || !vehicleModel || !financeType || !estimatedPrice) {
                confirmationMessage.textContent = 'Please fill in all required fields.';
                confirmationMessage.style.color = '#d32f2f';
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                confirmationMessage.textContent = 'Please enter a valid email address.';
                confirmationMessage.style.color = '#d32f2f';
                return;
            }
            
            // Validate phone number (simple check)
            if (phone.length < 10) {
                confirmationMessage.textContent = 'Please enter a valid phone number.';
                confirmationMessage.style.color = '#d32f2f';
                return;
            }
            
            // Show success message
            confirmationMessage.textContent = `Thank you, ${name}! Your finance application has been submitted. We will contact you at ${phone} within 24 hours.`;
            confirmationMessage.style.color = '#2e7d32';
            
            // Log form data
            console.log('Form Submitted:', {
                name,
                phone,
                email,
                vehicleModel,
                financeType,
                estimatedPrice,
                notes
            });
            
            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
                confirmationMessage.textContent = '';
            }, 3000);
        });
    }
}

// Add real-time validation for email
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#d32f2f';
                this.style.boxShadow = '0 0 5px rgba(211, 47, 47, 0.3)';
            } else {
                this.style.borderColor = '#999';
                this.style.boxShadow = 'none';
            }
        });
    }
    
    // Add real-time validation for phone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && this.value.length < 10) {
                this.style.borderColor = '#d32f2f';
                this.style.boxShadow = '0 0 5px rgba(211, 47, 47, 0.3)';
            } else {
                this.style.borderColor = '#999';
                this.style.boxShadow = 'none';
            }
        });
    }
});
