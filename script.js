// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Event Handling Section
    // ======================
    
    // Button click event
    document.getElementById("click-btn").addEventListener("click", function () {
        const message = document.getElementById("click-message");
        message.classList.remove("hidden");
        message.classList.add("visible");
      });
      
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked!';
        clickOutput.style.color = '#27ae60';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Button not clicked yet';
            clickOutput.style.color = '';
        }, 2000);
    });
    
    // Hover effects
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Mouse is hovering! 😊';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Hover over this box!';
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
    });
    
    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let longPressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.classList.remove('hidden');
        setTimeout(() => secretOutput.classList.add('hidden'), 2000);
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(() => {
            secretOutput.textContent = "🔐 You held it long enough! 🔐";
            secretOutput.classList.remove('hidden');
            setTimeout(() => secretOutput.classList.add('hidden'), 2000);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // ==========================
    // Interactive Elements Section
    // ==========================
    
    // Button that changes color
    const colorBtn = document.getElementById('color-btn');
    const colorDisplay = document.getElementById('color-display');
    
    colorBtn.addEventListener('click', function() {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        colorDisplay.style.backgroundColor = randomColor;
        
        // Add animation
        colorDisplay.style.transform = 'scale(1.1)';
        setTimeout(() => {
            colorDisplay.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        currentImageIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) newIndex = galleryImages.length - 1;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= galleryImages.length) newIndex = 0;
        showImage(newIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        nextBtn.click();
    }, 3000);
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form Validation Section

    
    const userForm = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('invalid');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('invalid');
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('invalid');
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailInput.classList.add('invalid');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.length === 0) {
            passwordError.textContent = '';
            updatePasswordStrength(0);
            return false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            updatePasswordStrength(passwordInput.value.length / 8);
            return false;
        } else {
            passwordError.textContent = '';
            updatePasswordStrength(1 + calculatePasswordComplexity(passwordInput.value));
            return true;
        }
    }
    
    function calculatePasswordComplexity(password) {
        let complexity = 0;
        
        // Check for uppercase letters
        if (/[A-Z]/.test(password)) complexity += 0.2;
        // Check for numbers
        if (/\d/.test(password)) complexity += 0.2;
        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) complexity += 0.2;
        // Check length beyond minimum
        if (password.length > 10) complexity += 0.2;
        
        return complexity;
    }
    
    function updatePasswordStrength(strength) {
        const bar = strengthBar.querySelector('::after') || strengthBar;
        
        if (strength < 0.4) {
            strengthBar.style.setProperty('--strength-color', '#e74c3c');
            strengthText.textContent = 'Weak';
        } else if (strength < 0.7) {
            strengthBar.style.setProperty('--strength-color', '#f39c12');
            strengthText.textContent = 'Medium';
        } else {
            strengthBar.style.setProperty('--strength-color', '#2ecc71');
            strengthText.textContent = 'Strong';
        }
        
        strengthBar.style.setProperty('--strength-width', `${Math.min(strength * 100, 100)}%`);
    }
    
    // Form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            userForm.reset();
            strengthBar.style.setProperty('--strength-width', '0%');
            strengthText.textContent = '';
        } else {
            userForm.classList.add('shake');
            setTimeout(() => userForm.classList.remove('shake'), 500);
        }
    });
});