import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Enquiry from "./Pages/Enquiry";
import MyReadings from "./Pages/MyReadings"; 
import RootLayout from './Pages/Root';
import ReportSuccess from "./Pages/ReportSuccess"; // Import the ReportSuccess component
import './App.css'; // Ensure this is imported

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "my-readings", element: <MyReadings /> },
      { path: "enquiry", element: <Enquiry /> },
      { path: "success", element: <ReportSuccess /> }, // Add the success route
    ],
    errorElement: <div>404 Not Found</div>, // Adding a simple error boundary
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
