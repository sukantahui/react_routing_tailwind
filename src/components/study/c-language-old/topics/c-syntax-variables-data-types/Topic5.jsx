import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Basic Arithmetic Expressions
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          C supports arithmetic operations such as addition, subtraction,
          multiplication, division, and modulus.
        </p>

        <EditableCCodeBlock
          language="c"
          initialCode={`#include <stdio.h>

int main() {
    int a = 10, b = 3;

    printf("Sum = %d\\n", a + b);
    printf("Difference = %d\\n", a - b);
    printf("Product = %d\\n", a * b);
    printf("Quotient = %d\\n", a / b);
    printf("Remainder = %d\\n", a % b);

    return 0;
}`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          Note: integer division discards the decimal part.
        </p>

      </div>
    );
  }
}
