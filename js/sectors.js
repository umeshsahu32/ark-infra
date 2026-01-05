// Our Sectors Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Sectors data array
  const sectorsData = [
    {
      image: "assets/sec-8.png",
      title: "Industrial",
      description:
        "We deliver industrial construction projects for national and international brands, executing complex facilities with precision engineering, strict safety compliance, and schedule certainty.",
    },
    {
      image: "assets/sec-7.png",
      title: "Institutional",
      description:
        "Ark Builders undertakes institutional construction projects that demand accuracy, durability, and regulatory compliance, delivering outcomes aligned with functional and statutory requirements.",
    },
    {
      image: "assets/sec-1.png",
      title: "Residential",
      description:
        "Homebuyers trust Ark Builders for safe, transparent, and high-quality residential construction, supported by professional execution from planning through handover.",
    },
    {
      image: "assets/sec-4.png",
      title: "Others",
      description:
        "Beyond core sectors, we execute specialized and custom construction projects, applying the same standards of engineering rigor, quality control, and reliability.",
    },
  ];

  const sectorsGrid = document.getElementById("sectorsGrid");
  const showMoreBtn = document.getElementById("showMoreBtn");

  let visibleCount = 4; // Show 3 cards initially
  const cardsPerLoad = 4; // Load 3 more cards each time

  // Create a single sector card
  function createSectorCard(sector, index) {
    const card = document.createElement("div");
    card.className = "sector-card";
    card.setAttribute(
      "data-sector",
      sector.title.toLowerCase().replace(/\s+/g, "-")
    );
    card.setAttribute("data-index", index);

    // Image wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "sector-image-wrapper";

    const img = document.createElement("img");
    img.src = sector.image;
    img.alt = sector.title;
    img.loading = index < 4 ? "eager" : "lazy";
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
