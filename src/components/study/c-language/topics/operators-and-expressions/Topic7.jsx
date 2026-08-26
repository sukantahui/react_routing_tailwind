import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Topic7 extends Component {
  render() {
    return (
      <div className="space-y-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-sky-300">
          Format Specifiers in C — Complete Explanation
        </h2>

        {/* Intro */}
        <p className="text-slate-300 text-sm leading-relaxed">
          In C programming, <strong>format specifiers</strong> are special symbols 
          used in <code>printf()</code> and <code>scanf()</code> to tell the compiler 
          what type of data you want to display or input.
          Without format specifiers, C will not understand how to interpret the variable.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          Format specifiers are essential because C is a <strong>strongly typed, low-level</strong> 
          language — you must explicitly specify the data type for input/output operations.
        </p>

        {/* Table of Common Specifiers */}
        <h3 className="text-xl font-semibold text-slate-200 mt-6">
          Commonly Used Format Specifiers
        </h3>

        <div className="bg-slate-800 p-4 rounded-xl text-slate-300 text-sm space-y-2 border border-slate-700">
          <p><strong>%d</strong> – Integer (int)</p>
          <p><strong>%f</strong> – Floating-point value (float)</p>
          <p><strong>%lf</strong> – Double (for scanf)</p>
          <p><strong>%c</strong> – Character</p>
          <p><strong>%s</strong> – String</p>
          <p><strong>%u</strong> – Unsigned integer</p>
          <p><strong>%x</strong> / <strong>%X</strong> – Hexadecimal value</p>
          <p><strong>%p</strong> – Address (pointer)</p>
        </div>

        {/* Example 1 */}
        <h3 className="text-lg font-semibold text-slate-200">
          Example 1 — Printing Different Data Types
        </h3>

        <EditableCCodeBlock
          initialCode={`
#include <stdio.h>

int main() {
    int age = 25;
    float price = 99.50;
    char grade = 'A';
    char name[] = "Sukanta";

    printf("Age: %d\\n", age);
    printf("Price: %f\\n", price);
    printf("Grade: %c\\n", grade);
    printf("Name: %s\\n", name);

    return 0;
}
`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          Each variable uses a different format specifier to print the correct value.
        </p>

        {/* Example 2 */}
        <h3 className="text-lg font-semibold text-slate-200">
          Example 2 — Using Width and Precision Modifiers
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Format specifiers can also control spacing and decimal places.
        </p>

        <EditableCCodeBlock
          initialCode={`
#include <stdio.h>

int main() {
    float value = 3.14159;

    printf("Default: %f\\n", value);
    printf("Two decimals: %.2f\\n", value);
    printf("Four decimals: %.4f\\n", value);
    printf("Width 10: %10.2f\\n", value);

    return 0;
}
`}
        />

        {/* Teacher's Tips */}
        <h3 className="text-xl font-semibold text-purple-300 mt-8">
          Teacher’s Tips 👨‍🏫
        </h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>
            Always match the correct format specifier with the variable type — 
            <strong>incorrect pairing causes undefined behavior</strong>.
          </li>
          <li>
            For <code>double</code> values in <code>scanf()</code>, always use 
            <strong>%lf</strong> instead of <strong>%f</strong>.
          </li>
          <li>
            Use precision modifiers like <code>%.2f</code> to format currency values.
          </li>
          <li>
            Format specifiers make debugging easier by showing internal values of your program.
          </li>
        </ul>

        {/* Points to Remember */}
        <h3 className="text-xl font-semibold text-green-300">
          Points to Remember ✨
        </h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><strong>%d</strong> is for integers only.</li>
          <li><strong>%f</strong> prints float and double (in printf).</li>
          <li><strong>%c</strong> prints a single character.</li>
          <li><strong>%s</strong> prints a string until a null terminator.</li>
          <li>Using the wrong specifier may lead to garbage output.</li>
          <li>You can control width and precision: <code>%10.2f</code>.</li>
        </ul>

        {/* Final Summary */}
        <p className="text-slate-300 text-sm leading-relaxed mt-4">
          Format specifiers help you interact with data in a predictable and structured way.
          Mastering them is essential for writing clean, readable, and professional C programs.
        </p>

      </div>
    );
  }
}
