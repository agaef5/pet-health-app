/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication Page/AuthenticationPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import YourPetsPage from "./pages/Pet/YourPetsPage.jsx";
import YourTasksPage from "./pages/Tasks/YourTasksPage.jsx";
import PetDetailsPage from "./pages/Pet/PetDetailsPage.jsx";
import PetHealthDetailsdPage from "./pages/Pet/PetHealthDetailsPage.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config.js";
import Container from "./pages/ContainerPage/Container.jsx";
import Settings from "./pages/Settings/Settings.jsx";

const AuthenticatedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to the login page if the user is not authenticated
        localStorage.removeItem("currentUserUID");
        navigate("/", { replace: true });
      }
    });
    return () => unsubscribe();
  }, []);

  return children;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthenticationPage />} />
            <Route
              path="/:userID"
              element={
                <AuthenticatedRoute>
                  <Container />
                </AuthenticatedRoute>
              }
            >
              <Route
                index
                element={
                  <AuthenticatedRoute>
                    <Dashboard />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="pets"
                element={
                  <AuthenticatedRoute>
                    <YourPetsPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="pets/:petID"
                element={
                  <AuthenticatedRoute>
                    <PetDetailsPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="pets/:petID/:logType"
                element={
                  <AuthenticatedRoute>
                    <PetHealthDetailsdPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="tasks"
                element={
                  <AuthenticatedRoute>
                    <YourTasksPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <AuthenticatedRoute>
                    <Settings />
                  </AuthenticatedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
