// src/components/study/python/topics/003_001_object-oriented-python/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: OOP Paradigm: Procedural vs Object-Oriented thinking

const questions = [
  {
    question: "What is the primary difference between Procedural Programming (POP) and Object-Oriented Programming (OOP)?",
    shortAnswer: "Procedural programming organizes code around sequential functions acting on detached data structures; OOP bundles state (data attributes) and behavior (methods) into self-contained objects.",
    explanation: "In POP, data is exposed and vulnerable to external mutation; in OOP, objects manage their own state and enforce validation rules.",
    hint: "POP focuses on sequential steps on raw data; OOP focuses on autonomous objects bundling data and behavior.",
    level: "basic",
    codeExample: "# POP: deposit(account_dict, 100)\n# OOP: account_obj.deposit(100)"
  },
  {
    question: "What are the Four Foundational Pillars of Object-Oriented Programming?",
    shortAnswer: "Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    explanation: "These four pillars provide the structural foundation for modular, reusable, extensible, and maintainable software architecture.",
    hint: "Encapsulation, Abstraction, Inheritance, Polymorphism.",
    level: "basic",
    codeExample: "# 1. Encapsulation (data hiding)\n# 2. Abstraction (simple interface)\n# 3. Inheritance (code reuse)\n# 4. Polymorphism (uniform behavior)"
  },
  {
    question: "What is Encapsulation in OOP?",
    shortAnswer: "The bundling of data attributes and the methods that operate on that data into a single unit (class), while restricting direct external access to internal representation.",
    explanation: "Prevents accidental or malicious external mutation and keeps the object in a valid state at all times.",
    hint: "Bundling data and methods together and restricting direct outside access.",
    level: "basic",
    codeExample: "class BankAccount:\n    def __init__(self, bal): self._bal = bal\n    def deposit(self, amt): self._bal += amt"
  },
  {
    question: "What is Abstraction in OOP?",
    shortAnswer: "Hiding internal implementation details and exposing only the essential, high-level features or operations to the caller.",
    explanation: "A driver presses the accelerator without needing to understand fuel-injection manifold dynamics.",
    hint: "Hiding internal complexity behind a clean public interface.",
    level: "basic",
    codeExample: "# Abstraction: user calls payment.process() without knowing backend bank protocols"
  },
  {
    question: "What is Inheritance in OOP?",
    shortAnswer: "A mechanism that allows a new class (subclass/child) to inherit attributes and methods from an existing class (superclass/parent), promoting code reuse and hierarchy.",
    explanation: "For example, SavingsAccount and CurrentAccount can both inherit core balance management from BankAccount.",
    hint: "Subclasses inherit and extend parent class behavior.",
    level: "basic",
    codeExample: "class SavingsAccount(BankAccount):\n    def calculate_interest(self): return self._bal * 0.04"
  },
  {
    question: "What is Polymorphism in OOP?",
    shortAnswer: "The ability of different objects to respond to the same method call in ways specific to their individual types.",
    explanation: "Allows client code to treat diverse subclasses uniformly without writing complex if-else type checks.",
    hint: "Same method name behaving differently across multiple classes.",
    level: "basic",
    codeExample: "for shape in [Circle(), Square(), Triangle()]:\n    shape.draw()  # Polymorphic invocation"
  },
  {
    question: "What is a major risk of managing state with plain dictionaries in procedural programming?",
    shortAnswer: "Any external function can directly modify or corrupt dictionary keys with invalid values (e.g. setting balance to -999999) because dictionaries lack invariant guards.",
    explanation: "Classes protect attributes using methods and properties that validate constraints before updating state.",
    hint: "Dictionaries cannot protect their internal keys from invalid mutation.",
    level: "moderate",
    codeExample: "acc = {'balance': 1000}\nacc['balance'] = -500000  # Silent data corruption!"
  },
  {
    question: "What is an 'Invariant' in object-oriented class design?",
    shortAnswer: "A business rule or condition that must always remain true for an object throughout its entire lifecycle (e.g., student marks between 0 and 100).",
    explanation: "Encapsulation ensures that methods enforce invariants upon creation and every state update.",
    hint: "A rule that must always hold true for an object's state.",
    level: "moderate",
    codeExample: "# Invariant: if marks < 0 or marks > 100: raise ValueError"
  },
  {
    question: "What is the difference between a Class and an Object (Instance)?",
    shortAnswer: "A Class is a blueprint/template defining attributes and behaviors; an Object is a concrete realization of that blueprint residing at a specific memory address.",
    explanation: "Like an architectural blueprint (Class) versus a physical constructed building (Object).",
    hint: "Class = Blueprint; Object = Living memory instance.",
    level: "basic",
    codeExample: "# Class:  class Car: pass\n# Object: my_car = Car()"
  },
  {
    question: "How does OOP improve code maintainability in large enterprise applications?",
    shortAnswer: "By localizing changes within specific classes, minimizing coupling between components, and enabling modular extensions via inheritance and polymorphism without breaking existing code.",
    explanation: "Follows the Open-Closed Principle (open for extension, closed for modification).",
    hint: "Localizes changes, decouples subsystems, and prevents ripple-effect bugs.",
    level: "moderate",
    codeExample: "# Adding a new CryptoPayment doesn't require modifying existing UPIPayment code"
  },
  {
    question: "Can Python support both Procedural and Object-Oriented programming?",
    shortAnswer: "Yes. Python is a multi-paradigm programming language supporting procedural, object-oriented, and functional styles.",
    explanation: "You can write simple scripts procedurally or design large enterprise systems with full OOP architectures.",
    hint: "Python is multi-paradigm and allows mixing styles as appropriate.",
    level: "basic",
    codeExample: "# Python seamlessly supports scripts, functions, and classes together"
  },
  {
    question: "What is 'Duck Typing' in Python's polymorphic philosophy?",
    shortAnswer: "'If it walks like a duck and quacks like a duck, it's a duck' — Python checks for the presence of methods at runtime rather than explicit type inheritance.",
    explanation: "Any object providing a .read() method can be treated as a stream, regardless of class hierarchy.",
    hint: "Checking object behavior/methods rather than explicit class types.",
    level: "moderate",
    codeExample: "def render(obj):\n    obj.draw()  # Works for anything with a .draw() method"
  },
  {
    question: "What is the role of the 'self' parameter in Python class methods?",
    shortAnswer: "It represents the specific instance of the class upon which the method was called, allowing access to instance-specific attributes.",
    explanation: "Python passes the active object instance as the first argument automatically during method invocation.",
    hint: "Explicit reference to the current instance.",
    level: "basic",
    codeExample: "def get_name(self):\n    return self.name"
  },
  {
    question: "What is the '__init__' method in a Python class?",
    shortAnswer: "The constructor / initializer method automatically executed when a new instance of a class is created to initialize its state.",
    explanation: "Sets initial instance attributes based on arguments passed during instantiation.",
    hint: "The instance initializer/constructor.",
    level: "basic",
    codeExample: "class Person:\n    def __init__(self, name): self.name = name"
  },
  {
    question: "When is Procedural Programming preferred over Object-Oriented Programming?",
    shortAnswer: "For simple one-off scripts, mathematical calculations, linear data pipelines, or utilities where complex state management is unnecessary.",
    explanation: "Over-engineering a 10-line file conversion script with 5 classes adds unnecessary boilerplate.",
    hint: "For simple linear scripts and pure mathematical pipelines.",
    level: "moderate",
    codeExample: "# Simple ETL script: read_csv() -> clean() -> save_db()"
  },
  {
    question: "What is 'Coupling' and 'Cohesion' in software design?",
    shortAnswer: "Cohesion is how closely related the responsibilities inside a class are (high is good); Coupling is the degree of interdependence between classes (low is good).",
    explanation: "OOP aims for high cohesion (single responsibility) and loose coupling (decoupled dependencies).",
    hint: "High cohesion within classes, low coupling between classes.",
    level: "complex",
    codeExample: "# High cohesion: BankAccount handles only banking logic"
  },
  {
    question: "How does OOP prevent the 'Shotgun Surgery' code smell?",
    shortAnswer: "By grouping related logic and data into a single class so that a requirement change only requires modifying one class rather than 20 scattered functions.",
    explanation: "In procedural code, changing a data structure forces edits across all functions that touch it.",
    hint: "Changes are localized to a single class rather than scattered across files.",
    level: "complex",
    codeExample: "# Updating tax rules only modifies TaxEngine.calculate_tax()"
  },
  {
    question: "What is the difference between Public, Protected, and Private attributes in Python?",
    shortAnswer: "Public (name): accessible anywhere; Protected (_name): convention indicating internal use; Private (__name): name-mangled to prevent accidental override.",
    explanation: "Python relies on naming conventions rather than strict compiler enforcement.",
    hint: "public, _protected (convention), __private (name mangling).",
    level: "moderate",
    codeExample: "self.name = 'Pub'\nself._name = 'Prot'\nself.__name = 'Priv'"
  },
  {
    question: "What is the 'Single Responsibility Principle' (SRP) in OOP?",
    shortAnswer: "A class should have only one reason to change, meaning it should perform a single, well-defined domain responsibility.",
    explanation: "An Invoice class should calculate totals, but not send emails or handle database connections directly.",
    hint: "A class should do one thing and do it well.",
    level: "moderate",
    codeExample: "# Invoice handles calculations; EmailService handles sending emails"
  },
  {
    question: "How do domain objects interact in a real-world system?",
    shortAnswer: "By passing references to other objects, invoking methods on each other, and collaborating through well-defined public interfaces.",
    explanation: "For example, an Appointment object receives Doctor and Patient objects to complete a consultation transaction.",
    hint: "Objects collaborate by passing references and invoking methods.",
    level: "moderate",
    codeExample: "appointment = Appointment(doctor=doc, patient=pat)"
  },
  {
    question: "What is Method Overriding?",
    shortAnswer: "A subclass providing its own specific implementation of a method that is already defined in its parent superclass.",
    explanation: "Allows specialized subclasses to alter inherited behavior while keeping the same method signature.",
    hint: "Redefining a parent method in a child class.",
    level: "basic",
    codeExample: "class Dog(Animal):\n    def speak(self): return 'Woof!'"
  },
  {
    question: "What is the 'super()' function used for in Python subclasses?",
    shortAnswer: "To delegate method calls to the parent superclass, commonly used inside __init__ to initialize inherited attributes.",
    explanation: "Ensures parent class setup logic executes before child class customizations.",
    hint: "Calls parent superclass methods.",
    level: "basic",
    codeExample: "class Student(Person):\n    def __init__(self, name, roll):\n        super().__init__(name)\n        self.roll = roll"
  },
  {
    question: "Why are magic / dunder methods (like __str__ and __repr__) useful in Python OOP?",
    shortAnswer: "They allow custom class objects to integrate seamlessly with native Python language features like print(), len(), +, and equality checks.",
    explanation: "Provides pythonic syntax for user-defined types.",
    hint: "Enables custom objects to work with native Python operators and built-ins.",
    level: "moderate",
    codeExample: "def __str__(self): return f'Account #{self.acc_num}'"
  },
  {
    question: "What is the danger of deep inheritance trees in OOP?",
    shortAnswer: "They create brittle class hierarchies where changes to top-level base classes unexpectedly break distant subclasses; prefer composition over inheritance.",
    explanation: "Composition ('has-a') is often more flexible than deep inheritance ('is-a').",
    hint: "Brittle hierarchies and ripple-effect bugs; favor composition.",
    level: "complex",
    codeExample: "# Prefer Car has-a Engine over Car is-a Engine"
  },
  {
    question: "What is the ultimate goal of transitioning from Procedural to Object-Oriented thinking?",
    shortAnswer: "To conceptualize software not as a sequence of global state manipulations, but as a community of autonomous, self-governing objects collaborating via clean protocols.",
    explanation: "Enables scalable development of complex real-world software systems.",
    hint: "Viewing systems as cooperating autonomous entities with protected state.",
    level: "basic",
    codeExample: "# Think in terms of entities, invariants, and clean interfaces"
  }
];

export default questions;
