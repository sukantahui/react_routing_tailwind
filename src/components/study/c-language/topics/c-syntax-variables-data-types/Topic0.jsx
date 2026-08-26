import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import { ArrowUpRight } from "lucide-react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Program Structure and Indentation Style
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Good C programs follow a clean structure and consistent indentation. 
          This improves readability, reduces bugs, and makes your code easier to maintain.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          Every C program contains header files, the <code>main()</code> function, 
          declarations, statements, and a return value. Proper indentation helps 
          visually represent nesting and program flow.
        </p>

        <EditableCCodeBlock
          language="c"
          initialCode={`#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          In this example, indentation clearly shows which statements belong inside 
          <code>main()</code>. Most C programmers use 4 spaces for indentation.
        </p>

        <hr className="border-slate-700" />

        <h3 className="text-lg text-slate-200 font-semibold">Why Indentation Matters</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>Makes code cleaner and easier to understand.</li>
          <li>Shows logical structure of blocks and scopes.</li>
          <li>Reduces syntax mistakes and mismatched braces.</li>
          <li>Maintains professional coding standards.</li>
        </ul>

      </div>
    );
  }
}
