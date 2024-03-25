import React from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from './pages/Protected';
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useGlobalContext } from './context/GlobalContext';

axios.defaults.baseURL = "http://localhost:5000/api/v1/";
axios.defaults.withCredentials = true;


function App() {

  const { isAuthenticated } = useGlobalContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Protected isAuthenticated={isAuthenticated}><Profile /></Protected>
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <AppStyled>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 2000

        }} />
      <RouterProvider router={router} />
    </AppStyled>
  )
}

const AppStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

export default App;