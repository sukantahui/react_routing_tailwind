import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import { ArrowUpRight } from "lucide-react";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Using printf() for Output and Debug Messages
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          <code>printf()</code> is the most commonly used function in C.
          It prints text, numbers, variables, and debug information.
        </p>

        <a href="/play" target="_blank" className="text-sky-400 flex items-center gap-2">
          Try in Playground <ArrowUpRight size={18} />
        </a>

        <EditableCCodeBlock
          language="c"
          initialCode={
            `#include <stdio.h>

int main() {
    int a = 10;
    printf("Value of a: %d\\n", a);
    printf("Debug: Program reached here!\\n");
    return 0;
}`
          }
        />

        <h3 className="text-lg text-slate-200 font-semibold">Common Format Specifiers</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm">
          <li><code>%d</code> → integer</li>
          <li><code>%f</code> → float</li>
          <li><code>%c</code> → char</li>
          <li><code>%s</code> → string</li>
        </ul>

        <p className="text-slate-400 text-sm">
          <strong>printf()</strong> is also useful for debugging because it helps
          you track variable values and understand program flow.
        </p>

      </div>
    );
  }
}
