const questions = [
  {
    question: "What do argc and argv parameters in main(int argc, char *argv[]) represent?",
    shortAnswer: "argc is argument count; argv is array of string argument pointers passed from host CLI terminal.",
    explanation: "argv[0] holds the program executable path; argv[1] through argv[argc-1] contain user command-line arguments.",
    hint: "argc = count, argv = string array.",
    level: "intermediate"
  }
];

export default questions;
