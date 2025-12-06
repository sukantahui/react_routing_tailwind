import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Math5 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Formatted Input with scanf()
        </h2>

        <p className="text-slate-300 text-sm">
          <code>scanf()</code> reads user input in C.  
          It requires a **format specifier** and a **memory address (&)**.
        </p>

        {/* Example 1 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 1: Reading Integer</h3>

        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int age;

    printf("Enter your age: ");
    scanf("%d", &age);

    printf("You entered: %d\\n", age);

    return 0;
}
`}
        />

        {/* Example 2 */}
        <h3 className="text-lg text-slate-200 font-semibold">Example 2: Reading Multiple Values</h3>

        <EditableCCodeBlock
          initialCode={`#include <stdio.h>

int main() {
    int a, b;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    printf("Sum = %d\\n", a + b);

    return 0;
}
`}
        />

        {/* Teacher Tips */}
        <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/60">
          <h3 className="text-sky-300 font-semibold">Teacher’s Tip</h3>
          <p className="text-slate-300 text-sm">
            Never forget the <strong>&</strong> symbol in scanf.  
            It gives the memory address where the value will be stored.
          </p>
        </div>

        {/* Points to Remember */}
        <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/60">
          <h3 className="text-purple-300 font-semibold">Points to Remember</h3>
          <ul className="list-disc pl-6 text-sm text-slate-300 space-y-1">
            <li><code>scanf()</code> needs format specifiers like <code>%d %f %c %s</code>.</li>
            <li><code>&variable</code> stores input inside memory.</li>
            <li>Multiple inputs must match the number of specifiers.</li>
          </ul>
        </div>

      </div>
    );
  }
}
