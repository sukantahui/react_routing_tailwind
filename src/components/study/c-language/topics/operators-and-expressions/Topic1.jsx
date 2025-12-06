import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Math1 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Relational Operators in C
        </h2>

        <p className="text-slate-300 text-sm">
          Relational operators compare two values and return either 
          <code>1</code> (true) or <code>0</code> (false).
        </p>

        {/* Example 1 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 1</h3>
        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int a = 10, b = 20;

    printf("a < b = %d\\n", a < b);
    printf("a > b = %d\\n", a > b);
    printf("a == b = %d\\n", a == b);

    return 0;
}
`}
        />

        {/* Example 2 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 2</h3>
        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int x = 5, y = 5;

    printf("x >= y = %d\\n", x >= y);
    printf("x != y = %d\\n", x != y);

    return 0;
}
`}
        />

        {/* Teacher Tips */}
        <div className="border border-slate-700 p-4 rounded-xl bg-slate-800/60">
          <h3 className="text-sky-300 font-semibold">Teacher’s Tip</h3>
          <p className="text-slate-300 text-sm">
            For comparisons, <code>==</code> is equality, while <code>=</code> is assignment.
          </p>
        </div>

        {/* Points */}
        <div className="border border-slate-700 p-4 rounded-xl bg-slate-800/60">
          <h3 className="text-purple-300 font-semibold">Points to Remember</h3>
          <ul className="list-disc pl-6 text-sm text-slate-300">
            <li>All relational expressions return either 0 or 1.</li>
            <li>Comparison does not change variable values.</li>
          </ul>
        </div>
      </div>
    );
  }
}
