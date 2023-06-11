import { AnimatePresence } from "framer-motion"
import { useRoutes } from "react-router-dom"
import { AuthProvider } from "./providers/auth.provider"
import { routes } from "./routes"

function App() {
  const pages = useRoutes(routes)
  return (
    <AnimatePresence mode="wait">
      <AuthProvider>{pages}</AuthProvider>
    </AnimatePresence>
  )
}

export default App
