const questions = [
  {
    question: "What is the advantage of binary file mode (wb/rb) over text file mode (w/r)?",
    shortAnswer: "Binary mode writes raw byte representations directly, offering faster I/O and smaller file sizes.",
    explanation: "Text mode converts numbers to ASCII strings and translates line endings. Binary mode copies raw memory structures as-is.",
    hint: "Binary mode avoids ASCII conversion overhead.",
    level: "intermediate"
  }
];

export default questions;
