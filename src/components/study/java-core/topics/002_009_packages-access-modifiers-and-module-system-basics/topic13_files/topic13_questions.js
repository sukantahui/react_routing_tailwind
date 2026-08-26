const topic13_questions = [
  {
    question: "What major problems did the Java 9 Module System (JPMS / Project Jigsaw) solve in enterprise Java?",
    shortAnswer: "1. Eliminated 'Classpath Hell' by validating dependencies at boot time. 2. Introduced Strong Encapsulation (public classes are private to the module unless exported). 3. Modularized the monolithic JDK (rt.jar) enabling custom minimal runtimes via 'jlink'.",
    explanation: "JPMS is the most significant architectural evolution of the Java platform since Java 5.",
    hint: "Solves classpath hell, enforces strong encapsulation, and enables minimal jlink runtimes.",
    level: "Intermediate",
    codeExample: "// module com.company.app { requires java.sql; }"
  }
];

export default topic13_questions;