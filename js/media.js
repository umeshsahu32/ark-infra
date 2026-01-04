// Media Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Media articles data array
  const mediaArticles = [
    {
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
      title: "Ark Group Announces Major Infrastructure Project",
      date: "March 15, 2024",
      url: "https://example.com/article1",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      title: "Sustainable Construction Practices in Modern Development",
      date: "March 10, 2024",
      url: "https://example.com/article2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      title: "Innovation in Urban Planning and Development",
      date: "March 5, 2024",
      url: "https://example.com/article3",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      title: "Ark Group Wins Prestigious Construction Award",
      date: "February 28, 2024",
      url: "https://example.com/article4",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
      title: "Community Engagement Initiatives by Ark Group",
      date: "February 20, 2024",
      url: "https://example.com/article5",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      title: "Future of Smart Cities and Infrastructure",
      date: "February 15, 2024",
      url: "https://example.com/article6",
    },
  ];

  const mediaGallery = document.getElementById("mediaGallery");

  // Create article card
  function createArticleCard(article, index) {
    const articleCard = document.createElement("div");
    articleCard.className = "media-article";

    // Image wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "media-article-image-wrapper";

    const img = document.createElement("img");
    img.src = article.image;
    img.alt = article.title;
    img.loading = index < 3 ? "eager" : "lazy";
    img.width = 800;
    img.height = 600;
    img.decoding = "async";
    img.fetchPriority = index < 3 ? "high" : "low";

    imageWrapper.appendChild(img);

    // Content overlay
    const content = document.createElement("div");
    content.className = "media-article-content";

    const date = document.createElement("div");
    date.className = "media-article-date";
    date.textContent = article.date;

    const title = document.createElement("h3");
    title.className = "media-article-title";
    title.textContent = article.title;

    const readMore = document.createElement("a");
    readMore.className = "media-article-read-more";
    readMore.href = article.url;
    readMore.target = "_blank";
    readMore.rel = "noopener noreferrer";
    readMore.textContent = "Read More";
    readMore.setAttribute("aria-label", `Read more about ${article.title}`);

    // Arrow icon
    const arrowIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    arrowIcon.setAttribute("width", "16");
    arrowIcon.setAttribute("height", "16");
    arrowIcon.setAttribute("viewBox", "0 0 24 24");
    arrowIcon.setAttribute("fill", "none");
    arrowIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M5 12H19M19 12L12 5M19 12L12 19"
    );
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    arrowIcon.appendChild(path);
    readMore.appendChild(arrowIcon);

    content.appendChild(date);
    content.appendChild(title);
    content.appendChild(readMore);

    articleCard.appendChild(imageWrapper);
    articleCard.appendChild(content);

    // Click handler to open article in new tab
    articleCard.addEventListener("click", function (e) {
      // Don't trigger if clicking the read more link directly
      if (e.target !== readMore && !readMore.contains(e.target)) {
        window.open(article.url, "_blank", "noopener,noreferrer");
      }
    });

    return articleCard;
  }

  // Create all articles
  function createArticles() {
    mediaArticles.forEach((article, index) => {
      const card = createArticleCard(article, index);
      mediaGallery.appendChild(card);
    });
  }

  // Initialize
  function initMedia() {
    createArticles();
  }

  // Initialize on load
  initMedia();
});

