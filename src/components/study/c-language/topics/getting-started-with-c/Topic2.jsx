import React, { Component } from "react";
import { ArrowUpRight } from "lucide-react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Installing GCC / Clang and Setting Up VS Code for C Programming
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Before writing C programs, you need a compiler.  
          The two most widely used compilers are:
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><strong>GCC</strong> (GNU Compiler Collection)</li>
          <li><strong>Clang</strong> (LLVM-based modern compiler)</li>
        </ul>

        <h3 className="text-lg text-slate-200 font-semibold">Installing on Windows</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Install GCC via <strong>MinGW-w64</strong> or <strong>MSYS2</strong>.
        </p>

        <EditableCodeBlock
          language="bash"
          initialCode={`pacman -S mingw-w64-ucrt-x86_64-gcc`}
        />

        <h3 className="text-lg text-slate-200 font-semibold">Installing on macOS</h3>
        <EditableCodeBlock
          language="bash"
          initialCode={`xcode-select --install`}
        />

        <h3 className="text-lg text-slate-200 font-semibold">Installing on Linux</h3>
        <EditableCodeBlock
          language="bash"
          initialCode={`sudo apt install build-essential`}
        />

        <h3 className="text-lg text-slate-200 font-semibold">Setting Up VS Code</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>Install VS Code</li>
          <li>Install the C/C++ extension by Microsoft</li>
          <li>Configure run tasks or use terminal inside VS Code</li>
        </ul>

        <p className="text-slate-300">
          After installation, you can compile C programs directly from VS Code.
        </p>

      </div>
    );
  }
}
