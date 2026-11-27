import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./bare.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>,
);

// queryClient  정석
/* import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./bare.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
); */