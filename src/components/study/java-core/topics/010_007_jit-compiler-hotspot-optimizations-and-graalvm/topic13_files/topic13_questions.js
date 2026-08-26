const topic13_questions = [
  {
    "question": "How does GraalVM Native Image reduce the memory footprint and binary size of Java applications?",
    "shortAnswer": "Through static Points-To Analysis (Tree Shaking). It discovers and retains only the classes, methods, and standard library components that are strictly reachable from main(), discarding all unused bytecode.",
    "explanation": "Dramatically reduces binary size and attack surface.",
    "hint": "Performs static Points-To Analysis and removes all unreachable code.",
    "level": "Intermediate",
    "codeExample": "Tree shaking purges unused bytecode from the final native binary."
  },
  {
    "question": "What is Build-Time Class Initialization in GraalVM Native Image?",
    "shortAnswer": "An optimization where static class initializers (<clinit>) are executed during compilation, and the resulting initialized class state and static objects are embedded directly into the native binary's startup heap image for instant availability.",
    "explanation": "Shifts initialization work from runtime to build time.",
    "hint": "Executes static initializers at build time and embeds the resulting heap snapshot.",
    "level": "Advanced",
    "codeExample": "--initialize-at-build-time=com.company.util"
  }
];

export default topic13_questions;
