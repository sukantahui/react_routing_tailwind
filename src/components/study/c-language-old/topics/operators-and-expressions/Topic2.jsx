import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Math2 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Logical Operators (AND, OR, NOT)
        </h2>

        <p className="text-slate-300 text-sm">
          Logical operators combine or modify conditions.
        </p>

        {/* Example 1 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 1</h3>
        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int a = 5, b = 10;

    printf("a < b AND b > 5 = %d\\n", (a < b) && (b > 5));
    printf("a > b OR b == 10 = %d\\n", (a > b) || (b == 10));

    return 0;
}
`}
        />

        {/* Example 2 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 2</h3>
        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int x = 0;

    printf("NOT x = %d\\n", !x);

    return 0;
}
`}
        />

        {/* Teacher Tip */}
        <div className="border border-slate-700 p-4 rounded-xl bg-slate-800/60">
          <h3 className="text-sky-300 font-semibold">Teacher’s Tip</h3>
          <p className="text-slate-300 text-sm">
            <code>0</code> means false, any non-zero value means true.
          </p>
        </div>

        {/* Points */}
        <div className="border border-slate-700 p-4 rounded-xl bg-slate-800/60">
          <h3 className="text-purple-300 font-semibold">Points to Remember</h3>
          <ul className="list-disc pl-6 text-sm text-slate-300">
            <li><code>&&</code> stops evaluating if first condition is false.</li>
            <li><code>||</code> stops evaluating if first condition is true.</li>
          </ul>
        </div>

      </div>
    );
  }
}
