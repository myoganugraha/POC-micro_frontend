import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Container from "./components/container";

const App = () => (
  <Routes>
    <Route path="/" element={<Container />} />
  </Routes>
);
const rootElement = document.getElementById("container-component");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
