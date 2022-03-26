import { Component, ErrorInfo, ReactNode } from "react";
import Button from "./common/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col justify-center w-1/3 text-center mx-auto my-16">
          <div className="mb-4">Something went wrong</div>
          <Button onClick={() => window.location.reload()}>
            Reload the window
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
