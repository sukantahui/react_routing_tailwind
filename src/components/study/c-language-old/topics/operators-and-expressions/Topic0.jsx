import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Math0 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Arithmetic Operators in C
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Arithmetic operators are used to perform basic mathematical operations 
          such as addition, subtraction, multiplication, division, and modulus. 
          These operators work with numeric types like <code>int</code>, <code>float</code>, 
          <code>double</code>.
        </p>

        {/* Example 1 */}
        <h3 className="text-lg font-semibold text-slate-200">Example 1: Basic Arithmetic</h3>
        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int a = 15, b = 4;

    printf("Addition: %d\\n", a + b);
    printf("Subtraction: %d\\n", a - b);
    printf("Multiplication: %d\\n", a * b);
    printf("Division: %d\\n", a / b);
    printf("Modulus: %d\\n", a % b);

    return 0;
}
`}
        />

        {/* Example 2 */}
        <h3 className="text-lg font-semibold text-slate-200">
          Example 2: Arithmetic with Float
        </h3>
        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    float x = 7.5, y = 2.0;

    printf("x / y = %.2f\\n", x / y);
    printf("x * y = %.2f\\n", x * y);

    return 0;
}
`}
        />

        {/* Teacher Tips */}
        <div className="border border-slate-700 p-4 rounded-xl bg-slate-800/60">
          <h3 className="text-sky-300 font-semibold">Teacher’s Tip</h3>
          <p className="text-slate-300 text-sm mt-1">
            Division between two integers always produces an integer result.  
            Use <code>float</code> or <code>double</code> to get decimal values.
          </p>
        </div>

        {/* Points to Remember */}
        <div className="border border-slate-700 p-4 rounded-xl bg-slate-800/60">
          <h3 className="text-purple-300 font-semibold">Points to Remember</h3>
          <ul className="list-disc pl-6 text-sm text-slate-300 space-y-1">
            <li><code>%</code> (modulus) works only with integers.</li>
            <li>Integer division discards the decimal portion.</li>
            <li>Operator precedence affects calculations.</li>
          </ul>
        </div>
      </div>
    );
  }
}
