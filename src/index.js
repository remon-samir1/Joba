import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css'

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowSizeContext from './Context/WindowSizeContext';
import CartContext from './Context/CartContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowSizeContext>
<CartContext>
  
    <MenuContext>

    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MenuContext>
</CartContext>
    </WindowSizeContext>
  </React.StrictMode>
);
