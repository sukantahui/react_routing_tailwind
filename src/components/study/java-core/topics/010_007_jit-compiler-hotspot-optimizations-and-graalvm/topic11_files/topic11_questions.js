const topic11_questions = [
  {
    "question": "What does the '%' symbol indicate in a -XX:+PrintCompilation output line?",
    "shortAnswer": "It indicates an On-Stack Replacement (OSR) compilation, where a long-running loop was compiled and swapped onto the stack while the method was already executing.",
    "explanation": "Indicates loop-level OSR compilation.",
    "hint": "On-Stack Replacement (OSR).",
    "level": "Intermediate",
    "codeExample": "145  %  4  com.foo.LoopDemo::runLoop @ 12 (85 bytes)"
  },
  {
    "question": "What does 'make_not_entrant' mean in JIT compilation logs?",
    "shortAnswer": "It indicates that a previously compiled native method has been invalidated or de-optimized (due to speculative invalidation or class loading changes) and that future invocations will not enter this code.",
    "explanation": "Triggers recompilation or return to interpreter.",
    "hint": "Compiled code is invalidated and marked not to be entered.",
    "level": "Advanced",
    "codeExample": "made not entrant -> Code invalidated and de-optimized."
  }
];

export default topic11_questions;
