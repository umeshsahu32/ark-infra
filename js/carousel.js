// Carousel JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Carousel data array
  const carouselData = [
    {
      image:
        "../assets/Ark_Builder/Main_Banner/Ark-Builder_Landing-Page_1.webp",
      title: "Welcome to Ark Builders",
      subtitle: "Building the future, one project at a time",
    },
    {
      image:
        "../assets/Ark_Builder/Main_Banner/Ark-Builder_Landing-Page_2.webp",
      title: "Excellence in Construction",
      subtitle: "Delivering quality infrastructure solutions",
    },
    {
      image:
        "../assets/Ark_Builder/Main_Banner/Ark-Builder_Landing-Page_5.jpeg",
      title: "Innovation & Quality",
      subtitle: "Transforming visions into reality",
    },
    {
      image:
        "../assets/Ark_Builder/Main_Banner/Ark-Builder_Landing-Page_4.webp",
      title: "Your Trusted Partner",
      subtitle: "Committed to excellence in every project",
    },
  ];

  const carouselSlides = document.getElementById("carouselSlides");
  const carouselTitle = document.getElementById("carouselTitle");
  const carouselSubtitle = document.getElementById("carouselSubtitle");
  const carouselDots = document.getElementById("carouselDots");

  let currentSlide = 0;
  let slideInterval;

  // Create slides
  function createSlides() {
    carouselData.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      if (index === 0) {
        slide.classList.add("active");
      }

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.loading = index === 0 ? "eager" : "lazy";
      img.width = 1920;
      img.height = 1080;
      img.decoding = "async";
      img.fetchPriority = index === 0 ? "high" : "low";

      slide.appendChild(img);
      carouselSlides.appendChild(slide);
    });
  }

  // Create dots
  function createDots() {
    carouselData.forEach((item, index) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      if (index === 0) {
        dot.classList.add("active");
      }
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      carouselDots.appendChild(dot);
    });
  }

  // Update active dot
  function updateDots(activeIndex) {
    const dots = document.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Update content with smooth transition
  function updateContent(index) {
    const data = carouselData[index];

    // Fade out current content
    carouselTitle.classList.remove("active");
    carouselSubtitle.classList.remove("active");

    // Update content after fade out
    setTimeout(() => {
      carouselTitle.textContent = data.title;
      carouselSubtitle.textContent = data.subtitle;

      // Fade in new content
      setTimeout(() => {
        carouselTitle.classList.add("active");
        carouselSubtitle.classList.add("active");
      }, 50);
    }, 400);
  }

  // Change slide animation (internal function)
  function performSlideChange(index) {
    if (index === currentSlide) return;

    const slides = document.querySelectorAll(".carousel-slide");
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

    // Update content and dots
    updateContent(currentSlide);
    updateDots(currentSlide);
  }

  // Go to specific slide (manual navigation - clears interval)
  function goToSlide(index) {
    if (index === currentSlide) return;

    // Clear interval first to prevent timing issues
    stopAutoSlide();

    // Perform slide change
    performSlideChange(index);

    // Restart interval with fresh 4-second timer
    startAutoSlide();
  }

  // Change slide (auto-advance - doesn't reset interval)
  function changeSlide() {
    const nextSlide = (currentSlide + 1) % carouselData.length;
    performSlideChange(nextSlide);
  }

  // Start auto-slide
  function startAutoSlide() {
    slideInterval = setInterval(changeSlide, 4000);
  }

  // Stop auto-slide (useful for pause on hover if needed)
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Initialize carousel
  function initCarousel() {
    createSlides();
    createDots();
    updateContent(0);
    updateDots(0);
    startAutoSlide();

    // Initialize title and subtitle as active
    setTimeout(() => {
      carouselTitle.classList.add("active");
      carouselSubtitle.classList.add("active");
    }, 100);
  }

  // Optional: Pause on hover (uncomment if needed)
  // const carouselSection = document.querySelector('.carousel-section');
  // carouselSection.addEventListener('mouseenter', stopAutoSlide);
  // carouselSection.addEventListener('mouseleave', startAutoSlide);

  // Initialize
  initCarousel();
});
