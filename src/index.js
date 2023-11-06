import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import AppContainer from "./App.container";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AppContainer />);
