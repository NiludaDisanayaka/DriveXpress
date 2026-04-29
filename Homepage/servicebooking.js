
// Service Booking Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for booking (today)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date to YYYY-MM-DD
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    const dateInput = document.getElementById('preferredDate');
    dateInput.min = formatDate(tomorrow);
    dateInput.value = formatDate(tomorrow);
    
    // Service pricing data
    const servicePrices = {
        'oil': { min: 8000, max: 12000, name: 'Oil Change & Filter' },
        'brake': { min: 20000, max: 35000, name: 'Brake Service' },
        'engine': { min: 12000, max: 18000, name: 'Engine Tune-up' },
        'ac': { min: 15000, max: 25000, name: 'AC Service' },
        'tire': { min: 3000, max: 8000, name: 'Tire Rotation' },
        'diagnostic': { min: 5000, max: 10000, name: 'Diagnostic Check' }
    };
    
    // Update summary when services are selected
    const serviceCheckboxes = document.querySelectorAll('input[name="service"]');
    const selectedServicesEl = document.getElementById('selectedServices');
    const estimatedCostEl = document.getElementById('estimatedCost');
    const totalEstimateEl = document.getElementById('totalEstimate');
    
    function updateServiceSummary() {
        let selectedServices = [];
        let minTotal = 0;
        let maxTotal = 0;
        
        serviceCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const service = checkbox.value;
                selectedServices.push(servicePrices[service].name);
                minTotal += servicePrices[service].min;
                maxTotal += servicePrices[service].max;
            }
        });
        
        // Update UI
        if (selectedServices.length > 0) {
            selectedServicesEl.textContent = selectedServices.join(', ');
            estimatedCostEl.textContent = `Rs. ${minTotal.toLocaleString()} - ${maxTotal.toLocaleString()}`;
            totalEstimateEl.textContent = `Rs. ${((minTotal + maxTotal) / 2).toLocaleString()}`;
        } else {
            selectedServicesEl.textContent = 'None';
            estimatedCostEl.textContent = 'Rs. 0';
            totalEstimateEl.textContent = 'Rs. 0';
        }
    }
    
    // Add event listeners to service checkboxes
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateServiceSummary);
    });
    
    // Get Estimate button functionality
    const estimateBtn = document.querySelector('.btn-estimate');
    estimateBtn.addEventListener('click', function() {
        const selectedCount = Array.from(serviceCheckboxes).filter(cb => cb.checked).length;
        
        if (selectedCount === 0) {
            alert('Please select at least one service to get an estimate.');
            return;
        }
        
        updateServiceSummary();
        
        // Show estimate modal
        const minTotal = Array.from(serviceCheckboxes)
            .filter(cb => cb.checked)
            .reduce((total, cb) => total + servicePrices[cb.value].min, 0);
            
        const maxTotal = Array.from(serviceCheckboxes)
            .filter(cb => cb.checked)
            .reduce((total, cb) => total + servicePrices[cb.value].max, 0);
            
        const avgTotal = Math.round((minTotal + maxTotal) / 2);
        
        alert(`Estimated Cost: Rs. ${minTotal.toLocaleString()} - Rs. ${maxTotal.toLocaleString()}\nAverage: Rs. ${avgTotal.toLocaleString()}\n\nNote: Final cost may vary based on vehicle condition and parts required.`);
    });
    
    // Form validation and submission
    const serviceForm = document.getElementById('serviceForm');
    
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = serviceForm.querySelectorAll('[required]');
        let isValid = true;
        let errorMessage = '';
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--danger)';
                errorMessage = 'Please fill in all required fields.';
            } else {
                field.style.borderColor = 'var(--gray)';
            }
        });
        
        // Check if at least one service is selected
        const selectedServices = Array.from(serviceCheckboxes).filter(cb => cb.checked);
        if (selectedServices.length === 0) {
            isValid = false;
            errorMessage = 'Please select at least one service.';
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            isValid = false;
            email.style.borderColor = 'var(--danger)';
            errorMessage = 'Please enter a valid email address.';
        }
        
        // Phone validation (basic)
        const phone = document.getElementById('phone');
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        if (phone.value && !phoneRegex.test(phone.value.replace(/\s/g, ''))) {
            isValid = false;
            phone.style.borderColor = 'var(--danger)';
            errorMessage = 'Please enter a valid phone number.';
        }
        
        if (!isValid) {
            alert(errorMessage);
            return;
        }
        
        // Show success message
        const selectedServiceNames = selectedServices.map(cb => {
            const serviceId = cb.value;
            return servicePrices[serviceId].name;
        });
        
        const formData = new FormData(serviceForm);
        const bookingData = {
            name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            vehicle: `${formData.get('brand')} ${formData.get('model')}`,
            services: selectedServiceNames,
            date: formData.get('preferredDate'),
            time: formData.get('preferredTime')
        };
        
        // In a real application, you would send this data to a server
        console.log('Booking Data:', bookingData);
        
        // Show success animation
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Booking Submitted!';
        submitBtn.style.background = 'linear-gradient(135deg, var(--success), #34d399)';
        submitBtn.disabled = true;
        
        // Show confirmation message
        setTimeout(() => {
            alert(`Thank you, ${bookingData.name}!\n\nYour service booking has been confirmed.\n\nDetails:\n• Vehicle: ${bookingData.vehicle}\n• Services: ${bookingData.services.join(', ')}\n• Date: ${bookingData.date}\n• Time: ${bookingData.time}\n\nWe will contact you at ${bookingData.phone} to confirm your appointment.`);
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-light))';
            submitBtn.disabled = false;
            
            // Reset form after 2 seconds
            setTimeout(() => {
                serviceForm.reset();
                updateServiceSummary();
                dateInput.value = formatDate(tomorrow);
            }, 2000);
        }, 1500);
    });
    
    // Clear form button
    const resetBtn = document.querySelector('.btn-reset');
    resetBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear the form?')) {
            updateServiceSummary();
            dateInput.value = formatDate(tomorrow);
        }
    });
    
    // Auto-populate vehicle model based on brand
    const brandSelect = document.getElementById('brand');
    const modelInput = document.getElementById('model');
    
    const brandModels = {
        'honda': ['Civic', 'Accord', 'CR-V', 'City', 'Vezel'],
        'toyota': ['Corolla', 'Camry', 'Prius', 'RAV4', 'Land Cruiser'],
        'nissan': ['Sunny', 'X-Trail', 'Patrol', 'March', 'Leaf'],
        'mitsubishi': ['Montero', 'Lancer', 'Outlander', 'Pajero'],
        'hyundai': ['Tucson', 'Santa Fe', 'Elantra', 'Accent'],
        'bmw': ['3 Series', '5 Series', 'X5', 'X3'],
        'mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLC']
    };
    
    brandSelect.addEventListener('change', function() {
        const brand = this.value;
        if (brandModels[brand]) {
            // Create datalist for autocomplete
            let datalist = document.getElementById('modelSuggestions');
            if (!datalist) {
                datalist = document.createElement('datalist');
                datalist.id = 'modelSuggestions';
                modelInput.after(datalist);
            }
            
            datalist.innerHTML = brandModels[brand]
                .map(model => `<option value="${model}">`)
                .join('');
                
            modelInput.setAttribute('list', 'modelSuggestions');
        } else {
            modelInput.removeAttribute('list');
        }
    });
    
    // Initialize summary
    updateServiceSummary();
});
