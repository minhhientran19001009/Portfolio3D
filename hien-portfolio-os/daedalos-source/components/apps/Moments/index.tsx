import { memo, useEffect } from "react";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useProcesses } from "contexts/process";

const Moments: FC<ComponentProcessProps> = ({ id }) => {
  const { close, processes: { [id]: process } } = useProcesses();
  const { url = "https://moments.poly-hna.com/search" } = process || {};

  useEffect(() => {
    window.open(url, "_blank", "noopener,noreferrer");
    close(id);
  }, [close, id, url]);

  return <div />;
};

export default memo(Moments);
