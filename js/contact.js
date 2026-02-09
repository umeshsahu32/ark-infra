// Contact Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnLoader = document.getElementById("btnLoader");
  const successMessage = document.getElementById("successMessage");

  // Get form fields
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const designationInput = document.getElementById("designation");
  const companyInput = document.getElementById("company");
  const businessEmailInput = document.getElementById("businessEmail");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  // Get error message elements
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const designationError = document.getElementById("designationError");
  const companyError = document.getElementById("companyError");
  const businessEmailError = document.getElementById("businessEmailError");
  const phoneError = document.getElementById("phoneError");
  const messageError = document.getElementById("messageError");

  // Validation functions
  function validateFirstName(name) {
    if (!name || name.trim() === "") {
      return "First name is required";
    }
    if (name.trim().length < 2) {
      return "First name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "First name should only contain letters and spaces";
    }
    return "";
  }

  function validateLastName(name) {
    if (!name || name.trim() === "") {
      return "Last name is required";
    }
    if (name.trim().length < 2) {
      return "Last name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "Last name should only contain letters and spaces";
    }
    return "";
  }

  function validateDesignation(designation) {
    if (!designation || designation.trim() === "") {
      return "Designation is required";
    }
    if (designation.trim().length < 2) {
      return "Designation must be at least 2 characters";
    }
    return "";
  }

  function validateCompany(company) {
    if (!company || company.trim() === "") {
      return "Company is required";
    }
    if (company.trim().length < 2) {
      return "Company name must be at least 2 characters";
    }
    return "";
  }

  function validateBusinessEmail(email) {
    if (!email || email.trim() === "") {
      return "Business email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid business email address";
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
  firstNameInput.addEventListener("blur", function () {
    const error = validateFirstName(this.value);
    if (error) {
      showError(firstNameError, error);
      addErrorClass(this);
    } else {
      clearError(firstNameError);
      removeErrorClass(this);
    }
  });

  lastNameInput.addEventListener("blur", function () {
    const error = validateLastName(this.value);
    if (error) {
      showError(lastNameError, error);
      addErrorClass(this);
    } else {
      clearError(lastNameError);
      removeErrorClass(this);
    }
  });

  designationInput.addEventListener("blur", function () {
    const error = validateDesignation(this.value);
    if (error) {
      showError(designationError, error);
      addErrorClass(this);
    } else {
      clearError(designationError);
      removeErrorClass(this);
    }
  });

  companyInput.addEventListener("blur", function () {
    const error = validateCompany(this.value);
    if (error) {
      showError(companyError, error);
      addErrorClass(this);
    } else {
      clearError(companyError);
      removeErrorClass(this);
    }
  });

  businessEmailInput.addEventListener("blur", function () {
    const error = validateBusinessEmail(this.value);
    if (error) {
      showError(businessEmailError, error);
      addErrorClass(this);
    } else {
      clearError(businessEmailError);
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
  firstNameInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(firstNameError);
      removeErrorClass(this);
    }
  });

  lastNameInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(lastNameError);
      removeErrorClass(this);
    }
  });

  designationInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(designationError);
      removeErrorClass(this);
    }
  });

  companyInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(companyError);
      removeErrorClass(this);
    }
  });

  businessEmailInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(businessEmailError);
      removeErrorClass(this);
    }
  });

  phoneInput.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      clearError(phoneError);
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
  // Google Apps Script Web App URL
  // TODO: Replace with your actual Web App URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxAY6SOwsZsHYv74VVcq94zZhPQonmS4UbsbCIB012H_a1kUAej6MMqWNdTtMWYpnI3vA/exec";


  // Form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const designation = designationInput.value.trim();
    const company = companyInput.value.trim();
    const businessEmail = businessEmailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    // Validate all fields
    const firstNameErrorMsg = validateFirstName(firstName);
    const lastNameErrorMsg = validateLastName(lastName);
    const designationErrorMsg = validateDesignation(designation);
    const companyErrorMsg = validateCompany(company);
    const businessEmailErrorMsg = validateBusinessEmail(businessEmail);
    const phoneErrorMsg = validatePhone(phone);
    const messageErrorMsg = validateMessage(message);

    let hasErrors = false;

    // Display errors
    if (firstNameErrorMsg) {
      showError(firstNameError, firstNameErrorMsg);
      addErrorClass(firstNameInput);
      hasErrors = true;
    } else {
      clearError(firstNameError);
      removeErrorClass(firstNameInput);
    }

    if (lastNameErrorMsg) {
      showError(lastNameError, lastNameErrorMsg);
      addErrorClass(lastNameInput);
      hasErrors = true;
    } else {
      clearError(lastNameError);
      removeErrorClass(lastNameInput);
    }

    if (designationErrorMsg) {
      showError(designationError, designationErrorMsg);
      addErrorClass(designationInput);
      hasErrors = true;
    } else {
      clearError(designationError);
      removeErrorClass(designationInput);
    }

    if (companyErrorMsg) {
      showError(companyError, companyErrorMsg);
      addErrorClass(companyInput);
      hasErrors = true;
    } else {
      clearError(companyError);
      removeErrorClass(companyInput);
    }

    if (businessEmailErrorMsg) {
      showError(businessEmailError, businessEmailErrorMsg);
      addErrorClass(businessEmailInput);
      hasErrors = true;
    } else {
      clearError(businessEmailError);
      removeErrorClass(businessEmailInput);
    }

    if (phoneErrorMsg) {
      showError(phoneError, phoneErrorMsg);
      addErrorClass(phoneInput);
      hasErrors = true;
    } else {
      clearError(phoneError);
      removeErrorClass(phoneInput);
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

    try {
      // Check if URL is configured
      if (GOOGLE_SCRIPT_URL === "YOUR_WEB_APP_URL_HERE") {
        throw new Error(
          "Google Apps Script URL is not configured. Please check the code."
        );
      }

      const formData = {
        firstName: firstName,
        lastName: lastName,
        designation: designation,
        company: company,
        businessEmail: businessEmail,
        phone: phone,
        message: message,
        timestamp: new Date().toISOString(),
      };

      // Send data to Google Apps Script
      // mode: 'no-cors' is often needed for Google Apps Script simple triggers,
      // but 'cors' works if the script returns proper headers.
      // Using 'text/plain' to avoid preflight OPTION request which Apps Script doesn't handle well
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });

      // With no-cors/opaque response, we might not get 200 OK visible here if validation fails script-side,
      // but for this simple use case, we assume if fetch doesn't throw, it likely went through or at least reached the server.
      // If you deploy the web app as "Anyone", it usually returns 200.

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.result !== 'success') {
        throw new Error(result.error || 'Submission failed');
      }

      // Store form data in sessionStorage for thank you page
      sessionStorage.setItem("formData", JSON.stringify(formData));

      // Redirect to thank you page
      window.location.href = "https://arkgroup.in/";
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while submitting the form. Please try again later. " +
        (error.message ? "\nError: " + error.message : "")
      );
    } finally {
      // Remove loading state
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.querySelector(".btn-text").textContent = "Submit";
    }
  });
});

