import dynamic from "next/dynamic";
import { type Processes } from "contexts/process/types";
import { FOLDER_ICON, TASKBAR_HEIGHT } from "utils/constants";

const directory: Processes = {
  Browser: {
    Component: dynamic(() => import("components/apps/Browser")),
    backgroundColor: "#FFF",
    defaultSize: {
      height: 500,
      width: 600,
    },
    icon: "/System/Icons/chromium.webp",
    title: "Browser",
  },
  FileExplorer: {
    Component: dynamic(() => import("components/apps/FileExplorer")),
    backgroundColor: "#202020",
    defaultSize: {
      height: 325,
      width: 447,
    },
    icon: FOLDER_ICON,
    title: "File Explorer",
  },
  Marked: {
    Component: dynamic(() => import("components/apps/Marked")),
    backgroundColor: "#FFF",
    defaultSize: {
      height: 480,
      width: 560,
    },
    icon: "/System/Icons/marked.webp",
    libs: [
      "/Program Files/Marked/marked.min.js",
      "/Program Files/Marked/purify.min.js",
    ],
    title: "Marked",
  },
  MonacoEditor: {
    Component: dynamic(() => import("components/apps/MonacoEditor")),
    backgroundColor: "#1E1E1E",
    defaultSize: {
      height: 480,
      width: 544,
    },
    dependantLibs: [
      "/Program Files/MonacoEditor/vs/loader.js",
      "/Program Files/MonacoEditor/vs/editor/editor.main.js",
      "/Program Files/MonacoEditor/vs/editor/editor.main.css",
      "/Program Files/MonacoEditor/vs/editor/editor.main.nls.js",
    ],
    icon: "/System/Icons/monaco.webp",
    title: "Monaco Editor",
  },
  Moments: {
    Component: dynamic(() => import("components/apps/Moments")),
    hasWindow: false,
    icon: "/System/Icons/pictures.webp",
    title: "Moments",
  },
  OpenType: {
    Component: dynamic(() => import("components/apps/OpenType")),
    backgroundColor: "#FFF",
    icon: "/System/Icons/opentype.webp",
    preferProcessIcon: true,
    title: "OpenType",
  },
  OpenWith: {
    Component: dynamic(() => import("components/system/Dialogs/OpenWith")),
    allowResizing: false,
    backgroundColor: "#FFF",
    defaultSize: {
      height: 492,
      width: 392,
    },
    dialogProcess: true,
    hideTaskbarEntry: true,
    hideTitlebar: true,
    icon: "/System/Icons/unknown.webp",
    title: "Open With",
  },
  Photos: {
    Component: dynamic(() => import("components/apps/Photos")),
    backgroundColor: "#222",
    defaultSize: {
      height: 432,
      width: 576,
    },
    hideTitlebarIcon: true,
    icon: "/System/Icons/photos.webp",
    title: "Photos",
  },
  Portfolio: {
    Component: dynamic(() => import("components/apps/Portfolio")),
    backgroundColor: "#C0C0C0",
    defaultSize: {
      height: 600,
      width: 800,
    },
    icon: "/System/Icons/user.webp",
    title: "Portfolio",
  },
  Properties: {
    Component: dynamic(() => import("components/system/Dialogs/Properties")),
    allowResizing: false,
    backgroundColor: "rgb(240, 240, 240)",
    defaultSize: {
      height: 412,
      width: 361,
    },
    dialogProcess: true,
    hideMaximizeButton: true,
    hideMinimizeButton: true,
    icon: "",
    title: "Properties",
  },
  Run: {
    Component: dynamic(() => import("components/system/Dialogs/Run")),
    allowResizing: false,
    defaultSize: {
      height: 174,
      width: 397,
    },
    dialogProcess: true,
    hideMaximizeButton: true,
    hideMinimizeButton: true,
    icon: "/System/Icons/run.webp",
    initialRelativePosition: {
      bottom: TASKBAR_HEIGHT + 11,
      left: 15,
    },
    singleton: true,
    title: "Run",
  },
  ScreenSaver: {
    Component: dynamic(() => import("components/system/Dialogs/ScreenSaver")),
    allowResizing: false,
    dialogProcess: true,
    hasWindow: false,
    hideTaskbarEntry: true,
    icon: "/System/Icons/screensaver.webp",
    singleton: true,
    title: "Screen Saver",
  },
  Terminal: {
    Component: dynamic(() => import("components/apps/Terminal")),
    backgroundBlur: "8px",
    backgroundColor: "rgba(12, 12, 12, 0.5)",
    defaultSize: {
      height: 374,
      width: 615,
    },
    icon: "/System/Icons/xterm.webp",
    libs: [
      "/Program Files/Xterm.js/xterm.css",
      "/Program Files/Xterm.js/xterm.js",
      "/Program Files/Xterm.js/xterm-addon-fit.js",
      "/Program Files/Xterm.js/local-echo.js",
    ],
    preferProcessIcon: true,
    title: "Terminal",
  },
  Transfer: {
    Component: dynamic(() => import("components/system/Dialogs/Transfer")),
    allowResizing: false,
    backgroundColor: "#FFF",
    defaultSize: {
      height: 163,
      width: 400,
    },
    dialogProcess: true,
    icon: "/System/Icons/copying.webp",
    title: "",
  },
  UniKey: {
    Component: dynamic(() => import("components/apps/UniKey")),
    allowResizing: false,
    backgroundColor: "#C0C0C0",
    defaultSize: {
      height: 380,
      width: 340,
    },
    hideMaximizeButton: true,
    icon: "/System/Icons/unikey.png",
    singleton: true,
    title: "UniKey NT",
  },
};

export default directory;
