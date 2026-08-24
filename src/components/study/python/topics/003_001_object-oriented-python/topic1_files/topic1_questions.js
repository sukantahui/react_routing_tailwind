// src/components/study/python/topics/003_001_object-oriented-python/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: Classes, Instances & Objects: syntax and lifecycle

const questions = [
  {
    question: "What is the difference between a Class and an Object Instance?",
    shortAnswer: "A Class is a user-defined blueprint that defines the structure and behavior; an Object Instance is a concrete living realization of that blueprint stored in memory.",
    explanation: "You can create hundreds of distinct object instances from a single class blueprint.",
    hint: "Class = Template/Blueprint; Object Instance = Living memory structure.",
    level: "basic",
    codeExample: "class Car: pass\ncar1 = Car()  # Instance 1\ncar2 = Car()  # Instance 2"
  },
  {
    question: "What naming convention does PEP 8 recommend for Python class names?",
    shortAnswer: "PascalCase (also known as CapWords), where each word starts with a capital letter without underscores (e.g. BankAccount, UserRegistration).",
    explanation: "Distinguishes classes visually from functions and variables which use snake_case.",
    hint: "PascalCase / CapWords convention.",
    level: "basic",
    codeExample: "class CourseEnrollmentManager:\n    pass"
  },
  {
    question: "How do you inspect the unique memory address identifier of an object in Python?",
    shortAnswer: "Using the built-in id(obj) function or hex(id(obj)) for hexadecimal memory format.",
    explanation: "In CPython, id() returns the actual virtual memory address where the object resides.",
    hint: "Use id(obj) or hex(id(obj)).",
    level: "basic",
    codeExample: "obj = object()\nprint(hex(id(obj)))  # e.g. 0x7fa28c045b10"
  },
  {
    question: "What is the difference between the '==' operator and the 'is' operator when comparing objects?",
    shortAnswer: "'==' checks for value equality (invoking __eq__); 'is' checks for memory identity (whether both variables point to the exact same memory address: id(a) == id(b)).",
    explanation: "Two different objects with identical data will evaluate to True for '==' but False for 'is'.",
    hint: "'==' tests value equality; 'is' tests memory identity.",
    level: "basic",
    codeExample: "a = [1, 2]\nb = [1, 2]\nprint(a == b)  # True\nprint(a is b)  # False"
  },
  {
    question: "What are the 4 stages in the CPython object lifecycle?",
    shortAnswer: "1. Allocation (__new__); 2. Initialization (__init__); 3. Active Usage & Reference Counting; 4. Destruction & Deallocation (__del__).",
    explanation: "These four stages dictate how objects are born, configured, used, and reclaimed by memory management.",
    hint: "Allocation -> Initialization -> Usage -> Destruction.",
    level: "moderate",
    codeExample: "# 1. __new__ -> 2. __init__ -> 3. obj.method() -> 4. __del__"
  },
  {
    question: "What is the difference between '__new__' and '__init__'?",
    shortAnswer: "'__new__' is a static constructor that creates and returns the raw empty instance in memory; '__init__' is an initializer that configures attributes on that already-created instance.",
    explanation: "'__new__' takes 'cls' and returns the object; '__init__' takes 'self' and returns None.",
    hint: "__new__ creates the object; __init__ initializes its attributes.",
    level: "complex",
    codeExample: "def __new__(cls, *args): return super().__new__(cls)\ndef __init__(self, name): self.name = name"
  },
  {
    question: "What is reference counting in Python's memory management?",
    shortAnswer: "CPython tracks the number of active references pointing to each object in memory; when an object's reference count drops to 0, its memory is deallocated immediately.",
    explanation: "You can inspect an object's reference count using sys.getrefcount(obj).",
    hint: "Tracking active pointers to an object; freed when count hits 0.",
    level: "moderate",
    codeExample: "import sys\nx = []\nprint(sys.getrefcount(x) - 1)"
  },
  {
    question: "What is the '__del__' method in Python?",
    shortAnswer: "A destructor method called automatically by the garbage collector right before an object's memory is deallocated.",
    explanation: "Often used to close external non-memory resources like sockets or file descriptors (though context managers with 'with' are preferred).",
    hint: "Destructor callback executed when reference count hits 0.",
    level: "moderate",
    codeExample: "def __del__(self):\n    print('Cleaning up resources...')"
  },
  {
    question: "Why should developers avoid relying heavily on '__del__' for critical resource cleanup?",
    shortAnswer: "Because the exact timing of __del__ execution is non-deterministic, circular references can delay cleanup, and exceptions inside __del__ are ignored.",
    explanation: "Context managers (the 'with' statement) provide guaranteed deterministic cleanup.",
    hint: "Non-deterministic execution and circular reference traps; use 'with' instead.",
    level: "complex",
    codeExample: "# Prefer 'with open(...) as f:' over relying on __del__"
  },
  {
    question: "What is '__dict__' on an object instance?",
    shortAnswer: "A standard Python dictionary that stores all dynamic writable attributes assigned to that specific object instance.",
    explanation: "When you write 'obj.x = 10', Python stores {'x': 10} inside 'obj.__dict__'.",
    hint: "The internal dictionary mapping attribute names to values on an instance.",
    level: "moderate",
    codeExample: "class A: pass\na = A()\na.score = 95\nprint(a.__dict__)  # {'score': 95}"
  },
  {
    question: "What is the attribute lookup resolution order when evaluating 'obj.attr'?",
    shortAnswer: "1. obj.__dict__ (Instance Namespace) -> 2. Class.__dict__ (Class Namespace) -> 3. Base Classes in MRO order -> 4. Raises AttributeError if not found.",
    explanation: "Instance attributes shadow/override class attributes with the same name.",
    hint: "Instance dict -> Class dict -> Base class dict -> AttributeError.",
    level: "moderate",
    codeExample: "# Lookup flow: instance -> class -> base classes -> error"
  },
  {
    question: "What is Attribute Shadowing in Python objects?",
    shortAnswer: "When an attribute is assigned to an instance (e.g. obj.company = 'New'), it creates an entry in obj.__dict__ that overrides/shadows the class-level attribute of the same name for that specific instance.",
    explanation: "The class-level attribute remains unchanged for all other instances.",
    hint: "Instance attribute hiding a class attribute of the same name.",
    level: "moderate",
    codeExample: "class S: count = 0\ns = S()\ns.count = 10  # Shadows S.count on 's' only"
  },
  {
    question: "What is the difference between 'type(obj) is Class' and 'isinstance(obj, Class)'?",
    shortAnswer: "'type(obj) is Class' checks for exact type match without considering inheritance; 'isinstance(obj, Class)' returns True for subclasses as well.",
    explanation: "PEP 8 strongly recommends 'isinstance()' for polymorphic type checking.",
    hint: "isinstance supports inheritance hierarchies; type() checks exact type.",
    level: "moderate",
    codeExample: "isinstance(student, Person)  # True if student is a subclass of Person"
  },
  {
    question: "Can attributes be added dynamically to an instance after creation?",
    shortAnswer: "Yes. By default, Python instances allow adding, modifying, and deleting attributes dynamically at runtime unless restricted by __slots__.",
    explanation: "Python objects are open dynamic dictionaries by default.",
    hint: "Yes, Python objects are dynamic by default.",
    level: "basic",
    codeExample: "user = User()\nuser.temporary_tag = 'VIP'"
  },
  {
    question: "What does the 'pass' keyword do inside a class definition?",
    shortAnswer: "Acts as a placeholder statement to create a syntactically valid empty class without attributes or methods.",
    explanation: "Useful when scaffolding code or creating custom exception types.",
    hint: "Placeholder statement for empty class definitions.",
    level: "basic",
    codeExample: "class CustomAppError(Exception):\n    pass"
  },
  {
    question: "What is '__class__' on an instance?",
    shortAnswer: "A reference pointing back to the Class object that was used to instantiate the object.",
    explanation: "'obj.__class__' is equivalent to 'type(obj)'.",
    hint: "Reference to the instance's class type.",
    level: "basic",
    codeExample: "obj = Car()\nprint(obj.__class__.__name__)  # 'Car'"
  },
  {
    question: "What is the base class from which all Python classes inherit by default in Python 3?",
    shortAnswer: "The built-in 'object' class (e.g. class MyClass: is equivalent to class MyClass(object):).",
    explanation: "Every class in Python 3 is a new-style class inheriting from 'object'.",
    hint: "The root 'object' class.",
    level: "basic",
    codeExample: "print(isinstance(5, object))     # True\nprint(isinstance('a', object))   # True"
  },
  {
    question: "How do you delete an attribute from an instance dynamically?",
    shortAnswer: "Using the 'del' statement: del obj.attribute_name (or delattr(obj, 'attribute_name')).",
    explanation: "Removes the key from obj.__dict__.",
    hint: "Use del obj.attr or delattr(obj, 'attr').",
    level: "basic",
    codeExample: "del student.temp_score"
  },
  {
    question: "What is 'getattr(obj, 'attr', default)' used for?",
    shortAnswer: "Dynamically accesses an attribute on an object by its string name, returning a fallback default if the attribute does not exist.",
    explanation: "Prevents AttributeError crashes when accessing dynamic or optional attributes.",
    hint: "Safely reads dynamic attributes by string name with a fallback default.",
    level: "basic",
    codeExample: "role = getattr(user, 'role', 'guest')"
  },
  {
    question: "What is 'hasattr(obj, 'attr')'?",
    shortAnswer: "Returns True if the specified attribute or method name exists on the object (or its class hierarchy), otherwise False.",
    explanation: "Useful for introspection and duck-typing capability checks.",
    hint: "Checks if an attribute or method exists on an object.",
    level: "basic",
    codeExample: "if hasattr(stream, 'read'): stream.read()"
  },
  {
    question: "What does 'setattr(obj, 'attr', value)' do?",
    shortAnswer: "Sets an attribute on an object using a dynamic string name.",
    explanation: "Equivalent to 'obj.attr = value', but allows the attribute name to be a variable.",
    hint: "Dynamically assigns an attribute using a string key.",
    level: "basic",
    codeExample: "setattr(config, 'db_port', 5432)"
  },
  {
    question: "What is a 'Circular Reference' and how does Python's cyclic garbage collector handle it?",
    shortAnswer: "When two or more objects reference each other (A -> B -> A), reference counts never hit 0; Python's generational cyclic garbage collector periodically detects and frees unreferenced reference cycles.",
    explanation: "The gc module implements the tri-color generational tracing algorithm.",
    hint: "Mutually referencing objects freed by generational cyclic GC.",
    level: "complex",
    codeExample: "# A.ref = B; B.ref = A -> Handled by gc.collect()"
  },
  {
    question: "How do multiple instances share methods without duplicating code in memory?",
    shortAnswer: "Methods are stored only ONCE in the Class's namespace (Class.__dict__); when invoked on an instance (obj.method()), Python binds the instance as the 'self' argument.",
    explanation: "Each instance only stores its own unique attribute data.",
    hint: "Methods live in Class.__dict__ and receive the instance via self.",
    level: "complex",
    codeExample: "# Car.drive is stored once; car1.drive() passes car1 as self"
  },
  {
    question: "What is the difference between a Function and a Bound Method in Python?",
    shortAnswer: "A function defined inside a class is an unbound function; when accessed through an instance, Python wraps it into a 'Bound Method' with the instance pre-bound to 'self'.",
    explanation: "type(MyClass.method) is function, but type(instance.method) is method.",
    hint: "Bound method has instance pre-bound as first argument.",
    level: "complex",
    codeExample: "print(type(Car.drive))      # <class 'function'>\nprint(type(my_car.drive))   # <class 'method'>"
  },
  {
    question: "What is the primary best practice for initializing instance state in Python classes?",
    shortAnswer: "Always define and initialize all expected instance attributes explicitly inside the __init__ constructor rather than adding them ad-hoc across different methods.",
    explanation: "Ensures that every instance starts in a predictable, consistent state and improves IDE autocompletion and static type checking.",
    hint: "Declare all attributes explicitly inside __init__.",
    level: "basic",
    codeExample: "class Account:\n    def __init__(self, acc_no):\n        self.acc_no = acc_no\n        self.balance = 0.0"
  }
];

export default questions;
