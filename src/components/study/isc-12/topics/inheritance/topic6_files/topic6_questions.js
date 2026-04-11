// topic6_questions.js - 30 moderate to expert questions on practical inheritance programs
const questions = [
  {
    question: "In the EmployeeHierarchy program, why does Manager's work() method print a different message than Employee's work()?",
    shortAnswer: "Because Manager overrides work() and dynamic dispatch calls the overridden version.",
    explanation: "Even though the reference is Employee, the actual object is Manager, so Manager's work() runs.",
    hint: "Think about the array type vs the object stored.",
    level: "intermediate",
    codeExample: "Employee e = new Manager(...); e.work(); // Manager's work()"
  },
  {
    question: "What would happen if we removed the @Override annotation from Manager's calculateSalary() but kept the method signature the same?",
    shortAnswer: "It would still override correctly; @Override is optional but recommended for safety.",
    explanation: "The annotation just tells the compiler to check – it doesn't change runtime behavior.",
    hint: "@Override is a safety net, not a requirement.",
    level: "basic",
    codeExample: "// Works without @Override, but risky"
  },
  {
    question: "In ShapeHierarchy, why is Shape declared abstract?",
    shortAnswer: "Because we cannot have a generic Shape object – area() and perimeter() don't make sense without a specific shape.",
    explanation: "Abstract classes prevent instantiation and force subclasses to provide implementations.",
    hint: "What would Shape.area() return?",
    level: "basic",
    codeExample: "Shape s = new Shape(\"red\"); // ERROR – Shape is abstract"
  },
  {
    question: "What is the output when we call start() on the ElectricCar object through a Vehicle reference in VehiclePolymorphism?",
    shortAnswer: "It prints 'Tesla electric car starts silently.'",
    explanation: "Dynamic dispatch finds the most specific override (ElectricCar's start()).",
    hint: "The actual object is ElectricCar, even though reference is Vehicle.",
    level: "intermediate",
    codeExample: "Output: Tesla electric car starts silently."
  },
  {
    question: "In BankInheritance, why does SavingsAccount's withdraw() method call super.withdraw(amount)?",
    shortAnswer: "To reuse the parent's withdrawal logic after checking the minimum balance condition.",
    explanation: "This is an example of extending behavior – add a new rule, then delegate to parent.",
    hint: "Don't rewrite the same logic; reuse it.",
    level: "advanced",
    codeExample: "if (balance - amount >= 1000) { super.withdraw(amount); }"
  },
  {
    question: "What is the purpose of the displayInfo() method in EmployeeHierarchy?",
    shortAnswer: "To show common information (ID and name) for all employees without repeating code.",
    explanation: "Inheritance promotes code reuse – the parent method is inherited and can be used by all subclasses.",
    hint: "No need to write displayInfo() in each subclass.",
    level: "basic",
    codeExample: "emp.displayInfo(); // works for Manager, Developer, Intern"
  },
  {
    question: "How would you modify ShapeHierarchy to add a new shape, say Square, without changing existing code?",
    shortAnswer: "Create a Square class that extends Shape and implements area() and perimeter().",
    explanation: "The existing array and loop will work automatically because of polymorphism.",
    hint: "Open/Closed Principle – open for extension, closed for modification.",
    level: "intermediate",
    codeExample: "class Square extends Shape { ... }"
  },
  {
    question: "In VehiclePolymorphism, why can't we call openSunroof() on a Vehicle reference that points to a Car object?",
    shortAnswer: "Because the compiler only knows the reference type (Vehicle), which doesn't have openSunroof().",
    explanation: "To call subclass-specific methods, you must downcast.",
    hint: "Reference type determines which methods are visible.",
    level: "basic",
    codeExample: "((Car) v1).openSunroof(); // explicit cast"
  },
  {
    question: "What is the output of the EmployeeHierarchy main method?",
    shortAnswer: "It prints work messages and salaries for Manager, Developer, Intern, each according to their overridden methods.",
    explanation: "The array loop demonstrates polymorphism – each employee's own work() and calculateSalary() are called.",
    hint: "Look at the @Override annotations to see which methods are specialized.",
    level: "intermediate",
    codeExample: "Manager: managing team of 5, Salary: ₹50000, etc."
  },
  {
    question: "In BankInheritance, what happens if a SavingsAccount tries to withdraw below the minimum balance?",
    shortAnswer: "It prints 'Cannot withdraw: minimum balance ₹1000 required.' and does not change the balance.",
    explanation: "The overridden withdraw() checks the condition first and only calls super.withdraw() if satisfied.",
    hint: "The condition prevents the withdrawal.",
    level: "basic",
    codeExample: "Output: Cannot withdraw: minimum balance ₹1000 required."
  },
  {
    question: "Why does the ShapeHierarchy use an abstract method instead of a default implementation?",
    shortAnswer: "Because there is no reasonable default for area() – each shape calculates differently.",
    explanation: "Abstract methods force subclasses to provide specific implementations, preventing incomplete subclasses.",
    hint: "What would a generic Shape's area be?",
    level: "basic",
    codeExample: "abstract double area(); // no body"
  },
  {
    question: "In EmployeeHierarchy, what is the purpose of the super(name, id) call in Manager's constructor?",
    shortAnswer: "To initialize the inherited fields (name and id) from Employee.",
    explanation: "The subclass constructor must call the superclass constructor first to set up the parent part of the object.",
    hint: "Superclass fields are private? Actually protected, but still need initialization.",
    level: "basic",
    codeExample: "super(name, id); // calls Employee(name, id)"
  },
  {
    question: "What would happen if we tried to instantiate Shape in ShapeHierarchy?",
    shortAnswer: "Compilation error: 'Shape is abstract; cannot be instantiated'.",
    explanation: "Abstract classes cannot be instantiated directly – they are incomplete.",
    hint: "Try it: new Shape(\"red\");",
    level: "basic",
    codeExample: "// error: Shape is abstract"
  },
  {
    question: "In VehiclePolymorphism, why is the ElectricCar class useful even though it adds only one new method?",
    shortAnswer: "It demonstrates multilevel inheritance and specialized behavior (silent start, charging).",
    explanation: "Inheritance allows gradual specialization without modifying existing code.",
    hint: "It extends Car, which already extends Vehicle.",
    level: "intermediate",
    codeExample: "ElectricCar is a Car, which is a Vehicle."
  },
  {
    question: "How would you modify BankInheritance to add a new account type, FixedDepositAccount, with a lock-in period?",
    shortAnswer: "Extend BankAccount, add a tenure field, and override withdraw() to prevent withdrawal before maturity.",
    explanation: "Use inheritance to add new behavior while reusing deposit() and displayBalance().",
    hint: "Override withdraw() to check maturity date.",
    level: "advanced",
    codeExample: "class FixedDepositAccount extends BankAccount { ... }"
  },
  {
    question: "What is the advantage of using an array of Employee (superclass) instead of separate arrays for Manager, Developer, etc.?",
    shortAnswer: "Uniform processing – you can loop through all employees and call common methods without knowing the exact type.",
    explanation: "Polymorphism allows you to treat different subclasses uniformly.",
    hint: "Less code duplication, more flexibility.",
    level: "basic",
    codeExample: "for(Employee e : employees) { e.work(); }"
  },
  {
    question: "In ShapeHierarchy, why is the color field stored in Shape instead of each subclass?",
    shortAnswer: "Because all shapes have a color – it's common property, so it's inherited.",
    explanation: "Inheritance promotes code reuse by pulling common fields/methods up the hierarchy.",
    hint: "DRY (Don't Repeat Yourself) principle.",
    level: "basic",
    codeExample: "protected String color; // defined once"
  },
  {
    question: "What is the output if we call start() on a Bike object through a Vehicle reference?",
    shortAnswer: "The Bike's start() method runs (dynamic dispatch).",
    explanation: "The JVM looks at the actual object (Bike) and calls its version.",
    hint: "Actual object type wins.",
    level: "basic",
    codeExample: "Vehicle v = new Bike(\"Yamaha\", true); v.start(); // Bike's start"
  },
  {
    question: "In EmployeeHierarchy, what is the difference between Manager's work() and conductMeeting()?",
    shortAnswer: "work() is overridden from Employee and called polymorphically; conductMeeting() is specific to Manager and requires downcasting.",
    explanation: "Only overridden methods participate in dynamic dispatch. Subclass-specific methods need explicit casting.",
    hint: "Which method is in the superclass?",
    level: "intermediate",
    codeExample: "((Manager) emp).conductMeeting();"
  },
  {
    question: "Why does BankAccount have a constructor even though it's not abstract?",
    shortAnswer: "To initialize accountHolder and balance when a new account is created (for both Savings and Current).",
    explanation: "Constructors are used to set up object state, even for non-abstract classes.",
    hint: "Subclasses call super(holder, initial).",
    level: "basic",
    codeExample: "BankAccount(String holder, double balance) { ... }"
  },
  {
    question: "What is the purpose of the displayColor() method in Shape?",
    shortAnswer: "To demonstrate that a concrete method can be inherited and used by all subclasses without overriding.",
    explanation: "Not all methods need to be abstract; some can provide common functionality.",
    hint: "It's not overridden in any subclass.",
    level: "basic",
    codeExample: "s.displayColor(); // works for all shapes"
  },
  {
    question: "In VehiclePolymorphism, what would happen if we removed the @Override from Car's start() but kept the method?",
    shortAnswer: "It would still override correctly, but the compiler wouldn't check that you meant to override.",
    explanation: "@Override is optional but highly recommended to catch typos.",
    hint: "If you misspelled 'start' as 'starts', without @Override you'd have a new method, not an override.",
    level: "intermediate",
    codeExample: "// safer with @Override"
  },
  {
    question: "How does dynamic dispatch work in the Employee array loop?",
    shortAnswer: "For each element, the JVM calls the actual object's version of work() and calculateSalary().",
    explanation: "The compiler sees Employee methods, but the runtime uses the object's vtable.",
    hint: "It's the same mechanism as single reference examples.",
    level: "advanced",
    codeExample: "emp.work(); // polymorphic call"
  },
  {
    question: "In BankInheritance, why does SavingsAccount not override deposit()?",
    shortAnswer: "Because the parent's deposit() works fine – no special behavior needed.",
    explanation: "Override only when you need to change or extend behavior.",
    hint: "Don't override unnecessarily.",
    level: "basic",
    codeExample: "// deposit() is inherited as-is"
  },
  {
    question: "What is the output of the ShapeHierarchy main method?",
    shortAnswer: "It prints area and perimeter for Circle, Rectangle, Triangle with their colors.",
    explanation: "The abstract methods are implemented in each subclass, and the loop calls them polymorphically.",
    hint: "Run the code to see numeric values.",
    level: "basic",
    codeExample: "Area: 78.54, Perimeter: 31.42 (for circle)"
  },
  {
    question: "Why does ElectricCar need to call super(brand, doors) in its constructor?",
    shortAnswer: "Because Car's constructor requires brand and doors, and Car's constructor calls Vehicle's constructor.",
    explanation: "The chain of constructors must be maintained: ElectricCar → Car → Vehicle.",
    hint: "Every class must call its direct superclass constructor.",
    level: "intermediate",
    codeExample: "ElectricCar(...) { super(brand, doors); ... }"
  },
  {
    question: "In EmployeeHierarchy, what is the salary of an Intern?",
    shortAnswer: "₹15000 (stipend), as defined in Intern's calculateSalary().",
    explanation: "It overrides the parent's method to return a fixed amount.",
    hint: "The parent's calculateSalary() returns 30000, but Intern overrides.",
    level: "basic",
    codeExample: "return 15000;"
  },
  {
    question: "How would you add a new method to Shape that all shapes must implement, say 'void draw()'?",
    shortAnswer: "Add abstract void draw(); to the Shape class, then implement in Circle, Rectangle, Triangle.",
    explanation: "Adding an abstract method forces all existing subclasses to provide an implementation, or they become abstract too.",
    hint: "It's a contract change – all subclasses must adapt.",
    level: "advanced",
    codeExample: "abstract void draw();"
  },
  {
    question: "What is the benefit of using an abstract class (Shape) over an interface in this scenario?",
    shortAnswer: "Shape can hold state (color) and provide concrete methods (displayColor), which an interface cannot.",
    explanation: "Abstract classes are used when there is common code and state; interfaces are for pure contracts.",
    hint: "Interfaces cannot have instance fields (before Java 8+ defaults, still no state).",
    level: "expert",
    codeExample: "protected String color; // not possible in interface"
  },
  {
    question: "In VehiclePolymorphism, what happens if we call v3.charge() without downcasting?",
    shortAnswer: "Compilation error – Vehicle reference doesn't know about charge().",
    explanation: "The compiler only allows methods declared in the reference type.",
    hint: "You must cast: ((ElectricCar) v3).charge()",
    level: "basic",
    codeExample: "v3.charge(); // ERROR"
  }
];

export default questions;