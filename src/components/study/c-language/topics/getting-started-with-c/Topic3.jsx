import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock"; 
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock"; 
import { ArrowUpRight } from "lucide-react";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Structure of a Basic C Program
        </h2>

        {/* Intro */}
        <p className="text-slate-300 text-sm leading-relaxed">
          Every C program follows a standard structure that includes:
          <strong> header files, main function, statements, and return value.</strong>
        </p>

        {/* Playground Button */}
        <a
          href="/play"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 flex items-center gap-2 font-semibold hover:text-sky-300 transition"
        >
          Try in Playground <ArrowUpRight size={18} />
        </a>

        {/* Code Example */}
        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}`}
        />

        {/* Breakdown */}
        <h3 className="text-lg text-slate-200 font-semibold">Program Breakdown</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>
            <code>#include &lt;stdio.h&gt;</code> → imports standard input/output functions
          </li>
          <li>
            <code>int main()</code> → entry point of every C program
          </li>
          <li>
            <code>printf()</code> → prints text to the screen
          </li>
          <li>
            <code>return 0;</code> → indicates successful program execution
          </li>
        </ul>

      </div>
    );
  }
}
