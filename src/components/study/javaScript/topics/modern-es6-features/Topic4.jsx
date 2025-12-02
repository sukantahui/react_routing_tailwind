import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* --------------------------------------------------------
            TITLE
        -------------------------------------------------------- */}
        <h2 className="text-xl font-semibold text-sky-300">
          Enhanced Object Literals (ES6)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          ES6 introduced several improvements to object literals, making object creation
          more concise, readable, and powerful. These enhanced features are widely used in  
          modern JavaScript applications, including projects developed at  
          <strong> Coder & AccoTax, Barrackpore</strong>.
        </p>


        {/* --------------------------------------------------------
            1. SHORTHAND PROPERTY SYNTAX
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. Shorthand Property Syntax
        </h3>

        <p className="text-slate-300 text-sm">
          When a variable name matches the object key, you can write it only once.
        </p>

        <CodeBlock
          language="javascript"
          code={`const name = "Ritaja";
const course = "JavaScript";

const student = {
  name,     // same as name: name
  course    // same as course: course
};

console.log(student);
/*
{ 
  name: "Ritaja",
  course: "JavaScript"
}
*/`}
        />


        {/* --------------------------------------------------------
            2. SHORTHAND METHODS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Method Shorthand (No Need for "function" Keyword)
        </h3>

        <CodeBlock
          language="javascript"
          code={`const teacher = {
  name: "Sukanta Hui",

  // old way:
  // greet: function() { ... }

  // ES6 shorthand:
  greet() {
    console.log(\`Welcome to Coder & AccoTax!\`);
  }
};

teacher.greet();`}
        />

        <p className="text-slate-400 text-sm">
          This shorthand makes object methods cleaner and easier to read.
        </p>


        {/* --------------------------------------------------------
            3. COMPUTED PROPERTY NAMES
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Computed Property Names
        </h3>

        <p className="text-slate-300 text-sm">
          You can create dynamic object keys using expressions inside square brackets.
        </p>

        <CodeBlock
          language="javascript"
          code={`const subject = "javascript";
const scoreKey = "score_" + subject;

const result = {
  name: "Mounita",
  [scoreKey]: 95
};

console.log(result);
/*
{
  name: "Mounita",
  score_javascript: 95
}
*/`}
        />


        {/* --------------------------------------------------------
            4. COMBINING ALL ENHANCED FEATURES
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          4. Mixing All Enhanced Object Features
        </h3>

        <CodeBlock
          language="javascript"
          code={`const centre = "Coder & AccoTax";
const city = "Barrackpore";

function generateID(name) {
  return name.toLowerCase().replaceAll(" ", "_") + "_id";
}

const teacher = {
  name: "Chandan Das",
  centre,
  city,
  id: generateID("Chandan Das"),

  greet() {
    console.log(\`Hello, I am \${this.name} from \${this.centre}.\`);
  },

  [\`address_\${city}\`]: "25(10/A) Shibtala Road"
};

console.log(teacher);`}
        />

        <p className="text-slate-400 text-sm">
          This combines shorthand properties, shorthand methods, and computed keys.
        </p>


        {/* --------------------------------------------------------
            5. REAL-WORLD USE CASE (STUDENT MANAGEMENT)
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          5. Real-World Example — Student Management System
        </h3>

        <CodeBlock
          language="javascript"
          code={`const createStudent = (name, batch) => {
  return {
    name,
    batch,
    centre: "Coder & AccoTax",
    
    // computed property
    ["id_" + name.split(" ")[0].toLowerCase()]: Date.now(),

    // shorthand method
    display() {
      console.log(\`\${name} from batch \${batch} is enrolled at Coder & AccoTax.\`);
    }
  };
};

const student1 = createStudent("Kaustav", "JS-2025");
student1.display();`}
        />

        {/* --------------------------------------------------------
            SUMMARY
        -------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li>Shorthand properties reduce repetition</li>
            <li>Shorthand methods remove the need for <code>function</code></li>
            <li>Computed properties allow dynamic keys</li>
            <li>Useful for configs, APIs, object factories, and components</li>
            <li>Heavily used in React, Node.js, JSON APIs</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            Enhanced object literals make JavaScript objects modern, cleaner, and more expressive.
          </p>
        </section>

      </div>
    );
  }
}
