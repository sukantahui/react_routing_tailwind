import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Math6 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Expression Evaluation & Operator Precedence
        </h2>

        <p className="text-slate-300 text-sm">
          C follows strict rules for evaluating expressions.  
          Operators with higher precedence are executed first.
        </p>

        {/* Example 1 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 1: Precedence</h3>

        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int result = 10 + 5 * 2;

    printf("Result = %d\\n", result); // 10 + (5 * 2) = 20

    return 0;
}
`}
        />

        {/* Example 2 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 2: Using Parentheses</h3>

        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int result = (10 + 5) * 2;

    printf("Result = %d\\n", result); // (10 + 5) = 15; 15 * 2 = 30

    return 0;
}
`}
        />

        {/* Teacher Tips */}
        <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/60">
          <h3 className="text-sky-300 font-semibold">Teacher’s Tip</h3>
          <p className="text-slate-300 text-sm">
            When confused, always use parentheses—they make expressions clearer and safer.
          </p>
        </div>

        {/* Points to Remember */}
        <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/60">
          <h3 className="text-purple-300 font-semibold">Points to Remember</h3>
          <ul className="list-disc pl-6 text-sm text-slate-300 space-y-1">
            <li><strong>Multiplication, division, modulus</strong> happen before addition & subtraction.</li>
            <li>Parentheses always have the highest priority.</li>
            <li>Complex expressions evaluate left to right (mostly).</li>
          </ul>
        </div>

      </div>
    );
  }
}
