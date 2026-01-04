// Videos Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Videos data array
  const videosData = [
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
      title: "Ark Group Project Showcase",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
      title: "Construction Excellence Documentary",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
      title: "Innovation in Infrastructure",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
      title: "Sustainable Building Practices",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
      title: "Behind the Scenes: Ark Group",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
      title: "Future of Construction Technology",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  const videosGallery = document.getElementById("videosGallery");

  // Create video card
  function createVideoCard(video, index) {
    const videoCard = document.createElement("div");
    videoCard.className = "video-item";

    // Image wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "video-image-wrapper";

    const img = document.createElement("img");
    img.src = video.image;
    img.alt = video.title;
    img.loading = index < 3 ? "eager" : "lazy";
    img.width = 300;
    img.height = 400;
    img.decoding = "async";
    img.fetchPriority = index < 3 ? "high" : "low";

    imageWrapper.appendChild(img);

    // Play icon overlay
    const playOverlay = document.createElement("div");
    playOverlay.className = "video-play-overlay";
    playOverlay.setAttribute("aria-label", "Play video");

    const playIcon = document.createElement("div");
    playIcon.className = "video-play-icon";
    playOverlay.appendChild(playIcon);

    imageWrapper.appendChild(playOverlay);

    // Title overlay
    const titleOverlay = document.createElement("div");
    titleOverlay.className = "video-title";

    const titleText = document.createElement("h3");
    titleText.className = "video-title-text";
    titleText.textContent = video.title;

    titleOverlay.appendChild(titleText);
    imageWrapper.appendChild(titleOverlay);

    videoCard.appendChild(imageWrapper);

    // Click handler to open YouTube in new tab
    videoCard.addEventListener("click", function () {
      window.open(video.youtubeUrl, "_blank", "noopener,noreferrer");
    });

    return videoCard;
  }

  // Calculate grid position for zigzag pattern
  function getGridPosition(index) {
    // Pattern alternates every 2 rows
    // Row 1: Items 1-2 in columns 1-2, column 3 empty
    // Row 2: Items 3-4 in columns 1-2, column 3 empty (starting with 1st column)
    // Row 3: Column 1 empty, items 5-6 in columns 2-3
    // Row 4: Column 1 empty, items 7-8 in columns 2-3
    // Row 5: Items 9-10 in columns 1-2, column 3 empty
    // And so on...
    
    const itemNumber = index + 1; // 1-based index
    const row = Math.ceil(itemNumber / 2);
    const positionInPair = (itemNumber - 1) % 2;
    
    // Determine if row starts with column 1 or column 2
    // Odd rows (1, 3, 5...): columns 1-2
    // Even rows (2, 4, 6...): columns 2-3
    const isOddRow = row % 2 === 1;
    
    let column;
    if (isOddRow) {
      // Odd rows: columns 1-2
      column = positionInPair === 0 ? 1 : 2;
    } else {
      // Even rows: columns 2-3
      column = positionInPair === 0 ? 2 : 3;
    }
    
    return { row, column };
  }

  // Create all videos
  function createVideos() {
    videosData.forEach((video, index) => {
      const card = createVideoCard(video, index);
      const position = getGridPosition(index);
      card.style.gridRow = position.row;
      card.style.gridColumn = position.column;
      videosGallery.appendChild(card);
    });
  }

  // Initialize
  function initVideos() {
    createVideos();
  }

  // Initialize on load
  initVideos();
});

