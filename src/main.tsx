import{ Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from './routes'
import './i18n/config'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback="Loading...">
    <RouterProvider router={router} />
  </Suspense>

)
