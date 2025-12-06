import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import { ArrowUpRight } from "lucide-react";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Declaring Variables: int, float, double, char
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Variables store data in memory. In C, every variable must have a type 
          that decides how much memory it uses and what kind of values it can hold.
        </p>

        <EditableCCodeBlock
          language="c"
          initialCode={`#include <stdio.h>

int main() {
    int age = 25;
    float price = 19.99f;
    double salary = 55000.75;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("Price: %f\\n", price);
    printf("Salary: %lf\\n", salary);
    printf("Grade: %c\\n", grade);

    return 0;
}`}
        />

        <h3 className="text-lg text-slate-200 font-semibold">
          Basic Data Types in C
        </h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><strong>int</strong> → whole numbers (4 bytes)</li>
          <li><strong>float</strong> → decimal numbers (4 bytes)</li>
          <li><strong>double</strong> → double-precision decimals (8 bytes)</li>
          <li><strong>char</strong> → characters (1 byte)</li>
        </ul>

      </div>
    );
  }
}
