// src/components/study/python/topics/003_001_object-oriented-python/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Instance methods & the self parameter

const questions = [
  {
    question: "What is an Instance Method in Python?",
    shortAnswer: "A function defined inside a class that takes the active object instance as its first parameter (conventionally named 'self') and operates on instance-specific state.",
    explanation: "Instance methods have direct access to self.__dict__ and can read or modify the instance's attributes.",
    hint: "A function defined in a class taking 'self' as its first parameter.",
    level: "basic",
    codeExample: "class Student:\n    def study(self):\n        print(f'{self.name} is studying.')"
  },
  {
    question: "How does Python translate the method call 'obj.deposit(500)' under the hood?",
    shortAnswer: "Python translates 'obj.deposit(500)' into the explicit class call: 'BankAccount.deposit(obj, 500)'.",
    explanation: "The instance before the dot is automatically passed as the first argument ('self').",
    hint: "Translates to ClassName.method(instance, args).",
    level: "basic",
    codeExample: "acc.deposit(500)  # Identical to BankAccount.deposit(acc, 500)"
  },
  {
    question: "What error occurs if you define a method without 'self' (e.g. def speak():) and call it on an instance (obj.speak())?",
    shortAnswer: "TypeError: speak() takes 0 positional arguments but 1 was given.",
    explanation: "Because Python automatically injects the instance 'obj' as an argument, but the function header declared 0 parameters.",
    hint: "Raises TypeError because 1 argument (the instance) is automatically passed.",
    level: "basic",
    codeExample: "# TypeError: speak() takes 0 positional arguments but 1 was given\nclass Dog:\n    def speak(): pass\nDog().speak()"
  },
  {
    question: "What is the difference between an Unbound Function and a Bound Method in Python?",
    shortAnswer: "An Unbound Function is the raw function stored in the Class namespace; a Bound Method is a callable object created when accessing the function through an instance, with the instance already pre-bound to 'self'.",
    explanation: "You can inspect the bound instance using bound_method.__self__.",
    hint: "Bound methods have the instance pre-attached to self.",
    level: "moderate",
    codeExample: "print(type(Dog.bark))   # <class 'function'>\nprint(type(d.bark))     # <class 'method'>"
  },
  {
    question: "What is the 'Method Chaining' pattern in Python?",
    shortAnswer: "Designing mutator methods to return 'self' (return self) so multiple method calls can be chained together sequentially in a single fluent expression.",
    explanation: "Commonly used in builder interfaces, query builders, and configuration pipelines.",
    hint: "Returning 'self' from methods to allow obj.step1().step2().step3().",
    level: "basic",
    codeExample: "invoice.add_item('Book', 500).apply_discount(50).finalize()"
  },
  {
    question: "How do you call another method of the same class from within an instance method?",
    shortAnswer: "Using the 'self' reference: self.other_method_name(*args).",
    explanation: "Ensures the method is looked up polymorphically on the active instance.",
    hint: "Use self.other_method().",
    level: "basic",
    codeExample: "def checkout(self):\n    if self._validate_cart():\n        self.process_payment()"
  },
  {
    question: "What naming convention is used in Python to indicate an internal helper method?",
    shortAnswer: "A single leading underscore (e.g., def _validate_input(self):).",
    explanation: "Signals to other developers that the method is intended for internal class use only.",
    hint: "Prefix with a single leading underscore: _method_name.",
    level: "basic",
    codeExample: "def _calculate_tax(self):\n    return self.subtotal * 0.18"
  },
  {
    question: "Can a bound instance method be passed as a callback into a standard library function like sorted() or threading?",
    shortAnswer: "Yes. In Python, bound methods are first-class callable objects that retain their reference to 'self' wherever they are passed.",
    explanation: "Allows clean event-driven architectures without needing lambda wrappers.",
    hint: "Yes, bound methods are first-class callables with self pre-bound.",
    level: "moderate",
    codeExample: "button.on_click = account.deposit"
  },
  {
    question: "Can an instance method take other object instances as arguments?",
    shortAnswer: "Yes. Objects can receive and interact with other object instances (e.g. account1.transfer_to(account2, 500)).",
    explanation: "Enables collaboration and domain modeling across entities.",
    hint: "Yes, methods can take any object instances as parameters.",
    level: "basic",
    codeExample: "def transfer_to(self, recipient_acc, amount):\n    self.withdraw(amount)\n    recipient_acc.deposit(amount)"
  },
  {
    question: "Why did Guido van Rossum choose to make 'self' explicit in Python rather than implicit (like 'this' in Java or C++)?",
    shortAnswer: "Following the core Zen of Python principle: 'Explicit is better than implicit', making attribute access crystal clear (self.x vs local variable x).",
    explanation: "Eliminates ambiguity between local function variables and instance attributes without requiring special scoping rules.",
    hint: "'Explicit is better than implicit' - clarifies instance attributes from locals.",
    level: "moderate",
    codeExample: "# self.x is unambiguously an instance attribute; x is a local variable"
  },
  {
    question: "Is the word 'self' a Python reserved keyword?",
    shortAnswer: "No. 'self' is just a strongly enforced community convention; you could technically name it 'this' or 'me', but doing so violates PEP 8 and breaks IDE tooling.",
    explanation: "Python only cares that there is a parameter in the first position to receive the instance.",
    hint: "Not a keyword, but a mandatory PEP 8 convention.",
    level: "basic",
    codeExample: "# PEP 8 rule: Always name the first parameter 'self'"
  },
  {
    question: "How can an instance method access class-level attributes?",
    shortAnswer: "Via self.class_attr (which falls back to the class if not shadowed on instance) or explicitly via self.__class__.class_attr / ClassName.class_attr.",
    explanation: "Using self.__class__.attr ensures the attribute is read from the class even if shadowed on the instance.",
    hint: "Via self.class_attr or self.__class__.class_attr.",
    level: "moderate",
    codeExample: "def get_bank(self):\n    return self.__class__.bank_name"
  },
  {
    question: "What happens if a method reassigns a class attribute using 'self.attr = value'?",
    shortAnswer: "It creates a new instance attribute on 'self.__dict__' that shadows the class attribute for that instance only; the class attribute remains unchanged for all other instances.",
    explanation: "To update the class-level variable globally, you must assign to 'ClassName.attr = value'.",
    hint: "Creates an instance attribute that shadows the class variable.",
    level: "moderate",
    codeExample: "self.branch = 'New'  # Shadowed on self only!\nBank.branch = 'New'  # Updated globally across class"
  },
  {
    question: "What is the difference between an Instance Method and a Class Method (@classmethod)?",
    shortAnswer: "An instance method takes 'self' (the instance) and accesses instance state; a class method takes 'cls' (the class itself) and accesses class-level state or acts as a factory.",
    explanation: "Class methods cannot access instance attributes directly.",
    hint: "Instance method takes self; Class method takes cls.",
    level: "basic",
    codeExample: "# Instance: def method(self):\n# Class:    @classmethod def method(cls):"
  },
  {
    question: "What is the difference between an Instance Method and a Static Method (@staticmethod)?",
    shortAnswer: "An instance method takes 'self' and accesses instance state; a static method takes neither 'self' nor 'cls' and behaves like a plain utility function nested inside a class namespace.",
    explanation: "Static methods do not depend on instance or class state.",
    hint: "Static method takes neither self nor cls.",
    level: "basic",
    codeExample: "# @staticmethod\n# def add(a, b): return a + b"
  },
  {
    question: "Can an instance method delete an attribute from the instance?",
    shortAnswer: "Yes: using 'del self.attribute_name' inside the method body.",
    explanation: "Removes the key from self.__dict__.",
    hint: "Use del self.attribute_name.",
    level: "basic",
    codeExample: "def reset_token(self):\n    if hasattr(self, 'auth_token'):\n        del self.auth_token"
  },
  {
    question: "What is 'Monkey Patching' a method in Python?",
    shortAnswer: "Dynamically replacing or adding a method to a class or instance at runtime after the class definition has already been loaded.",
    explanation: "Commonly used in testing libraries to mock external API methods.",
    hint: "Dynamically modifying class methods at runtime.",
    level: "complex",
    codeExample: "def custom_deposit(self, amt): self.bal += amt * 2\nBankAccount.deposit = custom_deposit"
  },
  {
    question: "How do you define a method that accepts an arbitrary number of positional arguments?",
    shortAnswer: "def method_name(self, *args):",
    explanation: "Packs extra positional arguments into a tuple named 'args'.",
    hint: "Use *args after self: def method(self, *args).",
    level: "basic",
    codeExample: "def log_entries(self, *messages):\n    for msg in messages: print(msg)"
  },
  {
    question: "What is a 'Pure Method' vs an 'Impure / Mutator Method' in OOP?",
    shortAnswer: "A pure method computes and returns a result without mutating instance state (e.g. calculate_interest()); a mutator method alters instance attributes (e.g. withdraw()).",
    explanation: "Pure methods make code easier to test and reason about.",
    hint: "Pure methods don't mutate state; mutator methods alter attributes.",
    level: "moderate",
    codeExample: "# Pure: def get_tax(self): return self.bal * 0.05\n# Mutator: def withdraw(self, amt): self.bal -= amt"
  },
  {
    question: "Can an instance method be decorated with standard Python decorators?",
    shortAnswer: "Yes. Instance methods can be wrapped with any standard decorator (e.g. @lru_cache, @timed, @validate_auth).",
    explanation: "Decorators must accept 'self' as the first argument when wrapping instance methods.",
    hint: "Yes, standard decorators work seamlessly with instance methods.",
    level: "moderate",
    codeExample: "@timed\ndef generate_report(self):\n    pass"
  },
  {
    question: "What is the danger of returning mutable internal data structures directly from an instance method?",
    shortAnswer: "Callers can directly modify the returned list/dict outside the object, bypassing invariant validation and corrupting internal state.",
    explanation: "Best practice: return a copy (e.g., return list(self._items) or a read-only view).",
    hint: "Callers can mutate internal data; return copies or read-only views.",
    level: "complex",
    codeExample: "def get_history(self):\n    return list(self._history)  # Defensive copy"
  },
  {
    question: "How do you inspect the docstring of an instance method programmatically?",
    shortAnswer: "Using obj.method.__doc__ or help(obj.method).",
    explanation: "Docstrings are stored in the method's __doc__ attribute.",
    hint: "Use obj.method.__doc__.",
    level: "basic",
    codeExample: "print(account.deposit.__doc__)"
  },
  {
    question: "What happens if a subclass defines an instance method with the exact same name as a superclass method?",
    shortAnswer: "The subclass overrides the superclass method; calling obj.method() executes the subclass version (unless super().method() is called explicitly).",
    explanation: "Forms the basis of Method Overriding in polymorphism.",
    hint: "Method overriding: the subclass version takes precedence.",
    level: "basic",
    codeExample: "class PremiumAccount(BankAccount):\n    def withdraw(self, amt): ...  # Overrides parent"
  },
  {
    question: "What is 'Duck Typing' when calling methods on arbitrary objects?",
    shortAnswer: "Calling a method (e.g. obj.render()) without checking the object's class type, assuming that if the method exists, the object will handle the request properly.",
    explanation: "Emphasizes interfaces and capabilities over strict class hierarchies.",
    hint: "Calling methods based on behavior rather than explicit class types.",
    level: "moderate",
    codeExample: "def print_statement(statement_printable):\n    statement_printable.print_statement()"
  },
  {
    question: "What is the primary design principle for crafting clean instance methods?",
    shortAnswer: "Methods should be cohesive, perform a single distinct task, protect internal invariants, and maintain the object in a valid state throughout execution.",
    explanation: "Follows the Single Responsibility Principle and Encapsulation best practices.",
    hint: "Single responsibility, high cohesion, and strict invariant protection.",
    level: "basic",
    codeExample: "# High cohesion methods with clear single responsibilities"
  }
];

export default questions;
