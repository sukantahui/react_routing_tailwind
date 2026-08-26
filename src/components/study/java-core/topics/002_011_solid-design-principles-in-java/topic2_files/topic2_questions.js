const topic2_questions = [
  {
    question: "How does decomposing a monolithic invoice class into TaxCalculatorService and InvoicePdfGenerator protect against regressions?",
    shortAnswer: "Because modifications to tax law regulations are completely isolated inside TaxCalculatorService without risking formatting bugs in InvoicePdfGenerator, and vice versa.",
    explanation: "Isolating concerns minimizes the blast radius of code changes.",
    hint: "Separates tax computation changes from PDF layout rendering changes.",
    level: "Intermediate",
    codeExample: "TaxCalculatorService calc = new TaxCalculatorService();"
  }
];

export default topic2_questions;