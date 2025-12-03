import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic25 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 25 – Optional chaining (?.) and nullish coalescing (??)
        </h2>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Optional chaining to avoid errors
const student = {
  name: "Pranjali",
  courses: {
    python: { status: "Completed" },
  },
};

console.log(student.courses?.python?.status);
console.log(student.courses?.javascript?.status); // undefined, no error`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Optional chaining with arrays
const batches = {
  morning: ["Ritaja", "Kaustav"],
};

console.log(batches.morning?.[0]);      // "Ritaja"
console.log(batches.evening?.[0]);      // undefined (no error)`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Nullish coalescing for default values
const settings = {
  theme: "dark",
  itemsPerPage: 0, // valid value
};

const theme = settings.theme ?? "light";
const items = settings.itemsPerPage ?? 10;

console.log("Theme:", theme);
console.log("Items per page:", items);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 4: Optional chaining + nullish coalescing together
const studentProfile = {
  name: "Susmita",
  preferences: {
    language: "en",
  },
};

const language = studentProfile.preferences?.language ?? "en";
const mode = studentProfile.preferences?.mode ?? "light";

console.log("Language:", language);
console.log("Mode:", mode);`}
        />
      </div>
    );
  }
}
