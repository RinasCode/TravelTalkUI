import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routers/router";
import "toastify-js/src/toastify.css";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
