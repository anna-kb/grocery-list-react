import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { GroceryListProvider } from "./GroceryListContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GroceryListProvider>
      <App />
    </GroceryListProvider>
  </React.StrictMode>
);
