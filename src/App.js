import React, { useContext } from "react";
import "./App.css";
import { SomeContext } from "./SomeContext";
import PdfViewer from "./PdfViewer";

const App = () => {
  const context = useContext(SomeContext);

  return (
    <div className="App">
      <div className="header">
        <span style={{ marginRight: "2rem" }}>
          React sample - <strong>{context.currentDocId}</strong> -{" "}
          {`[${context.counter}]`}
        </span>
        <span style={{ marginRight: "2rem" }}>
          <button onClick={context.toggle}>Toggle</button>
        </span>
        <span style={{ marginRight: "2rem" }}>
          <button onClick={context.increment}>Increment</button>
        </span>
      </div>
      <PdfViewer docId={context.currentDocId} />
    </div>
  );
};

export default App;
