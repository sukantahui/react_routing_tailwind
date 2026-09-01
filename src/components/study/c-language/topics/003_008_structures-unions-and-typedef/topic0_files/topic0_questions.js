const questions = [
  {
    question: "What is the difference between struct dot (.) and arrow (->) operators in C?",
    shortAnswer: "Dot (.) accesses members from a struct instance; arrow (->) dereferences and accesses members from a struct pointer.",
    explanation: "s.name accesses name from object s; ptr->name is shorthand for (*ptr).name when accessing through a pointer address.",
    hint: "Use -> when operating on pointers to structs.",
    level: "basic"
  }
];

export default questions;
