import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* --------------------------------------------------------
            TITLE
        -------------------------------------------------------- */}
        <h2 className="text-xl font-semibold text-sky-300">
          Optional Chaining (?.) & Nullish Coalescing (??)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Optional chaining and nullish coalescing are two powerful ES2020 features that
          help you write safer and cleaner code — especially when working with deeply nested
          objects, API data, or optional values.  
          These features are widely used in modern JavaScript projects, including those 
          taught at <strong>Coder & AccoTax, Barrackpore</strong>.
        </p>

        {/* --------------------------------------------------------
            1. OPTIONAL CHAINING (?.)
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. Optional Chaining (?.)
        </h3>

        <p className="text-slate-300 text-sm">
          Optional chaining safely accesses nested properties without throwing errors.
        </p>

        <CodeBlock
          language="javascript"
          code={`const student = {
  name: "Ritaja",
  address: {
    city: "Barrackpore"
  }
};

console.log(student.address?.city);  // "Barrackpore"
console.log(student.address?.pin);   // undefined (no error)
console.log(student.contact?.phone); // undefined (no error)`}
        />

        <p className="text-slate-400 text-sm">
          Without <code>?.</code> the code would crash with:  
          <em>“Cannot read properties of undefined”</em>.
        </p>


        {/* --------------------------------------------------------
            2. OPTIONAL CHAINING WITH FUNCTION CALLS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Optional Chaining in Function Calls
        </h3>

        <CodeBlock
          language="javascript"
          code={`const teacher = {
  name: "Sukanta Hui",
  greet() {
    return "Welcome to Coder & AccoTax!";
  }
};

console.log(teacher.greet?.());  // works
console.log(teacher.sayHello?.()); // undefined, no error`}
        />


        {/* --------------------------------------------------------
            3. OPTIONAL CHAINING WITH ARRAYS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Optional Chaining with Arrays
        </h3>

        <CodeBlock
          language="javascript"
          code={`const classList = {
  students: ["Mounita", "Kaustav", "Swadeep"]
};

console.log(classList.students?.[0]);  // "Mounita"
console.log(classList.members?.[0]);   // undefined`}
        />


        {/* --------------------------------------------------------
            4. NULLISH COALESCING (??)
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          4. Nullish Coalescing (??)
        </h3>

        <p className="text-slate-300 text-sm">
          The <strong>??</strong> operator returns the right-hand value only when the left-hand value is  
          <strong>null or undefined</strong>.
        </p>

        <CodeBlock
          language="javascript"
          code={`let marks = 0;

console.log(marks ?? 50); // 0  (valid value, not replaced)
console.log(null ?? 50);  // 50
console.log(undefined ?? 50); // 50`}
        />

        <p className="text-slate-400 text-sm">
          Unlike <code>||</code>, it does NOT treat <code>0</code> or <code>""</code> as “false”.
        </p>


        {/* --------------------------------------------------------
            5. COMBINING OPTIONAL CHAINING + NULLISH COALESCING
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          5. Optional Chaining + Nullish Coalescing (Best Combo)
        </h3>

        <CodeBlock
          language="javascript"
          code={`const apiResponse = {
  student: {
    name: "Susmita",
    scores: {
      javascript: 94
    }
  }
};

const jsScore = apiResponse.student?.scores?.javascript ?? "Not Available";

console.log(jsScore); // 94`}
        />

        <p className="text-slate-400 text-sm">
          Safe access + safe fallback = perfect for API results.
        </p>


        {/* --------------------------------------------------------
            6. PRACTICAL USE CASE — Fetch Data (Simulated)
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          6. Practical Example — Handling API Data Safely
        </h3>

        <CodeBlock
          language="javascript"
          code={`const dataFromServer = {
  user: {
    profile: {
      name: "Devangshu"
    }
  }
};

// Without safety:
console.log(dataFromServer.user.profile.name); // OK
// console.log(dataFromServer.user.address.city); // ❌ would crash

// With Optional Chaining:
console.log(dataFromServer.user.address?.city ?? "City Not Provided");
// "City Not Provided"`}
        />


        {/* --------------------------------------------------------
            SUMMARY
        -------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li>Use <code>?.</code> to safely access nested properties</li>
            <li>Prevents “undefined” runtime errors</li>
            <li><code>??</code> provides fallback only when value is null/undefined</li>
            <li>Perfect for API data, form data, optional values</li>
            <li>Use together: <code>obj?.value ?? "fallback"</code></li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            These two features make JavaScript applications safer and more reliable.
          </p>
        </section>

      </div>
    );
  }
}
