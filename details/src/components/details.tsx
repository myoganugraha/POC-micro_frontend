import React from "react";
import {posterPrefix } from "../utils/url_constants";
import { Flex, Typography } from "antd";
import { MovieDetails } from "../types/movie_details";

export default function MovieDetailsComponent({
  movieDetails,
}: {
  movieDetails: MovieDetails;
}) {
  return (
    <div
      style={{
        maxWidth: 800,
        padding: 20,
      }}
    >
      <Flex justify="flex-start" align="flex-start">
        <img
          alt="poster"
          src={posterPrefix + movieDetails?.poster_path}
          style={{
            width: 175,
            marginLeft: 25,
            marginRight: 25,
            borderRadius: 10,
          }}
        />
        <Flex
          vertical
          align="flex-start"
          justify="space-between"
          style={{ padding: 8 }}
        >
          <Typography.Title>{movieDetails?.title}</Typography.Title>
          <div>{movieDetails?.overview}</div>
        </Flex>
      </Flex>
    </div>
  );
}
