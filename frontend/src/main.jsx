import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
// Note: "@google/model-viewer" is intentionally NOT imported here.
// It registers a WebGL-capable custom element and isn't tiny — it's
// now dynamically imported only inside DishDetail.jsx, so pages like
// Home/Menu/Contact never pay that cost.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
