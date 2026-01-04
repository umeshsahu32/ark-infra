// Footer JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const privacyBtn = document.getElementById("privacyBtn");
  const termsBtn = document.getElementById("termsBtn");

  // Smooth scroll for footer links
  const footerLinks = document.querySelectorAll(".footer-link");
  footerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const header = document.getElementById("mainHeader");
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Privacy Policy button handler
  if (privacyBtn) {
    privacyBtn.addEventListener("click", function () {
      window.location.href = "privacy-policy.html";
    });
  }

  // Terms & Conditions button handler
  if (termsBtn) {
    termsBtn.addEventListener("click", function () {
      window.location.href = "terms-conditions.html";
    });
  }
});

