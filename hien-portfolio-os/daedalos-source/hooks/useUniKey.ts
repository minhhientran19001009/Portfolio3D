import { useEffect } from "react";

declare global {
  interface Window {
    unikey?: {
      method: "telex" | "vni" | "off";
      charset: "unicode" | "tcvn3" | "vni";
      enabled: boolean;
    };
  }
}

// Vietnamese vowel and tone helpers (lowercase only for easy lookup)
const vowels = "aeouiyáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵâăêôơưấầẩẫậắằẳẵặếềểễệốồổỗộớờởỡợứừửữự";
const toneMapTelex: Record<string, string> = { s: "s", f: "f", r: "r", x: "x", j: "j" };
const toneMapVni: Record<string, string> = { "1": "s", "2": "f", "3": "r", "4": "x", "5": "j" };

// Map tone name to mark char offset for vowel characters
const toneMarks: Record<string, Record<string, string>> = {
  s: { a: "á", e: "é", o: "ó", u: "ú", i: "í", y: "ý", â: "ấ", ă: "ắ", ê: "ế", ô: "ố", ơ: "ớ", ư: "ứ" },
  f: { a: "à", e: "è", o: "ò", u: "ù", i: "ì", y: "ỳ", â: "ầ", ă: "ằ", ê: "ề", ô: "ồ", ơ: "ờ", ư: "ừ" },
  r: { a: "ả", e: "ẻ", o: "ỏ", u: "ủ", i: "ỉ", y: "ỷ", â: "ẩ", ă: "ẳ", ê: "ể", ô: "ổ", ơ: "ở", ư: "ử" },
  x: { a: "ã", e: "ẽ", o: "õ", u: "ũ", i: "ĩ", y: "ỹ", â: "ẫ", ă: "ẵ", ê: "ễ", ô: "ỗ", ơ: "ỡ", ư: "ữ" },
  j: { a: "ạ", e: "ẹ", o: "ọ", u: "ụ", i: "ị", y: "ỵ", â: "ậ", ă: "ặ", ê: "ệ", ô: "ộ", ơ: "ợ", ư: "ự" },
};

// Reverse map to strip tones
const baseVowels: Record<string, string> = {};
const charToTone: Record<string, string> = {};

const vowelPairs = [
  ["a", "áàảãạ"], ["e", "éèẻẽẹ"], ["i", "íìỉĩị"], ["o", "óòỏõọ"], ["u", "úùủũụ"], ["y", "ýỳỷỹỵ"],
  ["â", "ấầẩẫậ"], ["ă", "ắằẳẵặ"], ["ê", "ếềểễệ"], ["ô", "ốồổỗộ"], ["ơ", "ớờởỡợ"], ["ư", "ứừửữự"]
];

vowelPairs.forEach(([base, mapped]) => {
  const tones = ["s", "f", "r", "x", "j"];
  for (let i = 0; i < mapped.length; i++) {
    const char = mapped[i];
    baseVowels[char] = base;
    charToTone[char] = tones[i];
  }
});

const getBaseVowel = (char: string): string => baseVowels[char] || char;

const removeTone = (word: string): { cleanWord: string; tone: string | null } => {
  let tone: string | null = null;
  const chars = [...word];
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (charToTone[char]) {
      tone = charToTone[char];
      chars[i] = getBaseVowel(char);
    }
  }
  return { cleanWord: chars.join(""), tone };
};

const getToneIndex = (cleanWord: string): number => {
  const chars = [...cleanWord];
  let vowelIndices: number[] = [];
  
  for (let i = 0; i < chars.length; i++) {
    if (vowels.includes(chars[i].toLowerCase())) {
      vowelIndices.push(i);
    }
  }

  if (vowelIndices.length === 0) return -1;

  // Handle "qu" consonant helper
  if (
    cleanWord.length >= 3 &&
    cleanWord.slice(0, 2).toLowerCase() === "qu" &&
    vowelIndices[0] === 1 &&
    vowels.includes(chars[2].toLowerCase())
  ) {
    vowelIndices = vowelIndices.slice(1);
  }

  // Handle "gi" consonant helper
  if (
    cleanWord.length >= 3 &&
    cleanWord.slice(0, 2).toLowerCase() === "gi" &&
    vowelIndices[0] === 1 &&
    vowels.includes(chars[2].toLowerCase())
  ) {
    vowelIndices = vowelIndices.slice(1);
  }

  if (vowelIndices.length === 0) return -1;
  if (vowelIndices.length === 1) return vowelIndices[0];

  if (vowelIndices.length === 2) {
    const v1 = chars[vowelIndices[0]].toLowerCase();
    const v2 = chars[vowelIndices[1]].toLowerCase();
    const pair = v1 + v2;

    // Pairs where tone goes on the second vowel:
    if (["oa", "oe", "uy", "uê", "uơ", "uâ", "iê", "uô", "ươ", "yê"].includes(pair)) {
      return vowelIndices[1];
    }
    return vowelIndices[0];
  }

  if (vowelIndices.length === 3) {
    const v1 = chars[vowelIndices[0]].toLowerCase();
    const v2 = chars[vowelIndices[1]].toLowerCase();
    const v3 = chars[vowelIndices[2]].toLowerCase();
    const triple = v1 + v2 + v3;

    if (triple === "uyê") {
      return vowelIndices[2];
    }
    return vowelIndices[1];
  }

  return vowelIndices[vowelIndices.length - 1];
};

const applyTone = (word: string, tone: string): string => {
  const { cleanWord } = removeTone(word);
  const chars = [...cleanWord];
  const targetIdx = getToneIndex(cleanWord);

  if (targetIdx === -1) return word;

  const targetChar = chars[targetIdx];
  const isUpper = targetChar === targetChar.toUpperCase();
  const lowerChar = targetChar.toLowerCase();

  if (toneMarks[tone] && toneMarks[tone][lowerChar]) {
    const marked = toneMarks[tone][lowerChar];
    chars[targetIdx] = isUpper ? marked.toUpperCase() : marked;
    return chars.join("");
  }

  return word;
};

// Character transformation rules
const telexRule = (cleanWord: string, char: string): string | null => {
  const lowerChar = char.toLowerCase();
  const lastChar = cleanWord.slice(-1);
  const lastCharLower = lastChar.toLowerCase();

  // 1. Double key mappings
  if (lowerChar === "a" && lastCharLower === "a") {
    return cleanWord.slice(0, -1) + (lastChar === "A" ? "Â" : "â");
  }
  if (lowerChar === "e" && lastCharLower === "e") {
    return cleanWord.slice(0, -1) + (lastChar === "E" ? "Ê" : "ê");
  }
  if (lowerChar === "o" && lastCharLower === "o") {
    return cleanWord.slice(0, -1) + (lastChar === "O" ? "Ô" : "ô");
  }
  if (lowerChar === "d" && lastCharLower === "d") {
    return cleanWord.slice(0, -1) + (lastChar === "D" ? "Đ" : "đ");
  }

  // 2. Horn modifiers (w)
  if (lowerChar === "w") {
    if (lastCharLower === "o") {
      return cleanWord.slice(0, -1) + (lastChar === "O" ? "Ơ" : "ơ");
    }
    if (lastCharLower === "u") {
      return cleanWord.slice(0, -1) + (lastChar === "U" ? "Ư" : "ư");
    }
    if (lastCharLower === "a") {
      return cleanWord.slice(0, -1) + (lastChar === "A" ? "Ă" : "ă");
    }
    // Check if cleanWord contains "o" or "u" to apply horn globally (e.g. "uou" -> "ươu")
    if (cleanWord.toLowerCase().includes("u") || cleanWord.toLowerCase().includes("o")) {
      let updated = "";
      for (const c of cleanWord) {
        if (c === "u") updated += "ư";
        else if (c === "U") updated += "Ư";
        else if (c === "o") updated += "ơ";
        else if (c === "O") updated += "Ơ";
        else updated += c;
      }
      return updated;
    }
  }

  return null;
};

const vniRule = (cleanWord: string, char: string): string | null => {
  if (!/^[6-9]$/.test(char)) return null;

  const lastChar = cleanWord.slice(-1);
  const lastCharLower = lastChar.toLowerCase();

  // 6 -> circumflex (â, ê, ô)
  if (char === "6") {
    if (lastCharLower === "a") return cleanWord.slice(0, -1) + (lastChar === "A" ? "Â" : "â");
    if (lastCharLower === "e") return cleanWord.slice(0, -1) + (lastChar === "E" ? "Ê" : "ê");
    if (lastCharLower === "o") return cleanWord.slice(0, -1) + (lastChar === "O" ? "Ô" : "ô");
  }
  // 7 -> horn (ơ, ư)
  if (char === "7") {
    if (lastCharLower === "o") return cleanWord.slice(0, -1) + (lastChar === "O" ? "Ơ" : "ơ");
    if (lastCharLower === "u") return cleanWord.slice(0, -1) + (lastChar === "U" ? "Ư" : "ư");
    // Apply horn to both u and o if present
    if (cleanWord.toLowerCase().includes("u") || cleanWord.toLowerCase().includes("o")) {
      let updated = "";
      for (const c of cleanWord) {
        if (c === "u") updated += "ư";
        else if (c === "U") updated += "Ư";
        else if (c === "o") updated += "ơ";
        else if (c === "O") updated += "Ơ";
        else updated += c;
      }
      return updated;
    }
  }
  // 8 -> breve (ă)
  if (char === "8" && lastCharLower === "a") {
    return cleanWord.slice(0, -1) + (lastChar === "A" ? "Ă" : "ă");
  }
  // 9 -> bar (đ)
  if (char === "9" && lastCharLower === "d") {
    return cleanWord.slice(0, -1) + (lastChar === "D" ? "Đ" : "đ");
  }

  return null;
};

export const useUniKey = (): void => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.unikey) {
      window.unikey = {
        charset: "unicode",
        enabled: true,
        method: "telex",
      };
    }

    const getActiveWord = (input: HTMLInputElement | HTMLTextAreaElement): { word: string; start: number; end: number } => {
      const val = input.value;
      const pos = input.selectionStart || 0;
      let start = pos - 1;
      const vietnameseLetters = /[a-zA-ZáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵâăêôơưấầẩẫậắằẳẵặếềểễệốồổỗộớờởỡợứừửữựđĐ]/;
      while (start >= 0 && vietnameseLetters.test(val[start])) {
        start--;
      }
      start++;
      return {
        end: pos,
        start,
        word: val.slice(start, pos),
      };
    };

    let ctrlPressed = false;
    let shiftPressed = false;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Control") ctrlPressed = true;
      if (e.key === "Shift") shiftPressed = true;

      if (ctrlPressed && shiftPressed) {
        if (window.unikey) {
          const newEnabled = !window.unikey.enabled;
          window.unikey.enabled = newEnabled;
          console.log(`[UniKey] Toggled via Ctrl+Shift. Enabled: ${newEnabled}`);
          window.dispatchEvent(new CustomEvent("unikey-change"));
        }
        return;
      }

      const activeElement = document.activeElement;
      if (
        !(activeElement instanceof HTMLInputElement) &&
        !(activeElement instanceof HTMLTextAreaElement)
      ) {
        return;
      }

      const state = window.unikey;
      if (!state || !state.enabled || state.method === "off") {
        return;
      }

      const key = e.key;
      if (key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) return;

      const { word, start, end } = getActiveWord(activeElement);

      // Special case: empty word and typing 'w' to produce 'ư' / 'Ư'
      if (!word) {
        if (state.method === "telex" && key.toLowerCase() === "w") {
          e.preventDefault();
          const charToInsert = key === "W" ? "Ư" : "ư";
          const nativeSetter = Object.getOwnPropertyDescriptor(
            activeElement instanceof HTMLTextAreaElement
              ? window.HTMLTextAreaElement.prototype
              : window.HTMLInputElement.prototype,
            "value"
          )?.set;

          const currentValue = activeElement.value;
          const newValue = currentValue.slice(0, start) + charToInsert + currentValue.slice(end);
          const newCursorPos = start + 1;

          console.log(`[UniKey] Intercepted standalone 'w' -> '${charToInsert}'`);

          if (nativeSetter) {
            nativeSetter.call(activeElement, newValue);
            activeElement.dispatchEvent(new Event("input", { bubbles: true }));
          } else {
            activeElement.value = newValue;
          }
          activeElement.setSelectionRange(newCursorPos, newCursorPos);
        }
        return;
      }

      let transformed: string | null = null;
      const lowerKey = key.toLowerCase();

      // Check if it's a tone key mapping
      const isTelexTone = state.method === "telex" && ["s", "f", "r", "x", "j"].includes(lowerKey);
      const isVniTone = state.method === "vni" && ["1", "2", "3", "4", "5"].includes(lowerKey);

      if (isTelexTone || isVniTone) {
        const targetTone = state.method === "telex" ? toneMapTelex[lowerKey] : toneMapVni[lowerKey];
        const { tone: existingTone } = removeTone(word);

        if (existingTone === targetTone) {
          // Toggle tone off
          transformed = removeTone(word).cleanWord;
        } else {
          // Apply new tone
          transformed = applyTone(word, targetTone);
        }

        // If the tone did not change the word (e.g. no vowels to apply the tone to),
        // we do not intercept the keystroke so the literal character is inserted.
        if (transformed === word) {
          transformed = null;
        }
      } else {
        // It's a character modifier key
        const { cleanWord, tone } = removeTone(word);
        let cleanTransformed: string | null = null;

        if (state.method === "telex") {
          cleanTransformed = telexRule(cleanWord, key);
        } else if (state.method === "vni") {
          cleanTransformed = vniRule(cleanWord, key);
        }

        if (cleanTransformed !== null) {
          // Re-apply original tone if present
          transformed = tone ? applyTone(cleanTransformed, tone) : cleanTransformed;
        }
      }

      if (transformed !== null) {
        e.preventDefault();
        
        console.log(`[UniKey] Intercepted key: '${key}', word: '${word}' -> '${transformed}'`);

        const currentValue = activeElement.value;
        const newValue = currentValue.slice(0, start) + transformed + currentValue.slice(end);
        const newCursorPos = start + transformed.length;

        const nativeSetter = Object.getOwnPropertyDescriptor(
          activeElement instanceof HTMLTextAreaElement
            ? window.HTMLTextAreaElement.prototype
            : window.HTMLInputElement.prototype,
          "value"
        )?.set;

        if (nativeSetter) {
          nativeSetter.call(activeElement, newValue);
          activeElement.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
          activeElement.value = newValue;
        }

        activeElement.setSelectionRange(newCursorPos, newCursorPos);
      }
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      if (e.key === "Control") ctrlPressed = false;
      if (e.key === "Shift") shiftPressed = false;
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
    };
  }, []);
};
