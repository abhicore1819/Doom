import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import Login from './components/Login.jsx';
import Library from './components/Library.jsx';
import Playerdiv from './components/Playerdiv.jsx';
import Searchbar from './components/Searchbar.jsx';
import Prefrences from './components/Prefrences.jsx';
import './index.css'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'search',
    element: <Searchbar />
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/library',
    element: <Library/>
  },
  {
    path: '/prefrences',
    element: <Prefrences/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < RouterProvider router={routes} />
  </StrictMode>,
)