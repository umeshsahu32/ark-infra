// Our Sectors Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Sectors data array
  const sectorsData = [
    {
      image: "assets/sec-1.png",
      title: "Urban Infrastructure",
      description:
        "Comprehensive urban development solutions including smart cities, residential complexes, commercial spaces, and public infrastructure. We deliver sustainable and modern urban environments that enhance quality of life.",
    },
    {
      image: "assets/sec-2.jpg",
      title: "Advanced Technology Facility",
      description:
        "State-of-the-art technology facilities and data centers designed with cutting-edge infrastructure. We specialize in creating secure, efficient, and scalable technology environments for the digital age.",
    },
    {
      image: "assets/sec-3.jpg",
      title: "Transportation",
      description:
        "Complete transportation infrastructure including highways, bridges, airports, railways, and metro systems. Our expertise spans from planning to execution of complex transportation networks.",
    },
    {
      image: "assets/sec-4.png",
      title: "Oil, Gas, and Hydrocarbon",
      description:
        "Specialized infrastructure for oil and gas industry including refineries, pipelines, storage facilities, and processing plants. We ensure safety, efficiency, and compliance with industry standards.",
    },
    {
      image: "assets/sec-5.png",
      title: "Metals and Minerals",
      description:
        "Mining infrastructure, processing plants, and metallurgical facilities. We provide comprehensive solutions for extraction, processing, and transportation of metals and minerals.",
    },
    {
      image: "assets/sec-6.png",
      title: "Power",
      description:
        "Power generation facilities including thermal, hydroelectric, solar, and wind power plants. We deliver reliable energy infrastructure to meet growing power demands sustainably.",
    },
    {
      image: "assets/sec-7.png",
      title: "Space and Nuclear",
      description:
        "Critical infrastructure for space and nuclear facilities with highest safety standards. We specialize in precision engineering for sensitive and high-security installations.",
    },
    {
      image: "assets/sec-8.png",
      title: "Manufacturing Unit",
      description:
        "Modern manufacturing facilities and industrial plants designed for efficiency and productivity. We create optimized production environments for various industries.",
    },
    {
      image: "assets/sec-9.png",
      title: "Water",
      description:
        "Water infrastructure including treatment plants, distribution networks, dams, and irrigation systems. We ensure sustainable water management and supply solutions.",
    },
  ];

  const sectorsGrid = document.getElementById("sectorsGrid");
  const showMoreBtn = document.getElementById("showMoreBtn");
  
  let visibleCount = 3; // Show 3 cards initially
  const cardsPerLoad = 3; // Load 3 more cards each time

  // Create a single sector card
  function createSectorCard(sector, index) {
    const card = document.createElement("div");
    card.className = "sector-card";
    card.setAttribute("data-sector", sector.title.toLowerCase().replace(/\s+/g, "-"));
    card.setAttribute("data-index", index);

    // Image wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "sector-image-wrapper";

    const img = document.createElement("img");
    img.src = sector.image;
    img.alt = sector.title;
    img.loading = index < 3 ? "eager" : "lazy";
    img.width = 400;
    img.height = 300;
    img.decoding = "async";
    img.fetchPriority = index < 3 ? "high" : "low";

    imageWrapper.appendChild(img);

    // Content wrapper
    const content = document.createElement("div");
    content.className = "sector-content";

    const title = document.createElement("h3");
    title.className = "sector-title";
    title.textContent = sector.title;

    const description = document.createElement("p");
    description.className = "sector-description";
    description.textContent = sector.description;

    content.appendChild(title);
    content.appendChild(description);

    card.appendChild(imageWrapper);
    card.appendChild(content);
    
    return card;
  }

  // Create all sector cards (initially hidden)
  function createAllCards() {
    sectorsData.forEach((sector, index) => {
      const card = createSectorCard(sector, index);
      if (index >= visibleCount) {
        card.style.display = "none";
      } else {
        // Add animation delay for initial cards
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add("visible");
      }
      sectorsGrid.appendChild(card);
    });
  }

  // Show more cards
  function showMoreCards() {
    const cards = document.querySelectorAll(".sector-card");
    const nextCount = Math.min(visibleCount + cardsPerLoad, sectorsData.length);
    
    // Show next batch of cards with animation
    for (let i = visibleCount; i < nextCount; i++) {
      if (cards[i]) {
        cards[i].style.display = "flex";
        setTimeout(() => {
          cards[i].classList.add("visible");
        }, (i - visibleCount) * 100);
      }
    }
    
    visibleCount = nextCount;
    
    // Hide button if all cards are shown
    if (visibleCount >= sectorsData.length) {
      showMoreBtn.classList.add("hidden");
    }
  }

  // Initialize
  function initSectors() {
    createAllCards();
    
    // Event listener for show more button
    showMoreBtn.addEventListener("click", showMoreCards);
    
    // Hide button if all cards are already visible
    if (visibleCount >= sectorsData.length) {
      showMoreBtn.classList.add("hidden");
    }
  }

  // Initialize on load
  initSectors();
});

