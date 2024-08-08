import Proptypes from "prop-types"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

// Initial state
const initialState = {
  theme: "light", // light | dark | system
  setTheme: () => null,
}

// Context Container
const ThemeProviderContext = createContext(initialState)

// Context Provider
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme,
  )

  useEffect(() => {
    // Set theme to the root element
    const root = window.document.documentElement

    // Remove existing theme classes
    root.classList.remove("light", "dark")

    // if theme is system, set theme based on system preference
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = useMemo(() => {
    return {
      theme,
      setTheme: (theme) => {
        localStorage.setItem(storageKey, theme)
        setTheme(theme)
      },
    }
  }, [storageKey, theme])

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

ThemeProvider.propTypes = {
  children: Proptypes.node.isRequired,
  defaultTheme: Proptypes.oneOf(["light", "dark", "system"]),
  storageKey: Proptypes.string,
}
