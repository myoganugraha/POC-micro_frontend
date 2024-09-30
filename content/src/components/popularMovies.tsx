import { Card, Row } from "antd";
import React from "react";

import { popularMovies } from "../utils/movies";
import { posterPrefix } from "../utils/url_constants";

const { Meta } = Card;

export default function PopularMoviesComponent() {
  const items = popularMovies.map((movie) => (
    <div onClick={() => alert(movie.title)}>
      <Card
        hoverable={false}
        style={{ width: 160, margin: 20 }}
        size="small"
        cover={<img alt={movie.title} src={posterPrefix + movie.poster_path} />}
      >
        <Meta
          title={movie.title}
          description={new Date(movie.release_date).toDateString()}
          style={{
            maxLines: 3,
          }}
        />
      </Card>
    </div>
  ));
  return (
    <div>
      <Row gutter={16} justify={"center"}>
        {items}
      </Row>
    </div>
  );
}
