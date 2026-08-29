const questions = [
  {
    id: 1,
    question: "Which matrix memory ordering convention is natively used by the C language?",
    options: ["Row-Major Order", "Column-Major Order", "Diagonal Order", "Random Order"],
    answer: "Row-Major Order",
    explanation: "C stores multi-dimensional arrays row-by-row in contiguous RAM locations. Fortran and MATLAB use Column-Major order."
  }
];

export default questions;
