import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Understanding the <code>this</code> Keyword (Beginner-Friendly)
        </h2>

        {/* Intro */}
        <p className="text-slate-300 text-sm leading-relaxed">
          The <code>this</code> keyword is one of the most important concepts in JavaScript.
          It refers to the <strong>current object that is calling the function</strong>.
          Unlike many languages, the value of <code>this</code> in JavaScript depends
          on <strong>how the function is called</strong>, not where it is written.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          Before learning constructors and classes, you MUST understand how
          <code>this</code> behaves inside objects, functions, and arrow functions.
        </p>

        <hr className="border-slate-700" />

        {/* WHAT THIS MEANS */}
        <h3 className="text-lg font-semibold text-slate-200">
          What does <code>this</code> refer to?
        </h3>

        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300 leading-relaxed">
          <strong>Rule:</strong>  
          <br />
          <code>this</code> = <strong>the object that calls the function</strong>.
          <br /><br />
          In Arrow Functions → <code>this</code> is NOT bound.  
          It takes value from the surrounding scope (lexical this).
        </div>

        <hr className="border-slate-700" />

        {/* Basic Object Example */}
        <h3 className="text-lg font-semibold text-slate-200">Basic Object Example</h3>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const student = {
  name: "Kaustav",
  course: "JavaScript",

  greet() {
    console.log(\`Hello, I am \${this.name} from the \${this.course} course.\`);
  }
};

student.greet();`}
        />

        <p className="text-slate-400 text-sm">
          Here, <code>this.name</code> refers to the <strong>student object</strong> because
          <code>student</code> called the function.
        </p>

        <hr className="border-slate-700" />

        {/* Teacher Example */}
        <h3 className="text-lg font-semibold text-slate-200">Teacher Example</h3>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const teacher = {
  name: "Sukanta Hui",
  subject: "JavaScript",

  introduce() {
    console.log(\`I am \${this.name}, and I teach \${this.subject}.\`);
  }
};

teacher.introduce();`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          When a method is called using <code>object.method()</code>, 
          <code>this</code> always refers to the object before the dot.
        </p>

        <hr className="border-slate-700" />

        {/* Losing THIS */}
        <h3 className="text-lg font-semibold text-slate-200">
          Losing <code>this</code> (Important!)
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          If you store a method in a variable and then call it,
          <code>this</code> gets lost.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const profile = {
  name: "Ritaja",
  course: "JS Beginner",

  show() {
    console.log(this.name);
  }
};

profile.show();      // Works: "Ritaja"

const ref = profile.show;
ref();                // ❌ this becomes undefined`}
        />

        <p className="text-slate-400 text-sm">
          The function is now called <strong>alone</strong>, without an object → so
          <code>this</code> becomes <strong>undefined</strong> in strict mode.
        </p>

        <hr className="border-slate-700" />

        {/* FIXING LOST THIS */}
        <h3 className="text-lg font-semibold text-slate-200">
          Fixing Lost <code>this</code> using bind()
        </h3>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const user = {
  name: "Devangshu",

  show() {
    console.log(this.name);
  }
};

const f = user.show.bind(user);
f();  // ✔ Works: "Devangshu"`}
        />

        <p className="text-slate-400 text-sm">
          <code>bind()</code> permanently attaches <code>this</code> to a function.
        </p>

        <hr className="border-slate-700" />

        {/* Arrow Functions */}
        <h3 className="text-lg font-semibold text-slate-200">
          Arrow Functions Do NOT Bind <code>this</code>
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Arrow functions inherit <code>this</code> from their surrounding scope.
          They do NOT create their own <code>this</code>.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const obj = {
  name: "Pranjali",

  show: () => {
    console.log(this.name); 
    // ❌ 'this' does NOT refer to obj
    // It refers to the global scope
  }
};

obj.show();`}
        />

        <p className="text-slate-400 text-sm">
          Use arrow functions for callbacks, NOT for object methods.
        </p>

        <hr className="border-slate-700" />

        {/* Correct Method */}
        <h3 className="text-lg font-semibold text-slate-200">
          Correct Use with Regular Method
        </h3>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const studentDetails = {
  name: "Susmita",
  marks: 93,

  display() {
    console.log(\`\${this.name}'s marks: \${this.marks}\`);
  }
};

studentDetails.display();`}
        />

        <hr className="border-slate-700" />

        {/* Coder & AccoTax Example */}
        <h3 className="text-lg font-semibold text-slate-200">
          Realistic Classroom Example — Coder & AccoTax
        </h3>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const batch = {
  batchName: "JS Intermediate",

  teacher: {
    name: "Mounita Bhandari",

    call() {
      console.log(\`Class Teacher: \${this.name}\`);
    }
  }
};

batch.teacher.call(); // ✔ this refers to teacher object`}
        />

        <p className="text-slate-400 text-sm">
          Nested objects have their own <code>this</code>—it depends on which object
          calls the method.
        </p>

        <hr className="border-slate-700" />

        {/* Summary */}
        <p className="text-slate-400 text-sm leading-relaxed">
          The value of <code>this</code> depends entirely on the way the function is called.
          Regular methods bind <code>this</code> to the calling object, while arrow functions
          do not bind <code>this</code> at all.  
          Understanding this concept is essential before learning constructor functions
          and ES6 classes.
        </p>

      </div>
    );
  }
}
