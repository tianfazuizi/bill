import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import router from './router/index.jsx'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
