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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Finance Apply - Auto Care</title>
    <link rel="stylesheet" href="fa.css">
</head>
<body>
    <div class="container">
        <!-- Main Content -->
        <main class="main-content">
            <div class="form-wrapper">
                <form class="finance-form" id="financeForm">
                    <h2 class="form-title">FORM</h2>
                    
                    <!-- Personal Information Section -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Your name</label>
                            <input type="text" id="name" name="name" class="form-input" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone number</label>
                            <input type="tel" id="phone" name="phone" class="form-input" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" class="form-input" placeholder="">
                        </div>
                    </div>

                    <!-- Vehicle Model -->
                    <div class="form-group full-width">
                        <label for="vehicle-model">Vehicle Model</label>
                        <select id="vehicle-model" name="vehicleModel" class="form-select">
                            <option value="">Select</option>
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="hatchback">Hatchback</option>
                            <option value="truck">Truck</option>
                        </select>
                    </div>

                    <!-- Finance or Insurance -->
                    <div class="form-group full-width">
                        <label for="finance-type">Finance or Insurance</label>
                        <select id="finance-type" name="financeType" class="form-select">
                            <option value="">Select</option>
                            <option value="finance">Finance</option>
                            <option value="insurance">Insurance</option>
                            <option value="both">Both</option>
                        </select>
                    </div>

                    <!-- Estimated Price -->
                    <div class="form-group full-width">
                        <label for="estimated-price">Estimated Price</label>
                        <input type="text" id="estimated-price" name="estimatedPrice" class="form-input" placeholder="">
                    </div>

                    <!-- Notes or Conditions -->
                    <div class="form-group full-width">
                        <label for="notes">Notes or conditions</label>
                        <textarea id="notes" name="notes" class="form-textarea" placeholder="" rows="4"></textarea>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="submit-btn">Submit</button>
                </form>
            </div>

            <!-- Confirmation Message Area -->
            <div class="confirmation-area" id="confirmationArea">
                <p id="confirmationMessage"></p>
            </div>
        </main>
    </div>

    <script src="fa.js"></script>
</body>
</html>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Main Content */
.main-content {
    flex: 1;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Form Wrapper */
.form-wrapper {
    width: 100%;
    max-width: 600px;
    background-color: #112a3d;
    padding: 30px;
    border-radius: 8px;
    margin-bottom: 30px;
}

.finance-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-title {
    text-align: center;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 2px;
    background-color: #a0a0a0;
    padding: 10px;
    margin: -30px -30px 20px -30px;
    border-radius: 8px 8px 0 0;
}

/* Form Row for Personal Information */
.form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

.form-group label {
    font-size: 14px;
    font-weight: 600;
    color: #f5f5f5;
    text-transform: capitalize;
}

.form-input,
.form-select,
.form-textarea {
    padding: 7px 9px;
    border: 1px solid #999;
    border-radius: 3px;
    background-color: #f5f5f5;
    font-size: 14px;
    color: #333;
    font-family: Arial, sans-serif;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none;
    border-color: #00bcd4;
    box-shadow: 0 0 5px rgba(0, 188, 212, 0.3);
}

.form-textarea {
    resize: vertical;
    font-family: Arial, sans-serif;
}

.form-select {
    cursor: pointer;
    background-color: #f5f5f5;
    appearance: auto;
}

/* Submit Button */
.submit-btn {
    padding: 12px 30px;
    background-color: #f59e0b;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    align-self: center;
}

.submit-btn:hover {
    background-color: #0b90f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.submit-btn:active {
    transform: translateY(0);
}

/* Confirmation Area */
.confirmation-area {
    width: 100%;
    max-width: 600px;
    background-color: #d3d3d3;
    padding: 20px;
    border-radius: 4px;
    text-align: center;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#confirmationMessage {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    .main-content {
        padding: 15px;
    }

    .form-wrapper {
        padding: 20px;
        max-width: 100%;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .confirmation-area {
        max-width: 100%;
    }
}

@media (max-width: 480px) {
    .main-content {
        padding: 10px;
    }

    .form-wrapper {
        padding: 15px;
    }
}
