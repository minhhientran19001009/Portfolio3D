import { EDITABLE_IMAGE_FILE_EXTENSIONS, TEXT_EDITORS } from "utils/constants";

type Extension = {
  command?: string;
  icon?: string;
  process: string[];
  type?: string;
};

const types = {
  Font: {
    icon: "font",
    process: ["OpenType"],
    type: "Font File",
  },
  GraphicsEditor: {
    process: ["Photos"],
    type: "Picture File",
  },
  HtmlDocument: {
    process: ["Browser", ...TEXT_EDITORS],
    type: "HTML Document",
  },
  Markdown: {
    icon: "marked",
    process: ["Marked", ...TEXT_EDITORS],
    type: "Markdown File",
  },
  PythonFile: {
    command: "py",
    icon: "python",
    process: ["Terminal", ...TEXT_EDITORS],
    type: "Python File",
  },
  ScreenSaver: {
    process: ["ScreenSaver"],
    type: "Screen Saver",
  },
  SvgFile: {
    process: ["Photos", ...TEXT_EDITORS],
    type: "Scalable Vector Graphics File",
  },
  WasmFile: {
    command: "wapm",
    icon: "wapm",
    process: ["Terminal"],
    type: "WebAssembly Module File",
  },
  ZipFile: {
    icon: "compressed",
    process: ["FileExplorer"],
    type: "Compressed (zipped) Folder",
  },
};

const extensions: Record<string, Extension> = {
  ".htm": types.HtmlDocument,
  ".html": types.HtmlDocument,
  ".md": types.Markdown,
  ".otf": types.Font,
  ".py": types.PythonFile,
  ".svg": types.SvgFile,
  ".ttf": types.Font,
  ".wasm": types.WasmFile,
  ".woff": types.Font,
  ".xscr": types.ScreenSaver,
  ".zip": types.ZipFile,
};

const addType =
  (type: Extension) =>
  (extension: string): void => {
    if (type.process) {
      if (extensions[extension]) {
        extensions[extension].process.push(...type.process);
      } else {
        extensions[extension] = type;
      }
    }
  };

EDITABLE_IMAGE_FILE_EXTENSIONS.forEach(addType(types.GraphicsEditor));

export default extensions;
