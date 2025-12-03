import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          ES6 Classes, Constructor & Basic Inheritance
        </h2>

        {/* INTRO THEORY */}
        <p className="text-slate-300 text-sm leading-relaxed">
          JavaScript is a prototype-based language, meaning every object is linked
          to another object called its <strong>prototype</strong>. Before ES6,
          developers used <strong>constructor functions</strong> and manually
          attached methods using <code>Function.prototype</code>. This method
          worked, but became harder to manage as applications grew larger.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          ES6 introduced the <code>class</code> keyword — a cleaner, modern,
          object-oriented syntax that makes JavaScript feel more like Java, Python,
          or C++. Internally, classes <strong>still use prototypes</strong>. They
          are just syntactic sugar that makes object-oriented programming easier.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          Classes are ideal for modelling entities such as <strong>Students</strong>,
          <strong>Teachers</strong>, <strong>Courses</strong>, etc. — perfect for
          building structured applications like the systems used at
          <strong>Coder & AccoTax</strong>.
        </p>

        <hr className="border-slate-700" />

        {/* What is Class */}
        <h3 className="text-lg font-semibold text-slate-200">
          What is a Class? What is a Constructor?
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          A <strong>class</strong> is a blueprint for creating multiple objects
          with similar structure. A <strong>constructor()</strong> is a special
          method used to initialize object properties when an object is created
          using <code>new</code>.
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>A class describes what an object should contain.</li>
          <li>An instance is an actual object created from a class.</li>
          <li>Methods inside the class are stored on the prototype (memory-efficient).</li>
          <li>Constructor runs automatically when <code>new</code> is used.</li>
        </ul>

        {/* Example: Student */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`class Student {
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
        />

        <hr className="border-slate-700" />

        {/* Teacher Class */}
        <h3 className="text-lg font-semibold text-slate-200">Teacher Class</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          A class can represent any real-world entity. A teacher has a name,
          a subject, and a behavior — <code>teach()</code>.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`class Teacher {
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
        />

        <hr className="border-slate-700" />

        {/* Inheritance */}
        <h3 className="text-lg font-semibold text-slate-200">
          Inheritance with <code>extends</code>
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Inheritance allows one class (child) to reuse the properties and methods
          of another class (parent). This helps reduce duplication and creates
          cleaner code structure.
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><code>extends</code> creates a child class.</li>
          <li><code>super()</code> calls the parent constructor.</li>
          <li><strong>super()</strong> must be called before using <code>this</code>.</li>
        </ul>

        <EditableCodeBlock
          language="javascript"
          initialCode={`class Person {
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
    super(name, city); // parent constructor call
    this.batch = batch;
  }

  details() {
    console.log(\`\${this.name} is in \${this.batch} batch.\`);
  }
}

const s = new Student("Kaustav", "Barrackpore", "JS Evening");
s.info();
s.details();`}
        />

        <hr className="border-slate-700" />

        {/* Realistic Example */}
        <h3 className="text-lg font-semibold text-slate-200">
          Realistic Example — Coder & AccoTax (Barrackpore)
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          In a real software model, we might have <code>Person</code> as the base
          class, and extend it into <code>Teacher</code> and <code>Student</code>
          roles with extra methods and properties.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`class Person {
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
        />

        <hr className="border-slate-700" />

        {/* Static Methods */}
        <h3 className="text-lg font-semibold text-slate-200">
          Static Methods
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          A <strong>static method</strong> belongs to the class itself, not the
          objects created from the class. These are useful for helper functions,
          utilities, validators, or factory methods.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`class Utils {
  static welcome() {
    console.log("Welcome to Coder & AccoTax!");
  }
}

Utils.welcome();`}
        />

        <p className="text-slate-400 text-sm">
          ES6 Classes form the foundation of modern JavaScript OOP. Understanding
          constructors, inheritance, static methods, and prototypes will help you
          build scalable applications and ace JavaScript interviews.
        </p>
      </div>
    );
  }
}
