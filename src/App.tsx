import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          This is a base application for Docker containment with TypeScript
          template, native eslint, native testing library, prettier!
          <br />
          <span>Enjoy!</span>
        </p>
        <br />
        <p>Just run the command: docker compose up -d</p>
      </header>
    </div>
  );
}

export default App;
