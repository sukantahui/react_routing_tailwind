import React, { useState, useEffect } from "react";
import ShellCodeBlock from "./ShellCodeBlock";

/**
 * Loads and displays Unix shell script (.sh) files safely
 * - Default: shows real script formatting
 * - Optional: show literal \n for teaching escapes
 */
export default function ShellFileLoader({
  fileModule,
  title = null,
  highlightLines = [],
  showEscapes = false,
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

    // OPTIONAL: show literal \n for teaching escape sequences
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
      console.error("Error loading shell script:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8 text-slate-400">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500 mx-auto mb-2"></div>
        Loading shell script...
      </div>
    );
  }

  return (
    <ShellCodeBlock
      code={code}
      title={title || "Shell Script"}
      highlightLines={highlightLines}
    />
  );
}
