/**
 * Module 002_001: Topic 1: Real-world modeling: mapping entities to State (fields) and Behavior (methods)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Real-World Domain Modeling in Object-Oriented Programming?",
    shortAnswer: "The process of identifying real-world business entities (e.g. Student, Course, BankAccount) and translating their attributes into **State (Fields)** and their capabilities into **Behavior (Methods)**.",
    explanation: "Core definition of domain modeling.",
    hint: "Mapping real-world entities to State (fields) and Behavior (methods).",
    level: "basic",
    codeExample: "// Student → State: roll, name, gpa | Behavior: isEligibleForHonors()"
  },
  {
    question: "What constitutes the 'State' of an object in Java?",
    shortAnswer: "The collection of instance variables (fields) stored inside the object's Heap memory at any given point in time.",
    explanation: "Object state definition.",
    hint: "The values stored in an object's instance fields.",
    level: "basic",
    codeExample: "private double gradePointAverage; private double attendancePercentage;"
  },
  {
    question: "What constitutes the 'Behavior' of an object in Java?",
    shortAnswer: "The set of instance methods that operate on and modify the object's internal state or compute results based on that state.",
    explanation: "Object behavior definition.",
    hint: "The methods that execute actions or compute results using object state.",
    level: "basic",
    codeExample: "public boolean isEligibleForHonors() { return gpa >= 9.0; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what criteria defined honors eligibility for a Student?",
    shortAnswer: "A GPA of at least **9.0/10.0** AND attendance of at least **85.0%**.",
    explanation: "Honors eligibility business rule.",
    hint: "GPA >= 9.0 and Attendance >= 85.0%.",
    level: "basic",
    codeExample: "return this.gradePointAverage >= 9.0 && this.attendancePercentage >= 85.0;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, which students qualified for Honors?",
    shortAnswer: "**Swadeep** (GPA 9.4, 92% attendance) and **Tuhina** (GPA 9.8, 95% attendance).",
    explanation: "Student honors verification.",
    hint: "Swadeep and Tuhina.",
    level: "basic",
    codeExample: "s1.isEligibleForHonors() → true | s2.isEligibleForHonors() → true"
  },
  {
    question: "Why did Abhronila (GPA 8.7) and Debangshu (GPA 7.9) NOT qualify for Honors?",
    shortAnswer: "Because their GPAs were below the required 9.0 minimum threshold.",
    explanation: "Honors disqualification verification.",
    hint: "GPA was below 9.0.",
    level: "basic",
    codeExample: "s3.isEligibleForHonors() → false (GPA 8.7 < 9.0)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happened when attempting to enroll student 4 (Debangshu) into a course with max capacity 3?",
    shortAnswer: "The enrollment method rejected the request with an `[ENROLLMENT FAILED]` message because `enrolledStudents.size() >= maxCapacity`.",
    explanation: "Capacity constraint domain invariant.",
    hint: "Rejected safely because the course reached its maximum capacity of 3 seats.",
    level: "basic",
    codeExample: "javaCourse.enrollStudent(s4) → false (Capacity full)"
  },
  {
    question: "What is an 'Anemic Domain Model' anti-pattern?",
    shortAnswer: "A class that contains only public fields or getters/setters with ZERO business logic or behavior, reducing objects to dumb data holders while logic is scattered in external service classes.",
    explanation: "Anemic domain model anti-pattern.",
    hint: "Classes containing only data fields without business behavior methods.",
    level: "intermediate",
    codeExample: "// Anti-pattern: Student with only getters/setters and zero domain methods"
  },
  {
    question: "What is a 'Rich Domain Model' in OOP?",
    shortAnswer: "A class that encapsulates both its data and its business logic, containing self-validating behavior methods (`enrollStudent()`, `isEligibleForHonors()`).",
    explanation: "Rich domain model definition.",
    hint: "Classes bundling data with business behavior and domain rules.",
    level: "intermediate",
    codeExample: "// Rich Model: Course validates capacity directly inside enrollStudent()"
  },
  {
    question: "Why should `getEnrolledStudents()` return `List.copyOf(enrolledStudents)` instead of the raw list?",
    shortAnswer: "Returning `List.copyOf()` creates an unmodifiable **defensive copy**, preventing external callers from clearing or modifying the course enrollment list without going through `enrollStudent()`.",
    explanation: "Defensive copying for collection fields.",
    hint: "Prevents external callers from modifying internal list state directly.",
    level: "intermediate",
    codeExample: "public List<Student> getEnrolledStudents() { return List.copyOf(enrolledStudents); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the total collected tuition for 3 enrolled students at ₹25,000 fee?",
    shortAnswer: "$3 \\times ₹25,000 =$ **₹75,000.00**.",
    explanation: "Tuition collection calculation.",
    hint: "₹75,000.00.",
    level: "basic",
    codeExample: "3 * 25000 = 75,000.00"
  },
  {
    question: "What is the difference between an Attribute and a Property in Java?",
    shortAnswer: "An **Attribute** is an internal instance field; a **Property** is a characteristic exposed externally via getter/setter accessor methods (following JavaBeans convention).",
    explanation: "Attribute vs Property distinction.",
    hint: "Attribute is the internal field; Property is exposed via getter/setter.",
    level: "basic",
    codeExample: "private double gpa; // Attribute | public double getGpa() // Property"
  },
  {
    question: "How does domain modeling help identify whether a relationship is 'IS-A' or 'HAS-A'?",
    shortAnswer: "**IS-A** represents Inheritance / Specialization (e.g. `GraduateStudent IS-A Student`); **HAS-A** represents Composition / Aggregation (e.g. `Course HAS-A List<Student>`).",
    explanation: "IS-A vs HAS-A modeling relationships.",
    hint: "IS-A = Inheritance; HAS-A = Composition.",
    level: "basic",
    codeExample: "Course has-a List<Student> (Composition)"
  },
  {
    question: "Why should setters enforce boundary constraints (e.g. GPA between 0.0 and 10.0)?",
    shortAnswer: "To guarantee that the object's internal state remains valid and mathematically consistent, throwing `IllegalArgumentException` on invalid inputs.",
    explanation: "Mutator validation best practice.",
    hint: "Guarantees domain state validity by rejecting invalid numbers.",
    level: "basic",
    codeExample: "if (gpa < 0.0 || gpa > 10.0) throw new IllegalArgumentException();"
  },
  {
    question: "What is the `@Override` annotation on `toString()` used for?",
    shortAnswer: "It informs the compiler that the method is overriding `Object.toString()`, providing a human-readable text representation of the object's state.",
    explanation: "toString override purpose.",
    hint: "Provides custom human-readable text representation of object state.",
    level: "basic",
    codeExample: "@Override public String toString() { return ...; }"
  },
  {
    question: "Can an entity have behavior methods that do NOT mutate state?",
    shortAnswer: "YES! (e.g. `isEligibleForHonors()`, `isFull()`, `getRemainingSeats()`) are read-only query methods that compute conclusions based on current state.",
    explanation: "Query vs Command methods (CQS principle).",
    hint: "Yes, query methods compute results without modifying state.",
    level: "basic",
    codeExample: "public boolean isFull() { return enrolledStudents.size() >= maxCapacity; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the remaining seat count after 3 enrollments in a capacity-3 course?",
    shortAnswer: "`0` remaining seats.",
    explanation: "Seat count verification.",
    hint: "0.",
    level: "basic",
    codeExample: "javaCourse.getRemainingSeats() → 0"
  },
  {
    question: "What is the 'Command-Query Separation' (CQS) principle in OOP method design?",
    shortAnswer: "A method should either be a **Command** (performs an action and mutates state) OR a **Query** (computes and returns a value without mutating state), but never both.",
    explanation: "CQS architectural design principle.",
    hint: "Methods should either mutate state or return a query result, not both.",
    level: "intermediate",
    codeExample: "// Query: isFull() | Command: recordAttendance(present)"
  },
  {
    question: "Why is `studentName` marked `final` in the Student class?",
    shortAnswer: "To make the identity attribute immutable after object creation, preventing accidental reassignment of the student's name.",
    explanation: "Field immutability using final.",
    hint: "Prevents accidental reassignment after construction.",
    level: "basic",
    codeExample: "private final String studentName;"
  },
  {
    question: "What happens if you pass `null` as the student name to the `Student` constructor?",
    shortAnswer: "`Objects.requireNonNull(studentName, \"...\")` immediately throws a `NullPointerException` before creating an invalid object.",
    explanation: "Constructor null defense verification.",
    hint: "Throws NullPointerException with descriptive error message.",
    level: "basic",
    codeExample: "new Student(101, null, 90, 8.5) // Throws NPE"
  },
  {
    question: "How do you model a real-world Car entity in OOP?",
    shortAnswer: "State: `make`, `model`, `currentSpeedKmph`, `fuelLevelPercentage`; Behavior: `accelerate()`, `brake()`, `refuel()`, `getEngineStatus()`.",
    explanation: "Car entity domain mapping example.",
    hint: "State: make, model, speed; Behavior: accelerate, brake, refuel.",
    level: "basic",
    codeExample: "class Car { private double speed; public void accelerate() {} }"
  },
  {
    question: "How do you model an Employee entity in an HR Payroll system?",
    shortAnswer: "State: `empId`, `name`, `baseSalaryInr`, `department`, `leaveBalanceDays`; Behavior: `calculateNetMonthlySalary()`, `applyForLeave()`, `promote()`.",
    explanation: "Employee domain entity mapping.",
    hint: "State: empId, baseSalary; Behavior: calculateSalary, applyForLeave.",
    level: "basic",
    codeExample: "class Employee { private double baseSalary; public double calculateSalary() {} }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Swadeep's GPA and attendance?",
    shortAnswer: "GPA: `9.4/10.0` | Attendance: `92.0%`.",
    explanation: "Swadeep student record verification.",
    hint: "GPA: 9.4, Attendance: 92.0%.",
    level: "basic",
    codeExample: "Student s1 = new Student(101, \"Swadeep\", 92.0, 9.4);"
  },
  {
    question: "What is 'Encapsulating What Varies' in OOP design?",
    shortAnswer: "Isolating parts of the system that are subject to change behind stable method interfaces so modifications do not ripple across the codebase.",
    explanation: "Encapsulating what varies design heuristic.",
    hint: "Isolating changing requirements behind stable interfaces.",
    level: "intermediate",
    codeExample: "// Business discount rules encapsulated inside computeDiscount() method"
  },
  {
    question: "Why should domain entity classes avoid holding UI rendering or SQL database queries directly?",
    shortAnswer: "To uphold the **Single Responsibility Principle (SRP)**; domain entities should only model business logic and state, leaving persistence to Repositories and UI to Views/Controllers.",
    explanation: "Separation of concerns in domain modeling.",
    hint: "Upholds Single Responsibility: entities model business rules, not SQL or UI.",
    level: "intermediate",
    codeExample: "// Repository handles database; Student handles GPA & honors logic"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what course code was assigned to Full Stack Java?",
    shortAnswer: "`\"CS-301\"`.",
    explanation: "Course code identifier verification.",
    hint: "CS-301.",
    level: "basic",
    codeExample: "new Course(\"CS-301\", \"Full Stack Java & Microservices\", 25000.0, 3)"
  },
  {
    question: "How does `recordAttendance(boolean present)` adjust attendance percentage safely?",
    shortAnswer: "It increments attendance up to a maximum of 100.0% if present (`Math.min(100.0, ...)`), or decrements down to a minimum of 0.0% if absent (`Math.max(0.0, ...)`).",
    explanation: "Bounded arithmetic transition.",
    hint: "Uses Math.min(100) and Math.max(0) to keep attendance strictly within bounds.",
    level: "basic",
    codeExample: "this.attendancePercentage = Math.min(100.0, this.attendancePercentage + 1.0);"
  },
  {
    question: "What is the ultimate takeaway of Module 002_001 Topic 1 for Java developers?",
    shortAnswer: "Real-world modeling transforms business concepts into cohesive software classes: State is represented by private validated fields, and Behavior is represented by methods enforcing domain invariants.",
    explanation: "Mastery of real-world domain entity modeling.",
    hint: "State = private validated fields; Behavior = methods enforcing business invariants.",
    level: "basic",
    codeExample: "// Summary: Entity = Private State + Public Validating Behavior"
  },
  {
    question: "What is the next topic (Topic 2) in Module 002_001?",
    shortAnswer: "Class definition: syntax, anatomy, and naming conventions.",
    explanation: "Topic 2 breaks down class anatomy, structure, and naming rules in depth.",
    hint: "Class definition: syntax, anatomy, and naming conventions.",
    level: "basic",
    codeExample: "// Topic 2: Class Definition Syntax & Anatomy"
  },
  {
    question: "How does Java 21 Sealed Interfaces assist in domain modeling?",
    shortAnswer: "Sealed interfaces restrict which classes can implement or extend domain types (`permits FullTimeStudent, PartTimeStudent`), creating exhaustive domain hierarchies.",
    explanation: "Sealed types in domain modeling.",
    hint: "Restricts subtyping to an explicit, exhaustive set of domain models.",
    level: "advanced",
    codeExample: "public sealed interface AcademicEntity permits Student, Course {}"
  }
];

export default questions;
