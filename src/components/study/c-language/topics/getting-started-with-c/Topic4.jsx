import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Compiling and Running C Programs (Terminal + IDE)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          C programs are not executed directly.  
          They must be <strong>compiled</strong> into machine code first.
        </p>

        <h3 className="text-lg text-slate-200 font-semibold">Compiling Using GCC</h3>

        <EditableCCodeBlock
          language="c"
          initialCode={
            `gcc hello.c -o hello
./hello`
          }
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          <code>gcc hello.c -o hello</code> compiles the program.  
          <code>./hello</code> runs the program.
        </p>

        <h3 className="text-lg text-slate-200 font-semibold">Running from VS Code</h3>
        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>Open terminal inside VS Code</li>
          <li>Run the same gcc command</li>
          <li>Or use a Run Task (.vscode/tasks.json)</li>
        </ul>

      </div>
    );
  }
}
