import { Component } from "react";
import { isDev } from "utils/functions";

type ErrorBoundaryProps = {
  FallbackRender?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  public constructor(props: React.PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false };
  }

  public override shouldComponentUpdate(): boolean {
    return false;
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public override render(): React.ReactNode {
    const {
      props: { children, FallbackRender },
      state: { hasError },
    } = this;

    if (hasError && !FallbackRender && !isDev()) {
      try {
        const reloadKey = "error_boundary_reload_attempts";
        const lastReload = sessionStorage.getItem(reloadKey);
        const now = Date.now();
        if (!lastReload || now - Number(lastReload) > 10000) {
          sessionStorage.setItem(reloadKey, String(now));
          window.location.reload();
        } else {
          console.error(
            "ErrorBoundary: Reloaded recently. Preventing infinite loop."
          );
        }
      } catch {
        console.error("ErrorBoundary: Session storage error");
      }
    }

    return hasError ? FallbackRender : children;
  }
}
