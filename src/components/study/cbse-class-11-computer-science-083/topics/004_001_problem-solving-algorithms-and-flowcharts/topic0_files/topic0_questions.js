const questions = [
  {
    id: 1,
    question: "What is the correct sequential order of steps in the computer problem-solving lifecycle?",
    options: [
      "Coding -> Testing -> Problem Definition -> Algorithm Design",
      "Problem Definition & Analysis -> Algorithm Design (Flowchart/Pseudocode) -> Coding (Implementation) -> Testing & Debugging -> Documentation",
      "Testing -> Coding -> Algorithm -> Maintenance",
      "Flowchart -> Hardware Purchase -> Testing -> Coding"
    ],
    correctAnswer: 1,
    explanation: "The systematic problem-solving cycle begins with Problem Definition & Understanding, followed by Algorithm/Flowchart Design, Program Implementation (Coding), Testing & Debugging, and final Documentation/Maintenance.",
    hint: "Understand the problem before designing algorithms and writing code."
  },
  {
    id: 2,
    question: "What is an Algorithm in computer programming?",
    options: [
      "A physical chip on the motherboard",
      "A step-by-step, finite sequence of well-defined, unambiguous computational instructions to solve a given problem",
      "A compiled binary .exe file",
      "A programming error message"
    ],
    correctAnswer: 1,
    explanation: "An algorithm is an abstract, language-independent, finite, unambiguous, step-by-step procedure that accepts inputs and produces expected outputs.",
    hint: "Finite step-by-step logical instructions."
  },
  {
    id: 3,
    question: "In standard flowchart notation, which geometrical shape represents an 'Input / Output' operation?",
    options: [
      "Rectangle",
      "Parallelogram",
      "Diamond (Rhombus)",
      "Oval / Rounded Rectangle"
    ],
    correctAnswer: 1,
    explanation: "A Parallelogram is used to represent Input (e.g., `READ A, B` or `INPUT N`) and Output (e.g., `PRINT SUM`) operations.",
    hint: "Parallelogram = Input / Output."
  },
  {
    id: 4,
    question: "Which flowchart symbol represents a 'Decision / Condition' with multiple branch pathways?",
    options: [
      "Diamond (Rhombus)",
      "Rectangle",
      "Circle",
      "Parallelogram"
    ],
    correctAnswer: 0,
    explanation: "A Diamond (Rhombus) represents a conditional decision point with test conditions (e.g. `Is X > 0?`) that branch into 'Yes/True' and 'No/False' paths.",
    hint: "Diamond = Decision / Condition."
  },
  {
    id: 5,
    question: "Which flowchart symbol represents an internal computational step or processing action (e.g. `SUM = A + B`)?",
    options: [
      "Rectangle",
      "Oval",
      "Diamond",
      "Parallelogram"
    ],
    correctAnswer: 0,
    explanation: "A Rectangle is used for general computational processing, arithmetic calculations, and variable assignments.",
    hint: "Rectangle = Processing / Computation."
  },
  {
    id: 6,
    question: "Which flowchart symbol represents the Start and Stop (Terminal) of an algorithm?",
    options: [
      "Oval / Ellipse (Rounded Rectangle)",
      "Rectangle",
      "Diamond",
      "Triangle"
    ],
    correctAnswer: 0,
    explanation: "An Oval (or rounded capsule) denotes the Start or Stop / End terminal point of a flowchart.",
    hint: "Oval = Start / Stop."
  },
  {
    id: 7,
    question: "What is the purpose of a Small Circle symbol in complex flowcharts?",
    options: [
      "To multiply two variables",
      "To act as a Connector linking different flowlines or pages without drawing crossing lines",
      "To stop the program immediately",
      "To declare a floating point variable"
    ],
    correctAnswer: 1,
    explanation: "A small circle serves as a Connector symbol to join converging flowlines or connect flowchart sections across page boundaries cleanly.",
    hint: "Connector joining pathways."
  },
  {
    id: 8,
    question: "What is Pseudocode?",
    options: [
      "Incorrect code with intentional syntax errors",
      "An informal, high-level, human-readable description of an algorithm that uses structured programming constructs without strict programming language syntax",
      "Machine code executed directly by the CPU",
      "Encrypted source code"
    ],
    correctAnswer: 1,
    explanation: "Pseudocode is an informal, semi-structured English notation that outlines algorithmic logic using keywords like `IF`, `THEN`, `ELSE`, `WHILE`, `FOR`, `OUTPUT` without strict compiler syntax rules.",
    hint: "Informal, human-readable structured outline of an algorithm."
  },
  {
    id: 9,
    question: "What is a 'Dry Run' (or Manual Code Tracing) in algorithm testing?",
    options: [
      "Running code on a computer with the fan turned off",
      "Manually executing the steps of an algorithm on paper using a Trace Table with sample test inputs to verify variable state changes and logic correctness",
      "Compiling code without an internet connection",
      "Checking code formatting rules"
    ],
    correctAnswer: 1,
    explanation: "A Dry Run is manual mental/paper execution where the programmer steps through lines of code, updating variable values in a Trace Table to detect logical errors before execution.",
    hint: "Manual step-by-step tracing on paper with a trace table."
  },
  {
    id: 10,
    question: "Which characteristic is NOT a mandatory property of a well-designed algorithm?",
    options: [
      "Finiteness (must terminate after a countable number of steps)",
      "Unambiguity (each instruction must be clear and precise)",
      "Language Dependence (must be written exclusively in Python)",
      "Feasibility (every operation must be physically achievable)"
    ],
    correctAnswer: 2,
    explanation: "Algorithms are fundamentally independent of any specific programming language. The same algorithm can be implemented in Python, C++, Java, or Rust.",
    hint: "Algorithms are language-independent."
  },
  {
    id: 11,
    question: "What is Euclid's Algorithm used for?",
    options: [
      "Finding the Greatest Common Divisor (GCD / HCF) of two positive integers using repeated division / modulo",
      "Calculating square roots",
      "Sorting an array of numbers",
      "Generating random numbers"
    ],
    correctAnswer: 0,
    explanation: "Euclid's Algorithm computes the GCD of two numbers by repeatedly replacing $(a, b)$ with $(b, a \pmod b)$ until the remainder reaches 0.",
    hint: "Greatest Common Divisor (GCD) computation."
  },
  {
    id: 12,
    question: "In the algorithm to find the largest of two numbers A and B, which decision condition should be tested?",
    options: [
      "Is A > B?",
      "Is A + B == 0?",
      "Is A * B > 0?",
      "Is A / B == 1?"
    ],
    correctAnswer: 0,
    explanation: "Testing `A > B` determines whether `A` is strictly larger (True path) or `B` is larger/equal (False path).",
    hint: "Compare A and B using the relational greater-than operator."
  },
  {
    id: 13,
    question: "What is an 'Infinite Loop' in algorithmic execution?",
    options: [
      "A loop that repeats indefinitely because its termination condition is never satisfied",
      "A loop with 1,000 iterations",
      "A fast loop executing in GPU memory",
      "A loop with no variables"
    ],
    correctAnswer: 0,
    explanation: "An infinite loop occurs when loop control variables are never updated toward the exit condition, causing the algorithm to violate the principle of Finiteness.",
    hint: "A loop whose termination condition never becomes false."
  },
  {
    id: 14,
    question: "What is the output of dry-running this algorithm with N = 5?\n1. Initialize FACT = 1, I = 1\n2. WHILE I <= N DO\n     FACT = FACT * I\n     I = I + 1\n3. PRINT FACT",
    options: ["15", "120", "24", "720"],
    correctAnswer: 1,
    explanation: "I=1: FACT=1; I=2: FACT=2; I=3: FACT=6; I=4: FACT=24; I=5: FACT=120. When I=6, loop exits. Output is 120 (5!).",
    hint: "5! = 5 * 4 * 3 * 2 * 1 = 120."
  },
  {
    id: 15,
    question: "Which directional arrows are standard in flowchart design?",
    options: [
      "Flowlines connecting symbols with arrowheads pointing the direction of execution flow (Top to Bottom, Left to Right)",
      "Dotted lines without arrowheads",
      "Circular curves only",
      "Diagonal zigzag lines"
    ],
    correctAnswer: 0,
    explanation: "Standard flowchart guidelines specify flowlines with arrowheads generally directing top-to-bottom and left-to-right execution paths.",
    hint: "Flowlines with directional arrowheads."
  },
  {
    id: 16,
    question: "What is the time complexity category of a simple linear search algorithm checking N elements sequentially?",
    options: [
      "O(1) Constant Time",
      "O(N) Linear Time",
      "O(N²) Quadratic Time",
      "O(log N) Logarithmic Time"
    ],
    correctAnswer: 1,
    explanation: "Linear search checks each element one by one up to $N$ times in the worst case, giving $O(N)$ linear time complexity.",
    hint: "Proportional directly to the number of elements N."
  },
  {
    id: 17,
    question: "Which problem-solving approach breaks a complex problem down into smaller, manageable, independent sub-problems?",
    options: [
      "Top-Down Modular Decomposition (Divide and Conquer)",
      "Trial and Error",
      "Brute Force Guessing",
      "Bottom-Up Random Search"
    ],
    correctAnswer: 0,
    explanation: "Top-Down modular design decomposes large problems into smaller logical modules or subroutines that can be developed and tested independently.",
    hint: "Modular decomposition / Divide and Conquer."
  },
  {
    id: 18,
    question: "What is a 'Trace Table' used for?",
    options: [
      "Drawing flowcharts in Microsoft Paint",
      "A structured grid with columns for line numbers, variables, and conditions used during manual dry runs to track state values step-by-step",
      "Storing database records",
      "Writing CSS table styling"
    ],
    correctAnswer: 1,
    explanation: "A Trace Table has columns for step number, condition evaluations, and every active variable, recording their exact mathematical values after each execution step.",
    hint: "Grid tracking variable values during dry runs."
  },
  {
    id: 19,
    question: "What is the purpose of testing an algorithm with 'Edge Cases' (Boundary Values)?",
    options: [
      "To ensure the algorithm handles extreme or boundary inputs correctly (e.g. 0, negative numbers, empty strings, maximum integers)",
      "To test if the monitor screen works",
      "To color the edges of the flowchart",
      "To check internet bandwidth"
    ],
    correctAnswer: 0,
    explanation: "Boundary and edge testing verifies that algorithms do not crash or produce flawed output on edge conditions like empty inputs, division by zero, or negative numbers.",
    hint: "Testing extreme inputs like 0, negative values, and limits."
  },
  {
    id: 20,
    question: "In algorithm design, what does the term 'Efficiency' refer to?",
    options: [
      "The color of the code editor theme",
      "The resource consumption of the algorithm in terms of execution time (Time Complexity) and memory usage (Space Complexity)",
      "The number of comments in the program",
      "How quickly a student can type the code"
    ],
    correctAnswer: 1,
    explanation: "Algorithmic efficiency measures Time Complexity (how execution time scales with input size $N$) and Space Complexity (how much memory is consumed).",
    hint: "Time and space (memory) resource consumption."
  },
  {
    id: 21,
    question: "Dry Run: What is the final value of S when the following steps execute?\n1. S = 0, K = 1\n2. WHILE K <= 4 DO\n     S = S + (K * K)\n     K = K + 1\n3. PRINT S",
    options: ["10", "30", "16", "20"],
    correctAnswer: 1,
    explanation: "K=1: S=0+1=1; K=2: S=1+4=5; K=3: S=5+9=14; K=4: S=14+16=30. When K=5, loop terminates. Sum of squares = 1² + 2² + 3² + 4² = 30.",
    hint: "1 + 4 + 9 + 16 = 30."
  },
  {
    id: 22,
    question: "Which of the following is a valid representation of a condition in pseudocode?",
    options: [
      "IF marks >= 33 THEN OUTPUT 'PASS' ELSE OUTPUT 'FAIL'",
      "DO marks WHILE 33",
      "MAKE marks 33",
      "GOTO PASS"
    ],
    correctAnswer: 0,
    explanation: "`IF condition THEN action1 ELSE action2` is standard, structured conditional pseudocode syntax.",
    hint: "IF-THEN-ELSE structured format."
  },
  {
    id: 23,
    question: "Why should flowcharts avoid crossing flowlines wherever possible?",
    options: [
      "Because crossing flowlines creates visual confusion and ambiguity in execution paths",
      "Because compilers cannot parse crossing lines",
      "Because flowcharts must be square",
      "Because it violates copyright law"
    ],
    correctAnswer: 0,
    explanation: "Crossing flowlines reduce readability and cause ambiguity; connectors should be used instead to maintain clear top-to-bottom and left-to-right flow.",
    hint: "Use connectors to prevent visual ambiguity."
  },
  {
    id: 24,
    question: "What is the primary role of Documentation in software engineering?",
    options: [
      "To explain program logic, architecture, usage instructions, and APIs for future maintenance and collaborative development",
      "To increase the size of the repository",
      "To hide source code from users",
      "To speed up compiler execution"
    ],
    correctAnswer: 0,
    explanation: "Documentation preserves program rationale, clarifies algorithmic design, details parameter constraints, and allows other programmers to maintain and extend the software.",
    hint: "Clear explanations facilitating maintenance and collaboration."
  },
  {
    id: 25,
    question: "Case Study: Debangshu is writing an algorithm to check whether a year is a Leap Year. Which combination of conditions is mathematically correct?",
    options: [
      "Year is divisible by 4 AND (Year is NOT divisible by 100 OR Year is divisible by 400)",
      "Year is divisible by 4 only",
      "Year is divisible by 100 only",
      "Year is divisible by 2"
    ],
    correctAnswer: 0,
    explanation: "In the Gregorian calendar, a year is a leap year if `(year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)`.",
    hint: "Divisible by 4, not century year unless divisible by 400."
  }
];

export default questions;
