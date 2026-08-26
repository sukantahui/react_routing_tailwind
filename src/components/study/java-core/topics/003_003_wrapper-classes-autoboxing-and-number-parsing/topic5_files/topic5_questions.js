const topic5_questions = [
  {
    question: "What exact sequence of operations occurs when executing 'obj++' on an 'Integer obj' in Java?",
    shortAnswer: "1. 'obj.intValue()' unboxes the Integer to a primitive int. 2. The primitive is incremented by 1. 3. 'Integer.valueOf(newValue)' re-boxes the incremented int into a new Integer reference and assigns it back to 'obj'.",
    explanation: "Because wrappers are immutable, 'obj++' creates a brand new Integer object on every iteration.",
    hint: "Unbox via intValue(), increment primitive, then re-box via Integer.valueOf().",
    level: "Intermediate",
    codeExample: "// obj++ translates to: obj = Integer.valueOf(obj.intValue() + 1);"
  }
];

export default topic5_questions;