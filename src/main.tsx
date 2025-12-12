import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MIRAGE_ENABLED } from "./config/mirage";
import { makeServer } from "./mirage/server";

// Start Mirage server in development when enabled
if (MIRAGE_ENABLED) {
  makeServer();
  console.log('🔧 Mirage server is running');
}

createRoot(document.getElementById("root")!).render(<App />);
