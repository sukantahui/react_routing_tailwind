import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6">
        
        <h2 className="text-xl font-semibold text-sky-300">
          Format Specifiers with printf
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Format specifiers tell <code>printf()</code> how to print different 
          types of data.
        </p>

        <EditableCCodeBlock
          language="c"
          initialCode={`#include <stdio.h>

int main() {
    int age = 20;
    float percent = 91.5;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("Percentage: %f\\n", percent);
    printf("Grade: %c\\n", grade);

    return 0;
}`}
        />

        <h3 className="text-lg text-slate-200 font-semibold">Common Specifiers</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm">
          <li><code>%d</code> → integer</li>
          <li><code>%f</code> → float</li>
          <li><code>%lf</code> → double</li>
          <li><code>%c</code> → character</li>
          <li><code>%s</code> → string</li>
        </ul>

      </div>
    );
  }
}
