// Contact Form Validation and Submission
(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
      name: {
        input: document.getElementById('name'),
        error: document.querySelector('[data-testid="test-contact-error-name"]'),
        validate: validateName
      },
      email: {
        input: document.getElementById('email'),
        error: document.querySelector('[data-testid="test-contact-error-email"]'),
        validate: validateEmail
      },
      subject: {
        input: document.getElementById('subject'),
        error: document.querySelector('[data-testid="test-contact-error-subject"]'),
        validate: validateSubject
      },
      message: {
        input: document.getElementById('message'),
        error: document.querySelector('[data-testid="test-contact-error-message"]'),
        validate: validateMessage
      }
    };

    const successMessage = document.querySelector('[data-testid="test-contact-success"]');

    // Validation Functions
    function validateName(value) {
      if (!value || value.trim() === '') {
        return 'Full name is required';
      }
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters long';
      }
      return null;
    }

    function validateEmail(value) {
      if (!value || value.trim() === '') {
        return 'Email address is required';
      }
      
      // Email regex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        return 'Please enter a valid email address (e.g., name@example.com)';
      }
      return null;
    }

    function validateSubject(value) {
      if (!value || value.trim() === '') {
        return 'Subject is required';
      }
      if (value.trim().length < 3) {
        return 'Subject must be at least 3 characters long';
      }
      return null;
    }

    function validateMessage(value) {
      if (!value || value.trim() === '') {
        return 'Message is required';
      }
      if (value.trim().length < 10) {
        return 'Message must be at least 10 characters long';
      }
      return null;
    }

    // Show error message
    function showError(fieldName, message) {
      const field = fields[fieldName];
      if (!field) return;

      field.input.classList.add('error');
      field.input.setAttribute('aria-invalid', 'true');
      field.error.textContent = message;
      field.error.classList.add('visible');
    }

    // Clear error message
    function clearError(fieldName) {
      const field = fields[fieldName];
      if (!field) return;

      field.input.classList.remove('error');
      field.input.setAttribute('aria-invalid', 'false');
      field.error.textContent = '';
      field.error.classList.remove('visible');
    }

    // Validate single field
    function validateField(fieldName) {
      const field = fields[fieldName];
      if (!field) return true;

      const value = field.input.value;
      const errorMessage = field.validate(value);

      if (errorMessage) {
        showError(fieldName, errorMessage);
        return false;
      } else {
        clearError(fieldName);
        return true;
      }
    }

    // Validate all fields
    function validateForm() {
      let isValid = true;

      Object.keys(fields).forEach(fieldName => {
        if (!validateField(fieldName)) {
          isValid = false;
        }
      });

      return isValid;
    }

    // Show success message
    function showSuccess() {
      successMessage.style.display = 'flex';
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Announce to screen readers
      successMessage.setAttribute('role', 'alert');
      successMessage.setAttribute('aria-live', 'polite');
    }

    // Hide success message
    function hideSuccess() {
      successMessage.style.display = 'none';
    }

    // Reset form
    function resetForm() {
      form.reset();
      Object.keys(fields).forEach(clearError);
    }

    // Add real-time validation on blur
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      if (field.input) {
        field.input.addEventListener('blur', function() {
          if (this.value) {
            validateField(fieldName);
          }
        });

        // Clear error on input if field was invalid
        field.input.addEventListener('input', function() {
          if (this.classList.contains('error')) {
            validateField(fieldName);
          }
        });
      }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Hide any existing success message
      hideSuccess();

      // Validate all fields
      const isValid = validateForm();

      if (isValid) {
        // In a real application, you would send the data to a server here
        console.log('Form is valid. Submitting...');
        
        // Get form data
        const formData = {
          name: fields.name.input.value,
          email: fields.email.input.value,
          subject: fields.subject.input.value,
          message: fields.message.input.value,
          timestamp: new Date().toISOString()
        };
        
        console.log('Form Data:', formData);

        // Simulate successful submission
        setTimeout(function() {
          showSuccess();
          resetForm();
          
          // Optional: Hide success message after 10 seconds
          setTimeout(function() {
            hideSuccess();
          }, 10000);
        }, 500);
      } else {
        // Focus on first invalid field
        const firstInvalidField = form.querySelector('.error');
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
      }
    });

    // Keyboard accessibility enhancement
    form.addEventListener('keydown', function(e) {
      // Submit on Ctrl/Cmd + Enter
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
      }
    });

    console.log('Contact form validation initialized');
  });
})();