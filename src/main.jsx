import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './theme.css'
import router from './router/index.jsx'
import { Provider } from 'react-redux'
import store from './store/index.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
)
