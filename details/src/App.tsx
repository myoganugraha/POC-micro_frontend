import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import MovieDetailsComponent from "./components/details";
import axios from "axios";
import { apiKey, tmdbAPI } from "./utils/url_constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HeaderComponent = React.lazy(() => import("header/Components"));

function App() {
  const [movieDetails, setMovieDetails] = useState();

  useEffect(() => {
    axios
      .get(tmdbAPI + "533535?language=en-US&api_key=" + apiKey)
      .then((response) => {
        setMovieDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route
          index
          element={
            movieDetails == undefined ? (
              <div></div>
            ) : (
              <div>
                <Suspense fallback={<div>Loading...</div>}>
                  <HeaderComponent />
                </Suspense>
                <MovieDetailsComponent movieDetails={movieDetails} />
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
}
const rootElement = document.getElementById("details");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);
