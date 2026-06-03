// topic5_questions.js
// 30 questions on Practical Programs Using Abstract Classes

const questions = [
    {
        question: "In the EmployeePayrollSystem, why is calculateSalary() abstract?",
        shortAnswer: "Because each employee type (FullTime, PartTime, Contractor) calculates salary differently.",
        explanation: "Abstraction allows the payroll system to treat all employees uniformly while each subclass implements its own salary logic.",
        hint: "Full-time gets salary + bonus, part-time gets hourly rate × hours, contractor gets project fee.",
        level: "basic",
        codeExample: "FullTimeEmployee: baseSalary + bonus/12\nPartTimeEmployee: hourlyRate * hours\nContractor: projectFee"
    },
    {
        question: "What design pattern is demonstrated in the GameCharacter takeTurn() method?",
        shortAnswer: "Template Method pattern — takeTurn() is a final method that calls abstract methods attack() and specialAbility().",
        explanation: "The template defines the algorithm structure (check mana, use special or regular attack, regenerate mana) while subclasses implement the specific behaviors.",
        hint: "The method is marked 'final' to prevent subclasses from changing the turn structure.",
        level: "intermediate",
        codeExample: "final void takeTurn() { if (mana >= cost) specialAbility(); else attack(); regenerate(); }"
    },
    {
        question: "Why does the ShapeAreaCalculator use an abstract class instead of an interface?",
        shortAnswer: "Because shapes share common state (color) and concrete methods (displayInfo) that are identical across all shapes.",
        explanation: "Abstract classes allow instance variables and concrete methods, reducing code duplication. An interface would require each shape to reimplement displayInfo().",
        hint: "All shapes have a color and need to display info — that's shared code.",
        level: "intermediate",
        codeExample: "abstract class Shape { protected String color; public void displayInfo() { ... } }"
    },
    {
        question: "In BankingSystem, why does FixedDepositAccount override withdraw() with additional logic?",
        shortAnswer: "To enforce early withdrawal penalties and maturity rules specific to fixed deposits.",
        explanation: "The abstract class defines the contract, but each account type implements withdrawal according to its rules (minimum balance for savings, overdraft for current, penalty for FD).",
        hint: "FD accounts cannot withdraw before maturity without penalty.",
        level: "basic",
        codeExample: "if (!isMatured) { applyPenalty(); }"
    },
    {
        question: "How does SchoolManagementSystem demonstrate multiple levels of abstraction?",
        shortAnswer: "Person (abstract) → Employee (abstract) → Teacher/Staff (concrete). Also Person → Student (concrete).",
        explanation: "This hierarchy shows that abstraction can be multi-level. Person defines common human attributes, Employee adds work-related fields, and concrete classes add specific behaviors.",
        hint: "Each level adds more specificity.",
        level: "intermediate",
        codeExample: "Person → Employee → Teacher (3 levels)"
    },
    {
        question: "What would you add to EmployeePayrollSystem to support commission-based employees?",
        shortAnswer: "Create a CommissionEmployee subclass extending Employee, implement calculateSalary() as baseSalary + (sales * commissionRate).",
        explanation: "The abstract class makes it easy to add new employee types without modifying existing code (Open/Closed Principle).",
        hint: "Just extend Employee and implement the abstract method.",
        level: "intermediate",
        codeExample: "class CommissionEmployee extends Employee { double calculateSalary() { return baseSalary + sales * rate; } }"
    },
    {
        question: "Why is the takeTurn() method in GameCharacter marked final?",
        shortAnswer: "To prevent subclasses from changing the core game loop structure (mana check, attack/special, regeneration).",
        explanation: "The game designer wants every character to follow the same turn rules. Subclasses can only customize attack and special ability, not the turn flow.",
        hint: "Final methods cannot be overridden — ensures consistency.",
        level: "advanced",
        codeExample: "public final void takeTurn() { ... } // cannot be overridden"
    },
    {
        question: "In ShapeAreaCalculator, why is Square a subclass of Rectangle instead of directly extending Shape?",
        shortAnswer: "Because Square 'is-a' Rectangle (a square is a rectangle with equal sides), so it inherits area and perimeter logic.",
        explanation: "This demonstrates proper inheritance hierarchy. Square reuses Rectangle's area calculation (side × side) without rewriting code.",
        hint: "A square is a special case of rectangle.",
        level: "basic",
        codeExample: "class Square extends Rectangle { Square(double side) { super(side, side); } }"
    },
    {
        question: "How would you modify BankingSystem to add a LoanAccount type?",
        shortAnswer: "Create LoanAccount extending BankAccount, implement calculateInterest() as negative (interest owed), withdraw() as taking a loan, deposit() as repaying.",
        explanation: "The abstract class defines the interface. LoanAccount would have a negative balance and different interest calculation.",
        hint: "Think of a loan as an account with negative balance.",
        level: "advanced",
        codeExample: "class LoanAccount extends BankAccount { double calculateInterest() { return balance * 8/100; } }"
    },
    {
        question: "What is the benefit of the getBenefits() hook method in EmployeePayrollSystem?",
        shortAnswer: "It provides a default implementation but allows subclasses to override it for specific benefit descriptions.",
        explanation: "Hook methods give subclasses the option to customize behavior without forcing them to implement abstract methods.",
        hint: "Full-time employees have better benefits than contractors.",
        level: "intermediate",
        codeExample: "String getBenefits() { return \"Standard benefits\"; } // can override"
    },
    {
        question: "In SchoolManagementSystem, why is Employee abstract even though it has no abstract methods?",
        shortAnswer: "To prevent direct instantiation of Employee — you should only create Teacher or Staff, not a generic Employee.",
        explanation: "An abstract class without abstract methods still cannot be instantiated. This signals that Employee is meant to be a base class only.",
        hint: "You wouldn't hire a generic 'Employee' without a specific role.",
        level: "intermediate",
        codeExample: "abstract class Employee { } // cannot instantiate, only extend"
    },
    {
        question: "How does the ShapeAreaCalculator demonstrate polymorphism?",
        shortAnswer: "The ArrayList<Shape> holds different shapes, and calling area() on each executes the correct subclass implementation.",
        explanation: "Polymorphism allows the same method call (area()) to behave differently based on the actual object type (Circle, Rectangle, etc.).",
        hint: "One interface, many implementations.",
        level: "basic",
        codeExample: "for (Shape s : shapes) { System.out.println(s.area()); }"
    },
    {
        question: "What is the purpose of the regenerateMana() abstract method in GameCharacter?",
        shortAnswer: "Different character classes regenerate mana at different rates (Mage regenerates faster than Warrior).",
        explanation: "Abstract methods allow subclasses to customize even small behaviors like mana regeneration while maintaining the template structure.",
        hint: "Mages get +10 mana per turn, Warriors get +5.",
        level: "intermediate",
        codeExample: "Mage: mana += 10; Warrior: mana += 5;"
    },
    {
        question: "In EmployeePayrollSystem, why is baseSalary protected instead of private?",
        shortAnswer: "To allow subclasses to access it directly, but still keep it hidden from non-subclasses.",
        explanation: "Protected access is appropriate for abstract class fields that subclasses need. It balances encapsulation with accessibility.",
        hint: "Subclasses need to read baseSalary to calculate total salary.",
        level: "basic",
        codeExample: "protected double baseSalary; // accessible to subclasses"
    },
    {
        question: "How would you extend SchoolManagementSystem to include a Principal role?",
        shortAnswer: "Create Principal class extending Employee (or Teacher) with additional responsibilities like manageSchool() and higher salary calculation.",
        explanation: "Principal is a specialized employee. It could extend Teacher (since principals often come from teaching) or directly extend Employee.",
        hint: "A principal 'is-a' employee and may also 'is-a' teacher.",
        level: "intermediate",
        codeExample: "class Principal extends Teacher { double calculateMonthlySalary() { return super.calculateMonthlySalary() + 20000; } }"
    },
    {
        question: "What is the advantage of using abstract classes over concrete base classes in these examples?",
        shortAnswer: "Abstract classes prevent instantiation of incomplete types and can enforce implementation of key methods via abstract methods.",
        explanation: "You cannot accidentally create a generic 'Employee' object; you must create a specific type. Abstract methods force subclasses to provide critical behavior.",
        hint: "Makes the API safer — users must use concrete subclasses.",
        level: "intermediate",
        codeExample: "// Employee e = new Employee(); // ERROR — good!\nEmployee e = new FullTimeEmployee(); // OK"
    },
    {
        question: "In BankingSystem, how does polymorphism help with the interest calculation?",
        shortAnswer: "The bank can loop through all accounts and call calculateInterest() without knowing the account type.",
        explanation: "Each account type (Savings, Current, FD) calculates interest differently, but the bank's code remains simple and unified.",
        hint: "Savings: 4%, Current: 0.5%, FD: 7.5% — all via same method call.",
        level: "basic",
        codeExample: "for (BankAccount acc : accounts) { totalInterest += acc.calculateInterest(); }"
    },
    {
        question: "Why does FixedDepositAccount have a mature() method that's not in the abstract class?",
        shortAnswer: "Because maturity is a concept specific to fixed deposits, not applicable to savings or current accounts.",
        explanation: "Subclasses can add their own methods. The abstract class defines the minimum common interface, but subclasses can extend it.",
        hint: "Not all bank accounts mature — only FDs.",
        level: "intermediate",
        codeExample: "fd.mature(); // specific to FixedDepositAccount"
    },
    {
        question: "In GameCharacter, what would happen if a subclass overrode takeTurn()?",
        shortAnswer: "It can't because takeTurn() is marked final. This enforces that all characters follow the same turn rules.",
        explanation: "The final keyword prevents overriding. This is crucial for template methods to maintain algorithm integrity.",
        hint: "The game designer doesn't want characters to skip mana checks or regeneration.",
        level: "advanced",
        codeExample: "// Cannot override — compile error"
    },
    {
        question: "How does the ShapeAreaCalculator support the Open/Closed Principle?",
        shortAnswer: "You can add new shapes (Triangle, Pentagon) without modifying existing shape processing code.",
        explanation: "The system is open for extension (new shapes) but closed for modification (the code that processes shapes doesn't change).",
        hint: "Just create a new class extending Shape — no need to change the existing loop.",
        level: "advanced",
        codeExample: "class Pentagon extends Shape { // new shape, no changes to existing code }"
    },
    {
        question: "In SchoolManagementSystem, why is Person abstract even though it has no abstract methods?",
        shortAnswer: "To prevent instantiation of a generic Person — a person must be either a Student or an Employee.",
        explanation: "The abstract keyword signals that this class is incomplete conceptually. You shouldn't create a Person object directly.",
        hint: "What would a generic 'Person' do? It's too vague.",
        level: "basic",
        codeExample: "// Person p = new Person(); // ERROR — intentional"
    },
    {
        question: "How would you add logging to all bank account transactions without changing each subclass?",
        shortAnswer: "Add logging to the concrete methods in the abstract BankAccount class (deposit, withdraw) since they are called by all subclasses.",
        explanation: "Concrete methods in abstract classes are inherited and can be used to add cross-cutting concerns like logging, validation, or notifications.",
        hint: "Put it in the base class once, benefit everywhere.",
        level: "advanced",
        codeExample: "public void deposit(double amount) { log(\"Deposit: \" + amount); balance += amount; }"
    },
    {
        question: "What is the difference between the 'hook' method (getBenefits) and abstract method in EmployeePayrollSystem?",
        shortAnswer: "Hook methods have a default implementation (optional override); abstract methods have no default and must be overridden.",
        explanation: "Hooks provide sensible defaults but allow customization. Abstract methods force customization.",
        hint: "You can choose to override a hook; you MUST override an abstract method.",
        level: "intermediate",
        codeExample: "String getBenefits() { return \"Standard\"; } // hook\nabstract double calculateSalary(); // must override"
    },
    {
        question: "In GameCharacter, why is the Random object protected?",
        shortAnswer: "To allow subclasses to use the same random instance for their own calculations if needed.",
        explanation: "Making it protected gives subclasses access without creating their own Random instances, promoting reuse.",
        hint: "Subclasses might need random numbers for critical hits or dodge chances.",
        level: "basic",
        codeExample: "protected Random random = new Random(); // shared with subclasses"
    },
    {
        question: "How would you implement a Transfer method between bank accounts?",
        shortAnswer: "Add a transfer method in BankAccount that calls withdraw() on this account and deposit() on the target account.",
        explanation: "Since withdraw and deposit are defined in the abstract class, transfer works polymorphically for any account types.",
        hint: "Use the existing abstract methods to implement higher-level operations.",
        level: "advanced",
        codeExample: "public void transfer(BankAccount target, double amount) { this.withdraw(amount); target.deposit(amount); }"
    },
    {
        question: "Why does the ShapeAreaCalculator use String.format for displaying area/perimeter?",
        shortAnswer: "To round decimal places for cleaner output (not all areas are neat integers).",
        explanation: "This is a presentation concern, not part of the abstraction. It makes the output classroom-friendly.",
        hint: "Circle area = πr² might be 78.539816... better to show 78.54.",
        level: "basic",
        codeExample: "String.format(\"%.2f\", area()) // shows 2 decimal places"
    },
    {
        question: "In SchoolManagementSystem, how does the calculateTotalSalaryExpense() method use polymorphism?",
        shortAnswer: "It checks if each Person is an instance of Employee using instanceof, then safely casts and calls calculateMonthlySalary().",
        explanation: "The method needs to handle both Employees and Students. instanceof allows type-safe downcasting to access employee-specific methods.",
        hint: "Students don't have salaries, so we need to distinguish them.",
        level: "intermediate",
        codeExample: "if (p instanceof Employee) { total += ((Employee)p).calculateMonthlySalary(); }"
    },
    {
        question: "What is the purpose of the static nextAccountNumber field in BankAccount?",
        shortAnswer: "To automatically generate unique account numbers for each new account.",
        explanation: "Static fields are shared across all instances. Each constructor increments it, giving each account a unique ID.",
        hint: "All accounts share the same counter.",
        level: "basic",
        codeExample: "private static int nextAccountNumber = 1001; // increments for each new account"
    },
    {
        question: "How would you modify GameCharacter to support equipment (weapons, armor)?",
        shortAnswer: "Add protected fields for equipment and abstract methods like calculateDamage() that equipment can modify, called from attack().",
        explanation: "Equipment is common to all characters but affects them differently. Abstract methods allow each class to apply equipment bonuses uniquely.",
        hint: "A Warrior with a sword vs a Mage with a staff — same equipment slot, different effect.",
        level: "expert",
        codeExample: "abstract int calculateDamage(); // equipment modifies this"
    },
    {
        question: "What is the key lesson from these five practical programs?",
        shortAnswer: "Abstract classes enable code reuse, enforce contracts, and support polymorphism, leading to maintainable, extensible systems.",
        explanation: "Each program demonstrates a different real-world scenario where abstraction solves real problems: payroll, geometry, gaming, banking, education.",
        hint: "Look for the common patterns: shared fields, template methods, and forced implementations.",
        level: "advanced",
        codeExample: "// All five follow the same pattern: abstract base → concrete implementations"
    }
];

export default questions;