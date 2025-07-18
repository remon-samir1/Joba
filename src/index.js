import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowSizeContext from "./Context/WindowSizeContext";
import CartContext from "./Context/CartContext";
import StudentSearchContext from "./Context/StudentSearchContext";
import UserContext from "./Context/UserContext";
import CategoryIdContext from "./Context/CategoryIdContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContext>

    <WindowSizeContext>
      <CartContext>
        <MenuContext>
          <StudentSearchContext>
            <CategoryIdContext>

          <BrowserRouter>
            <App />
          </BrowserRouter>
            </CategoryIdContext>
          </StudentSearchContext>
            
        </MenuContext>
      </CartContext>
    </WindowSizeContext>
    </UserContext>

  </React.StrictMode> 
);
