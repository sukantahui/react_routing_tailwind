const topic13_questions = [
  {
    question: "How does 'BigInteger.modPow(exp, m)' optimize massive modular exponentiations for RSA cryptography?",
    shortAnswer: "Instead of computing the gigantic 'base^exp' number first (which would consume petabytes of RAM) and then applying modulo, 'modPow()' performs intermediate modulo reductions on every step using the Fast Modular Squaring Algorithm (Montgomery Reduction).",
    explanation: "Essential foundation for RSA encryption and Diffie-Hellman key exchanges.",
    hint: "Applies modulo at every intermediate multiplication step to prevent memory explosion.",
    level: "Advanced",
    codeExample: "BigInteger cipher = msg.modPow(publicKey, modulus);"
  }
];

export default topic13_questions;