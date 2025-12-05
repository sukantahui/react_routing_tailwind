import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-sky-300">
        Statements, Semicolons, Indentation & Code Style
      </h2>

      {/* Description */}
      <p className="text-slate-300 text-sm leading-relaxed">
        JavaScript programs are made of <strong>statements</strong> — individual
        instructions that run one after another. Clean and consistent formatting 
        makes your code easier to read, debug, and maintain.  
        This topic explains the foundation of writing clean JavaScript code:
        <strong> statements, semicolons, indentation, and coding style.</strong>
      </p>

      {/* Section 1 */}
      <h3 className="text-lg font-semibold text-slate-200">
        🟦 What is a Statement?
      </h3>

      <p className="text-slate-300 text-sm">
        A statement is a complete instruction that the JavaScript engine executes.
        Think of statements as sentences in English — each ending with proper punctuation.
      </p>

      <CodeBlock
        language="javascript"
        code={`
let age = 20;       // Statement
age++;              // Statement
console.log(age);   // Statement
        `}
      />

      {/* Section 2 */}
      <h3 className="text-lg font-semibold text-slate-200">
        🟧 Semicolons in JavaScript
      </h3>

      <p className="text-slate-300 text-sm">
        JavaScript allows you to <strong>omit semicolons</strong> because of a feature
        called <strong>Automatic Semicolon Insertion (ASI)</strong>.  
        However, relying on ASI can sometimes create unexpected errors, so most developers
        prefer writing semicolons explicitly.
      </p>

      <h4 className="text-slate-300 font-semibold mt-2">✔ Recommended:</h4>
      <CodeBlock
        language="javascript"
        code={`
let x = 10;
let y = 20;
console.log(x + y);
        `}
      />

      <h4 className="text-slate-300 font-semibold mt-2">❌ Not recommended:</h4>
      <CodeBlock
        language="javascript"
        code={`
let x = 10
let y = 20
console.log(x + y)
        `}
      />

      <p className="text-yellow-400 text-xs italic">
        While this usually works, it may break in certain cases, especially with return statements.
      </p>

      {/* ASI Problem Example */}
      <h4 className="text-slate-200 font-semibold mt-4">
        ⚠ When Semicolons Matter
      </h4>

      <p className="text-slate-300 text-sm">
        A famous ASI issue occurs when you return an object on the next line:
      </p>

      <CodeBlock
        language="javascript"
        code={`
function getUser() {
  return 
  {
    name: "Ritaja"
  }
}

console.log(getUser()); // ❌ undefined
        `}
      />

      <p className="text-green-300 text-sm">
        Because JavaScript inserts a semicolon after <code>return</code>, thinking the statement ended!
      </p>

      <h4 className="text-green-400 text-sm font-semibold">Correct Version:</h4>

      <CodeBlock
        language="javascript"
        code={`
function getUser() {
  return {
    name: "Ritaja"
  };
}

console.log(getUser()); // ✔ Works!
        `}
      />

      {/* Section 3 */}
      <h3 className="text-lg font-semibold text-slate-200">
        🟩 Indentation & Code Style
      </h3>

      <p className="text-slate-300 text-sm">
        Indentation shows structure. It tells your eyes how blocks of code are grouped.
        Most teams follow either:
      </p>

      <ul className="text-slate-300 text-sm list-disc pl-6 space-y-1">
        <li>2 spaces (common in JavaScript)</li>
        <li>4 spaces (some developers prefer this)</li>
      </ul>

      <h4 className="text-slate-200 font-semibold mt-3">Good Indentation:</h4>

      <CodeBlock
        language="javascript"
        code={`
function greet(name) {
  if (name) {
    console.log("Hello " + name);
  } else {
    console.log("Hello Guest");
  }
}
        `}
      />

      <h4 className="text-slate-200 font-semibold mt-3">Poor Indentation:</h4>

      <CodeBlock
        language="javascript"
        code={`
function greet(name){
  if(name){
    console.log("Hello " + name)
  }else{
    console.log("Hello Guest")
  }
}
        `}
      />

      <p className="text-rose-400 text-xs italic">
        Poor indentation makes debugging extremely hard!
      </p>

      {/* Section 4 */}
      <h3 className="text-lg font-semibold text-slate-200">
        ⭐ Best Practices for Clean Code
      </h3>

      <ul className="text-slate-300 text-sm list-disc pl-6 space-y-1">
        <li>Always indent properly.</li>
        <li>Use semicolons for safety and consistency.</li>
        <li>Write descriptive variable and function names.</li>
        <li>Keep lines short and readable.</li>
        <li>Use consistent spacing and formatting.</li>
      </ul>

      {/* Section 5: Common Errors */}
      <h3 className="text-lg font-semibold text-slate-200">
        ❗ Common Beginner Mistakes
      </h3>

      <ul className="text-red-300 text-sm list-disc pl-6 space-y-1">
        <li>Forgetting curly braces <code>{`{}`}</code> in nested blocks</li>
        <li>Omitting semicolon after <code>return</code></li>
        <li>Inconsistent indentation</li>
        <li>Random spaces inside function parentheses</li>
      </ul>

      {/* Mini Practice */}
      <h3 className="text-lg font-semibold text-slate-200">
        ✏ Mini Practice Task
      </h3>

      <p className="text-slate-300 text-sm">
        Rewrite the following code with proper indentation and semicolons:
      </p>

      <CodeBlock
        language="javascript"
        code={`
function check(n){
  if(n>0){
    console.log("Positive")
  }else{
    console.log("Not positive")
  }
}
        `}
      />

      <p className="text-slate-400 text-xs italic">
        Try it inside the JavaScript Playground!
      </p>
    </div>
  );
}
