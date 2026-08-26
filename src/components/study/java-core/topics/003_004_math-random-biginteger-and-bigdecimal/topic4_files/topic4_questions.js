const topic4_questions = [
  {
    question: "Why must 'java.security.SecureRandom' be used instead of 'java.util.Random' for generating authentication tokens, OTPs, and password salts?",
    shortAnswer: "'java.util.Random' uses a predictable linear congruential formula with a 48-bit seed. An attacker observing two consecutive random numbers can easily calculate all future numbers. 'SecureRandom' gathers non-deterministic entropy from the operating system, making it cryptographically unpredictable.",
    explanation: "Mandatory compliance requirement under OWASP and PCI-DSS standards.",
    hint: "Uses OS hardware entropy to prevent mathematical sequence prediction.",
    level: "Intermediate",
    codeExample: "SecureRandom sr = new SecureRandom(); byte[] salt = new byte[16]; sr.nextBytes(salt);"
  }
];

export default topic4_questions;