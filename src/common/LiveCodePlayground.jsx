import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function LiveCodePlayground({
  initialHTML = "<h1 id='title'>Hello Baba!</h1>",
  initialCSS = "body { font-family: system-ui; padding: 20px; }",
  initialJS = `
function changeText() {
  document.getElementById('title').innerText = 'Changed Successfully!';
}
`
}) {
  const [html, setHtml] = useState(initialHTML);
  const [css, setCss] = useState(initialCSS);
  const [js, setJs] = useState(initialJS);

  const iframeRef = useRef(null);

  // When parent provides new props → update code
  useEffect(() => setHtml(initialHTML), [initialHTML]);
  useEffect(() => setCss(initialCSS), [initialCSS]);
  useEffect(() => setJs(initialJS), [initialJS]);

  const generateDocument = () => `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(generateDocument());
    doc.close();
  }, [html, css, js]);

  return (
    <div className="w-full border border-slate-700 rounded-xl bg-slate-900 p-4">
      <h2 className="text-sky-400 font-bold mb-2 text-xl">Live Code Playground</h2>

      {/* Editors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        <div>
          <p className="text-slate-300 text-sm mb-1">HTML</p>
          <Editor
            height="260px"
            language="html"
            theme="vs-dark"
            value={html}
            onChange={(v) => setHtml(v)}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
        </div>

        <div>
          <p className="text-slate-300 text-sm mb-1">CSS</p>
          <Editor
            height="260px"
            language="css"
            theme="vs-dark"
            value={css}
            onChange={(v) => setCss(v)}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
        </div>

        <div>
          <p className="text-slate-300 text-sm mb-1">JavaScript</p>
          <Editor
            height="260px"
            language="javascript"
            theme="vs-dark"
            value={js}
            onChange={(v) => setJs(v)}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
        </div>

      </div>

      {/* Live Preview */}
      <div className="mt-4 border border-slate-700 rounded-lg overflow-hidden bg-black">
        <iframe
          ref={iframeRef}
          title="Live Preview"
          className="w-full h-[350px] bg-white"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </div>
    </div>
  );
}
