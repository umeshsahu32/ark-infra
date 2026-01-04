// Contact Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnLoader = document.getElementById("btnLoader");
  const successMessage = document.getElementById("successMessage");

  // Get form fields
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  // Get error message elements
  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  // Validation functions
  function validateFullName(name) {
    if (!name || name.trim() === "") {
      return "Full name is required";
    }
    if (name.trim().length < 2) {
      return "Full name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "Full name should only contain letters and spaces";
    }
    return "";
  }

  function validateEmail(email) {
    if (!email || email.trim() === "") {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    return "";
  }

  function validatePhone(phone) {
    if (!phone || phone.trim() === "") {
      return "Phone number is required";
    }
    // Remove spaces, dashes, and parentheses for validation
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, "");
    // Allow digits, +, and - with at least 10 digits
    if (!/^[\+]?[0-9]{10,15}$/.test(cleanedPhone)) {
      return "Please enter a valid phone number (10-15 digits)";
    }
    return "";
  }

  function validateSubject(subject) {
    if (!subject || subject.trim() === "") {
      return "Subject is required";
    }
    if (subject.trim().length < 3) {
      return "Subject must be at least 3 characters";
    }
    return "";
  }

  function validateMessage(message) {
    if (!message || message.trim() === "") {
      return "Message is required";
    }
    if (message.trim().length < 10) {
      return "Message must be at least 10 characters";
    }
    return "";
  }

  // Display error message
  function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  // Clear error message
  function clearError(errorElement) {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  // Remove error class from input
  function removeErrorClass(input) {
    input.classList.remove("error");
  }

  // Add error class to input
  function addErrorClass(input) {
    input.classList.add("error");
  }

  // Real-time validation
  fullNameInput.addEventListener("blur", function () {
    const error = validateFullName(this.value);
    if (error) {
      showError(fullNameError, error);
      addErrorClass(this);
    } else {
      clearError(fullNameError);
      removeErrorClass(this);
    }
  });

  emailInput.addEventListener("blur", function () {
    const error = validateEmail(this.value);
    if (error) {
      showError(emailError, error);
      addErrorClass(this);
    } else {
      clearError(emailError);
      removeErrorClass(this);
    }
  });

  phoneInput.addEventListener("blur", function () {
    const error = validatePhone(this.value);
    if (error) {
      showError(phoneError, error);
      addErrorClass(this);
    } else {
      clearError(phoneError);
      removeErrorClass(this);
    }
  });

  subjectInput.addEventListener("blur", function () {
    const error = validateSubject(this.value);
    if (error) {
      showError(subjectError, error);
      addErrorClass(this);
    } else {
      clearError(subjectError);
      removeErrorClass(this);
    }
  });

  messageInput.addEventListener("blur", function () {
    const error = validateMessage(this.value);
    if (error) {
      showError(messageError, error);
      addErrorClass(this);
    } else {
      clearError(messageError);
      removeErrorClass(this);
    }
  });

  // Clear errors on input
  fullNameInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(fullNameError);
      removeErrorClass(this);
    }
  });

  emailInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(emailError);
      removeErrorClass(this);
    }
  });

  phoneInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(phoneError);
      removeErrorClass(this);
    }
  });

  subjectInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(subjectError);
      removeErrorClass(this);
    }
  });

  messageInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(messageError);
      removeErrorClass(this);
    }
  });

  // Form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Validate all fields
    const fullNameErrorMsg = validateFullName(fullName);
    const emailErrorMsg = validateEmail(email);
    const phoneErrorMsg = validatePhone(phone);
    const subjectErrorMsg = validateSubject(subject);
    const messageErrorMsg = validateMessage(message);

    let hasErrors = false;

    // Display errors
    if (fullNameErrorMsg) {
      showError(fullNameError, fullNameErrorMsg);
      addErrorClass(fullNameInput);
      hasErrors = true;
    } else {
      clearError(fullNameError);
      removeErrorClass(fullNameInput);
    }

    if (emailErrorMsg) {
      showError(emailError, emailErrorMsg);
      addErrorClass(emailInput);
      hasErrors = true;
    } else {
      clearError(emailError);
      removeErrorClass(emailInput);
    }

    if (phoneErrorMsg) {
      showError(phoneError, phoneErrorMsg);
      addErrorClass(phoneInput);
      hasErrors = true;
    } else {
      clearError(phoneError);
      removeErrorClass(phoneInput);
    }

    if (subjectErrorMsg) {
      showError(subjectError, subjectErrorMsg);
      addErrorClass(subjectInput);
      hasErrors = true;
    } else {
      clearError(subjectError);
      removeErrorClass(subjectInput);
    }

    if (messageErrorMsg) {
      showError(messageError, messageErrorMsg);
      addErrorClass(messageInput);
      hasErrors = true;
    } else {
      clearError(messageError);
      removeErrorClass(messageInput);
    }

    // If there are errors, stop submission
    if (hasErrors) {
      return;
    }

    // Hide success message if shown
    successMessage.classList.remove("show");

    // Show loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    submitBtn.querySelector(".btn-text").textContent = "Submitting...";

    // Simulate form submission (replace with actual API call)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Form data object
      const formData = {
        fullName: fullName,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
      };

      // Form submitted successfully (console.log removed for production)

      // Here you would typically send the data to your server
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

      // Store form data in sessionStorage for thank you page
      sessionStorage.setItem("formData", JSON.stringify(formData));

      // Redirect to thank you page after a short delay
      setTimeout(() => {
        window.location.href = "thank-you.html";
      }, 500);
    } catch (error) {
      // Error handling (console.error removed for production)
      alert("An error occurred. Please try again later.");
    } finally {
      // Remove loading state
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.querySelector(".btn-text").textContent = "Submit";
    }
  });
});

