import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-sky-300">
        Constructor Functions & the <code>new</code> Keyword
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        Constructor functions are a traditional way in JavaScript to create 
        multiple similar objects.  
        They work together with the <code>new</code> keyword to produce new instances.
      </p>

      {/* Basic constructor */}
      <h3 className="text-lg font-semibold text-slate-200">
        Basic Constructor Function
      </h3>

      <CodeBlock
        code={`function Student(name, course, score) {
  this.name = name;
  this.course = course;
  this.score = score;
}

const s1 = new Student("Ritaja", "JavaScript", 95);
const s2 = new Student("Swadeep", "JavaScript", 89);

console.log(s1.name);   // Ritaja
console.log(s2.score);  // 89`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Every time you use <code>new Student()</code>, a new student object is created.
      </p>

      {/* Adding Methods */}
      <h3 className="text-lg font-semibold text-slate-200">
        Adding Methods to Constructor Functions
      </h3>

      <CodeBlock
        code={`function Teacher(name, subject) {
  this.name = name;
  this.subject = subject;

  this.introduce = function () {
    console.log(\`I am \${this.name} and I teach \${this.subject}.\`);
  };
}

const t1 = new Teacher("Sukanta Hui", "JavaScript");
t1.introduce();`}
        language="javascript"
      />

      {/* Realistic Example */}
      <h3 className="text-lg font-semibold text-slate-200">
        Realistic Example — Student Enrollment (Coder & AccoTax)
      </h3>

      <CodeBlock
        code={`function Enrollment(name, module, city) {
  this.name = name;
  this.module = module;
  this.city = city;

  this.summary = function () {
    console.log(\`\${this.name} from \${this.city} enrolled in \${this.module}.\`);
  };
}

const e1 = new Enrollment("Devangshu", "Objects & OOP", "Barrackpore");
const e2 = new Enrollment("Pranjali", "JavaScript Basics", "Barrackpore");

e1.summary();
e2.summary();`}
        language="javascript"
      />

      {/* What NEW does */}
      <h3 className="text-lg font-semibold text-slate-200">
        What the <code>new</code> Keyword Actually Does
      </h3>

      <CodeBlock
        code={`When you write:

const s = new Student("Kaustav", "JS", 92);

The 'new' keyword does 4 things:

1. Creates a new empty object: {}
2. Sets 'this' to refer to that new object
3. Assigns values to properties (name, module, etc.)
4. Returns the new object`}
        language="javascript"
      />

      {/* Prototype note */}
      <h3 className="text-lg font-semibold text-slate-200">
        Adding Methods the Right Way (Prototype)
      </h3>

      <CodeBlock
        code={`function Student(name, marks) {
  this.name = name;
  this.marks = marks;
}

Student.prototype.showMarks = function () {
  console.log(\`\${this.name}'s Marks: \${this.marks}\`);
};

const s = new Student("Susmita", 93);
s.showMarks();`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        This is the foundation for learning ES6 Classes and OOP structure.
      </p>

    </div>
  );
}
