import { memo, useEffect, useRef, useState } from "react";
import StyledPortfolio from "components/apps/Portfolio/StyledPortfolio";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useFileSystem } from "contexts/fileSystem";
import { useSession } from "contexts/session";
import { IFRAME_CONFIG } from "utils/constants";

const PORTFOLIO_PATH = "/Users/Public/Documents/Portfolio/index.html";

const Portfolio: FC<ComponentProcessProps> = ({ id }) => {
  const { readFile } = useFileSystem();
  const { setForegroundId } = useSession();
  const [srcDoc, setSrcDoc] = useState("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    readFile(PORTFOLIO_PATH).then((contents) => {
      if (contents) {
        setSrcDoc(contents.toString());
      }
    });
  }, [readFile]);

  return (
    <StyledPortfolio>
      <iframe
        ref={iframeRef}
        onLoad={() => {
          try {
            iframeRef.current?.contentWindow?.addEventListener("focus", () =>
              setForegroundId(id)
            );
          } catch {
            // Ignore focus listener failure
          }
        }}
        srcDoc={srcDoc || undefined}
        title={id}
        {...IFRAME_CONFIG}
      />
    </StyledPortfolio>
  );
};

export default memo(Portfolio);
