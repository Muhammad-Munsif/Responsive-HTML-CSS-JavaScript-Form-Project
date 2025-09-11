document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const successMessage = document.querySelector(".success-message");

  // Toggle password visibility
  document.querySelectorAll(".toggle-password").forEach(function (icon) {
    icon.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      this.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
    });
  });

  // Form validation
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    document.querySelectorAll(".error").forEach(function (error) {
      error.style.display = "none";
    });

    // Validate first name
    const firstName = document.getElementById("firstName");
    if (!firstName.value.trim()) {
      document.getElementById("firstNameError").style.display = "block";
      isValid = false;
    }

    // Validate last name
    const lastName = document.getElementById("lastName");
    if (!lastName.value.trim()) {
      document.getElementById("lastNameError").style.display = "block";
      isValid = false;
    }

    // Validate email
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      document.getElementById("emailError").style.display = "block";
      isValid = false;
    }

    // Validate phone (optional but must be valid if provided)
    const phone = document.getElementById("phone");
    const phoneRegex = /^[\d\s-]+$/;
    if (phone.value && !phoneRegex.test(phone.value)) {
      document.getElementById("phoneError").style.display = "block";
      isValid = false;
    }

    // Validate password
    const password = document.getElementById("password");
    if (password.value.length < 6) {
      document.getElementById("passwordError").style.display = "block";
      isValid = false;
    }

    // Validate confirm password
    const confirmPassword = document.getElementById("confirmPassword");
    if (confirmPassword.value !== password.value) {
      document.getElementById("confirmPasswordError").style.display = "block";
      isValid = false;
    }

    // Validate terms
    const terms = document.getElementById("terms");
    if (!terms.checked) {
      document.getElementById("termsError").style.display = "block";
      isValid = false;
    }

    // If form is valid, show success message
    if (isValid) {
      form.style.display = "none";
      successMessage.style.display = "block";

      // In a real application, you would submit the form data to a server here
      // For demonstration, we'll just log the form data
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());
      console.log("Form data:", formValues);

      // Reset form after 5 seconds (for demo purposes)
      setTimeout(function () {
        form.reset();
        form.style.display = "block";
        successMessage.style.display = "none";
      }, 5000);
    }
  });

  // Add real-time validation for better UX
  document.getElementById("email").addEventListener("input", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.value)) {
      document.getElementById("emailError").style.display = "none";
    }
  });

  document.getElementById("password").addEventListener("input", function () {
    if (this.value.length >= 6) {
      document.getElementById("passwordError").style.display = "none";
    }
  });

  document
    .getElementById("confirmPassword")
    .addEventListener("input", function () {
      const password = document.getElementById("password").value;
      if (this.value === password) {
        document.getElementById("confirmPasswordError").style.display = "none";
      }
    });
});
