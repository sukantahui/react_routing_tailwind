import React, { Component } from "react";
import Editor from "@monaco-editor/react";

export default class EditableCodeBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      consoleOutput: [],
      editorHeight: 200, // will auto-grow
    };

    this.editorRef = null;
  }

  // ------------------------------------------
  // EDITOR MOUNT + AUTO HEIGHT HANDLER
  // ------------------------------------------
  handleEditorDidMount = (editor) => {
    this.editorRef = editor;

    // Set initial height based on content
    this.updateEditorHeight();

    // Update height whenever content changes
    editor.onDidContentSizeChange(() => {
      this.updateEditorHeight();
    });
  };

  updateEditorHeight = () => {
    if (!this.editorRef) return;

    const contentHeight = this.editorRef.getContentHeight();

    // Ensure a reasonable minimum height
    const minHeight = 160;
    const newHeight = Math.max(contentHeight, minHeight);

    if (newHeight !== this.state.editorHeight) {
      this.setState({ editorHeight: newHeight }, () => {
        // tell monaco to re-layout with new height
        this.editorRef.layout();
      });
    }
  };

  // ------------------------------------------
  // FORMAT ANY VALUE FOR CLEAN CONSOLE OUTPUT
  // ------------------------------------------
  formatValue = (value) => {
    try {
      if (typeof value === "object") {
        return JSON.stringify(value, null, 2); // Pretty JSON
      }
      return String(value);
    } catch {
      return String(value);
    }
  };

  // ------------------------------------------
  // RUN CODE WITH CAPTURED CONSOLE.LOG + ERROR
  // ------------------------------------------
  runCode = () => {
    this.setState({ error: "", consoleOutput: [] });

    const captured = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      const formatted = args.map(this.formatValue).join(" ");
      captured.push({ type: "log", message: formatted });
      originalLog(...args);
    };

    console.error = (...args) => {
      const formatted = args.map(this.formatValue).join(" ");
      captured.push({ type: "error", message: formatted });
      originalError(...args);
    };

    try {
      // eslint-disable-next-line no-eval
      eval(this.editorRef.getValue());
      this.setState({ consoleOutput: captured });
    } catch (err) {
      this.setState({ error: "Runtime Error: " + err.message });
    }

    console.log = originalLog;
    console.error = originalError;
  };

  // ------------------------------------------
  // FORMAT CODE (USING GLOBAL PRETTIER)
  // ------------------------------------------
  formatCode = () => {
    try {
      const prettier = window.prettier;
      const babel = window.prettierPlugins.babel;

      const formatted = prettier.format(this.editorRef.getValue(), {
        parser: "babel",
        plugins: [babel],
      });

      this.editorRef.setValue(formatted);
      this.setState({ error: "" });
      this.updateEditorHeight(); // re-measure after formatting
    } catch (err) {
      this.setState({ error: "Prettier Error: " + err.message });
    }
  };

  // ------------------------------------------
  // COPY CODE TO CLIPBOARD
  // ------------------------------------------
  copyCode = () => {
    if (!this.editorRef) return;

    navigator.clipboard
      .writeText(this.editorRef.getValue())
      .then(() => alert("Copied!"));
  };

  render() {
    const { initialCode, language } = this.props;
    const { error, consoleOutput, editorHeight } = this.state;

    return (
      <div className="border border-slate-700 rounded-xl bg-slate-900 overflow-hidden">
        {/* --- HEADER BUTTONS --- */}
        <div className="flex items-center justify-between bg-slate-800 px-3 py-2 text-xs">
          <span className="text-slate-400 font-semibold">Editable Code</span>

          <div className="flex gap-2">
            <button
              onClick={this.formatCode}
              className="px-2 py-1 rounded bg-sky-600 text-white hover:bg-sky-700"
            >
              Format
            </button>

            <button
              onClick={this.runCode}
              className="px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Run
            </button>

            <button
              onClick={this.copyCode}
              className="px-2 py-1 rounded bg-slate-600 text-white hover:bg-slate-700"
            >
              Copy
            </button>
          </div>
        </div>

        {/* --- MONACO EDITOR (AUTO HEIGHT) --- */}
        <Editor
          height={editorHeight}
          defaultLanguage={language}
          defaultValue={initialCode}
          theme="vs-dark"
          onMount={this.handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: "hidden", // hide internal vertical scrollbar
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          }}
        />

        {/* --- ERROR PANEL --- */}
        {error && (
          <div className="bg-red-900/40 border-t border-red-600 px-3 py-2 text-red-300 text-xs">
            ⚠ {error}
          </div>
        )}

        {/* --- CONSOLE OUTPUT PANEL --- */}
        <div className="bg-black border-t border-slate-700 px-3 py-2 h-40 overflow-auto text-xs">
          <p className="text-slate-400 mb-1">Console Output:</p>

          {consoleOutput.length === 0 && (
            <p className="text-slate-600">No output yet.</p>
          )}

          {consoleOutput.map((item, index) => (
            <pre
              key={index}
              className={`whitespace-pre-wrap ${item.type === "error" ? "text-red-400" : "text-emerald-300"
                }`}
            >
              {item.message}
            </pre>
          ))}
        </div>
      </div>
    );
  }
}

EditableCodeBlock.defaultProps = {
  initialCode: "",
  language: "javascript",
};
