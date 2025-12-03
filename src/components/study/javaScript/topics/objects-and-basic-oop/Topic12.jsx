import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic12 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 12 – The this keyword inside objects (beginner-friendly)
        </h2>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: this refers to the current object
const student = {
  name: "Ritaja",
  course: "JavaScript",
  introduce: function () {
    console.log("Hello, I am " + this.name + ", learning " + this.course);
  },
};

student.introduce();`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: this inside another object
const teacher = {
  name: "Sukanta Hui",
  subject: "Full Stack Development",
  greet() {
    console.log("Hi, I am " + this.name + ", I teach " + this.subject + ".");
  },
};

teacher.greet();`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Losing this when we copy method reference
const institute = {
  name: "Coder & AccoTax",
  sayName() {
    console.log("Institute:", this.name);
  },
};

institute.sayName(); // works

const fn = institute.sayName;
fn(); // this is now undefined or window (in non-strict mode)`}
        />
      </div>
    );
  }
}
