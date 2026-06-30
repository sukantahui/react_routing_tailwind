// topic43_questions.js
// 30 FAQs on "Compiler Applications" – basic to expert.

const questions = [
  {
    question: "What is the first phase of a compiler?",
    shortAnswer: "Lexical analysis.",
    explanation: "The lexer breaks the source code into tokens.",
    hint: "Tokenization.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of parsing in a compiler?",
    shortAnswer: "To build an Abstract Syntax Tree (AST) from tokens.",
    explanation: "The parser checks syntax and builds a tree representing the program's structure.",
    hint: "AST.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is an Abstract Syntax Tree (AST)?",
    shortAnswer: "A tree representation of the syntactic structure of source code.",
    explanation: "ASTs are used by compilers for semantic analysis and code generation.",
    hint: "Tree representation.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Why do compilers convert infix to postfix/prefix?",
    shortAnswer: "To eliminate precedence and parentheses, simplifying code generation.",
    explanation: "Postfix/prefix are easier to generate code from, especially for stack machines.",
    hint: "Simplify.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is intermediate representation (IR)?",
    shortAnswer: "A language-independent representation of the program used by compilers.",
    explanation: "IR is used for optimization and code generation.",
    hint: "Language-independent.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is constant folding?",
    shortAnswer: "Evaluating constant expressions at compile time.",
    explanation: "Example: 2+3 becomes 5.",
    hint: "Compile-time evaluation.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is strength reduction?",
    shortAnswer: "Replacing expensive operations with cheaper ones.",
    explanation: "Example: x*2 becomes x+x or x<<1.",
    hint: "Optimization.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is common subexpression elimination?",
    shortAnswer: "Reusing computed values to avoid redundant calculations.",
    explanation: "Example: compute b*c once if used multiple times.",
    hint: "Reuse.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is dead code elimination?",
    shortAnswer: "Removing code that is never executed or used.",
    explanation: "Improves performance and reduces code size.",
    hint: "Remove unused.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is code generation in a compiler?",
    shortAnswer: "Translating the IR to target machine code or bytecode.",
    explanation: "The final phase of the compiler produces executable code.",
    hint: "Machine code.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How does the Java compiler (javac) handle expressions?",
    shortAnswer: "It parses them into an AST and generates bytecode.",
    explanation: "Javac uses a stack-based bytecode format for the JVM.",
    hint: "Bytecode.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the GCC compiler pipeline?",
    shortAnswer: "Frontend → GIMPLE IR → RTL → Assembly.",
    explanation: "GCC uses multiple intermediate representations.",
    hint: "Multi-stage.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "How does CPython compile expressions?",
    shortAnswer: "It compiles source to bytecode for the Python VM.",
    explanation: "Python bytecode is stack-based, similar to JVM.",
    hint: "Bytecode.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is LLVM?",
    shortAnswer: "A compiler infrastructure that uses a language-independent IR.",
    explanation: "LLVM IR can be optimized and targeted to multiple architectures.",
    hint: "Compiler infrastructure.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference between an interpreter and a compiler?",
    shortAnswer: "A compiler translates code ahead of time; an interpreter executes code directly.",
    explanation: "Interpreters often use a similar pipeline but execute on the fly.",
    hint: "Translation vs execution.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Why is postfix notation good for code generation?",
    shortAnswer: "It maps naturally to stack instructions.",
    explanation: "Postfix can be evaluated with a stack, matching many virtual machines.",
    hint: "Stack.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is a symbol table in a compiler?",
    shortAnswer: "A data structure that stores variable and function information.",
    explanation: "Used for scope resolution and type checking.",
    hint: "Variable info.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of the parser in expression evaluation?",
    shortAnswer: "To build the AST respecting precedence and parentheses.",
    explanation: "The parser ensures the expression is syntactically correct.",
    hint: "AST builder.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "How does a compiler handle operator precedence?",
    shortAnswer: "By defining precedence levels in the grammar and using them during parsing.",
    explanation: "Higher precedence operators are grouped first in the AST.",
    hint: "Grammar.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference between an AST and a parse tree?",
    shortAnswer: "AST is abstract and ignores syntax details like parentheses; parse tree includes all tokens.",
    explanation: "AST is more compact and used in later phases.",
    hint: "Abstract vs detailed.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is a stack machine in the context of compilers?",
    shortAnswer: "A virtual machine that uses a stack for all operations.",
    explanation: "JVM, Python VM, and many interpreters use stack-based evaluation.",
    hint: "Stack-based.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of the lexer in a compiler?",
    shortAnswer: "To scan the source code and produce tokens.",
    explanation: "Lexer removes comments and whitespace, and identifies tokens.",
    hint: "Tokenization.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is semantic analysis in a compiler?",
    shortAnswer: "Checking the meaning of the program (type checking, variable declarations).",
    explanation: "Semantic analysis ensures the program is logically correct.",
    hint: "Meaning check.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is an optimization pass in a compiler?",
    shortAnswer: "A phase that improves the performance of the generated code.",
    explanation: "Optimizations can be machine-specific or general.",
    hint: "Improve performance.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference between a frontend and a backend in a compiler?",
    shortAnswer: "Frontend handles source language parsing; backend handles code generation.",
    explanation: "Frontend produces IR, backend consumes IR and generates code.",
    hint: "Source vs target.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "How do compilers handle variables during code generation?",
    shortAnswer: "By using a symbol table and allocating storage (registers or memory).",
    explanation: "Variables are mapped to memory locations or registers.",
    hint: "Allocation.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the purpose of a compiler's intermediate representation?",
    shortAnswer: "To provide a language-independent format for optimization and code generation.",
    explanation: "IR simplifies the compiler architecture.",
    hint: "Language-independent.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "How does a JIT (Just-In-Time) compiler differ from a traditional compiler?",
    shortAnswer: "JIT compiles code at runtime, often from bytecode to machine code.",
    explanation: "JIT can optimize based on runtime information.",
    hint: "Runtime compilation.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of expression conversion in a compiler's IR?",
    shortAnswer: "To simplify the representation of expressions for code generation.",
    explanation: "Postfix/prefix IR makes it easy to generate stack-based code.",
    hint: "Simplify.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What are some common compiler optimizations?",
    shortAnswer: "Constant folding, dead code elimination, loop unrolling, and inlining.",
    explanation: "Optimizations improve speed and reduce memory usage.",
    hint: "Many.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "How would you design a simple expression compiler?",
    shortAnswer: "Implement a lexer, parser (recursive descent or shunting-yard), and code generator.",
    explanation: "You can use infix-to-postfix conversion and stack-based code generation.",
    hint: "Pipeline.",
    level: "expert",
    codeExample: "Not applicable"
  }
];

export default questions;