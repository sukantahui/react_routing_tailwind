// src/components/study/python/topics/003_001_object-oriented-python/topic8_files/topic8_questions.js
// Comprehensive Master Review Questions for Topic 8: Inheritance: Single, Multiple, Multilevel, and Hierarchical

const questions = [
  {
    question: "What is Inheritance in Object-Oriented Programming?",
    shortAnswer: "A mechanism where a new class (derived/child subclass) inherits attributes, methods, and behaviors from one or more existing classes (base/parent superclasses).",
    explanation: "Promotes code reuse, polymorphism, and hierarchical domain modeling.",
    hint: "Mechanism allowing a child class to inherit state and behavior from parent classes.",
    level: "basic",
    codeExample: "class Student(Person):\n    pass"
  },
  {
    question: "What are the four primary inheritance topologies supported in Python?",
    shortAnswer: "1. Single Inheritance; 2. Multilevel Inheritance; 3. Multiple Inheritance; 4. Hierarchical Inheritance.",
    explanation: "Python also supports Hybrid Inheritance by combining these topologies.",
    hint: "Single, Multilevel, Multiple, and Hierarchical.",
    level: "basic",
    codeExample: "# Single: class B(A)\n# Multilevel: class C(B) -> class B(A)\n# Multiple: class D(A, B)\n# Hierarchical: class B(A), class C(A)"
  },
  {
    question: "What is Single Inheritance?",
    shortAnswer: "When a child subclass inherits from exactly one parent superclass (e.g. class Employee(Person):).",
    explanation: "The simplest and most common form of object-oriented inheritance.",
    hint: "Child inherits from exactly one parent.",
    level: "basic",
    codeExample: "class Staff(Person):\n    def __init__(self, name, emp_id):\n        super().__init__(name)\n        self.emp_id = emp_id"
  },
  {
    question: "What is Multilevel Inheritance?",
    shortAnswer: "When a class inherits from a derived class, forming a linear ancestral chain (e.g. Person -> Staff -> DepartmentHead).",
    explanation: "The bottom-most subclass inherits attributes and methods from all ancestors in the chain.",
    hint: "A linear chain of inheritance (Grandparent -> Parent -> Child).",
    level: "basic",
    codeExample: "class A: pass\nclass B(A): pass\nclass C(B): pass  # Multilevel"
  },
  {
    question: "What is Multiple Inheritance in Python?",
    shortAnswer: "When a single subclass inherits directly from two or more parent base classes simultaneously (e.g. class Admin(User, LoggerMixin, AuthMixin):).",
    explanation: "Allows combining multiple independent capabilities into a single entity.",
    hint: "Child subclass inheriting from two or more parent classes.",
    level: "basic",
    codeExample: "class FlyingCar(Car, Airplane):\n    pass"
  },
  {
    question: "What is the 'Mixin' architectural pattern in Python?",
    shortAnswer: "A small, specialized class designed to add a single reusable capability (e.g. JSON export, logging, caching) to other classes via multiple inheritance, without being instantiated on its own.",
    explanation: "Mixins do not maintain independent state or participate in strict taxonomy.",
    hint: "Small composable class providing a specific capability.",
    level: "moderate",
    codeExample: "class JSONMixin:\n    def to_json(self): return json.dumps(self.__dict__)"
  },
  {
    question: "What is Hierarchical Inheritance?",
    shortAnswer: "When multiple independent subclasses inherit from a single shared parent base class (e.g. OnlineCourse and ClassroomCourse both inheriting from EducationalCourse).",
    explanation: "Common for modeling sibling branches that share common root properties.",
    hint: "Multiple subclasses sharing one single parent root.",
    level: "basic",
    codeExample: "class Cat(Animal): pass\nclass Dog(Animal): pass"
  },
  {
    question: "What is the difference between 'isinstance(obj, Class)' and 'issubclass(SubClass, BaseClass)'?",
    shortAnswer: "'isinstance(obj, Class)' checks if an object instance belongs to a class or any of its ancestors; 'issubclass(Sub, Base)' checks if a class type is derived from another class.",
    explanation: "'isinstance' evaluates living objects; 'issubclass' evaluates class types.",
    hint: "isinstance checks objects; issubclass checks class types.",
    level: "basic",
    codeExample: "isinstance(student, Person)       # True (Object check)\nissubclass(StudentUser, BaseUser) # True (Class check)"
  },
  {
    question: "What is the core difference between 'IS-A' (Inheritance) and 'HAS-A' (Composition)?",
    shortAnswer: "'IS-A' represents inheritance where a subclass is a specialized version of the base class (A Student IS A User); 'HAS-A' represents composition where an object contains another object as an attribute (A Student HAS AN Address).",
    explanation: "A fundamental distinction in software design and architecture.",
    hint: "IS-A = Inheritance; HAS-A = Composition (owning an object).",
    level: "moderate",
    codeExample: "# IS-A: class Student(User)\n# HAS-A: self.address = Address()"
  },
  {
    question: "Why do software architects recommend 'Favor Composition over Inheritance'?",
    shortAnswer: "Because deep, rigid inheritance hierarchies create fragile base class bugs and tight coupling; composition provides greater flexibility, easier unit testing, and dynamic runtime interchangeability.",
    explanation: "Composition allows swapping behavior by replacing internal object components.",
    hint: "Reduces coupling, avoids fragile hierarchies, and increases flexibility.",
    level: "moderate",
    codeExample: "# Better to compose behaviors than build 8-level inheritance hierarchies"
  },
  {
    question: "How does constructor chaining work with 'super().__init__()' in single and multilevel inheritance?",
    shortAnswer: "Each derived class calls 'super().__init__(*args)' at the beginning of its constructor, delegating the initialization of inherited attributes up the chain.",
    explanation: "Ensures every ancestral layer in the hierarchy is properly initialized in sequence.",
    hint: "Subclass delegates initialization up the hierarchy via super().__init__().",
    level: "basic",
    codeExample: "def __init__(self, name, id):\n    super().__init__(name)\n    self.id = id"
  },
  {
    question: "What is the root class of all classes in Python 3?",
    shortAnswer: "The built-in 'object' class. Every class in Python 3 automatically inherits from 'object' by default.",
    explanation: "Provides fundamental magic methods like __str__, __eq__, and __hash__.",
    hint: "The root 'object' class.",
    level: "basic",
    codeExample: "isinstance(any_class_instance, object)  # Always True"
  },
  {
    question: "What is 'Hybrid Inheritance'?",
    shortAnswer: "A combination of two or more inheritance topologies in a single application (e.g. hierarchical branching combined with multiple mixin inheritance).",
    explanation: "Very common in large enterprise frameworks and GUI libraries.",
    hint: "A combination of multiple inheritance types in one architecture.",
    level: "moderate",
    codeExample: "class SuperUser(BaseUser, AuditMixin): pass"
  },
  {
    question: "What naming convention is standard for Mixin classes in Python?",
    shortAnswer: "Suffixing the class name with 'Mixin' (e.g. JSONExportMixin, AuthLoggerMixin, SerializerMixin).",
    explanation: "Clearly communicates architectural intent to other developers.",
    hint: "Suffix the class name with 'Mixin'.",
    level: "basic",
    codeExample: "class CacheableMixin:\n    pass"
  },
  {
    question: "Can a subclass access protected attributes ('_var') inherited from a parent class?",
    shortAnswer: "Yes. Protected attributes prefixed with a single underscore are fully accessible to subclasses in Python.",
    explanation: "Designed specifically for internal class and subclass sharing.",
    hint: "Yes, protected _var attributes are accessible to subclasses.",
    level: "basic",
    codeExample: "class Child(Parent):\n    def show(self): print(self._protected_data)"
  },
  {
    question: "Can a subclass directly access private attributes ('__var') inherited from a parent class without mangled names?",
    shortAnswer: "No. Because parent private attributes are mangled to '_ParentClass__var', calling 'self.__var' in the child looks for '_ChildClass__var' and raises AttributeError.",
    explanation: "Demonstrates the collision prevention mechanism of Name Mangling.",
    hint: "No, raises AttributeError due to class-specific name mangling.",
    level: "moderate",
    codeExample: "# Child cannot directly access self.__parent_private"
  },
  {
    question: "How do you check all direct parent base classes of a class in Python?",
    shortAnswer: "Using the 'ClassName.__bases__' tuple attribute.",
    explanation: "Lists the direct parent classes specified in the class definition header.",
    hint: "Inspect ClassName.__bases__.",
    level: "basic",
    codeExample: "print(SuperAdminUser.__bases__)"
  },
  {
    question: "How do you check all direct subclasses of a class in Python?",
    shortAnswer: "Using the 'ClassName.__subclasses__()' method.",
    explanation: "Returns a list of all active subclasses currently loaded in memory.",
    hint: "Call ClassName.__subclasses__().",
    level: "moderate",
    codeExample: "print(BaseSystemUser.__subclasses__())"
  },
  {
    question: "What is the 'Fragile Base Class' problem in object-oriented inheritance?",
    shortAnswer: "An architectural hazard where a seemingly harmless modification to a base class unintentionally breaks derived subclasses across the entire system.",
    explanation: "One of the main arguments for preferring composition over deep inheritance hierarchies.",
    hint: "Base class modifications unintentionally breaking derived subclasses.",
    level: "complex",
    codeExample: "# Modifying Parent.__init__ signature breaks 20 subclasses"
  },
  {
    question: "Can a class inherit from multiple classes that have conflicting method names?",
    shortAnswer: "Yes. Python uses the C3 Linearization algorithm to establish the Method Resolution Order (MRO), determining which parent's method takes precedence.",
    explanation: "Topic 10 covers Method Resolution Order (MRO) in deep technical detail.",
    hint: "Yes, resolved by Python's Method Resolution Order (MRO).",
    level: "moderate",
    codeExample: "# Resolved by MRO left-to-right order"
  },
  {
    question: "Why should Mixin classes generally NOT define their own complex '__init__' constructors?",
    shortAnswer: "To avoid constructor argument conflicts and complicated 'super().__init__()' parameter passing issues when combined with other classes.",
    explanation: "Mixins should provide modular stateless or decoupled behaviors.",
    hint: "To avoid constructor parameter conflicts during multiple inheritance.",
    level: "complex",
    codeExample: "# Mixins should focus on methods rather than heavy stateful __init__"
  },
  {
    question: "What is the Liskov Substitution Principle (LSP) in inheritance?",
    shortAnswer: "The principle that objects of a superclass should be replaceable with objects of a subclass without breaking application correctness or violating expected contracts.",
    explanation: "Subclasses must honor the method signatures and invariants of parent classes.",
    hint: "Subclasses must be substitutable for their base classes without breaking behavior.",
    level: "moderate",
    codeExample: "# Subclasses should accept the same arguments and return compatible types"
  },
  {
    question: "Can a class inherit from a built-in Python type like list or dict?",
    shortAnswer: "Yes (e.g. class CustomList(list):), although inheriting from collections.UserList or collections.UserDict is generally recommended for complete C-extension override compatibility.",
    explanation: "Allows customizing standard data structure behavior.",
    hint: "Yes, or use collections.UserList / UserDict for cleaner overrides.",
    level: "moderate",
    codeExample: "class AutoSortingList(list):\n    def append(self, item):\n        super().append(item)\n        self.sort()"
  },
  {
    question: "What is the difference between 'type(obj) is ParentClass' and 'isinstance(obj, ParentClass)'?",
    shortAnswer: "'type(obj) is ParentClass' checks for exact type identity and returns False for derived subclasses; 'isinstance(obj, ParentClass)' returns True for subclasses, honoring inheritance.",
    explanation: "Always use 'isinstance' for polymorphic type checks.",
    hint: "type() checks exact class; isinstance() includes inherited subclasses.",
    level: "basic",
    codeExample: "type(student) is BaseUser       # False\nisinstance(student, BaseUser)   # True"
  },
  {
    question: "What is the golden rule for designing clean inheritance hierarchies in Python?",
    shortAnswer: "Keep hierarchies shallow (at most 2–3 levels deep), use inheritance strictly for true 'IS-A' taxonomic relationships, and use composable Mixins or Composition for auxiliary capabilities.",
    explanation: "Prevents spaghetti architectures while maximizing modular code reuse.",
    hint: "Keep hierarchies shallow (2-3 levels), use IS-A strictly, and use mixins for capabilities.",
    level: "basic",
    codeExample: "# Shallow hierarchies + mixins = Clean extensible architecture"
  }
];

export default questions;
