import React, { useState, useEffect } from "react";
import CodeBlock from "./CodeBlock";
import EditableCCodeBlock from "./EditableCCodeBlock";

/**
 * CFileLoader Component
 * Imports raw C files via Vite raw-loader (?raw) or string content
 * and renders them with code highlighting and interactive editing.
 */
export default function CFileLoader({ 
  fileModule, 
  title = "main.c",
  highlightLines = [],
  editable = false
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fileModule) {
      setLoading(false);
      return;
    }

    if (typeof fileModule === "string") {
      setCode(fileModule);
      setLoading(false);
    } else if (fileModule.then) {
      fileModule.then((res) => {
        setCode(res.default || res);
        setLoading(false);
      }).catch((err) => {
        console.error("Error loading C file module:", err);
        setLoading(false);
      });
    } else if (fileModule.default) {
      setCode(fileModule.default);
      setLoading(false);
    }
  }, [fileModule]);

  if (loading) {
    return (
      <div className="text-center py-8 text-slate-400">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500 mx-auto mb-2"></div>
        Loading C source code...
      </div>
    );
  }

  if (editable) {
    return <EditableCCodeBlock code={code} initialCode={code} />;
  }

  return (
    <CodeBlock
      code={code}
      language="c"
      fileName={title}
      showRun={false}
    />
  );
}
