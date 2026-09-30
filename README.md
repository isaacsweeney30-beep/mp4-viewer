# MP4 & YouTube Viewer

A lightweight browser app that lets you play:

- YouTube links
- Direct MP4 URLs
- Local MP4 files from your device

## Quick Start (No Server Needed)

### Option 1: Use GitHub Pages (Easiest)
Open the app directly in your browser right now:
👉 **[https://isaacsweeney30-beep.github.io/mp4-viewer/](https://isaacsweeney30-beep.github.io/mp4-viewer/)**

No installation or server needed!

### Option 2: Download & Open Locally
1. Download this repo as a ZIP file (green "Code" button → Download ZIP)
2. Extract the folder
3. Open `index.html` in your web browser (double-click it or drag it into your browser)

## How to Use

### Load a YouTube Video
1. Copy a YouTube link (for example, `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
2. Paste it into the input box at the top
3. Click **"Load video"**
4. The video will embed and play in the app

### Load an MP4 from a URL
1. Paste any direct MP4 link (for example, `https://example.com/video.mp4`)
2. Click **"Load video"**
3. The video will start playing

### Upload a Local MP4 File
1. Click **"Choose MP4 file"**
2. Select an MP4 video from your computer
3. It will load and play immediately

### Clear & Start Over
- Click **"Clear"** to remove the current video and start fresh

## Features

✅ Paste YouTube watch/share URLs and the app automatically extracts and embeds the video  
✅ Paste direct MP4 URLs and the app plays them in the browser  
✅ Upload local MP4 files and watch them without uploading to the cloud  
✅ Full playback controls: play, pause, seek, volume, fullscreen  
✅ Responsive layout for desktop and mobile  
✅ No server required  

## Files

- `index.html` – app structure
- `style.css` – styling (dark theme)
- `script.js` – logic for YouTube vs MP4 handling

## Notes

- **YouTube embeds** work as long as the link is valid and the video allows embedding
- **Direct MP4 URLs** may be blocked by some servers due to CORS restrictions
- **Local file uploads** work best with MP4 files, but other video formats may work depending on your browser
- The app works completely offline once loaded (except for YouTube embeds, which require internet)

## Run with a Server (Optional)

If you want to run it locally with a server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

**Built with**: HTML5, CSS3, Vanilla JavaScript
