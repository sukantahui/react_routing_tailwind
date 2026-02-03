import React, { useState, useEffect } from "react";
import PythonCodeBlock from "./PythonCodeBlock";

/**
 * Loads and displays Python (.py) files safely
 * - Default: shows real code formatting
 * - Optional: show literal \n for teaching strings
 */
export default function PythonFileLoader({
  fileModule,
  title = null,
  highlightLines = [],
  showEscapes = false, // 👈 NEW OPTION
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fileModule) {
      setLoading(false);
      return;
    }

    if (typeof fileModule === "string") {
      setCode(processCode(fileModule));
      setLoading(false);
    } else {
      loadFileContent(fileModule);
    }
  }, [fileModule, showEscapes]);

  function processCode(text) {
    // Normalize Windows / Unix line endings
    let normalized = text.replace(/\r\n/g, "\n");

    // OPTIONAL: show literal \n (ONLY for string-escape lessons)
    if (showEscapes) {
      return normalized.replace(/\n/g, "\\n\n");
    }

    return normalized;
  }

  async function loadFileContent(module) {
    try {
      setLoading(true);

      if (module?.then) {
        const result = await module;
        if (result?.default) {
          setCode(processCode(result.default));
        }
      } else if (module?.default) {
        setCode(processCode(module.default));
      }
    } catch (err) {
      console.error("Error loading Python module:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8 text-slate-400">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500 mx-auto mb-2"></div>
        Loading Python code...
      </div>
    );
  }

  return (
    <PythonCodeBlock
      code={code}
      title={title || "Python File"}
      highlightLines={highlightLines}
    />
  );
}
