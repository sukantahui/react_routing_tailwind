const topic4_questions = [
  {
    "question": "What intermediate representation (IR) does the C2 compiler use to represent and optimize Java bytecode?",
    "shortAnswer": "The 'Sea-of-Nodes' graph representation, which merges control flow graphs and data dependency graphs into a unified dependency network, allowing radical global code transformations and reordering.",
    "explanation": "Pioneered by Cliff Click in the HotSpot Server Compiler.",
    "hint": "Sea-of-Nodes graph representation.",
    "level": "Advanced",
    "codeExample": "Sea-of-Nodes IR merges data and control dependencies."
  },
  {
    "question": "What is Auto-Vectorization (SIMD) in the C2 and Graal JIT compilers?",
    "shortAnswer": "An optimization where the JIT transforms a loop that processes array elements one-by-one into hardware SIMD instructions (e.g. AVX2/AVX-512) that process 4, 8, or 16 numbers simultaneously in a single CPU clock cycle.",
    "explanation": "Dramatically accelerates numerical and financial computations.",
    "hint": "Transforms scalar loops into parallel hardware vector instructions (SIMD/AVX).",
    "level": "Intermediate",
    "codeExample": "for (int i=0; i<N; i++) a[i] += b[i]; // Converted to SIMD AVX instructions"
  }
];

export default topic4_questions;
