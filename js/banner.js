// Banner Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Banner data array
  const bannerData = [
    {
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80",
      title: "Sustainability",
      description:
        "Committed to environmental responsibility and sustainable practices in all our projects",
      alt: "Sustainability - Environmental responsibility and green initiatives",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80",
      title: "Social Excellence",
      description:
        "Dedicated to community engagement and creating positive social impact",
      alt: "Social Excellence - Community engagement and social responsibility",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
      title: "Life at Ark Builders",
      description:
        "Building a culture of excellence, innovation, and collaboration",
      alt: "Life at Ark Builders - Our team and workplace culture",
    },
  ];

  const bannerSlides = document.getElementById("bannerSlides");
  const bannerDots = document.getElementById("bannerDots");

  let currentSlide = 0;
  let slideInterval;

  // Create slides
  function createSlides() {
    bannerData.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.className = "banner-slide";
      if (index === 0) {
        slide.classList.add("active");
      }

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.alt;
      img.loading = index === 0 ? "eager" : "lazy";
      img.width = 1920;
      img.height = 300;
      img.decoding = "async";
      img.fetchPriority = index === 0 ? "high" : "low";

      // Gradient overlay
      const gradientOverlay = document.createElement("div");
      gradientOverlay.className = "banner-gradient";

      // Content overlay
      const contentOverlay = document.createElement("div");
      contentOverlay.className = "banner-content";

      const title = document.createElement("h2");
      title.className = "banner-title";
      title.textContent = item.title;

      const description = document.createElement("p");
      description.className = "banner-description";
      description.textContent = item.description;

      contentOverlay.appendChild(title);
      contentOverlay.appendChild(description);

      slide.appendChild(img);
      slide.appendChild(gradientOverlay);
      slide.appendChild(contentOverlay);
      bannerSlides.appendChild(slide);
    });
  }

  // Create dots
  function createDots() {
    bannerData.forEach((item, index) => {
      const dot = document.createElement("button");
      dot.className = "banner-dot";
      if (index === 0) {
        dot.classList.add("active");
      }
      dot.setAttribute("aria-label", `Go to ${item.title}`);
      dot.addEventListener("click", () => goToSlide(index));
      bannerDots.appendChild(dot);
    });
  }

  // Update active slide
  function updateSlide(index) {
    const slides = document.querySelectorAll(".banner-slide");
    const dots = document.querySelectorAll(".banner-dot");
    const prevSlide = currentSlide;

    // Remove active class from current slide
    slides[currentSlide].classList.remove("active");
    slides[currentSlide].classList.add("prev");

    // Set new slide
    currentSlide = index;

    // Add active class to new slide
    slides[currentSlide].classList.remove("prev");
    slides[currentSlide].classList.add("active");

    // Remove prev class from previous slide after animation
    setTimeout(() => {
      slides[prevSlide].classList.remove("prev");
    }, 800);

    // Update dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Lazy load image for new active slide
    const activeSlide = slides[currentSlide];
    const img = activeSlide.querySelector("img");
    if (img && img.dataset.src && !img.src) {
      img.src = img.dataset.src;
    }
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index === currentSlide) return;

    // Clear auto-slide interval when manually navigating
    stopAutoSlide();

    updateSlide(index);

    // Restart auto-slide after manual navigation
    setTimeout(() => {
      startAutoSlide();
    }, 600);
  }

  // Change slide (auto-advance)
  function changeSlide() {
    const nextSlide = (currentSlide + 1) % bannerData.length;
    updateSlide(nextSlide);
  }

  // Start auto-slide
  function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    slideInterval = setInterval(changeSlide, 4000); // 4 seconds
  }

  // Stop auto-slide
  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Initialize
  function initBanner() {
    createSlides();
    createDots();
    startAutoSlide();

    // Pause on hover (optional)
    const bannerSection = document.querySelector(".banner-section");
    if (bannerSection) {
      bannerSection.addEventListener("mouseenter", stopAutoSlide);
      bannerSection.addEventListener("mouseleave", startAutoSlide);
    }
  }

  // Initialize on load
  initBanner();
});

