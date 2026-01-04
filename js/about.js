// About Us Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const counterElement = document.getElementById("experienceCounter");
  const targetNumber = 37;
  const duration = 2000; // 4 seconds in milliseconds
  let hasAnimated = false;

  // Function to animate counter
  function animateCounter() {
    if (hasAnimated) return;
    hasAnimated = true;

    const startTime = Date.now();
    const startNumber = 1;

    function updateCounter() {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easeOut);
      counterElement.textContent = currentNumber;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counterElement.textContent = targetNumber;
      }
    }

    updateCounter();
  }

  // Intersection Observer to trigger animation when section is visible
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // Trigger when 30% of the section is visible
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounter();
      }
    });
  }, observerOptions);

  // Observe the about section
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    observer.observe(aboutSection);
  }
});

