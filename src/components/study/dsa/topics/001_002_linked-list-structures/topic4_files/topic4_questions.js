const questions = [
  {
    id: 1,
    question: "Why are Linked Lists ideal for representing sparse mathematical polynomials (e.g., 9x^1000 + 4x^2)?",
    options: [
      "Linked lists store only terms with non-zero coefficients (coeff, exp, next) rather than allocating a 1000-element array",
      "Because linked lists evaluate polynomials faster",
      "Because arrays cannot store exponents",
      "Because linked lists sort terms automatically"
    ],
    answer: "Linked lists store only terms with non-zero coefficients (coeff, exp, next) rather than allocating a 1000-element array",
    explanation: "For high-degree sparse polynomials like `9x^1000 + 4x^2`, an array wastes 998 zero entries. A linked list uses only 2 nodes."
  }
];

export default questions;
