import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication Page/AuthenticationPage.jsx";
import LogIn from "./components/Authentication Page/LogIn.jsx";
import Register from "./components/Authentication Page/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import YourPetsPage from "./pages/Pet/YourPetsPage.jsx";
import YourTasksPage from "./pages/Tasks/YourTasksPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthenticationPage />}>
              <Route index element={<LogIn />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/pets" element={<YourPetsPage />} />
            <Route path="/tasks" element={<YourTasksPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
