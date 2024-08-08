import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import {store} from './app/store.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="123780589461-oqojmr6geaih2guomfq4j29s3j0594t7.apps.googleusercontent.com">
      <Provider  store={store}>
      <App/>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
