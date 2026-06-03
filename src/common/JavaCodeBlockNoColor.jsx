import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";

// Use a grayscale theme
import "prismjs/themes/prism.css"; // classic black & white
import "prismjs/components/prism-java";

export default function JavaCodeBlockNoColor({
  code = "",
  highlightLines = [],
  title = "Java Code (BlueJ)"
}) {
  const [lines, setLines] = useState([]);
  const blockRef = useRef(null);

  useEffect(() => {
    const highlighted = Prism.highlight(code, Prism.languages.java, "java");
    setLines(highlighted.split("\n"));
  }, [code]);

  return (
    <div
      ref={blockRef}
      className="my-5 rounded-2xl overflow-hidden bg-white border border-gray-300 shadow-md"
    >

      {/* Code Area – without line numbers */}
      <div className="flex text-sm leading-6 font-mono overflow-auto">
        <pre className="flex-1 px-4 py-3 whitespace-pre">
          <code className="language-java">
            {lines.map((line, i) => (
              <div
                key={i}
                className={
                  highlightLines.includes(i + 1)
                    ? "bg-gray-200 border-l-2 border-gray-800 pl-3"
                    : "pl-3"
                }
                dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
              />
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}