const questions = [
  {
    question: "Why should you always check if fopen() returned NULL?",
    shortAnswer: "fopen returns NULL if the file fails to open due to missing file, permission errors, or invalid path.",
    explanation: "Attempting to perform file operations on a NULL FILE* pointer causes an immediate segmentation fault.",
    hint: "NULL check after fopen is mandatory.",
    level: "basic"
  }
];

export default questions;
