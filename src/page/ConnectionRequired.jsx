import React from "react";

const ConnectionRequired = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h1>Connection Required</h1>
    <p>
      Your account is not yet linked to a Parent. Please wait for your Parent to
      connect, or enter a Parent Code to continue.
    </p>
  </div>
);

export default ConnectionRequired;
