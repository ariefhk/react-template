import "./index.css"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./components/provider/theme-provider"
import { router } from "./router/index.router.jsx"

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="light" storageKey="react-theme">
    <RouterProvider router={router} />
  </ThemeProvider>,
)
