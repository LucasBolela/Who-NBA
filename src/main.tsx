import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import * as ReactDOMClient from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { emotionCache } from "./lib/mantine"
import "./styles/global.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
})

const root = ReactDOMClient.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={emotionCache} // Required because of Tailwind styles override conflict
      >
        <Notifications />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
