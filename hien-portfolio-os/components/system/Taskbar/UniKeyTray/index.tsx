import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useProcesses } from "contexts/process";
import { FOCUSABLE_ELEMENT } from "utils/constants";

type UniKeyTrayProps = {
  clockWidth: number;
  hasAI: boolean;
};

const StyledUniKeyTray = styled.div<{ $clockWidth: number; $hasAI: boolean }>`
  align-items: center;
  cursor: default;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: ${({ $clockWidth, $hasAI, theme }) =>
    `calc(${$clockWidth}px + ${theme.sizes.clock.padding * 2}px + ${$hasAI ? theme.sizes.taskbar.ai.buttonWidth : "0px"})`};
  width: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.taskbar.hover};
  }

  .tray-icon {
    align-items: center;
    border-radius: 1px;
    color: #fff;
    display: flex;
    font-family: Arial, sans-serif;
    font-size: 10px;
    font-weight: bold;
    height: 14px;
    justify-content: center;
    width: 14px;
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.5), 1px 1px 1px rgba(255, 255, 255, 0.3);

    &.v-mode {
      background-color: #ff0000; /* Red for V in UniKey */
    }

    &.e-mode {
      background-color: #0000ff; /* Blue for E in UniKey */
    }
  }
`;

const UniKeyTray: FC<UniKeyTrayProps> = ({ hasAI, clockWidth }) => {
  const { open } = useProcesses();
  const [enabled, setEnabled] = useState(true);
  const [method, setMethod] = useState<"telex" | "vni" | "off">("telex");

  useEffect(() => {
    if (typeof window === "undefined") return () => { /* no-op */ };

    if (window.unikey) {
      setEnabled(window.unikey.enabled);
      setMethod(window.unikey.method);
    }

    const handleUpdate = (): void => {
      if (window.unikey) {
        setEnabled(window.unikey.enabled);
        setMethod(window.unikey.method);
      }
    };

    window.addEventListener("unikey-change", handleUpdate);
    return () => window.removeEventListener("unikey-change", handleUpdate);
  }, []);

  const toggleUniKey = useCallback((e: React.MouseEvent): void => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.unikey) {
      const newEnabled = !window.unikey.enabled;
      window.unikey = {
        ...window.unikey,
        enabled: newEnabled,
        method: newEnabled && window.unikey.method === "off" ? "telex" : window.unikey.method,
      };
      window.dispatchEvent(new CustomEvent("unikey-change"));
    }
  }, []);

  const handleDoubleClick = useCallback((e: React.MouseEvent): void => {
    e.preventDefault();
    open("UniKey");
  }, [open]);

  const isVMode = enabled && method !== "off";

  return (
    <StyledUniKeyTray
      $clockWidth={clockWidth}
      $hasAI={hasAI}
      onClick={toggleUniKey}
      onDoubleClick={handleDoubleClick}
      title={`UniKey NT - Double click to configure\nShortcut: Ctrl + Shift\nMode: ${isVMode ? "Vietnamese" : "English"}`}
      {...FOCUSABLE_ELEMENT}
    >
      <div className={`tray-icon ${isVMode ? "v-mode" : "e-mode"}`}>
        {isVMode ? "V" : "E"}
      </div>
    </StyledUniKeyTray>
  );
};

export default memo(UniKeyTray);
