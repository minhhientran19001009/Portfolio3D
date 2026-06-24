/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import { memo, useCallback, useEffect, useState } from "react";
import { useProcesses } from "contexts/process";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import StyledUniKey from "components/apps/UniKey/StyledUniKey";

type UniKeyMethod = "telex" | "vni" | "off";
type UniKeyCharset = "unicode" | "tcvn3" | "vni";

const UniKey: FC<ComponentProcessProps> = ({ id }) => {
  const { close } = useProcesses();
  const [method, setMethod] = useState<UniKeyMethod>("telex");
  const [charset, setCharset] = useState<UniKeyCharset>("unicode");
  const [enabled, setEnabled] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  // Sync state from window.unikey
  useEffect(() => {
    if (typeof window === "undefined") return () => { /* no-op */ };

    if (!window.unikey) {
      window.unikey = {
        charset: "unicode",
        enabled: true,
        method: "telex",
      };
    }
    setMethod(window.unikey.method);
    setCharset(window.unikey.charset);
    setEnabled(window.unikey.enabled);

    const handleUpdate = (): void => {
      if (window.unikey) {
        setMethod(window.unikey.method);
        setCharset(window.unikey.charset);
        setEnabled(window.unikey.enabled);
      }
    };

    window.addEventListener("unikey-change", handleUpdate);
    return () => window.removeEventListener("unikey-change", handleUpdate);
  }, []);

  const updateUniKey = useCallback((newFields: Partial<NonNullable<typeof window.unikey>>): void => {
    if (typeof window !== "undefined") {
      window.unikey = {
        charset: window.unikey?.charset || "unicode",
        enabled: window.unikey?.enabled === undefined ? true : window.unikey.enabled,
        method: window.unikey?.method || "telex",
        ...newFields,
      };
      window.dispatchEvent(new CustomEvent("unikey-change"));
    }
  }, []);

  const handleMethodChange = useCallback((newMethod: "telex" | "vni" | "off"): void => {
    updateUniKey({ enabled: newMethod !== "off", method: newMethod });
  }, [updateUniKey]);

  const handleCharsetChange = useCallback((newCharset: "unicode" | "tcvn3" | "vni"): void => {
    updateUniKey({ charset: newCharset });
  }, [updateUniKey]);

  const resetToDefault = useCallback(() => {
    updateUniKey({
      charset: "unicode",
      enabled: true,
      method: "telex",
    });
  }, [updateUniKey]);

  return (
    <StyledUniKey>
      {/* Main Form Fields */}
      <div className="main-section">
        <div className="controls-group">
          <div className="form-row">
            <label htmlFor="charset-select">Bảng mã</label>
            <select
              id="charset-select"
              onChange={(e) => handleCharsetChange(e.target.value as "unicode" | "tcvn3" | "vni")}
              value={charset}
            >
              <option value="unicode">Unicode dựng sẵn</option>
              <option value="tcvn3">TCVN3 (ABC)</option>
              <option value="vni">VNI Windows</option>
            </select>
          </div>

          <div className="form-row" style={{ marginTop: "10px" }}>
            <label htmlFor="method-select">Kiểu gõ</label>
            <select
              id="method-select"
              onChange={(e) => handleMethodChange(e.target.value as "off" | "telex" | "vni")}
              value={enabled ? method : "off"}
            >
              <option value="telex">Telex</option>
              <option value="vni">VNI</option>
              <option value="off">Tắt (English)</option>
            </select>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="buttons-sidebar">
          <button
            className="win98-button primary"
            onClick={() => close(id)}
            type="button"
          >
            Đóng
          </button>
          <button
            className="win98-button"
            onClick={() => {
              updateUniKey({ enabled: false, method: "off" });
              close(id);
            }}
            type="button"
          >
            Kết thúc
          </button>
          <button
            className="win98-button"
            onClick={() => setShowAbout(true)}
            type="button"
          >
            Thông tin
          </button>
        </div>
      </div>

      {/* Advanced Typing Options Group */}
      <div className="group-box">
        <span className="group-title">Tùy chọn gõ</span>
        <div className="options-grid">
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Cho phép gõ tự do</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Kiểm tra chính tả</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Tự khôi phục phím sai</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Cho phép gõ tắt</span>
          </label>
        </div>
      </div>

      {/* Advanced System Options Group */}
      <div className="group-box">
        <span className="group-title">Hệ thống</span>
        <div className="options-grid">
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Khởi động cùng Windows</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Bật hội thoại khi khởi động</span>
          </label>
          <label className="checkbox-label">
            <input style={{ accentColor: "#000" }} type="checkbox" defaultChecked />
            <span>Hiện biểu tượng ở khay hệ thống</span>
          </label>
          <div className="checkbox-label">
            <button
              className="win98-button"
              onClick={resetToDefault}
              style={{ fontSize: "10px", height: "18px", width: "80px" }}
              type="button"
            >
              Mặc định
            </button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="footer-status">
        <span>UniKey NT 4.0 RC4</span>
        <span>Phím chuyển: <strong>Ctrl + Shift</strong></span>
      </div>

      {/* Help Modal */}
      {showAbout && (
        <div className="about-overlay" onClick={() => setShowAbout(false)}>
          <div className="about-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="about-title">Thông tin về UniKey</div>
            <div className="about-text">
              <strong>UniKey NT - Phiên bản phục chế</strong>
              <br />
              Tác giả gốc: Phạm Kim Long.
              <br />
              Bản quyền chương trình thuộc về tác giả.
              <br />
              <br />
              - Hỗ trợ gõ Telex và VNI tiếng Việt mượt mà.
              <br />
              - Click biểu tượng [V] / [E] ở góc khay hệ thống để bật/tắt nhanh chế độ gõ.
            </div>
            <button
              className="win98-button about-ok-btn"
              onClick={() => setShowAbout(false)}
              type="button"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </StyledUniKey>
  );
};

export default memo(UniKey);
