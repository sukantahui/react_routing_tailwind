// topic0_files/topic0_questions.js
// 30 questions about Constants and Variables

const questions = [
    {
        question: "What is the difference between a variable and a constant?",
        shortAnswer: "Variables can change value; constants cannot after initialization.",
        explanation: "In Java, constants are declared using the `final` keyword. Variables allow modification throughout program execution, while constants represent fixed values, improving readability and safety.",
        hint: "Think of a variable as a whiteboard that can be erased, a constant as an engraved stone.",
        level: "basic",
        codeExample: "int age = 25;     // variable\nfinal double PI = 3.14; // constant"
    },
    {
        question: "What does 'declaration' mean? Give an example.",
        shortAnswer: "Declaration introduces a variable's type and name without assigning a value.",
        explanation: "It tells the compiler about the variable's existence and type. Memory is not allocated at this stage (except for primitive local variables, memory is conceptually allocated at declaration).",
        hint: "Like reserving a seat with a label but no one sitting yet.",
        level: "basic",
        codeExample: "int totalMarks;   // declaration\nString studentName;"
    },
    {
        question: "What is initialization? Why is it mandatory for local variables?",
        shortAnswer: "Assigning an initial value to a variable. Local variables must be initialized before use to avoid garbage values.",
        explanation: "Java does not assign default values to local variables (unlike instance variables). Using an uninitialized local variable causes a compile-time error. This prevents bugs from reading undefined state.",
        hint: "Try printing a local variable without giving it any value – Java will refuse to compile.",
        level: "intermediate",
        codeExample: "int x;       // declared but not initialized\n// System.out.println(x); // ERROR\nx = 10;     // initialization\nSystem.out.println(x); // OK"
    },
    {
        question: "Explain variable scope with a real-world analogy.",
        shortAnswer: "Scope defines where a variable is accessible – like a room where only people inside can see a whiteboard.",
        explanation: "Scope can be class-level (whole class), method-level (inside method), or block-level (inside { }). Variables declared inside a block die after the block ends.",
        hint: "Think about Swadeep's notebook: only he sees notes written inside his room, not outside.",
        level: "basic",
        codeExample: "public class Test {\n    int classVar; // accessible everywhere in class\n    void method() {\n        int localVar; // only inside method\n    }\n}"
    },
    {
        question: "What are the default values of instance variables in Java?",
        shortAnswer: "0 for numeric primitives, false for boolean, null for objects, '\\u0000' for char.",
        explanation: "Java ensures instance variables (non-static fields) get default values when an object is created. Local variables do not get defaults and must be initialized manually.",
        hint: "Observe carefully: only class-level fields have defaults; method variables do not.",
        level: "basic",
        codeExample: "class Demo {\n    int i;      // 0\n    boolean b;  // false\n    String s;   // null\n}"
    },
    {
        question: "Can a final variable be left uninitialized?",
        shortAnswer: "Yes, it can be a blank final variable, but it must be initialized exactly once in every constructor or in an initializer block.",
        explanation: "Blank final variables provide flexibility: you can set different values per instance while still ensuring immutability after construction.",
        hint: "Try changing a blank final after constructor – compiler will stop you.",
        level: "intermediate",
        codeExample: "class Student {\n    final int rollNo;\n    Student(int r) { rollNo = r; }\n}"
    },
    {
        question: "What is variable shadowing? When should it be avoided?",
        shortAnswer: "Shadowing occurs when a variable in an inner scope has the same name as one in an outer scope, hiding the outer one.",
        explanation: "Parameter names or local variables can shadow instance variables. This can cause confusion. Use 'this' to access the instance variable. Avoid shadowing for clarity.",
        hint: "If you need 'this', you have shadowing. Prefer distinct names.",
        level: "intermediate",
        codeExample: "class Person {\n    String name;\n    void setName(String name) { this.name = name; } // shadow resolved by this\n}"
    },
    {
        question: "What is the lifetime of a local variable?",
        shortAnswer: "From the point of declaration until the end of the block where it is declared.",
        explanation: "Local variables are stored on the stack; they are created when the method (or block) is entered and destroyed when it exits. Therefore, they cannot be used outside their block.",
        hint: "Think of Tuhina buying a chai – the cup exists only while she is at the stall (block).",
        level: "basic",
        codeExample: "{\n    int x = 5;\n} // x dies here"
    },
    {
        question: "What is a static variable? How is it different from an instance variable?",
        shortAnswer: "Static variables belong to the class, shared among all objects; instance variables belong to each object separately.",
        explanation: "Static variables are initialized once when the class is loaded. They are useful for constants or counters shared across instances.",
        hint: "If Abhronila and Debangshu both see the same notice board, that's static; their own diaries are instance.",
        level: "intermediate",
        codeExample: "class Counter {\n    static int count = 0; // shared\n    int id;               // per object\n}"
    },
    {
        question: "What are the naming conventions for variables and constants in Java?",
        shortAnswer: "Variables: camelCase (studentName). Constants: UPPER_SNAKE_CASE (MAX_HEIGHT).",
        explanation: "Following conventions improves readability across teams. Constants are often `static final` and named with uppercase letters and underscores.",
        hint: "Spot the difference: `totalScore` vs `MAX_SCORE`.",
        level: "basic",
        codeExample: "int studentAge;\nfinal double TAX_RATE = 0.18;"
    },
    {
        question: "Explain the concept of 'final' parameter in a method.",
        shortAnswer: "A final parameter cannot be reassigned inside the method body.",
        explanation: "Declaring a parameter as final prevents accidental modification inside the method. It's a good practice for parameters that should remain unchanged.",
        hint: "Try modifying a final parameter – the compiler will object.",
        level: "intermediate",
        codeExample: "void setValue(final int val) {\n    // val = 10; // ERROR\n}"
    },
    {
        question: "What happens when you assign a larger primitive type to a smaller one?",
        shortAnswer: "Possible loss of data; requires explicit casting (narrowing conversion).",
        explanation: "While this relates to type conversion, constants and variables must store compatible types. Mixing types may need casting, but for constants, the compiler checks range.",
        hint: "Think of putting ocean water into a glass – you need to decide what to spill.",
        level: "intermediate",
        codeExample: "int big = 1000;\nbyte small = (byte) big; // explicit cast, may lose data"
    },
    {
        question: "Can we declare a variable as both static and final? What does it mean?",
        shortAnswer: "Yes. It creates a class-level constant that cannot be changed and is shared across all instances.",
        explanation: "`static final` variables are the most common way to define constants in Java. They are typically initialized at declaration or in static initializer blocks.",
        hint: "That's the standard for mathematical constants like PI.",
        level: "basic",
        codeExample: "public static final String APP_NAME = \"SchoolSys\";"
    },
    {
        question: "What is the default value of a char variable?",
        shortAnswer: "The null character '\\u0000' (Unicode 0).",
        explanation: "The default value for char is not a printable character; it's the null character. When printed, it may appear as nothing or a small box depending on the console.",
        hint: "Print an uninitialized char variable to see (or not see) the effect.",
        level: "basic",
        codeExample: "char c; // '\\u0000'"
    },
    {
        question: "How does scope affect garbage collection?",
        shortAnswer: "When a variable goes out of scope, it becomes eligible for garbage collection only if it references an object and no other references exist.",
        explanation: "Local variables in methods are cleaned up when the method ends, but objects they referenced might still be alive if stored elsewhere. Scope determines reachability.",
        hint: "An object can outlive the variable that created it if passed elsewhere.",
        level: "expert",
        codeExample: "void method() {\n    Student s = new Student();\n} // s goes out of scope, Student object may be GC"
    },
    {
        question: "What is the difference between declaration and definition in Java (compared to C/C++)?",
        shortAnswer: "In Java, declaration of primitive variables is also definition because memory is allocated. For methods, abstract methods are only declarations.",
        explanation: "Java abstracts memory management, but for variables, the declaration at class level implicitly allocates space. For local variables, space is allocated when the block is entered.",
        hint: "Unlike C, you can't have 'extern int x;' in Java.",
        level: "expert",
        codeExample: "int x; // declaration & definition (allocation) in Java"
    },
    {
        question: "What is a 'blank final' variable? Where can it be initialized?",
        shortAnswer: "A final variable declared without initialization. It must be initialized in every constructor or in an instance initializer block.",
        explanation: "Blank finals allow different constants per instance while preserving finality after construction. They are useful for immutable objects with constructor-provided values.",
        hint: "Observe carefully: static blank finals must be initialized in static blocks, not constructors.",
        level: "advanced",
        codeExample: "class Circle {\n    final double radius;\n    Circle(double r) { radius = r; }\n}"
    },
    {
        question: "Can a local variable be declared static? Why?",
        shortAnswer: "No. Static is only allowed at class level. Local variables belong to methods and cannot be static.",
        explanation: "Static variables are associated with the class, not with method invocations. Allowing static inside methods would be meaningless because each method call would need its own copy.",
        hint: "Try writing `static int x;` inside a method – compiler error.",
        level: "intermediate",
        codeExample: "void method() {\n    // static int y; // ERROR\n}"
    },
    {
        question: "Explain the concept of 'effectively final' in Java.",
        shortAnswer: "A variable that is not declared final but whose value never changes after initialization is 'effectively final'.",
        explanation: "From Java 8 onwards, lambda expressions can capture only final or effectively final local variables. It allows cleaner code without explicit final keyword.",
        hint: "If you can add `final` to a variable without causing an error, it's effectively final.",
        level: "advanced",
        codeExample: "int x = 10; // effectively final if never reassigned\nRunnable r = () -> System.out.println(x); // allowed"
    },
    {
        question: "What is the memory location of local, instance, and static variables?",
        shortAnswer: "Local variables: stack; Instance variables: heap (inside objects); Static variables: method area (metaspace).",
        explanation: "Understanding memory helps debug scope and lifetime issues. Stack is per-thread, heap is shared, method area stores class data.",
        hint: "Think of a fast-food counter: stack = order slip (temporary), heap = burger (persistent), static = menu board (shared).",
        level: "expert",
        codeExample: "// No code, conceptual"
    },
    {
        question: "Can an instance variable be accessed from a static method?",
        shortAnswer: "No, directly. You need an object reference.",
        explanation: "Static methods belong to the class, not any instance. Without an object, instance variables do not exist. Use `new Class().instanceVar` or pass an object.",
        hint: "Static methods cannot use 'this' – that's the clue.",
        level: "intermediate",
        codeExample: "class Test {\n    int inst = 5;\n    static void m() { System.out.println(inst); } // ERROR\n}"
    },
    {
        question: "What is the purpose of local variable type inference (var) in Java 10?",
        shortAnswer: "`var` allows the compiler to infer the type from the initializer, reducing boilerplate.",
        explanation: "`var` can only be used for local variables with initializers. It improves readability for complex generic types but should not be overused where type is not obvious.",
        hint: "Use `var` when the type is clear from the right-hand side, like `var list = new ArrayList<String>();`.",
        level: "advanced",
        codeExample: "var name = \"Swadeep\"; // infers String\nvar numbers = List.of(1,2,3); // infers List<Integer>"
    },
    {
        question: "How does variable shadowing interact with inheritance?",
        shortAnswer: "Subclass can declare a variable with same name as a superclass variable, hiding it (but not overriding like methods).",
        explanation: "Variables are resolved at compile-time based on reference type, not object type. This can cause confusion; prefer private fields with getters/setters.",
        hint: "Try accessing the variable through super to see both values.",
        level: "expert",
        codeExample: "class Parent { int x = 1; }\nclass Child extends Parent { int x = 2; }\n// ((Parent) child).x gives 1, child.x gives 2"
    },
    {
        question: "What are the restrictions on constant expression values?",
        shortAnswer: "Constant expressions can only use literals, final variables, and compile-time operators; result must be representable in the target type.",
        explanation: "Constants are evaluated at compile time. Non-constant expressions (e.g., method calls) cannot be used to initialize constants unless they are constant-foldable.",
        hint: "`final int MAX = 10 + 20;` works; `final int RAND = Math.random();` fails.",
        level: "advanced",
        codeExample: "final int SUM = 5 + 3; // constant expression\nfinal long L = 100L; // fine"
    },
    {
        question: "Explain 'definite assignment' rule in Java.",
        shortAnswer: "Java requires that every local variable must be definitely assigned before its value is read, enforced at compile time.",
        explanation: "The compiler uses flow analysis to ensure that for each possible execution path, a variable is assigned a value before any use. This prevents uninitialized local variable bugs.",
        hint: "If there's any path where variable is unassigned, compilation fails.",
        level: "expert",
        codeExample: "int x;\nif (flag) { x = 1; }\n// System.out.println(x); // ERROR if flag could be false"
    },
    {
        question: "What is the scope of a variable declared in a for-loop initializer?",
        shortAnswer: "The scope is the entire for statement, including the loop body and condition.",
        explanation: "Variables declared in the for-loop initializer are not accessible after the loop ends. This is a block-level scope.",
        hint: "After the loop, the variable is gone – so you cannot use it to check the last value.",
        level: "intermediate",
        codeExample: "for (int i = 0; i < 10; i++) { }\n// i is not defined here"
    },
    {
        question: "What happens if you try to assign a long literal to a float variable without casting?",
        shortAnswer: "Implicit widening conversion from long to float is allowed but may lose precision (possible loss of least significant bits).",
        explanation: "Java allows assignment of an int or long to a float because float has a larger range but limited precision. The compiler warns about possible precision loss.",
        hint: "Think of fitting a 8-digit number into a 6-digit display – rounding occurs.",
        level: "intermediate",
        codeExample: "long big = 123456789L;\nfloat f = big; // allowed, but f may be 1.2345679E8"
    },
    {
        question: "Can a constant be changed using reflection?",
        shortAnswer: "Yes, reflection can modify even final fields, but it is dangerous and should never be done in normal code.",
        explanation: "`final` is a compile-time and runtime protection but not absolute. Reflection can bypass access control and modify constants, leading to unpredictable behavior.",
        hint: "It's like picking a lock – possible but breaks the contract.",
        level: "expert",
        codeExample: "// Reflection code to set final field – not shown for safety"
    },
    {
        question: "What is the difference between primitive and reference variable initialization?",
        shortAnswer: "Primitive variables store values; reference variables store addresses (or null). Default for reference is null.",
        explanation: "References to objects default to null; accessing methods on a null reference causes NullPointerException. Primitive defaults are safe (0, false).",
        hint: "Null means 'no object'; you must create an object (new) to assign a non-null reference.",
        level: "basic",
        codeExample: "String s; // null by default\nint i; // 0"
    },
    {
        question: "Why can't we use a variable before its declaration?",
        shortAnswer: "Java is a statically-typed language; the compiler reads sequentially. Using a variable before its declaration would be an unknown symbol.",
        explanation: "Java's syntax requires declaration before usage in the source code (except for class methods/fields, which can be used in any order inside the class). Local variables must appear first.",
        hint: "Reorder your statements: declare, then use.",
        level: "basic",
        codeExample: "// System.out.println(x); // ERROR\nint x = 5;"
    }
];

export default questions;