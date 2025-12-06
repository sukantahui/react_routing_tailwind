import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import { ArrowUpRight } from "lucide-react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Single-line and Multi-line Comments
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Comments help document your code. They are ignored by the compiler 
          and exist only to help humans understand your logic.
        </p>

        <h3 className="text-slate-200 font-semibold text-lg">Types of Comments</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><strong>Single-line comment:</strong> <code>// comment text</code></li>
          <li>
            <strong>Multi-line comment:</strong> <code>/* comment */</code>
          </li>
        </ul>

        <EditableCCodeBlock
          language="c"
          initialCode={`#include <stdio.h>

int main() {
    // This is a single-line comment
    printf("Learning comments in C\\n");

    /* 
       This is a multi-line comment.
       Used for large explanations.
    */
    printf("Multi-line comment example\\n");

    return 0;
}`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          Comments should be meaningful and describe why something is done—not just what.
        </p>

      </div>
    );
  }
}
