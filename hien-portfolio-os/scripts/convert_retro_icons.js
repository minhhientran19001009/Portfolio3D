const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_THEME_DIR = path.join(__dirname, '..', 'temp_win98se', 'SE98');
const DEST_ICONS_DIR = path.join(__dirname, '..', 'public', 'System', 'Icons');

const TARGET_SIZES = [16, 32, 48, 96, 144];
const SOURCE_SIZES = [16, 22, 24, 32, 48, 64, 72, 96, 128, 160, 192, 256];

// Target icon name mapped to category and list of possible source file names
const iconMappings = {
  // Desktop & File Explorer
  pc: { category: 'devices', names: ['computer_win98.png', 'computer.png', 'gnome-computer.png'] },
  folder: { category: 'places', names: ['folder.png'] },
  folder_front: { category: 'places', names: ['folder.png'] },
  folder_back: { category: 'places', names: ['folder.png'] },
  documents: { category: 'places', names: ['folder-documents.png', 'folder_documents.png', 'default-folder-documents.png'] },
  pictures: { category: 'places', names: ['folder-pictures.png', 'folder_pictures.png', 'default-folder-documents.png'] },
  music: { category: 'places', names: ['folder-music.png', 'folder_music.png', 'default-folder-music.png'] },
  videos: { category: 'places', names: ['folder-videos.png', 'folder_videos.png', 'default-folder-video.png'] },
  user: { category: 'places', names: ['user-home_win98.png', 'user-home.png', 'user-home_win2k.png'] },
  desktop: { category: 'places', names: ['user-desktop.png', 'desktop.png'] },
  shortcut: { category: 'places', names: ['link_overlay.png'] },
  
  // File types (mimes)
  unknown: { category: 'mimes', names: ['unknown.png', 'text-x-generic.png'] },
  executable: { category: 'mimes', names: ['application-x-ms-dos-executable.png', 'application-x-executable.png', 'gnome-fs-executable.png'] },
  compressed: { category: 'mimes', names: ['zip.png', 'application-zip.png', 'application-x-zip.png'] },
  font: { category: 'mimes', names: ['font.png', 'font-x-generic.png', 'application-font.png'] },
  opentype: { category: 'mimes', names: ['font.png', 'font-x-generic.png', 'application-font.png'] },
  audio: { category: 'mimes', names: ['audio-x-generic.png', 'gnome-mime-audio.png', 'media-audio.png'] },
  music_file: { category: 'mimes', names: ['audio-x-generic.png', 'gnome-mime-audio.png'] }, // fallback mapping
  image: { category: 'mimes', names: ['image-x-generic.png', 'image.png', 'gnome-mime-image.png'] },
  video: { category: 'mimes', names: ['video-x-generic.png', 'gnome-mime-video.png', 'media-video.png'] },
  pdf: { category: 'mimes', names: ['pdf.png', 'application-pdf.png'] },
  marked: { category: 'mimes', names: ['text-markdown.png', 'text-plain.png', 'text-x-readme.png'] },

  // System Dialogs & UI Elements
  run: { category: 'apps', names: ['system-run.png', 'utilities-terminal.png'] },
  screensaver: { category: 'apps', names: ['screensaver.png', 'preferences-desktop-screensaver.png'] },
  copying: { category: 'actions', names: ['edit-copy.png', 'gtk-copy.png'] },
  details_view: { category: 'actions', names: ['view-list-details.png', 'gtk-justify-fill.png'] },
  icon_view: { category: 'actions', names: ['view-list-icons.png', 'gtk-justify-fill.png'] },
  new_folder: { category: 'actions', names: ['folder-new.png'] },
  mounted: { category: 'devices', names: ['drive-harddisk.png', 'gnome-dev-harddisk.png'] },
  photo: { category: 'mimes', names: ['image-x-generic.png', 'image.png'] },
  photos: { category: 'apps', names: ['kolourpaint.png', 'mtpaint.png'] },

  // Apps
  chromium: { category: 'apps', names: ['browser.png', 'internet-web-browser.png', 'web-browser.png'] },
  monaco: { category: 'apps', names: ['wine-notepad.png', 'notepad.png'] },
  paint: { category: 'apps', names: ['kolourpaint.png', 'mtpaint.png', 'applications-painting.png'] },
  xterm: { category: 'apps', names: ['utilities-terminal.png', 'terminal.png'] },
  vlc: { category: 'apps', names: ['vlc.png', 'org.videolan.VLC.png'] },
  webamp: { category: 'apps', names: ['audio-player.png', 'multimedia-audio-player.png', 'media-player-48.png'] },

  // Games & extras (fallback mapping to Win98 icons)
  boxedwine: { category: 'apps', names: ['wine.png', 'wine-uninstaller.png'] },
  chess: { category: 'apps', names: ['gnome-glchess.png', 'pychess.png'] },
  classicube: { category: 'categories', names: ['applications-games.png'] },
  dino: { category: 'categories', names: ['applications-games.png'] },
  dxball: { category: 'categories', names: ['applications-games.png'] },
  emulator: { category: 'categories', names: ['applications-games.png'] },
  eruda: { category: 'apps', names: ['system-run.png', 'preferences-system.png'] },
  jsdos: { category: 'mimes', names: ['application-x-ms-dos-executable.png', 'application-x-executable.png'] },
  kiwiirc: { category: 'apps', names: ['internet-chat.png', 'internet-mail.png', 'mail-mailbox.png'] },
  messenger: { category: 'apps', names: ['internet-group-chat.png', 'im-user.png', 'internet-chat.png'] },
  pinball: { category: 'categories', names: ['applications-games.png'] },
  quake3: { category: 'categories', names: ['applications-games.png'] },
  ruffle: { category: 'categories', names: ['applications-games.png'] },
  stablediffusion: { category: 'apps', names: ['kolourpaint.png', 'applications-painting.png'] },
  tic80: { category: 'categories', names: ['applications-games.png'] },
  tinymce: { category: 'mimes', names: ['text-html.png', 'text-plain.png'] },
  v86: { category: 'apps', names: ['system-run.png', 'preferences-system.png'] },
  vim: { category: 'apps', names: ['utilities-terminal.png', 'terminal.png'] },
  wapm: { category: 'mimes', names: ['zip.png', 'application-zip.png'] }
};

// Find the best source file matching a category, target size, and name options
function findSourcePath(category, targetSize, names) {
  // Sort source sizes by proximity to target size
  const sortedSizes = [...SOURCE_SIZES].sort((a, b) => Math.abs(a - targetSize) - Math.abs(b - targetSize));

  for (const size of sortedSizes) {
    for (const name of names) {
      const filePath = path.join(SOURCE_THEME_DIR, category, String(size), name);
      if (fs.existsSync(filePath)) {
        return { filePath, sourceSize: size };
      }
    }
  }
  return null;
}

async function convertIcons() {
  console.log('Starting retro icon conversion...');
  let successCount = 0;
  let failCount = 0;

  for (const targetSize of TARGET_SIZES) {
    const sizeDirName = `${targetSize}x${targetSize}`;
    const destSizeDir = path.join(DEST_ICONS_DIR, sizeDirName);

    if (!fs.existsSync(destSizeDir)) {
      fs.mkdirSync(destSizeDir, { recursive: true });
    }

    console.log(`\nProcessing target size: ${sizeDirName}`);

    for (const [targetName, config] of Object.entries(iconMappings)) {
      const match = findSourcePath(config.category, targetSize, config.names);

      if (!match) {
        console.warn(`[WARN] Could not find source icon for target: ${targetName} at size ${targetSize}`);
        failCount++;
        continue;
      }

      const { filePath: sourcePath, sourceSize } = match;
      const destPngPath = path.join(destSizeDir, `${targetName}.png`);
      const destWebpPath = path.join(destSizeDir, `${targetName}.webp`);

      try {
        // Pixel-perfect nearest neighbor scaling
        await sharp(sourcePath)
          .resize(targetSize, targetSize, { kernel: 'nearest' })
          .toFile(destPngPath);

        await sharp(sourcePath)
          .resize(targetSize, targetSize, { kernel: 'nearest' })
          .webp({ lossless: true })
          .toFile(destWebpPath);

        // Also check if there is an audio mapping to keep audio.png/audio.webp updated
        if (targetName === 'audio') {
          const destAudioPngPath = path.join(destSizeDir, 'audio.png');
          const destAudioWebpPath = path.join(destSizeDir, 'audio.webp');
          fs.copyFileSync(destPngPath, destAudioPngPath);
          fs.copyFileSync(destWebpPath, destAudioWebpPath);
        }

        successCount++;
      } catch (err) {
        console.error(`[ERROR] Failed to convert ${targetName} (source size: ${sourceSize}) for size ${targetSize}:`, err.message);
        failCount++;
      }
    }
  }

  console.log(`\nIcon conversion completed!`);
  console.log(`Successfully converted icons: ${successCount}`);
  console.log(`Failed or skipped icons: ${failCount}`);
}

convertIcons().catch(err => {
  console.error('Fatal error during icon conversion:', err);
  process.exit(1);
});
