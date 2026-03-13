import React, { useState, useEffect } from "react";
import JavaCodeBlock from "./JavaCodeBlock"; // Adjust path as needed

/**
 * Component to display Java files from your project
 * Usage: <JavaFileViewer filePath="/path/to/YourClass.java" />
 */
export default function JavaFileViewer({
  filePath,
  title = null,
  highlightLines = [],
  defaultTitle = "Java Code (BlueJ)"
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!filePath) {
      setError("No file path provided");
      setLoading(false);
      return;
    }

    // Extract filename from path for title
    const pathParts = filePath.split("/");
    const name = pathParts[pathParts.length - 1];
    setFileName(name);

    fetchFileContent(filePath);
  }, [filePath]);

  async function fetchFileContent(path) {
    try {
      setLoading(true);
      setError(null);
      
      // Method 1: Fetch from public folder
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.status} ${response.statusText}`);
      }
      
      const text = await response.text();
      setCode(text);
    } catch (err) {
      setError(err.message);
      console.error("Error loading Java file:", err);
    } finally {
      setLoading(false);
    }
  }

  // Handle loading state
  if (loading) {
    return (
      <div className="my-5 p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-slate-800 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500 mb-3"></div>
        <p className="text-slate-400">Loading Java file...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="my-5 p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-red-500/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <h3 className="text-red-400 font-semibold">Error Loading File</h3>
        </div>
        <p className="text-slate-300 mb-4">{error}</p>
        <p className="text-sm text-slate-500">
          Make sure the file exists at: <code className="bg-slate-800 px-2 py-1 rounded">{filePath}</code>
        </p>
      </div>
    );
  }

  // Display the code
  return (
    <JavaCodeBlock
      code={code}
      title={title || fileName || defaultTitle}
      highlightLines={highlightLines}
    />
  );
}