import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Using Constants with const and #define
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Constants store values that should NOT change during program execution.
          C provides two ways to create constants: <code>const</code> and <code>#define</code>.
        </p>

        <EditableCCodeBlock
          language="c"
          initialCode={`#include <stdio.h>

#define PI 3.1416  // Macro constant

int main() {
    const int MAX = 100; // Typed constant

    printf("PI = %f\\n", PI);
    printf("MAX = %d\\n", MAX);

    return 0;
}`}
        />

        <h3 className="text-lg text-slate-200 font-semibold">Differences</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-2">
          <li><strong>#define</strong> is processed by the preprocessor.</li>
          <li><strong>const</strong> has a data type and appears in memory.</li>
          <li><strong>const</strong> supports debugging; macros do not.</li>
        </ul>
      </div>
    );
  }
}
