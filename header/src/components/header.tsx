import React from "react";
import "./style.css";
import { Button, Layout, Menu } from "antd";

const { Header } = Layout;

const itemMenu = [
  {
    key: "popularNav",
    label: "Popular",
  },
  {
    key: "nowPlayingNave",
    label: "Now Playing",
  },
  {
    key: "upcomingNav",
    label: "Upcoming",
  },
];

export default function HeaderComponent() {
  return (
    <Header>
      <div />
      <Menu
        theme="dark"
        mode="horizontal"
        items={itemMenu}
        style={{ fontWeight: "bold" }}
      />
    </Header>
  );
}
