const videoUrlInput = document.getElementById("video-url");
const sourceForm = document.getElementById("source-form");
const videoFileInput = document.getElementById("video-file");
const clearButton = document.getElementById("clear-button");
const statusEl = document.getElementById("status");
const videoPlayer = document.getElementById("video-player");
const youtubePlayer = document.getElementById("youtube-player");

const setStatus = (message, isError = false) => {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#fca5a5" : "#94a3b8";
};

const hideBothPlayers = () => {
  videoPlayer.hidden = true;
  youtubePlayer.hidden = true;
  youtubePlayer.src = "";
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();
};

const isYouTubeUrl = (value) => {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return host.includes("youtube.com") || host.includes("youtu.be") || host.includes("m.youtube.com");
  } catch {
    return false;
  }
};

const extractYouTubeVideoId = (value) => {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      return url.pathname.replace("/", "").split("/")[0] || null;
    }

    if (host.includes("youtube.com")) {
      const params = new URLSearchParams(url.search);
      if (params.has("v")) {
        return params.get("v");
      }

      const pathParts = url.pathname.split("/").filter(Boolean);
      if (pathParts[0] === "shorts") {
        return pathParts[1] || null;
      }
      if (pathParts[0] === "embed") {
        return pathParts[1] || null;
      }
    }
  } catch {
    return null;
  }

  return null;
};

const loadYouTubeVideo = (value) => {
  const videoId = extractYouTubeVideoId(value);

  if (!videoId) {
    setStatus("That YouTube link looks invalid. Please paste a valid watch or share URL.", true);
    return;
  }

  hideBothPlayers();
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  youtubePlayer.src = embedUrl;
  youtubePlayer.hidden = false;
  setStatus(`Loading YouTube video: ${videoId}`);
};

const loadMp4Video = (value) => {
  hideBothPlayers();
  videoPlayer.src = value;
  videoPlayer.hidden = false;
  videoPlayer.load();
  setStatus("Loading direct MP4 source...");
};

const loadSource = (value) => {
  if (!value.trim()) {
    setStatus("Please enter a URL or choose a local MP4 file.", true);
    return;
  }

  const trimmed = value.trim();

  if (isYouTubeUrl(trimmed)) {
    loadYouTubeVideo(trimmed);
    return;
  }

  loadMp4Video(trimmed);
};

sourceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loadSource(videoUrlInput.value);
});

videoFileInput.addEventListener("change", (event) => {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  if (!file.type.includes("video") && !file.name.toLowerCase().endsWith(".mp4")) {
    setStatus("Please choose a valid video file. MP4 is recommended.", true);
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  hideBothPlayers();
  videoPlayer.src = objectUrl;
  videoPlayer.hidden = false;
  setStatus(`Loaded local file: ${file.name}`);
  videoPlayer.load();
});

clearButton.addEventListener("click", () => {
  hideBothPlayers();
  videoUrlInput.value = "";
  videoFileInput.value = "";
  setStatus("Ready to load a video.");
});

videoPlayer.addEventListener("error", () => {
  setStatus("This video could not be played. Check the URL or file and try again.", true);
});

videoPlayer.addEventListener("loadeddata", () => {
  setStatus("Video ready to play.");
});

videoPlayer.addEventListener("play", () => {
  setStatus("Playing video.");
});
