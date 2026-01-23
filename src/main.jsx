import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PdfPage from "./PdfPage";
import Random from "./Random";
import Dashboard from "./Dashboard";
import SpreadSheet from "./SpreadSheet";

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
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/spreadsheet",
          element: <SpreadSheet />,
        },
      ])}
    />
  </StrictMode>,
);
