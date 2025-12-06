import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Topic6 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Implicit & Explicit Type Conversion and Type Promotion
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          C performs automatic (implicit) conversions when mixing types in 
          expressions, and also allows manual (explicit) casting.
        </p>

        <EditableCCodeBlock
          language="c"
          initialCode={`#include <stdio.h>

int main() {
    int a = 5;
    double b = 2.5;

    double result1 = a + b;  // implicit conversion of int → double
    int result2 = (int)b;    // explicit conversion (casting)

    printf("Implicit result: %lf\\n", result1);
    printf("Explicit cast: %d\\n", result2);

    return 0;
}`}
        />

        <h3 className="text-lg text-slate-200 font-semibold">
          Type Promotion Rules
        </h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm">
          <li>Smaller types promote to larger types (char → int)</li>
          <li>int promotes to float if mixed</li>
          <li>float promotes to double if mixed</li>
        </ul>

      </div>
    );
  }
}
