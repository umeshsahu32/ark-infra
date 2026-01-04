// Landmark Projects Carousel JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Projects data array
  const projectsData = [
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      title: "Skyline Tower Complex",
      description:
        "A state-of-the-art residential and commercial complex spanning 50 floors, featuring modern architecture, sustainable design, and premium amenities. This landmark project showcases our expertise in high-rise construction with cutting-edge technology and eco-friendly materials.",
      alt: "Skyline Tower Complex - Modern high-rise building project",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      title: "Metro Infrastructure Hub",
      description:
        "A comprehensive transportation infrastructure project connecting multiple city districts. This massive undertaking includes underground stations, elevated tracks, and integrated commercial spaces, demonstrating our capability in large-scale infrastructure development.",
      alt: "Metro Infrastructure Hub - Transportation infrastructure project",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      title: "Green Valley Residential",
      description:
        "An eco-friendly residential community featuring sustainable housing, solar power integration, and green spaces. This project reflects our commitment to environmental responsibility while delivering comfortable, modern living spaces for families.",
      alt: "Green Valley Residential - Eco-friendly residential community",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      title: "Tech Park Innovation Center",
      description:
        "A modern business district designed for technology companies, featuring smart building systems, high-speed connectivity, and collaborative workspaces. This project represents the future of commercial construction with integrated smart technologies.",
      alt: "Tech Park Innovation Center - Modern business district",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      title: "Coastal Bridge Project",
      description:
        "An engineering marvel connecting two major coastal regions, this suspension bridge spans over 2 kilometers with advanced structural design. The project showcases our expertise in complex infrastructure engineering and precision construction.",
      alt: "Coastal Bridge Project - Suspension bridge infrastructure",
    },
  ];

  const carousel = document.getElementById("projectsCarousel");
  const dotsContainer = document.getElementById("projectsDots");
  const prevBtn = document.getElementById("projectsPrevBtn");
  const nextBtn = document.getElementById("projectsNextBtn");

  let currentIndex = 0;
  let isTransitioning = false;
  let autoSlideInterval = null;

  // Create project slides
  function createSlides() {
    const track = document.createElement("div");
    track.className = "projects-track";

    projectsData.forEach((project, index) => {
      const slide = document.createElement("div");
      slide.className = "project-slide";
      if (index === 0) {
        slide.classList.add("active");
      }
      slide.setAttribute("role", "tabpanel");
      slide.setAttribute("aria-hidden", index !== 0 ? "true" : "false");

      const card = document.createElement("article");
      card.className = "project-card";

      // Image wrapper
      const imageWrapper = document.createElement("div");
      imageWrapper.className = "project-image-wrapper";

      const img = document.createElement("img");
      img.src = index === 0 ? project.image : "";
      img.dataset.src = project.image;
      img.alt = project.alt;
      img.loading = index === 0 ? "eager" : "lazy";
      img.width = 1200;
      img.height = 800;
      img.decoding = "async";
      img.fetchPriority = index === 0 ? "high" : "low";

      // Lazy load images
      if (index !== 0) {
        const imageObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const targetImg = entry.target;
                targetImg.src = targetImg.dataset.src;
                imageObserver.unobserve(targetImg);
              }
            });
          },
          { rootMargin: "50px" }
        );
        imageObserver.observe(img);
      }

      imageWrapper.appendChild(img);

      // Content wrapper
      const content = document.createElement("div");
      content.className = "project-content";

      const title = document.createElement("h3");
      title.className = "project-title";
      title.textContent = project.title;

      const description = document.createElement("p");
      description.className = "project-description";
      description.textContent = project.description;

      content.appendChild(title);
      content.appendChild(description);

      card.appendChild(imageWrapper);
      card.appendChild(content);
      slide.appendChild(card);
      track.appendChild(slide);
    });

    carousel.appendChild(track);
  }

  // Create dots
  function createDots() {
    projectsData.forEach((project, index) => {
      const dot = document.createElement("button");
      dot.className = "project-dot";
      if (index === 0) {
        dot.classList.add("active");
      }
      dot.setAttribute("aria-label", `Go to project ${index + 1}: ${project.title}`);
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-selected", index === 0 ? "true" : "false");
      dot.setAttribute("tabindex", index === 0 ? "0" : "-1");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  // Update active slide
  function updateSlide(index) {
    const slides = document.querySelectorAll(".project-slide");
    const dots = document.querySelectorAll(".project-dot");

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
        slide.setAttribute("aria-hidden", "false");
      } else {
        slide.classList.remove("active");
        slide.setAttribute("aria-hidden", "true");
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
        dot.setAttribute("aria-selected", "true");
        dot.setAttribute("tabindex", "0");
      } else {
        dot.classList.remove("active");
        dot.setAttribute("aria-selected", "false");
        dot.setAttribute("tabindex", "-1");
      }
    });

    // Lazy load image for new active slide
    const activeSlide = slides[index];
    if (activeSlide) {
      const img = activeSlide.querySelector("img");
      if (img && img.dataset.src && !img.src) {
        img.src = img.dataset.src;
      }
    }
  }

  // Go to specific slide
  function goToSlide(index) {
    if (isTransitioning || index === currentIndex) return;

    // Clear auto-slide interval when manually navigating
    stopAutoSlide();

    isTransitioning = true;
    currentIndex = index;
    updateSlide(currentIndex);

    setTimeout(() => {
      isTransitioning = false;
      // Restart auto-slide after manual navigation
      startAutoSlide();
    }, 600);
  }

  // Next slide
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % projectsData.length;
    goToSlide(nextIndex);
  }

  // Previous slide
  function prevSlide() {
    const prevIndex =
      currentIndex === 0 ? projectsData.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }

  // Start auto-slide
  function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 4000); // 4 seconds
  }

  // Stop auto-slide
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  // Keyboard navigation
  function handleKeyboard(e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  }

  // Pause auto-slide on hover (optional enhancement)
  function setupHoverPause() {
    const carouselWrapper = document.querySelector(".projects-carousel-wrapper");
    if (carouselWrapper) {
      carouselWrapper.addEventListener("mouseenter", stopAutoSlide);
      carouselWrapper.addEventListener("mouseleave", startAutoSlide);
    }
  }

  // Initialize
  function initProjects() {
    createSlides();
    createDots();

    // Event listeners
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
    document.addEventListener("keydown", handleKeyboard);

    // Setup hover pause
    setupHoverPause();

    // Start auto-slide
    startAutoSlide();

    // Preload next image for better performance
    if (projectsData.length > 1) {
      const nextImg = new Image();
      nextImg.src = projectsData[1].image;
    }
  }

  // Initialize on load
  initProjects();
});

