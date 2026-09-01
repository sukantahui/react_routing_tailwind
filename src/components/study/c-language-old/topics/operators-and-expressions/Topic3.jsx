import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Math3 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Assignment & Compound Assignment Operators
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Assignment operators store values into variables.  
          Compound assignment operators perform an operation and assign the result at the same time.
        </p>

        {/* Example 1 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 1: Basic Assignment</h3>

        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int a = 10;
    int b = 5;

    a = b; // a becomes 5

    printf("a = %d\\n", a);

    return 0;
}
`}
        />

        {/* Example 2 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 2: Compound Assignment</h3>

        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int x = 10;

    x += 5; // x = x + 5
    x *= 2; // x = x * 2

    printf("x = %d\\n", x);

    return 0;
}
`}
        />

        {/* Teacher Tips */}
        <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/60">
          <h3 className="text-sky-300 font-semibold">Teacher’s Tip</h3>
          <p className="text-slate-300 text-sm mt-1">
            Use compound operators to make your code cleaner and faster.  
            Example: <code>x += 10</code> is preferred over <code>x = x + 10</code>.
          </p>
        </div>

        {/* Points to Remember */}
        <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/60">
          <h3 className="text-purple-300 font-semibold">Points to Remember</h3>
          <ul className="list-disc pl-6 text-sm text-slate-300 space-y-1">
            <li><code>=</code> assigns a value.</li>
            <li><code>+=, -=, *=, /=, %=</code> are compound operators.</li>
            <li>Compound assignment reduces code repetition.</li>
          </ul>
        </div>

      </div>
    );
  }
}
