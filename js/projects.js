// Landmark Projects Carousel JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Projects data array
  const projectsData = [
    {
      image: "assets/Ark_Builder/Landmark/Safran.webp",
      title: "Safran Test Cell",
      description:
        "Ark Builders delivered the Safran Test Cell for an international aircraft engine manufacturer, executing FM2-grade industrial flooring over 40,000 sq. ft. in a continuous 20-hour pour with 3 mm tolerance. The project required millimetre-level precision, strict adherence to international quality and safety standards, and coordinated execution across civil, structural, and MEP disciplines.",
      alt: "Safran Test Cell",
    },
    {
      image: "assets/Ark_Builder/Landmark/TATA.webp",
      title: "Tata Boeing / Tata Aerospace Projects",
      description:
        "Ark Builders executed precision-driven construction works for Tata Boeing and Tata Aerospace projects, meeting stringent international requirements for quality, safety, documentation, and timelines through disciplined execution and multi-package coordination.",
      alt: "Tata Boeing / Tata Aerospace Projects",
    },

    {
      image: "assets/Ark_Builder/Landmark/Pullela_Gopichand.webp",
      title: "Pullela Gopichand Badminton Academy – Expansion Project",
      description:
        "Ark Builders executed the civil and structural works for the expansion of the Pullela Gopichand Badminton Academy, covering approximately 1.65 lakh sq. ft. The project involved large-span and high-level structural elements, demanding precise execution and rigorous quality control.",
      alt: "Pullela Gopichand Badminton Academy – Expansion Project",
    },
    {
      image: "assets/Ark_Builder/Landmark/ARC.webp",
      title: "ARC International (Department of Science & Technology)",
      description:
        "Ark Builders executed the construction of laboratory, office, and canteen buildings involving RCC framework, folded plate roofs, and RCC and steel roof systems. The scope included finishing works and essential infrastructure such as roads, drainage, ground-level reservoirs, and overhead tanks, delivered under Civil Packages II and III.",
      alt: "ARC International (Department of Science & Technology)",
    },
    {
      image: "assets/Ark_Builder/Landmark/Heavy_water_Board.webp",
      title: "Nuclear Fuel Complex (Department of Atomic Energy)",
      description:
        "Ark Builders executed the Overhead Tank, Ground Level Reservoir, and Pump House–cum–Water Treatment Plant for the Nuclear Fuel Complex, Hyderabad, as part of the NZFP facility. The project included a 50-metre-high overhead tank delivered in 2012, supporting the production of O-18 heavy water used in cancer treatment, and required strict adherence to nuclear safety and quality standards.",
      alt: "Nuclear Fuel Complex (Department of Atomic Energy)",
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
      dot.setAttribute(
        "aria-label",
        `Go to project ${index + 1}: ${project.title}`
      );
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
    const carouselWrapper = document.querySelector(
      ".projects-carousel-wrapper"
    );
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

  // ============================================
  // Expandable Projects Section
  // ============================================

  // All projects data organized by category - Simple array format
  const allProjectsData = {
    industrial: [
      "Safran Test Cell",
      "Tata Boeing / Tata Aerospace Projects",
      "Mahindra Industrial Facility",
      "JBM Group Manufacturing Plant",
      "Schneider Electric Factory",
      "Heavy Machinery Manufacturing Unit",
    ],
    institutional: [
      "Pullela Gopichand Badminton Academy – Expansion Project",
      "ARC International (Department of Science & Technology)",
      "Nuclear Fuel Complex (Department of Atomic Energy)",
      "Government Medical College",
      "Engineering College Campus",
      "Research & Development Center",
      "Public School Complex",
    ],
    residential: [
      "Luxury Residential Complex - Phase 1",
      "Affordable Housing Project",
      "Gated Community Development",
      "Apartment Complex - Tower A",
      "Villa Project - Premium Segment",
      "Residential Township",
    ],
  };

  const showMoreBtn = document.getElementById("showMoreProjectsBtn");
  const allProjectsSection = document.getElementById("allProjectsSection");
  const projectsGrid = document.getElementById("projectsGrid");
  const projectTabs = document.querySelectorAll(".project-tab");
  let isExpanded = false;
  let currentCategory = "all";

  // Create project list item
  function createProjectListItem(projectName, index) {
    const listItem = document.createElement("div");
    listItem.className = "project-list-item";
    listItem.textContent = projectName;
    return listItem;
  }

  // Render projects based on category
  function renderProjects(category = "all") {
    projectsGrid.innerHTML = "";

    let projectsToShow = [];

    if (category === "all") {
      // Combine all categories
      Object.values(allProjectsData).forEach((categoryProjects) => {
        projectsToShow = projectsToShow.concat(categoryProjects);
      });
    } else {
      projectsToShow = allProjectsData[category] || [];
    }

    projectsToShow.forEach((projectName, index) => {
      const listItem = createProjectListItem(projectName, index);
      listItem.style.opacity = "0";
      listItem.style.transform = "translateX(-20px)";
      projectsGrid.appendChild(listItem);

      // Animate in
      setTimeout(() => {
        listItem.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        listItem.style.opacity = "1";
        listItem.style.transform = "translateX(0)";
      }, index * 30);
    });
  }

  // Toggle expand/collapse
  function toggleProjectsSection() {
    isExpanded = !isExpanded;

    if (isExpanded) {
      allProjectsSection.classList.add("expanded");
      showMoreBtn.querySelector(".btn-text").textContent = "Show Less Projects";
      showMoreBtn.querySelector(".btn-icon").style.transform = "rotate(180deg)";

      // Render projects on first expand
      if (projectsGrid.children.length === 0) {
        renderProjects(currentCategory);
      }

      // Smooth scroll to section
      setTimeout(() => {
        allProjectsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      allProjectsSection.classList.remove("expanded");
      showMoreBtn.querySelector(".btn-text").textContent = "Show More Projects";
      showMoreBtn.querySelector(".btn-icon").style.transform = "rotate(0deg)";
    }
  }

  // Handle tab clicks
  function handleTabClick(tab) {
    const category = tab.dataset.category;

    // Update active tab
    projectTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Update current category and render
    currentCategory = category;
    renderProjects(category);
  }

  // Initialize expandable projects section
  function initExpandableProjects() {
    // Show more button event
    if (showMoreBtn) {
      showMoreBtn.addEventListener("click", toggleProjectsSection);
    }

    // Tab click events
    projectTabs.forEach((tab) => {
      tab.addEventListener("click", () => handleTabClick(tab));
    });
  }

  // Initialize expandable projects
  initExpandableProjects();
});
