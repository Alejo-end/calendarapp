import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const README_PATH =
  "https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/README.md";

function Readme() {
  const [md, setMd] = useState(null);

  useEffect(() => {
    fetch(README_PATH, { mode: "cors" })
      .then((response) => response.text())
      .then((response) => {
        setMd(response);
      });
  }, []);

  return (
    <div className="readme">
      <ReactMarkdown allowDangerousHtml children={md} />
      {md && (
        <>
          <h2>Use our existing route to create you calendar!</h2>
        </>
      )}
    </div>
  );
}

export default Readme;
