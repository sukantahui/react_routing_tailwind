const questions = [
  {
    "question": "What is a Variable Description Table (VDT) in ICSE Computer Applications?",
    "shortAnswer": "A VDT is a structured table required at the end of every Section B program that documents every variable used, its data type, and its functional purpose in the algorithm.",
    "explanation": "CISCE strictly assesses code documentation. A VDT proves that the student understands why each variable was declared, its scope, and how it contributes to the solution. In official board marking schemes, 2 to 3 marks out of 15 are exclusively reserved for the VDT and comments.",
    "hint": "Columns: Variable Name | Data Type | Purpose.",
    "level": "basic",
    "codeExample": "// Variable Name | Data Type | Purpose\n// int n | int | Stores user input number"
  },
  {
    "question": "What are the exact columns required in an ICSE Variable Description Table?",
    "shortAnswer": "The standard columns are: Variable Name, Data Type, and Purpose / Description (optional Sl. No.).",
    "explanation": "Formatting: Column 1 is 'Variable Name' (must match the code identifier exactly), Column 2 is 'Data Type' (e.g. int, double, String, boolean, char, Scanner), and Column 3 is 'Purpose' (a clear explanation of what data it stores or how it acts in the algorithm).",
    "hint": "Use a pencil and ruler to draw clean borders; examiners appreciate neat presentation.",
    "level": "basic",
    "codeExample": "| Variable Name | Data Type | Purpose |\n| arr | int[] | Stores 10 user integers |"
  },
  {
    "question": "What is the biggest mistake students make when describing the purpose of a variable in a VDT?",
    "shortAnswer": "Writing vague, tautological descriptions like 'stores i' or 'used for loop' instead of describing its algorithmic role.",
    "explanation": "Writing 'i: used for loop' or 'n: stores integer' loses marks. Write precise functional descriptions: 'i: loop counter variable used to iterate through array indices from 0 to n-1', 'flag: boolean indicator to track whether the search key was located'.",
    "hint": "Ask yourself: WHAT data is inside this variable and WHY does the program need it?",
    "level": "intermediate",
    "codeExample": "// VAGUE: 'temp: stores temporary value'\n// PRECISE: 'temp: temporary variable used to swap adjacent array elements during sorting'"
  },
  {
    "question": "Do loop counters like `i` and `j` need to be included in the Variable Description Table?",
    "shortAnswer": "YES, absolutely. Every variable declared anywhere in the class or method must be included in the VDT.",
    "explanation": "Even loop counters (`int i`), temporary variables (`int temp`), flags (`boolean found`), and Scanner objects (`Scanner sc`) must be listed. Omitting variables results in partial loss of the 3 VDT marks.",
    "hint": "Scan your source code line by line from top to bottom to make sure no variable was missed.",
    "level": "basic",
    "codeExample": "| i | int | Loop index for iterating through rows of the 2D matrix |"
  },
  {
    "question": "How should `Scanner sc` or other object references be described in a VDT?",
    "shortAnswer": "Variable Name: `sc`, Data Type: `Scanner`, Purpose: 'Object reference to Scanner class used to accept user input from keyboard'.",
    "explanation": "Object references are reference variables in Java. Listing `Scanner` as the data type and explaining that it wraps `System.in` for console input shows strong conceptual clarity.",
    "hint": "Data type is 'Scanner', not 'class' or 'object'.",
    "level": "basic",
    "codeExample": "| sc | Scanner | Object reference used to read user input from System.in |"
  },
  {
    "question": "How should the 2 hours and 15 minutes of the ICSE examination be budgeted?",
    "shortAnswer": "15 min Reading: Question triage; 30 min: Section A; 70 min: Section B (4 programs x 17.5 min); 20 min: Comprehensive revision and VDT audit.",
    "explanation": "Time breakdown:\n- 0:00 - 0:15 (Reading): Select 4 Section B questions, eliminate 2.\n- 0:15 - 0:45 (30m): Section A (20 MCQs + 10 Short questions).\n- 0:45 - 1:55 (70m): Section B (approx 17 mins per program including VDT).\n- 1:55 - 2:15 (20m): Review all answers, trace tricky snippets, verify semicolon closures and VDT completeness.",
    "hint": "Never spend more than 20 minutes on any single Section B question.",
    "level": "intermediate",
    "codeExample": "// Total Writing Time: 120 minutes (2 Hours)"
  },
  {
    "question": "What is a Dry Run Trace Table and how does it help prevent output prediction errors?",
    "shortAnswer": "A Dry Run Trace Table is a tabular tracking of variables column-by-column across each iteration of a loop or execution step.",
    "explanation": "Columns represent each variable (e.g., `i`, `x`, `condition`, `output`). For each step, you write down the current values. This completely eliminates mental arithmetic mistakes, especially with prefix/postfix operators and complex boolean conditions.",
    "hint": "Draw a small 4-column trace table in pencil in the rough space for Question 2 snippets.",
    "level": "intermediate",
    "codeExample": "| Step | i | sum | Condition (i<=5) |\n| 1 | 1 | 1 | TRUE |\n| 2 | 2 | 3 | TRUE |"
  },
  {
    "question": "If a variable is declared inside a method (local variable), is its scope limited to that method?",
    "shortAnswer": "Yes, local variables only exist during the execution of that block or method and cannot be accessed outside.",
    "explanation": "In contrast, instance variables (fields) exist as long as the object lives and are accessible to all non-static methods in the class. In the VDT, you may specify whether a variable is an 'Instance variable' or 'Local variable' in the description.",
    "hint": "Distinguishing instance variables from local variables in VDT demonstrates advanced OOP understanding.",
    "level": "intermediate",
    "codeExample": "| units | int | Instance variable storing total electricity units consumed |"
  },
  {
    "question": "How should an array variable like `int[] arr` be listed in the VDT?",
    "shortAnswer": "Variable Name: `arr`, Data Type: `int[]` or `int array`, Purpose: 'Single dimensional integer array to store 15 numeric elements'.",
    "explanation": "Always specify the dimensions (1D or 2D) and the capacity/size if known. For 2D matrices, write `int[][]` and mention rows and columns (e.g., '4x4 double dimensional matrix').",
    "hint": "Writing `int` instead of `int[]` for an array is a penalizable error.",
    "level": "basic",
    "codeExample": "| mat | int[][] | 4x4 2D integer array to store matrix cell values |"
  },
  {
    "question": "What is the recommended strategy if you realize your program logic has a flaw halfway through writing?",
    "shortAnswer": "Do not scribble frantically. Draw a single neat diagonal pencil strike through the flawed section, write the corrected logic clearly below, and ensure the VDT reflects all used variables.",
    "explanation": "Messy, overwriting scribbles make answers unreadable for examiners. Neat cancellation is fully acceptable. Even if code is incomplete, partial marks are awarded for class structure (3 marks), variable declarations, and logic fragments.",
    "hint": "Partial credit is always awarded by CISCE examiners if the structure and VDT are intact.",
    "level": "intermediate",
    "codeExample": "// Partial marking: Class declaration (1m) + Variables (2m) + Input (2m)"
  },
  {
    "question": "What is an Accumulator variable, and how should it be described in a VDT?",
    "shortAnswer": "An accumulator is a variable that gathers or sums successive values across iterations, typically initialized to 0 (for addition) or 1 (for multiplication).",
    "explanation": "Description: 'sum: accumulator variable initialized to 0 to store the running total of array elements', or 'prod: accumulator initialized to 1 to compute the factorial product'.",
    "hint": "Terms like 'accumulator', 'flag', and 'counter' are formal terms examiners love to see.",
    "level": "intermediate",
    "codeExample": "| sum | double | Accumulator variable initialized to 0.0 to sum marks |"
  },
  {
    "question": "What is a Flag variable and how should its purpose be documented in a VDT?",
    "shortAnswer": "A flag is a boolean (or integer 0/1) variable used to signal the occurrence of an event (e.g. key found, prime status, symmetry condition).",
    "explanation": "Description: 'found: boolean flag variable initialized to false, toggled to true if the search key is matched in the array', or 'isSymmetric: boolean flag to track if mat[i][j] equals mat[j][i]'.",
    "hint": "Always state both its initial state and what triggering condition changes it.",
    "level": "intermediate",
    "codeExample": "| found | boolean | Flag variable set to true when search element is found |"
  },
  {
    "question": "Can comments inside the code replace the Variable Description Table?",
    "shortAnswer": "NO. Inline comments do NOT replace the VDT. The VDT must be drawn as a separate table at the end of the program.",
    "explanation": "Inline comments help readability and earn marks for documentation, but the official ICSE question paper explicitly commands: 'Each program should be written using Variable descriptions/Mnemonic Codes'. The separate table is mandatory.",
    "hint": "Always place the VDT immediately after the closing brace `}` of the class.",
    "level": "basic",
    "codeExample": "// Place VDT right after class closing brace:\n// } // End of Class\n// Variable Description Table:"
  },
  {
    "question": "How many marks are deducted if the VDT is completely omitted in Section B?",
    "shortAnswer": "Typically 2 to 3 marks are deducted per question. Across 4 questions, that amounts to a loss of 8 to 12 marks!",
    "explanation": "A student with 100% logically correct code across all 4 programs can drop from 100/100 to 88/100 purely due to missing VDTs! Never skip the VDT.",
    "hint": "Even if running short on time, spend 60 seconds jotting down a quick 3-column VDT.",
    "level": "basic",
    "codeExample": "// 4 questions x 3 marks = 12 potential marks lost!"
  },
  {
    "question": "What is the best way to choose the 4 questions in Section B during the 15 minutes reading time?",
    "shortAnswer": "Choose questions where you are 100% certain of both the algorithmic logic AND the syntax, prioritizing Class Design and Overloading first.",
    "explanation": "Questions like Question 3 (Class Design) and Question 6 (Overloading) have highly structured, mechanical steps with zero algorithmic risk. Strings and Arrays are standard. Choose special number or 2D matrix questions only if you know the exact formula.",
    "hint": "Safest 4: Class Design, 1D Array Search/Sort, String manipulation, Method Overloading.",
    "level": "intermediate",
    "codeExample": "// Recommended selection: Q3, Q4, Q5, Q6"
  },
  {
    "question": "How should method parameters be documented if a method has parameters?",
    "shortAnswer": "List them in the VDT with their data types and indicate that they are formal parameters passed into the method.",
    "explanation": "Example for `void series(int x, int n)`: `x: int - formal parameter receiving the base value`, `n: int - formal parameter receiving the number of terms to calculate`.",
    "hint": "Specify which method the parameter belongs to.",
    "level": "intermediate",
    "codeExample": "| x | int | Formal parameter in series() storing base value |"
  },
  {
    "question": "Why should students write mnemonic variable names in ICSE code?",
    "shortAnswer": "Mnemonic names (like `vowelCount`, `totalBill`, `searchKey`, `lowestScore`) convey meaning instantly, reducing bugs and impressing examiners.",
    "explanation": "Using single letter names for everything (`a`, `b`, `c`, `d`, `e`) creates confusion during dry running and makes writing the VDT tedious. Standard loop counters like `i`, `j` are fine, but business variables should be descriptive.",
    "hint": "Use camelCase: `firstHalf`, `digitSum`, `maxScore`.",
    "level": "basic",
    "codeExample": "int vowelCount = 0; // Clear mnemonic naming"
  },
  {
    "question": "What is the difference between Actual Parameters and Formal Parameters in a trace table?",
    "shortAnswer": "Actual parameters are the real values or variables passed into a method call; formal parameters are the variables defined in the method signature that receive those values.",
    "explanation": "In `obj.series(a, b);`, `a` and `b` are actual parameters. In `public void series(int x, int n)`, `x` and `n` are formal parameters. Changes to primitive formal parameters do not affect actual parameters (Pass by Value).",
    "hint": "Actual parameters reside in the caller; Formal parameters reside in the called method.",
    "level": "intermediate",
    "codeExample": "calc(num); // num = actual parameter\nvoid calc(int val) // val = formal parameter"
  },
  {
    "question": "How to handle time if you find yourself with only 10 minutes left for the 4th program?",
    "shortAnswer": "Write the class skeleton, variable declarations, input statements, core loop outline, and the VDT. You can still salvage 10 out of 15 marks!",
    "explanation": "CISCE uses step marking: 1 mark for class header, 2 marks for variable declarations, 2 marks for input, 3 marks for VDT, and partial marks for loop headers. Leaving it blank scores 0; writing the skeleton scores 8-10 marks.",
    "hint": "Never leave a Section B question blank when running out of time.",
    "level": "intermediate",
    "codeExample": "// Partial mark harvest: Skeleton + Scanner + VDT = 8 to 10 marks!"
  },
  {
    "question": "How do examiners award marks for the `main()` method in Section B?",
    "shortAnswer": "Typically 2 to 3 marks are allocated for creating the class object, instantiating it with `new`, and calling the member methods in logical sequence.",
    "explanation": "In Class Design questions (Question 3), the prompt says: 'Write a main method to create an object and call the above methods'. Omitting `public static void main(String[] args)` or failing to invoke the methods loses 2-3 marks.",
    "hint": "Always include `obj.accept(); obj.calculate(); obj.print();` inside `main()`.",
    "level": "basic",
    "codeExample": "public static void main(String[] args) {\n    ElectricBill obj = new ElectricBill();\n    obj.accept(); obj.calculate(); obj.print();\n}"
  },
  {
    "question": "What is a Sentinel-controlled loop vs a Counter-controlled loop?",
    "shortAnswer": "A counter-controlled loop executes a predetermined number of times using a loop counter; a sentinel-controlled loop runs until a special sentinel value (e.g. -1 or 999) is entered.",
    "explanation": "ICSE questions usually specify counter-controlled loops (e.g. 'input 15 elements'), but occasionally mention sentinel termination ('input integers until 0 is entered'). Mention the sentinel value in the VDT.",
    "hint": "For sentinel loops, check condition before processing.",
    "level": "intermediate",
    "codeExample": "while (num != 0) { ... num = sc.nextInt(); }"
  },
  {
    "question": "How should Constants defined with `final` be documented in a VDT?",
    "shortAnswer": "List the variable name in UPPER_CASE, data type, and specify that it is a constant fixing a specific configuration value.",
    "explanation": "Example: `PI: double - constant storing mathematical value 3.14159`, `MAX_SIZE: int - constant defining array capacity of 20 elements`.",
    "hint": "Mention the `final` keyword role in the purpose description.",
    "level": "intermediate",
    "codeExample": "| MAX_SIZE | int | Constant specifying maximum array capacity of 20 |"
  },
  {
    "question": "What is the recommended layout for drawing the VDT on your CISCE answer script?",
    "shortAnswer": "Draw a 3-column table across the width of the page using a ruler. Column 1: Variable Name (25%), Column 2: Data Type (25%), Column 3: Purpose / Description (50%).",
    "explanation": "Neat presentation creates an immediate impression of mastery. Underline headings, draw neat horizontal divider lines between rows, and keep handwriting legible.",
    "hint": "Never write the VDT in the margins.",
    "level": "basic",
    "codeExample": "| Variable Name | Data Type | Purpose / Description |"
  },
  {
    "question": "Can variable description tables be written in bullet points instead of a grid table?",
    "shortAnswer": "While examiners accept neatly bulleted lists, a boxed grid table is the universally recognized CISCE gold standard and minimizes any risk of mark deduction.",
    "explanation": "A clean grid with columns 'Variable Name | Data Type | Purpose' matches the exact sample solutions published in CISCE Pupil Performance analysis booklets.",
    "hint": "Always use a grid table.",
    "level": "basic",
    "codeExample": "+---------------+-----------+-----------------------------------+\n| Variable Name | Data Type | Purpose                           |\n+---------------+-----------+-----------------------------------+"
  },
  {
    "question": "What final 5-minute review checklist should every ICSE student execute before submitting the answer script?",
    "shortAnswer": "1. Verify question numbering against the question paper. 2. Ensure all matching braces `{}` are closed. 3. Check semicolons. 4. Confirm Scanner is imported and closed. 5. Verify all 4 Section B programs have complete VDTs.",
    "explanation": "In the heat of the exam, students often forget a closing curly brace or accidentally misnumber a question (e.g. labeling Question 4 as Question 5). This 5-minute audit catches simple administrative mistakes that could cost 5-10 marks.",
    "hint": "Check off each question number on the question paper as you verify it on your script.",
    "level": "basic",
    "codeExample": "// Checklist: Numbers, Braces, Semicolons, Imports, VDTs"
  }
];

export default questions;
