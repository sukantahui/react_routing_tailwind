// src/components/study/python/topics/003_001_object-oriented-python/topic11_files/topic11_questions.js
// Comprehensive Master Review Questions for Topic 11: Polymorphism & Duck Typing in Python

const questions = [
  {
    question: "What is Polymorphism in Python?",
    shortAnswer: "The ability of different classes to respond to the same method call or operator in their own specific way through a uniform interface.",
    explanation: "Allows writing generic code that works seamlessly across diverse object types.",
    hint: "The ability for different object types to respond to the same interface.",
    level: "basic",
    codeExample: "for shape in [Circle(), Square()]:\n    shape.draw()"
  },
  {
    question: "What is 'Duck Typing' in Python?",
    shortAnswer: "A dynamic typing philosophy where an object's suitability is determined by the presence of specific methods and properties, rather than its explicit inheritance lineage ('If it walks like a duck and quacks like a duck, it's a duck').",
    explanation: "Core foundation of Python's flexible, loosely coupled architecture.",
    hint: "An object is judged by its methods/attributes rather than its class name.",
    level: "basic",
    codeExample: "def render(obj):\n    obj.generate()  # Works for any object with generate()"
  },
  {
    question: "How does Python polymorphism differ from Java or C++ polymorphism?",
    shortAnswer: "Java and C++ require explicit nominal subtyping (inheriting from an abstract class or implementing an interface), whereas Python uses duck typing and structural subtyping where no shared inheritance is required.",
    explanation: "Eliminates rigid nominal class hierarchies.",
    hint: "Python uses duck typing without requiring shared base interfaces.",
    level: "moderate",
    codeExample: "# Python: No 'implements Interface' needed!"
  },
  {
    question: "Why is 'if type(obj) == ClassName:' considered an anti-pattern in Python?",
    shortAnswer: "Because it completely breaks polymorphism and subclassing; derived subclasses will fail the equality check and duck-typed objects will be rejected unnecessarily.",
    explanation: "Use duck typing or 'isinstance(obj, Protocol)' instead.",
    hint: "It rejects valid subclasses and duck-typed compatible objects.",
    level: "basic",
    codeExample: "# Bad: if type(x) == list:\n# Good: if isinstance(x, Sequence): or duck typing"
  },
  {
    question: "What is Operator Overloading / Operator Polymorphism?",
    shortAnswer: "The ability to define custom behavior for built-in Python operators (+, -, *, ==, <) on custom classes by implementing magic/dunder methods (__add__, __sub__, __eq__, etc.).",
    explanation: "Enables natural, expressive mathematical domain models.",
    hint: "Implementing magic methods to give custom behavior to standard operators.",
    level: "basic",
    codeExample: "def __add__(self, other):\n    return Money(self.val + other.val)"
  },
  {
    question: "What is the difference between 'Nominal Subtyping' and 'Structural Subtyping'?",
    shortAnswer: "'Nominal Subtyping' bases type compatibility on explicit class names and inheritance hierarchies; 'Structural Subtyping' bases compatibility on the shape (methods and attributes) of the object, regardless of its class name.",
    explanation: "PEP 544 brought structural subtyping to Python via typing.Protocol.",
    hint: "Nominal = by class name/inheritance; Structural = by methods and shape.",
    level: "moderate",
    codeExample: "# Nominal: class Dog(Animal)\n# Structural: class Payer(Protocol)"
  },
  {
    question: "What is 'typing.Protocol' introduced in Python 3.8 (PEP 544)?",
    shortAnswer: "A class that defines a structural interface contract for static type checkers (like mypy) and runtime duck typing without requiring explicit subclassing.",
    explanation: "Combines the power of static typing with the flexibility of Pythonic duck typing.",
    hint: "Defines a structural interface for static and runtime type validation.",
    level: "moderate",
    codeExample: "from typing import Protocol\nclass Renderable(Protocol):\n    def render(self) -> str: ..."
  },
  {
    question: "How do you make a 'typing.Protocol' support runtime 'isinstance()' checks?",
    shortAnswer: "By decorating the Protocol definition with the '@typing.runtime_checkable' decorator.",
    explanation: "Allows calling isinstance(obj, MyProtocol) dynamically at runtime.",
    hint: "Use the @runtime_checkable decorator.",
    level: "moderate",
    codeExample: "@runtime_checkable\nclass AutoPayable(Protocol):\n    def pay(self): ..."
  },
  {
    question: "What happens if a custom object does NOT implement an operator (e.g. __add__) and is added to another object?",
    shortAnswer: "Python tries the reverse operator (__radd__) on the right-hand operand; if both return NotImplemented, Python raises a TypeError: unsupported operand type(s).",
    explanation: "Demonstrates Python's bi-directional operator dispatch mechanism.",
    hint: "Tries __radd__ on the right operand, or raises TypeError if unsupported.",
    level: "complex",
    codeExample: "TypeError: unsupported operand type(s) for +: 'A' and 'B'"
  },
  {
    question: "What is 'EAFP' and how does it relate to Duck Typing?",
    shortAnswer: "'Easier to Ask for Forgiveness than Permission' — the Pythonic philosophy of trying an operation directly and catching exceptions (e.g. AttributeError) rather than checking object types in advance.",
    explanation: "Contrasts with 'LBYL' (Look Before You Leap) used in static languages.",
    hint: "Try the method directly and catch exceptions instead of checking types beforehand.",
    level: "basic",
    codeExample: "try:\n    obj.generate()\nexcept AttributeError:\n    pass"
  },
  {
    question: "What is the built-in 'len()' function an example of?",
    shortAnswer: "Polymorphism: 'len(obj)' works uniformly across strings, lists, dicts, sets, and custom objects by delegating to their internal '__len__()' magic method.",
    explanation: "Uniform interface over diverse internal storage structures.",
    hint: "Polymorphic function delegating to __len__().",
    level: "basic",
    codeExample: "len('abc')  # 3\nlen([1, 2]) # 2"
  },
  {
    question: "Can two completely unrelated classes have identical method signatures and be used interchangeably?",
    shortAnswer: "Yes. In Python, as long as their method names, arguments, and return types match, any caller can consume them interchangeably via duck typing.",
    explanation: "This is the primary strength of dynamic polymorphism in Python.",
    hint: "Yes, duck typing allows unrelated classes with identical methods to be used interchangeably.",
    level: "basic",
    codeExample: "# PDFRenderer and HTMLRenderer used identically"
  },
  {
    question: "What is the 'Liskov Substitution Principle' (LSP) in relation to polymorphism?",
    shortAnswer: "The architectural principle that any subtype must be usable in place of its parent type without altering the correctness or contract expectations of the calling program.",
    explanation: "Ensures polymorphic substitutes do not introduce unexpected exceptions or altered side-effects.",
    hint: "Subtypes must be transparently swappable without breaking program correctness.",
    level: "moderate",
    codeExample: "# Subtypes must preserve method contracts and return types"
  },
  {
    question: "How do you implement polymorphic equality '==' on a custom class?",
    shortAnswer: "By defining the '__eq__(self, other)' magic method to compare object attributes rather than default memory address identity.",
    explanation: "Allows domain objects with identical data to evaluate as equal.",
    hint: "Implement the __eq__ magic method.",
    level: "basic",
    codeExample: "def __eq__(self, other):\n    return self.id == getattr(other, 'id', None)"
  },
  {
    question: "What is the purpose of returning 'NotImplemented' from a magic method like '__add__'?",
    shortAnswer: "It signals to Python that this operand doesn't know how to handle the other type, prompting Python to try the reflected operation (__radd__) on the other operand.",
    explanation: "Returning NotImplemented is required for polite, cooperative operator overloading.",
    hint: "Signals Python to try the reflected __radd__ operator on the other operand.",
    level: "complex",
    codeExample: "if not isinstance(other, Money): return NotImplemented"
  },
  {
    question: "What is a 'Polymorphic Adapter' pattern?",
    shortAnswer: "A wrapper class that translates an incompatible third-party API into a uniform polymorphic interface expected by your core application dispatcher.",
    explanation: "Used extensively for payment gateways, cloud storage providers, and notification engines.",
    hint: "Wraps third-party APIs into a uniform interface for the dispatcher.",
    level: "moderate",
    codeExample: "class StripeAdapter:\n    def process_payment(self, amt): self.stripe.charges.create(...)"
  },
  {
    question: "How does duck typing simplify unit testing with Mock objects?",
    shortAnswer: "You can pass lightweight test mock objects with the required method names directly to production functions without needing to implement elaborate interface hierarchies.",
    explanation: "Accelerates test development and isolates unit dependencies cleanly.",
    hint: "Allows passing simple mock objects matching the expected method signatures.",
    level: "moderate",
    codeExample: "class MockGateway: def process(self): return True"
  },
  {
    question: "What is the difference between 'typing.Union' and Polymorphism?",
    shortAnswer: "'typing.Union' lists explicit acceptable types for static analysis; Polymorphism allows an open-ended number of current and future types to be accepted dynamically via a shared interface.",
    explanation: "Polymorphism is extensible without modifying existing caller type signatures.",
    hint: "Union is closed/explicit; Polymorphism is open/extensible.",
    level: "moderate",
    codeExample: "# Union: Union[A, B]\n# Polymorphism: Any object with .save()"
  },
  {
    question: "Can functions or callables be polymorphic in Python?",
    shortAnswer: "Yes. Higher-order functions can accept any callable object (functions, lambdas, classes with __call__) polymorphically.",
    explanation: "Treats functions as first-class polymorphic citizens.",
    hint: "Yes, functions can accept any callable object.",
    level: "basic",
    codeExample: "def execute(action): action()  # Works for functions or objects with __call__"
  },
  {
    question: "What happens if a duck-typed object is missing an expected method at runtime?",
    shortAnswer: "Python raises an 'AttributeError: 'X' object has no attribute 'method_name'' at the moment of execution.",
    explanation: "Highlighting the importance of Protocols or unit tests for validation.",
    hint: "Raises an AttributeError when the missing method is invoked.",
    level: "basic",
    codeExample: "# AttributeError: 'CashPayment' object has no attribute 'process_charge'"
  },
  {
    question: "How do abstract base classes (ABCs) complement Duck Typing?",
    shortAnswer: "ABCs provide explicit nominal enforcement at instantiation time for when strict contracts are required, while Duck Typing provides maximum dynamic flexibility.",
    explanation: "Topic 13 covers Abstract Base Classes in deep technical detail.",
    hint: "ABCs enforce contracts at instantiation; duck typing provides runtime flexibility.",
    level: "moderate",
    codeExample: "# ABCs enforce methods at instantiation time"
  },
  {
    question: "Can an object implement multiple polymorphic protocols simultaneously?",
    shortAnswer: "Yes. An object can implement methods for multiple protocols (e.g. Serializable, Printable, AutoPayable) without explicit multiple inheritance declarations.",
    explanation: "Full power of structural typing in Python.",
    hint: "Yes, by simply defining all required methods.",
    level: "basic",
    codeExample: "class Order:\n    def to_json(self): ...\n    def print_receipt(self): ..."
  },
  {
    question: "What is 'Ad-Hoc Polymorphism' vs 'Subtype Polymorphism'?",
    shortAnswer: "'Ad-Hoc Polymorphism' refers to operator overloading where the same operator behaves differently for different types; 'Subtype Polymorphism' refers to different classes providing their own implementations of a shared interface.",
    explanation: "Both are fully supported and widely used in Python.",
    hint: "Ad-Hoc = Operator overloading; Subtype = Interface / duck typing dispatch.",
    level: "complex",
    codeExample: "# Ad-Hoc: 1 + 2 vs 'a' + 'b'\n# Subtype: dog.speak() vs cat.speak()"
  },
  {
    question: "How does Python's 'getattr()' support dynamic duck typing?",
    shortAnswer: "'getattr(obj, 'method_name', None)' allows checking for method existence dynamically and invoking it safely without crashing if missing.",
    explanation: "Common in plugin systems and serializer inspection.",
    hint: "Safely retrieves a method or attribute dynamically.",
    level: "basic",
    codeExample: "if callable(getattr(obj, 'export', None)):\n    obj.export()"
  },
  {
    question: "What is the ultimate golden rule for Polymorphism & Duck Typing in Python?",
    shortAnswer: "Focus on what an object can DO (its capabilities and interface) rather than what an object IS (its class name or inheritance tree); design clean, focused method contracts and let Pythonic duck typing handle the dispatch.",
    explanation: "The core philosophy that gives Python its legendary expressiveness and developer velocity.",
    hint: "Focus on object capabilities (what it can DO) rather than class identity.",
    level: "basic",
    codeExample: "# Design around behavior and capabilities, not rigid class hierarchies"
  }
];

export default questions;
