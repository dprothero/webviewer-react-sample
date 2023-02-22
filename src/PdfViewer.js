import React, { useRef, useEffect, useState, useContext } from "react";
import "./App.css";
import { SomeContext } from "./SomeContext";

const PdfViewer = ({ docId }) => {
  const [instance, setInstance] = useState(null);
  const viewer = useRef(null);
  const { counter } = useContext(SomeContext);

  useEffect(() => {
    if (instance) return;

    import("@pdftron/webviewer").then(() => {
      if (document.querySelector(".webviewer").childElementCount > 0) return;

      window
        .WebViewer(
          {
            path: "/webviewer/lib",
          },
          viewer.current
        )
        .then((instance) => {
          setInstance(instance);
        });
    });
  }, [instance]);

  useEffect(() => {
    if (!instance) return;

    const { Actions, docViewer } = instance;
    if (Actions.GoTo.prototype.onTriggeredPatched) return;

    const oldOnTriggered = Actions.GoTo.prototype.onTriggered;
    Actions.GoTo.prototype.onTriggered = function(target, event, ...rest) {
      if (target === docViewer.getDocument() && event.name === "Open") {
        return;
      }

      console.log("GoTo triggered");
      console.log("event = ", event);
      console.log("target = ", target);
      console.log("rest of the args = ", rest);
      oldOnTriggered.apply(this, target, event, ...rest);
    };
    Actions.GoTo.prototype.onTriggeredPatched = true;
  }, [instance]);

  useEffect(() => {
    if (!instance) return;

    const { documentViewer } = instance.Core;

    const currentViewerDoc = documentViewer.getDocument();
    if (currentViewerDoc && currentViewerDoc.getDocumentId() === docId) return;

    const documentLoadedHandler = () => {
      console.log("document loaded - " + counter);
      documentViewer.setCurrentPage(3, false);
    };
    documentViewer.addEventListener("documentLoaded", documentLoadedHandler);
    documentViewer.loadDocument(docId, { docId });

    return () => {
      documentViewer.removeEventListener(
        "documentLoaded",
        documentLoadedHandler
      );
    };
  }, [instance, counter]);

  return <div className="webviewer" ref={viewer}></div>;
};

export default PdfViewer;
