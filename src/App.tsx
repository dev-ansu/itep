import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  return (
    <>
        <RouterProvider router={routes} />
        <ToastContainer autoClose={3000} position='top-right' />
    </>
  )
}

export default App
