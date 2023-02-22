import React, { createContext, useCallback, useState } from "react";

const availablePdfs = [
  "/files/sample.pdf",
  "/files/PDFTRON_about.pdf",
  "/files/Apryse.pdf",
];

export const SomeContext = createContext({
  currentDocId: availablePdfs[0],
  toggle: () => {},
  increment: () => {},
});

export const SomeContextProvider = ({ children }) => {
  const [docId, setDocId] = useState(availablePdfs[0]);
  const [counter, setCounter] = useState(0);

  const toggle = useCallback(() => {
    setDocId((prevDocId) => {
      const index = availablePdfs.indexOf(prevDocId);
      return availablePdfs[(index + 1) % availablePdfs.length];
    });
    setCounter((prevCounter) => prevCounter + 1);
  }, [setCounter, setDocId]);

  const increment = useCallback(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, [setCounter]);

  return (
    <SomeContext.Provider
      value={{ currentDocId: docId, toggle, counter, increment }}
    >
      {children}
    </SomeContext.Provider>
  );
};

export default SomeContextProvider;
