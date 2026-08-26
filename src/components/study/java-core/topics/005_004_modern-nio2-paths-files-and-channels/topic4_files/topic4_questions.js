const topic4_questions = [
  {
    "question": "What is the difference between 'Path.resolve()' and 'Path.relativize()' in Java NIO.2?",
    "shortAnswer": "'Path.resolve(other)' joins or concatenates a child path onto a base directory path (equivalent to combining paths with a separator). 'Path.relativize(other)' computes the relative navigation path required to move from the base path to the target path (using '..' parent traversals).",
    "explanation": "Both operations are purely mathematical string manipulations and execute without disk I/O.",
    "hint": "resolve() combines paths together; relativize() calculates the navigation steps between two paths.",
    "level": "Intermediate",
    "codeExample": "Path base = Path.of(\"a\"); Path full = base.resolve(\"b/c.txt\"); // a/b/c.txt"
  }
];

export default topic4_questions;