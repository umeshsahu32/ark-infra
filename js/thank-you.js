// Thank You Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Check if form data exists in sessionStorage
  const formData = sessionStorage.getItem("formData");
  
  if (formData) {
    const data = JSON.parse(formData);
    // Clear the sessionStorage after reading
    sessionStorage.removeItem("formData");
  }
});

