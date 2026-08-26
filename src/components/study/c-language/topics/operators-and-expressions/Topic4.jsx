import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Math4 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Increment & Decrement Operators (++ and --)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Increment increases a variable by 1, and decrement decreases it by 1.  
          Both have **prefix** and **postfix** forms.
        </p>

        {/* Example 1 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 1: Prefix</h3>

        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int x = 5;

    printf("++x = %d\\n", ++x); // increments first, then prints

    return 0;
}
`}
        />

        {/* Example 2 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 2: Postfix</h3>

        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int y = 5;

    printf("y++ = %d\\n", y++); // prints first, increments later
    printf("After increment y = %d\\n", y);

    return 0;
}
`}
        />

        {/* Teacher Tips */}
        <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/60">
          <h3 className="text-sky-300 font-semibold">Teacher’s Tip</h3>
          <p className="text-slate-300 text-sm mt-1">
            Prefix (++x) is often more predictable in expressions than postfix (x++).  
            Use postfix only when needed.
          </p>
        </div>

        {/* Points to Remember */}
        <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/60">
          <h3 className="text-purple-300 font-semibold">Points to Remember</h3>
          <ul className="list-disc pl-6 text-sm text-slate-300">
            <li>Prefix updates value before use.</li>
            <li>Postfix updates value after use.</li>
            <li>Works only on variables, not on constants.</li>
          </ul>
        </div>

      </div>
    );
  }
}
