import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from './App';
import Login from "./components/login.component";
import Home from "./components/home.component";
import { useSelector } from  "react-redux";

const AuthCheck = ({ children }) => {
    const user = useSelector(state => state.auth.user);
  
    if (user) {
      return children;
    } else {
      return <Navigate to="/login" replace />;
    }
  };
  
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Navigate to="/home" replace /> }, 
            { path: "home", element: (<AuthCheck><Home /></AuthCheck>) },
            { path: "login", element: <Login /> },
        ],
    },
]);