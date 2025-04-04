import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowSizeContext from './Context/WindowSizeContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowSizeContext>

    <MenuContext>

    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MenuContext>
    </WindowSizeContext>
  </React.StrictMode>
);
