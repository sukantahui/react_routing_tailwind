import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic26 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 26 – Object.freeze(), Object.seal() and preventExtensions()
        </h2>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Object.freeze() – no changes allowed
const student = {
  name: "Ritaja",
  course: "Python",
  batch: "Morning",
};

Object.freeze(student);

student.course = "JavaScript"; // ignored
student.newProp = "Test";      // ignored
delete student.batch;          // ignored

console.log(student);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Object.seal() – can modify, cannot add/remove
const teacher = {
  name: "Sukanta Hui",
  subject: "Full Stack Development",
};

Object.seal(teacher);

teacher.subject = "JavaScript + React"; // allowed
teacher.newProp = "Test";               // ignored
delete teacher.name;                    // ignored

console.log(teacher);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Object.preventExtensions() – cannot add, but can edit/delete
const batch = {
  name: "Weekend",
  students: 25,
};

Object.preventExtensions(batch);

batch.students = 30;       // allowed
delete batch.name;         // allowed
batch.trainer = "Tanusree"; // ignored

console.log(batch);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 4: Checking status
const obj = {};

Object.preventExtensions(obj);
console.log(Object.isExtensible(obj)); // false

const obj2 = { a: 1 };
Object.seal(obj2);
console.log(Object.isSealed(obj2));    // true

const obj3 = { a: 1 };
Object.freeze(obj3);
console.log(Object.isFrozen(obj3));    // true`}
        />
      </div>
    );
  }
}
