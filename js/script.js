document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const successMessage = document.querySelector(".success-message");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const toggleConfirmPasswordBtn = document.getElementById(
    "toggleConfirmPassword"
  );
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  // Toggle password visibility
  togglePasswordBtn.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.innerHTML =
      type === "password"
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
  });

  toggleConfirmPasswordBtn.addEventListener("click", function () {
    const type =
      confirmPasswordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    confirmPasswordInput.setAttribute("type", type);
    this.innerHTML =
      type === "password"
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
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
      highlightError(firstName);
    } else {
      removeHighlight(firstName);
    }

    // Validate last name
    const lastName = document.getElementById("lastName");
    if (!lastName.value.trim()) {
      document.getElementById("lastNameError").style.display = "block";
      isValid = false;
      highlightError(lastName);
    } else {
      removeHighlight(lastName);
    }

    // Validate email
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      document.getElementById("emailError").style.display = "block";
      isValid = false;
      highlightError(email);
    } else {
      removeHighlight(email);
    }

    // Validate phone (optional but must be valid if provided)
    const phone = document.getElementById("phone");
    const phoneRegex = /^[\d\s-()+]+$/;
    if (phone.value && !phoneRegex.test(phone.value)) {
      document.getElementById("phoneError").style.display = "block";
      isValid = false;
      highlightError(phone);
    } else {
      removeHighlight(phone);
    }

    // Validate password
    if (passwordInput.value.length < 6) {
      document.getElementById("passwordError").style.display = "block";
      isValid = false;
      highlightError(passwordInput);
    } else {
      removeHighlight(passwordInput);
    }

    // Validate confirm password
    if (confirmPasswordInput.value !== passwordInput.value) {
      document.getElementById("confirmPasswordError").style.display = "block";
      isValid = false;
      highlightError(confirmPasswordInput);
    } else {
      removeHighlight(confirmPasswordInput);
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

        // Reset password visibility
        passwordInput.setAttribute("type", "password");
        confirmPasswordInput.setAttribute("type", "password");
        togglePasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
        toggleConfirmPasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
      }, 5000);
    }
  });

  // Helper functions for highlighting errors
  function highlightError(input) {
    input.style.borderColor = "var(--danger-color)";
    input.style.boxShadow = "0 0 0 3px rgba(244, 63, 94, 0.2)";
  }

  function removeHighlight(input) {
    input.style.borderColor = "var(--border-color)";
    input.style.boxShadow = "none";
  }

  // Add real-time validation for better UX
  document.getElementById("email").addEventListener("input", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.value)) {
      document.getElementById("emailError").style.display = "none";
      removeHighlight(this);
    }
  });

  document.getElementById("password").addEventListener("input", function () {
    if (this.value.length >= 6) {
      document.getElementById("passwordError").style.display = "none";
      removeHighlight(this);
    }

    // Also check confirm password in real-time
    const confirmPassword = document.getElementById("confirmPassword");
    if (confirmPassword.value === this.value && confirmPassword.value) {
      document.getElementById("confirmPasswordError").style.display = "none";
      removeHighlight(confirmPassword);
    }
  });

  document
    .getElementById("confirmPassword")
    .addEventListener("input", function () {
      const password = document.getElementById("password").value;
      if (this.value === password && password) {
        document.getElementById("confirmPasswordError").style.display = "none";
        removeHighlight(this);
      }
    });

  // Clear error highlights on focus
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      removeHighlight(this);
      const errorId = this.id + "Error";
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.style.display = "none";
      }
    });
  });
});
