import React from "react";

const LoadingSpinner = () => (
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>{" "}
    {/* Screen reader text for accessibility */}
  </div>
);

export default LoadingSpinner;
