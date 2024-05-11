import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Store from "./Store/Store";
import { Provider } from "react-redux";
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store} >
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
);
