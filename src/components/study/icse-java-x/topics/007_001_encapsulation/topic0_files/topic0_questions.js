const questions = [
  {
    "id": 1,
    "question": "What is the visibility scope of a data member declared with the 'private' modifier?",
    "shortAnswer": "Only within the class where it is declared.",
    "explanation": "Private members can only be accessed by code inside the defining class, hiding them from all other classes.",
    "hint": "Restricted strictly to the class itself.",
    "level": "basic",
    "options": [
      "Any class in the same package",
      "Only within the declaring class",
      "Every class in the project",
      "Subclasses only"
    ],
    "correctAnswer": 1,
    "codeExample": "private double balance;"
  },
  {
    "id": 2,
    "question": "What error occurs if an external class writes 'account.balance = 500;' on a private variable?",
    "shortAnswer": "Compile-time error: variable has private access.",
    "explanation": "The Java compiler enforces access control at compile time and rejects illegal private member access.",
    "hint": "Compile time access violation.",
    "level": "basic",
    "options": [
      "Runtime NullPointerException",
      "Compile-time error",
      "SecurityException at runtime",
      "Executes successfully"
    ],
    "correctAnswer": 1,
    "codeExample": "acc.balance = 500; // error: balance has private access"
  },
  {
    "id": 3,
    "question": "Which OOP concept is directly implemented by making variables private and providing public methods?",
    "shortAnswer": "Encapsulation (Data Hiding)",
    "explanation": "Encapsulation combines variables and methods into a class while protecting internal data from direct outside manipulation.",
    "hint": "Wrapping data and methods together.",
    "level": "basic",
    "options": [
      "Polymorphism",
      "Inheritance",
      "Encapsulation",
      "Abstraction"
    ],
    "correctAnswer": 2,
    "codeExample": "class Student { private int roll; public int getRoll() { return roll; } }"
  },
  {
    "id": 4,
    "question": "Which of the following is the most restrictive access modifier in Java?",
    "shortAnswer": "private",
    "explanation": "private offers the tightest encapsulation, allowing access only within the exact same class.",
    "hint": "Most restrictive.",
    "level": "intermediate",
    "options": [
      "public",
      "protected",
      "default (package-private)",
      "private"
    ],
    "correctAnswer": 3,
    "codeExample": "private int secretCode;"
  },
  {
    "id": 5,
    "question": "Can a constructor in Java be marked as private?",
    "shortAnswer": "Yes, it prevents instantiation from outside the class (used in Singleton patterns).",
    "explanation": "Private constructors are completely legal in Java and prevent other classes from calling 'new MyClass()'.",
    "hint": "Yes, legal syntax in Java.",
    "level": "advanced",
    "options": [
      "No, constructors must always be public",
      "Yes, preventing outside instantiation",
      "Only in abstract classes",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "private MyClass() { /* singleton pattern */ }"
  },
  {
    "id": 6,
    "question": "Can methods of the same class access private data members of that class?",
    "shortAnswer": "Yes, all methods inside the class have full access to its private members.",
    "explanation": "Private restriction applies to external classes, not member methods.",
    "hint": "Internal methods have full access",
    "level": "basic",
    "options": [
      "No, even class methods cannot",
      "Yes, all methods of the class have direct access",
      "Only static methods can",
      "Only if passed by reference"
    ],
    "correctAnswer": 1,
    "codeExample": "public void show() { System.out.println(balance); }"
  },
  {
    "id": 7,
    "question": "Can a subclass in Java inherit and directly access private members of its superclass?",
    "shortAnswer": "No, private members are never directly accessible by subclasses.",
    "explanation": "Subclasses inherit public and protected members; private members remain inaccessible.",
    "hint": "Subclasses cannot directly access private members",
    "level": "basic",
    "options": [
      "Yes, directly",
      "No, private members are inaccessible to subclasses",
      "Only in the same package",
      "Only if marked static"
    ],
    "correctAnswer": 1,
    "codeExample": "class Child extends Parent { // cannot access parent private vars }"
  },
  {
    "id": 8,
    "question": "How can a subclass access the private state of its parent class?",
    "shortAnswer": "Through public or protected getter and setter methods of the parent class.",
    "explanation": "Accessors provide controlled access to private fields.",
    "hint": "Accessor methods in parent",
    "level": "intermediate",
    "options": [
      "Using super.privateVar",
      "Through parent's public or protected getter/setter methods",
      "By casting to Object",
      "Cannot be accessed at all"
    ],
    "correctAnswer": 1,
    "codeExample": "super.getBalance()"
  },
  {
    "id": 9,
    "question": "What happens if no access modifier is specified for a variable in Java?",
    "shortAnswer": "It gets 'default' (package-private) access.",
    "explanation": "Accessible by any class in the exact same package, but not outside.",
    "hint": "Package-private access",
    "level": "basic",
    "options": [
      "It defaults to public",
      "It gets default (package-private) access",
      "It defaults to private",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "int score; // default package access"
  },
  {
    "id": 10,
    "question": "Why should data members in ICSE Section B class design questions always be declared private?",
    "shortAnswer": "To follow object-oriented encapsulation best practices and avoid mark deductions.",
    "explanation": "CISCE marking schemes expect private instance variables.",
    "hint": "Board marking scheme expectation",
    "level": "basic",
    "options": [
      "Required to compile",
      "To demonstrate encapsulation as per board specifications",
      "Private variables use less memory",
      "To allow recursion"
    ],
    "correctAnswer": 1,
    "codeExample": "private String name; private double marks;"
  },
  {
    "id": 11,
    "question": "What is the visibility of 'protected' members compared to 'private'?",
    "shortAnswer": "Protected is accessible within package and subclasses outside package; private is only within the class.",
    "explanation": "Protected is wider than private.",
    "hint": "Protected vs private",
    "level": "intermediate",
    "options": [
      "Protected is narrower than private",
      "Protected allows package and subclass access; private is strictly class-only",
      "They are identical",
      "Protected is public everywhere"
    ],
    "correctAnswer": 1,
    "codeExample": "protected int id;"
  },
  {
    "id": 12,
    "question": "Can a local variable inside a method be marked 'private'?",
    "shortAnswer": "No, compile error: illegal start of expression / modifier private not allowed here.",
    "explanation": "Access modifiers (public, private, protected) apply only to class members, not local variables.",
    "hint": "Local variables cannot have access specifiers",
    "level": "intermediate",
    "options": [
      "Yes, makes it local",
      "No, local variables cannot have access modifiers",
      "Only in main()",
      "Only if final"
    ],
    "correctAnswer": 1,
    "codeExample": "void test() { private int x; // COMPILE ERROR }"
  },
  {
    "id": 13,
    "question": "Can an entire top-level class be declared 'private' in Java?",
    "shortAnswer": "No, top-level classes can only be public or default (package-private).",
    "explanation": "Only inner/nested classes can be private.",
    "hint": "Top-level class visibility",
    "level": "advanced",
    "options": [
      "Yes, top-level classes can be private",
      "No, only inner classes can be private",
      "Only if abstract",
      "Only in BlueJ"
    ],
    "correctAnswer": 1,
    "codeExample": "private class A {} // COMPILE ERROR for top-level"
  },
  {
    "id": 14,
    "question": "What is data hiding?",
    "shortAnswer": "Shielding internal object state from unauthorized direct external tampering.",
    "explanation": "Ensures object state changes occur only through verified member methods.",
    "hint": "Shielding internal state",
    "level": "basic",
    "options": [
      "Deleting variables",
      "Shielding internal state using private specifiers",
      "Hiding methods from BlueJ",
      "Encrypting source code"
    ],
    "correctAnswer": 1,
    "codeExample": "Data hiding via private keyword"
  },
  {
    "id": 15,
    "question": "What is the primary benefit of declaring instance variables private in a Banking class?",
    "shortAnswer": "Prevents external code from setting negative balance or unauthorized funds transfers.",
    "explanation": "Validation rules in methods enforce account constraints.",
    "hint": "Integrity and validation",
    "level": "basic",
    "options": [
      "Speeds up deposits",
      "Prevents invalid or malicious state modifications",
      "Compresses database",
      "Enables online banking"
    ],
    "correctAnswer": 1,
    "codeExample": "Balance validation"
  },
  {
    "id": 16,
    "question": "What is the scope of a private static variable?",
    "shortAnswer": "Accessible only within that class, but shared by all instances of the class.",
    "explanation": "Class-level sharing restricted to the defining class.",
    "hint": "Private static scope",
    "level": "intermediate",
    "options": [
      "Public to package",
      "Class-only access, shared across all instances",
      "Local to main()",
      "Accessible by all subclasses"
    ],
    "correctAnswer": 1,
    "codeExample": "private static int studentCount;"
  },
  {
    "id": 17,
    "question": "If two objects of the same class exist (obj1 and obj2), can a method of obj1 access private fields of obj2?",
    "shortAnswer": "Yes, private access is per-CLASS, not per-INSTANCE in Java!",
    "explanation": "Any code inside ClassName can access private fields of any ClassName instance.",
    "hint": "Class-based access, not instance-based",
    "level": "advanced",
    "options": [
      "No, private means object-only",
      "Yes, private access is class-based in Java",
      "Only if obj2 is null",
      "Throws SecurityException"
    ],
    "correctAnswer": 1,
    "codeExample": "boolean equals(MyClass other) { return this.val == other.val; // VALID! }"
  },
  {
    "id": 18,
    "question": "How does encapsulation reduce software maintenance bugs?",
    "shortAnswer": "Internal representation can be refactored without breaking client code using public methods.",
    "explanation": "Decouples implementation from interface.",
    "hint": "Decoupled maintenance",
    "level": "intermediate",
    "options": [
      "Makes code run faster",
      "Decouples internal implementation from public interfaces",
      "Eliminates need for testing",
      "Removes comments"
    ],
    "correctAnswer": 1,
    "codeExample": "Decoupled architecture"
  },
  {
    "id": 19,
    "question": "What keyword in Java creates an unmodifiable, read-only constant data member?",
    "shortAnswer": "final (e.g. private final double PI = 3.14159;)",
    "explanation": "final variables cannot be reassigned once initialized.",
    "hint": "final keyword",
    "level": "basic",
    "options": [
      "static",
      "final",
      "const",
      "immutable"
    ],
    "correctAnswer": 1,
    "codeExample": "private final double TAX_RATE = 0.18;"
  },
  {
    "id": 20,
    "question": "What is a JavaBean?",
    "shortAnswer": "A standard Java class with private fields, public zero-argument constructor, and getters/setters.",
    "explanation": "Industry standard design pattern.",
    "hint": "JavaBean convention",
    "level": "intermediate",
    "options": [
      "A type of loop",
      "A reusable class with private fields, no-arg constructor, and getters/setters",
      "A BlueJ compiler plugin",
      "An operating system file"
    ],
    "correctAnswer": 1,
    "codeExample": "Standard JavaBean structure"
  },
  {
    "id": 21,
    "question": "Why does BlueJ show a red icon or refuse direct inspection of private fields on object bench?",
    "shortAnswer": "To enforce OOP access rules and educate students that private fields are encapsulated.",
    "explanation": "BlueJ adheres to Java language specification.",
    "hint": "BlueJ OOP educational enforcement",
    "level": "basic",
    "options": [
      "BlueJ has a bug",
      "BlueJ strictly honors language access restrictions",
      "Requires restart",
      "Only static fields work"
    ],
    "correctAnswer": 1,
    "codeExample": "BlueJ honors private modifier"
  },
  {
    "id": 22,
    "question": "Can private methods be called from the main() method if main() is inside the same class?",
    "shortAnswer": "Yes, main() is inside the class so it can call private static methods or private methods via an instance.",
    "explanation": "Same class scope applies to main().",
    "hint": "main inside same class",
    "level": "intermediate",
    "options": [
      "No, main is public so it cannot",
      "Yes, because main() resides in the same class",
      "Only through reflection",
      "Throws IllegalAccessException"
    ],
    "correctAnswer": 1,
    "codeExample": "new Demo().privateMethod(); // Valid inside same class"
  },
  {
    "id": 23,
    "question": "Can private methods be overridden by subclasses in Java?",
    "shortAnswer": "No, private methods are not visible to subclasses and cannot be overridden.",
    "explanation": "Private methods are implicitly final and bound at compile time.",
    "hint": "Private methods cannot be overridden",
    "level": "advanced",
    "options": [
      "Yes, if marked protected in child",
      "No, private methods cannot be overridden",
      "Only in the same package",
      "Yes, using @Override"
    ],
    "correctAnswer": 1,
    "codeExample": "Private methods cannot be overridden"
  },
  {
    "id": 24,
    "question": "What is defensive copying in encapsulation?",
    "shortAnswer": "Returning a copy of a mutable private object (like Date or array) rather than the direct reference.",
    "explanation": "Prevents external callers from modifying internal mutable fields through the returned reference.",
    "hint": "Defensive copying",
    "level": "advanced",
    "options": [
      "Copying files to backup",
      "Returning copies of mutable internal objects to preserve encapsulation",
      "Duplicate loops",
      "Cloning hard drives"
    ],
    "correctAnswer": 1,
    "codeExample": "return (int[])arr.clone();"
  },
  {
    "id": 25,
    "question": "In ICSE Section B, what standard question asks students to implement private data members?",
    "shortAnswer": "Class design programs like Book, Employee, Student, ElectricBill carrying 15 marks.",
    "explanation": "Question 4 or 5 in Section B.",
    "hint": "15-mark class design program",
    "level": "basic",
    "options": [
      "Question 1 MCQ",
      "Question 4/5 Section B Class Design (15 marks)",
      "Pre-board exam only",
      "Section A output snippet"
    ],
    "correctAnswer": 1,
    "codeExample": "Section B 15-mark class design"
  }
];

export default questions;
