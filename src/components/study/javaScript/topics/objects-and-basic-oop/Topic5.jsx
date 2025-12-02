import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-sky-300">
        ES6 Classes, Constructor & Basic Inheritance
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        ES6 introduced the <code>class</code> keyword — a cleaner way to write 
        constructor functions and inheritance.  
        Internally, classes still use prototypes, but the syntax is easier to read.
      </p>

      {/* Basic Class */}
      <h3 className="text-lg font-semibold text-slate-200">Basic Class</h3>

      <CodeBlock
        code={`class Student {
  constructor(name, course, score) {
    this.name = name;
    this.course = course;
    this.score = score;
  }

  show() {
    console.log(\`\${this.name} scored \${this.score} in \${this.course}.\`);
  }
}

const s1 = new Student("Mounita", "JavaScript", 94);
s1.show();`}
        language="javascript"
      />

      {/* Teacher Class */}
      <h3 className="text-lg font-semibold text-slate-200">Teacher Class</h3>

      <CodeBlock
        code={`class Teacher {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
  }

  teach() {
    console.log(\`\${this.name} teaches \${this.subject}.\`);
  }
}

const t = new Teacher("Tanusree Hui", "Python");
t.teach();`}
        language="javascript"
      />

      {/* Inheritance */}
      <h3 className="text-lg font-semibold text-slate-200">
        Inheritance with <code>extends</code>
      </h3>

      <p className="text-slate-300 text-sm">
        A child class can inherit properties and methods from a parent class.
      </p>

      <CodeBlock
        code={`class Person {
  constructor(name, city) {
    this.name = name;
    this.city = city;
  }

  info() {
    console.log(\`\${this.name} from \${this.city}\`);
  }
}

class Student extends Person {
  constructor(name, city, batch) {
    super(name, city); // calls parent constructor
    this.batch = batch;
  }

  details() {
    console.log(\`\${this.name} is in \${this.batch} batch.\`);
  }
}

const s = new Student("Kaustav", "Barrackpore", "JS Evening");
s.info();
s.details();`}
        language="javascript"
      />

      {/* Realistic Example – Coder & AccoTax */}
      <h3 className="text-lg font-semibold text-slate-200">
        Realistic Example — Coder & AccoTax (Barrackpore)
      </h3>

      <CodeBlock
        code={`class Person {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  intro() {
    console.log(\`I am \${this.name} (\${this.role})\`);
  }
}

class Teacher extends Person {
  constructor(name, role, subject) {
    super(name, role);
    this.subject = subject;
  }

  info() {
    console.log(\`Subject: \${this.subject}\`);
  }
}

class Student extends Person {
  constructor(name, role, marks) {
    super(name, role);
    this.marks = marks;
  }

  report() {
    console.log(\`\${this.name}'s Marks: \${this.marks}\`);
  }
}

// Examples:
const teacher = new Teacher("Sukanta Hui", "Teacher", "JavaScript");
const student = new Student("Pranjali", "Student", 96);

teacher.intro();
teacher.info();
student.intro();
student.report();`}
        language="javascript"
      />

      {/* Static Methods */}
      <h3 className="text-lg font-semibold text-slate-200">
        Static Methods
      </h3>

      <p className="text-slate-300 text-sm">
        A static method belongs to the class, not the object.
      </p>

      <CodeBlock
        code={`class Utils {
  static welcome() {
    console.log("Welcome to Coder & AccoTax!");
  }
}

Utils.welcome();`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        ES6 Classes form the backbone of OOP in JavaScript, enabling scalable 
        and readable program structure.
      </p>
    </div>
  );
}
