// TestComponent.tsx
import React from "react";
import { useToast } from "@/hooks";

const TestComponent: React.FC = () => {
  const { notify } = useToast();

  return (
    <div>
      <button onClick={() => notify("Success message", "success")}>
        Show Success Toast
      </button>
      <button onClick={() => notify("Error message", "error")}>
        Show Error Toast
      </button>
      <button onClick={() => notify("Info message", "info")}>
        Show Info Toast
      </button>
    </div>
  );
};

export default TestComponent;
