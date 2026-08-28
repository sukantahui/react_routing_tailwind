import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl md:text-2xl text-sky-300 font-semibold">
        Literals & Data Types in JavaScript
      </h2>

      {/* Intro */}
      <p className="text-slate-300 text-sm leading-relaxed">
        A <strong>literal</strong> is a fixed value written directly in your code.
        JavaScript supports several types of literals such as numbers, strings,
        booleans, arrays, objects, and more.  
        Data types help JavaScript understand what kind of value you're working with.
      </p>

      {/* Section: Number Literals */}
      <h3 className="text-lg text-slate-200 font-semibold">🟦 Number Literals</h3>

      <p className="text-slate-300 text-sm">
        JavaScript uses a single number type for integers and decimals.
      </p>

      <CodeBlock
        language="javascript"
        code={`let age = 25;       // integer
let price = 199.99; // decimal
let hex = 0xff;     // hexadecimal
let binary = 0b1010; // binary (10)
let octal = 0o17;    // octal (15)`}
      />

      {/* Section: String Literals */}
      <h3 className="text-lg text-slate-200 font-semibold">🟩 String Literals</h3>

      <p className="text-slate-300 text-sm">
        Strings store text. You can use single quotes, double quotes, or backticks.
      </p>

      <CodeBlock
        language="javascript"
        code={`let name = "Sukanta Hui";      
let institute = 'Coder & AccoTax';
let message = \`Welcome, \${name}!\`; // template literal`}
      />

      {/* Section: Boolean */}
      <h3 className="text-lg text-slate-200 font-semibold">🟨 Boolean Literal</h3>

      <p className="text-slate-300 text-sm">
        Represents truth values: <code>true</code> or <code>false</code>.
      </p>

      <CodeBlock
        language="javascript"
        code={`let isCodingFun = true;
let isRainy = false;`}
      />

      {/* Section: Null + Undefined */}
      <h3 className="text-lg text-slate-200 font-semibold">⬛ null & undefined</h3>

      <p className="text-slate-300 text-sm">
        Both represent absence of value, but used differently:
      </p>

      <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
        <li><strong>undefined</strong> → variable declared but not assigned</li>
        <li><strong>null</strong> → intentionally empty value</li>
      </ul>

      <CodeBlock
        language="javascript"
        code={`let a;
console.log(a); // undefined

let b = null;
console.log(b); // null`}
      />

      {/* Section: Object Literals */}
      <h3 className="text-lg text-slate-200 font-semibold">🟪 Object Literal</h3>

      <p className="text-slate-300 text-sm">
        Objects store data in key–value pairs.
      </p>

      <CodeBlock
        language="javascript"
        code={`let student = {
  name: "Ritaja",
  age: 14,
  city: "Barrackpore"
};

console.log(student.name);`}
      />

      {/* Section: Array Literal */}
      <h3 className="text-lg text-slate-200 font-semibold">🟫 Array Literal</h3>

      <CodeBlock
        language="javascript"
        code={`let marks = [85, 90, 95];
let students = ["Mounita", "Devangshu", "Kaustav"];

console.log(students[1]); // Devangshu`}
      />

      {/* Section: Data Type Table */}
      <h3 className="text-lg text-slate-200 font-semibold">📊 JavaScript Data Types</h3>

      <p className="text-slate-300 text-sm">JavaScript has 8 data types:</p>

      <div className="text-sm text-slate-300">
        <table className="w-full border border-slate-700 text-left text-xs md:text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-2 border border-slate-700">Type</th>
              <th className="p-2 border border-slate-700">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border border-slate-700">Number</td><td className="p-2 border">10, 3.14</td></tr>
            <tr><td className="p-2 border border-slate-700">String</td><td className="p-2 border">"Hello"</td></tr>
            <tr><td className="p-2 border border-slate-700">Boolean</td><td className="p-2 border">true</td></tr>
            <tr><td className="p-2 border border-slate-700">Undefined</td><td className="p-2 border">let x;</td></tr>
            <tr><td className="p-2 border border-slate-700">Null</td><td className="p-2 border">null</td></tr>
            <tr><td className="p-2 border border-slate-700">Object</td><td className="p-2 border">{`{ name: "Ritaja" }`}</td></tr>
            <tr><td className="p-2 border border-slate-700">Array</td><td className="p-2 border">[1, 2, 3]</td></tr>
            <tr><td className="p-2 border border-slate-700">BigInt</td><td className="p-2 border">123n</td></tr>
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h3 className="text-lg text-slate-200 font-semibold">⭐ Best Practices</h3>

      <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
        <li>Use <code>let</code> and <code>const</code> for variable declarations.</li>
        <li>Use <code>null</code> intentionally, avoid accidental <code>undefined</code>.</li>
        <li>Prefer arrays for lists and objects for structured data.</li>
        <li>Avoid mixing data types unnecessarily.</li>
      </ul>

      {/* Common mistakes */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ❗ Common Mistakes
      </h3>

      <ul className="list-disc pl-6 text-red-300 text-sm space-y-1">
        <li>Using strings for numeric operations</li>
        <li>Confusing <code>null</code> with <code>undefined</code></li>
        <li>Creating objects when arrays are needed, and vice versa</li>
      </ul>

      {/* Mini Practice */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ✏ Mini Practice Task
      </h3>

      <p className="text-slate-300 text-sm">Identify the literal type of each value:</p>

      <CodeBlock
        language="javascript"
        code={`"Sukanta"
89
true
{ city: "Kolkata" }
[1, 2, 3]
null`}
      />

      <p className="text-slate-400 text-xs italic">
        Try typing these in the playground and check <code>typeof</code>.
      </p>

    </div>
  );
}
