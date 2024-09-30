import React, { Suspense } from "react";


const HeaderComponent = React.lazy(() => import("header/Components"));
const PopularMoviesComponent = React.lazy(
  () => import("content/PopularMovies")
);

export default function Container() {
  return (
    <div className="container">
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <HeaderComponent />
        </Suspense>
      </div>
      <div style={{ height: "20px" }} />
      <Suspense fallback={<div>Loading...</div>}>
        <PopularMoviesComponent />
      </Suspense>
    </div>
  );
}
