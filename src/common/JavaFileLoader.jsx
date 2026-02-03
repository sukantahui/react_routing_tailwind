import React, { useState, useEffect } from "react";
import JavaCodeBlock from "./JavaCodeBlock";

/**
 * Component that imports Java files directly using ES6 imports
 * Note: Requires file-loader or raw-loader configuration
 */
export default function JavaFileLoader({ 
  fileModule, 
  title = null,
  highlightLines = [] 
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
    } else {
      // Handle dynamic import or require
      loadFileContent(fileModule);
    }
  }, [fileModule]);

  async function loadFileContent(module) {
    try {
      setLoading(true);
      
      // If it's a promise (dynamic import)
      if (module.then) {
        const result = await module;
        if (result.default) {
          setCode(result.default);
        }
      } 
      // If it's already loaded
      else if (module.default) {
        setCode(module.default);
      }
    } catch (err) {
      console.error("Error loading Java module:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8 text-slate-400">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500 mx-auto mb-2"></div>
        Loading...
      </div>
    );
  }

  return (
    <JavaCodeBlock
      code={code}
      title={title || "Java File"}
      highlightLines={highlightLines}
    />
  );
}