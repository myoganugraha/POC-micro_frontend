import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Container from "./components/container";
const MovieDetails = React.lazy(() => import("details/MovieDetails"));

const App = () => (
  <Routes>
    <Route path="/" element={<Container />} />
    <Route path="/:id" element={<Suspense fallback={'Loading'}>
      <MovieDetails/>
    </Suspense>} />
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
