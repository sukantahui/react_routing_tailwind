import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-sky-300">
        Understanding the <code>this</code> Keyword (Basic Concept)
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        The <code>this</code> keyword in JavaScript refers to the object that is 
        currently executing the function.  
        It is commonly used in object methods — like student or teacher profiles 
        at Coder & AccoTax, Barrackpore.
      </p>

      {/* Basic Example */}
      <h3 className="text-lg font-semibold text-slate-200">Basic Object Example</h3>

      <CodeBlock
        code={`const student = {
  name: "Kaustav",
  course: "JavaScript",
  greet() {
    console.log(\`Hello, I am \${this.name} from the \${this.course} course.\`);
  }
};

student.greet();`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Here, <code>this.name</code> refers to the <strong>student</strong> object.
      </p>

      {/* Teacher Example */}
      <h3 className="text-lg font-semibold text-slate-200">
        Example with Teacher Object
      </h3>

      <CodeBlock
        code={`const teacher = {
  name: "Sukanta Hui",
  subject: "JavaScript",
  introduce() {
    console.log(\`I am \${this.name}, and I teach \${this.subject}.\`);
  }
};

teacher.introduce();`}
        language="javascript"
      />

      {/* Losing 'this' Example */}
      <h3 className="text-lg font-semibold text-slate-200">
        Important: <code>this</code> depends on HOW the function is called
      </h3>

      <CodeBlock
        code={`const profile = {
  name: "Ritaja",
  course: "JS Beginner",
  show() {
    console.log(this.name);
  }
};

profile.show();      // Works: "Ritaja"

const ref = profile.show;
ref();                // ❌ Undefined (this is lost)`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        When extracted, <code>this</code> loses its reference because it no longer knows 
        which object it belongs to.
      </p>

      {/* Arrow function comparison */}
      <h3 className="text-lg font-semibold text-slate-200">
        Arrow Functions Do NOT Bind <code>this</code>
      </h3>

      <CodeBlock
        code={`const obj = {
  name: "Pranjali",
  show: () => {
    console.log(this.name); 
    // ❌ Arrow functions don't have their own 'this'
  }
};

obj.show();`}
        language="javascript"
      />

      {/* Correct binding */}
      <h3 className="text-lg font-semibold text-slate-200">
        Correct Use with Regular Method
      </h3>

      <CodeBlock
        code={`const studentDetails = {
  name: "Susmita",
  marks: 93,
  display() {
    console.log(\`\${this.name}'s marks: \${this.marks}\`);
  }
};

studentDetails.display();`}
        language="javascript"
      />

      {/* Classroom Example */}
      <h3 className="text-lg font-semibold text-slate-200">
        Realistic Classroom Example — Coder & AccoTax
      </h3>

      <CodeBlock
        code={`const batch = {
  batchName: "JS Intermediate",
  teacher: {
    name: "Mounita Bhandari",
    call() {
      console.log(\`Class Teacher: \${this.name}\`);
    }
  }
};

batch.teacher.call(); // this refers to teacher object`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Understanding <code>this</code> is essential before working with constructors 
        and ES6 classes.
      </p>

    </div>
  );
}
