// src/components/study/python/topics/003_001_object-oriented-python/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: Class attributes vs Instance attributes

const questions = [
  {
    question: "What is the primary difference between a Class Attribute and an Instance Attribute?",
    shortAnswer: "A Class Attribute is defined in the class body and shared by all instances in a single memory location; an Instance Attribute is bound to 'self' and unique to each individual object.",
    explanation: "Class attributes live in Class.__dict__; instance attributes live in instance.__dict__.",
    hint: "Class attribute is shared across all instances; instance attribute is unique per instance.",
    level: "basic",
    codeExample: "class Bank:\n    bank_name = 'AccoTax Bank'  # Class attribute\n    def __init__(self, acc): self.acc = acc  # Instance attribute"
  },
  {
    question: "Where are Class Attributes stored in Python's internal memory model?",
    shortAnswer: "Inside the Class's namespace dictionary: ClassName.__dict__.",
    explanation: "There is exactly one copy of a class attribute in memory regardless of how many instances are created.",
    hint: "Stored inside the Class.__dict__ mapping.",
    level: "basic",
    codeExample: "print(Bank.__dict__['bank_name'])"
  },
  {
    question: "Where are Instance Attributes stored in Python's internal memory model?",
    shortAnswer: "Inside each object's private namespace dictionary: instance.__dict__.",
    explanation: "Each instance maintains its own isolated dictionary on the heap.",
    hint: "Stored inside each individual instance.__dict__ mapping.",
    level: "basic",
    codeExample: "b1 = Bank('ACC-1')\nprint(b1.__dict__)  # {'acc': 'ACC-1'}"
  },
  {
    question: "What is Attribute Shadowing in Python?",
    shortAnswer: "When an attribute is assigned directly on an instance (e.g. obj.attr = new_val), Python writes 'attr' into obj.__dict__, which masks/shadows the class attribute of the same name for that instance.",
    explanation: "The class attribute remains intact and unchanged for all other instances.",
    hint: "An instance attribute masking a class attribute of the same name.",
    level: "moderate",
    codeExample: "class S: count = 0\ns = S()\ns.count = 5  # Shadows S.count on 's' only"
  },
  {
    question: "How do you modify a Class Attribute globally across all instances?",
    shortAnswer: "By assigning directly to the Class object: ClassName.attribute_name = new_value.",
    explanation: "Modifying the class attribute directly updates Class.__dict__, immediately reflecting across all instances that haven't shadowed the attribute.",
    hint: "Assign directly on the class: ClassName.attr = val.",
    level: "basic",
    codeExample: "Bank.bank_name = 'New Global Name'"
  },
  {
    question: "What is the danger of defining a mutable collection (like a list or dict) as a Class Attribute?",
    shortAnswer: "Any in-place mutation (e.g. obj.items.append(x)) alters the single shared list in RAM, silently corrupting data across ALL other object instances!",
    explanation: "Because in-place mutation modifies the existing heap object without reassigning the variable.",
    hint: "All instances share the exact same list/dict in RAM.",
    level: "moderate",
    codeExample: "# ANTI-PATTERN:\nclass Student:\n    all_skills = []  # Shared across all students!"
  },
  {
    question: "How do you correctly store collections (lists, dicts, sets) unique to each instance?",
    shortAnswer: "Always initialize them inside __init__ as instance attributes: self.items = [].",
    explanation: "Guarantees a fresh, independent heap allocation for each new object.",
    hint: "Initialize them inside __init__: self.items = [].",
    level: "basic",
    codeExample: "class Student:\n    def __init__(self):\n        self.skills = []  # Isolated per student"
  },
  {
    question: "How do you create an auto-incrementing instance sequence counter using Class Attributes?",
    shortAnswer: "Define a class variable (e.g. _counter = 1000) and increment it on the class inside __init__: ClassName._counter += 1.",
    explanation: "Allows each instance to receive a unique sequential ID upon creation.",
    hint: "Increment ClassName._counter += 1 inside __init__.",
    level: "basic",
    codeExample: "class Invoice:\n    _counter = 1000\n    def __init__(self):\n        Invoice._counter += 1\n        self.id = Invoice._counter"
  },
  {
    question: "What is the 'ClassVar' type annotation from the 'typing' module?",
    shortAnswer: "A static type hint (ClassVar[T]) explicitly declaring that a variable is intended strictly as a class attribute, not an instance attribute.",
    explanation: "Prevents linters and dataclasses from treating the variable as an instance field.",
    hint: "Type annotation explicitly marking a variable as a class attribute.",
    level: "moderate",
    codeExample: "from typing import ClassVar\nclass Config:\n    TIMEOUT: ClassVar[int] = 30"
  },
  {
    question: "What happens when you read 'obj.attr' if 'attr' exists in both instance.__dict__ and Class.__dict__?",
    shortAnswer: "Python returns the value from instance.__dict__ because instance namespace has priority over class namespace in standard attribute resolution.",
    explanation: "The instance attribute shadows the class attribute.",
    hint: "Instance dictionary has priority over class dictionary.",
    level: "basic",
    codeExample: "# Returns instance value"
  },
  {
    question: "How can an instance method access the unshadowed Class Attribute even if the instance has shadowed it?",
    shortAnswer: "By reading explicitly through the class: self.__class__.attribute_name or ClassName.attribute_name.",
    explanation: "Bypasses instance.__dict__ and accesses Class.__dict__ directly.",
    hint: "Access via self.__class__.attr or ClassName.attr.",
    level: "moderate",
    codeExample: "original = self.__class__.branch_name"
  },
  {
    question: "Can an instance delete a Class Attribute using 'del obj.class_attr'?",
    shortAnswer: "No. Attempting 'del obj.class_attr' raises AttributeError; class attributes can only be deleted via 'del ClassName.class_attr'.",
    explanation: "'del obj.attr' only deletes keys from instance.__dict__.",
    hint: "No, raises AttributeError; delete via del ClassName.attr.",
    level: "complex",
    codeExample: "# del obj.class_attr -> AttributeError\n# del ClassName.class_attr -> Deletes class attribute"
  },
  {
    question: "What is a practical use case for deliberately shadowing a Class Attribute on a specific instance?",
    shortAnswer: "Setting global configuration defaults on the class (e.g. timeout = 30, discount = 0.0) while allowing specific custom instances to override that default (e.g. custom_client.discount = 15.0).",
    explanation: "Saves memory by sharing defaults while supporting instance overrides.",
    hint: "Providing default fallback settings that specific instances can override.",
    level: "moderate",
    codeExample: "class Connection:\n    timeout = 30  # Default\n# premium_conn.timeout = 120"
  },
  {
    question: "How do Class Attributes save memory in applications that instantiate millions of objects?",
    shortAnswer: "By storing shared immutable data (like lookup tables, state labels, or constants) once in Class.__dict__ instead of duplicating them across millions of instance.__dict__ objects.",
    explanation: "Significantly reduces heap memory consumption in high-scale systems.",
    hint: "Stores data once instead of duplicating it in every instance dictionary.",
    level: "moderate",
    codeExample: "# Single shared memory allocation for 1,000,000 instances"
  },
  {
    question: "What is the difference between 'ClassName.attr' and 'type(obj).attr'?",
    shortAnswer: "They are equivalent, but 'type(obj).attr' is polymorphic and works dynamically with subclasses without hardcoding the class name.",
    explanation: "Enables flexible subclass attribute resolution.",
    hint: "type(obj).attr resolves class attributes polymorphically.",
    level: "moderate",
    codeExample: "cls_name = type(self).institute_name"
  },
  {
    question: "What happens if a subclass does not define a class attribute present in its parent superclass?",
    shortAnswer: "The subclass inherits and shares the parent's class attribute; reading Subclass.attr resolves to Parent.attr.",
    explanation: "If the subclass assigns 'Subclass.attr = val', it creates a new class attribute on the subclass namespace.",
    hint: "Inherits the parent class attribute through MRO.",
    level: "basic",
    codeExample: "class Parent: tax = 18\nclass Child(Parent): pass\nprint(Child.tax)  # 18"
  },
  {
    question: "Can class attributes be dynamically added to a class at runtime?",
    shortAnswer: "Yes: ClassName.new_attr = value adds the attribute to ClassName.__dict__ and immediately makes it accessible to all instances.",
    explanation: "Classes in Python are dynamic living objects.",
    hint: "Yes, classes are dynamic objects and can receive attributes at runtime.",
    level: "basic",
    codeExample: "BankAccount.minimum_balance = 1000.0"
  },
  {
    question: "How do you check if an attribute belongs to the instance or the class?",
    shortAnswer: "Check if the attribute key exists in 'instance.__dict__' (Instance) or 'ClassName.__dict__' (Class).",
    explanation: "'hasattr(obj, attr)' returns True for both, so checking __dict__ directly identifies the exact namespace.",
    hint: "Check 'attr' in obj.__dict__ vs 'attr' in Class.__dict__.",
    level: "moderate",
    codeExample: "is_instance_attr = 'fee' in obj.__dict__\nis_class_attr = 'fee' in Bank.__dict__"
  },
  {
    question: "What is a 'Class-Level Registry' pattern?",
    shortAnswer: "A class attribute list or dictionary that stores references to all active living instances created by the class.",
    explanation: "Allows iterating over or managing all active entities in an application.",
    hint: "Class variable tracking all instantiated objects.",
    level: "moderate",
    codeExample: "class User:\n    all_users = []\n    def __init__(self, name):\n        User.all_users.append(self)"
  },
  {
    question: "What is the danger of maintaining strong references in a Class-Level Registry?",
    shortAnswer: "It prevents garbage collection of instantiated objects because the class holds permanent references to them, causing memory leaks.",
    explanation: "Use 'weakref.WeakSet()' or 'weakref.WeakValueDictionary()' to allow automatic garbage collection.",
    hint: "Prevents garbage collection; use weakref.WeakSet instead.",
    level: "complex",
    codeExample: "import weakref\n_instances = weakref.WeakSet()"
  },
  {
    question: "What is the difference between writing 'self.count += 1' vs 'ClassName.count += 1' inside a method when 'count' is a class attribute?",
    shortAnswer: "'self.count += 1' evaluates 'self.count = self.count + 1', creating a shadowed instance attribute; 'ClassName.count += 1' updates the shared class variable globally.",
    explanation: "A very common bug in Python OOP exams and interviews.",
    hint: "self.count += 1 shadows locally; ClassName.count += 1 updates globally.",
    level: "moderate",
    codeExample: "# BUG: self.count += 1\n# FIX: ClassName.count += 1"
  },
  {
    question: "Can an instance method be replaced on a single instance without affecting other instances?",
    shortAnswer: "Yes. Using types.MethodType, you can bind a custom function to a specific instance's __dict__ without altering the class.",
    explanation: "Demonstrates that instance namespaces can shadow class methods.",
    hint: "Yes, by binding a function using types.MethodType(func, instance).",
    level: "complex",
    codeExample: "import types\nobj.speak = types.MethodType(custom_speak, obj)"
  },
  {
    question: "What is '__slots__' and how does it affect instance attributes?",
    shortAnswer: "'__slots__' is a special class attribute that restricts instances to a predefined tuple of attributes and eliminates 'instance.__dict__', dramatically saving memory.",
    explanation: "Prevents dynamic arbitrary attribute assignment.",
    hint: "Restricts attributes to a fixed tuple and eliminates __dict__ to optimize RAM.",
    level: "complex",
    codeExample: "class Point:\n    __slots__ = ('x', 'y')"
  },
  {
    question: "Why should domain constants defined as class attributes be named in UPPER_SNAKE_CASE?",
    shortAnswer: "Following PEP 8 conventions to clearly signal to other developers that the attribute represents a constant configuration that should not be mutated.",
    explanation: "Examples: MAX_RETRIES = 5, DEFAULT_CURRENCY = 'INR'.",
    hint: "PEP 8 convention for constants (UPPER_SNAKE_CASE).",
    level: "basic",
    codeExample: "class Loan:\n    DEFAULT_INTEREST_RATE = 8.5"
  },
  {
    question: "What is the golden architectural rule for deciding between Class Attributes and Instance Attributes?",
    shortAnswer: "Use Class Attributes for constants, shared configurations, sequence counters, and defaults; use Instance Attributes for all state unique to a specific entity.",
    explanation: "Maintains clear separation between shared blueprint data and individual object state.",
    hint: "Class for shared constants/counters; Instance for unique object state.",
    level: "basic",
    codeExample: "# Shared = Class; Unique = Instance"
  }
];

export default questions;
