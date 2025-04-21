import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth } from './pages/auth'
import './index.css'
import { HeroUIProvider } from "@heroui/react";
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Layout } from './components/layout'
import { Tasks } from './pages/tasks'
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />
  },
  {
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Tasks />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </Provider>
  </StrictMode>,
)