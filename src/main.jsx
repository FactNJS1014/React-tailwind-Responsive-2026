import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PdfPage from "./PdfPage";
import Random from "./Random";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/pdf",
          element: <PdfPage />,
        },
        {
          path: "/random",
          element: <Random />,
        },
      ])}
    />
  </StrictMode>,
);
