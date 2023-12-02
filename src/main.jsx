import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/Authentication Page/AuthenticationPage.jsx';
import LogIn from './components/Authentication Page/LogIn.jsx';
import Register from './components/Authentication Page/Register.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationPage />}>
              <Route index element={<LogIn/>}/>
              <Route path="register" element={<Register/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
