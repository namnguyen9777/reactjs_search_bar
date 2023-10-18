import React from "react";
import "./styles.css";
import SearchEngine from "./Search";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Sir!</h1>
      <h2>Please input what you want to find in below</h2>
      <SearchEngine />
    </div>
  );
}
