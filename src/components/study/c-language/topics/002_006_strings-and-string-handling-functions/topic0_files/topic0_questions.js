const questions = [
  {
    question: "Why are strings in C represented as null-terminated character arrays?",
    shortAnswer: "C does not have a native string data type; strings end with a null character ('\\0') marker.",
    explanation: "Functions like strlen and printf scan memory sequentially until encountering '\\0' to determine string termination.",
    hint: "Null character '\\0' terminates C strings.",
    level: "basic"
  }
];

export default questions;
