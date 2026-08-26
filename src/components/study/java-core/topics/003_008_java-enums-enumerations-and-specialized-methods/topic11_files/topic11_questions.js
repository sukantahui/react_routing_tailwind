const topic11_questions = [
  {
    "question": "Why is 'java.util.EnumSet' vastly faster and more memory-efficient than 'java.util.HashSet' when storing enum constants?",
    "shortAnswer": "'EnumSet' is backed internally by a single primitive 'long' (or array of longs) acting as a bit-vector. Adding, removing, or checking membership translates to single-cycle bitwise CPU operations (AND, OR, NOT), consuming practically zero heap memory and beating HashSet by orders of magnitude.",
    "explanation": "Effective Java Item 36: Use EnumSet instead of bit fields.",
    "hint": "Backed internally by a 64-bit long bit-vector running at hardware bit-shift speeds.",
    "level": "Intermediate",
    "codeExample": "EnumSet<Permission> set = EnumSet.of(Permission.READ, Permission.WRITE);"
  }
];

export default topic11_questions;