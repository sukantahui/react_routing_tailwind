// src/components/study/python/topics/003_001_object-oriented-python/topic13_files/topic13_questions.js
// Comprehensive Master Review Questions for Topic 13: Abstract Base Classes (abc module)

const questions = [
  {
    question: "What is an Abstract Base Class (ABC) in Python?",
    shortAnswer: "A class that defines a formal interface and contract of methods and properties that all derived concrete subclasses must implement before they can be instantiated.",
    explanation: "Provides strict API contract enforcement at instantiation time.",
    hint: "A class defining mandatory interface methods for subclasses.",
    level: "basic",
    codeExample: "from abc import ABC, abstractmethod\nclass Base(ABC):\n    @abstractmethod\n    def run(self): pass"
  },
  {
    question: "What happens if you attempt to instantiate an abstract class directly or a subclass with missing abstract methods?",
    shortAnswer: "Python raises a 'TypeError: Can't instantiate abstract class with abstract methods <missing_methods>'.",
    explanation: "Guarantees incomplete classes can never be instantiated at runtime.",
    hint: "Raises a TypeError preventing instantiation.",
    level: "basic",
    codeExample: "# TypeError: Can't instantiate abstract class SQLite with abstract methods execute"
  },
  {
    question: "How do you define an abstract method in Python?",
    shortAnswer: "By inheriting from 'abc.ABC' and decorating the method definition with '@abstractmethod'.",
    explanation: "Can also use metaclass=ABCMeta on older Python versions.",
    hint: "Use @abstractmethod on a method inside an ABC subclass.",
    level: "basic",
    codeExample: "@abstractmethod\ndef calculate_gross(self) -> float:\n    pass"
  },
  {
    question: "How do you define an Abstract Property in Python?",
    shortAnswer: "By stacking '@property' above '@abstractmethod' over the method definition (in Python 3.3+, @property @abstractmethod replaces deprecated @abstractproperty).",
    explanation: "Forces all subclasses to implement a getter property for that attribute.",
    hint: "Stack @property above @abstractmethod.",
    level: "moderate",
    codeExample: "@property\n@abstractmethod\ndef income_tax_rate(self) -> float:\n    pass"
  },
  {
    question: "What is a 'Virtual Subclass' in Python ABCs?",
    shortAnswer: "A class registered with an ABC via 'MyABC.register(TargetClass)' that is recognized by 'isinstance()' and 'issubclass()' as a valid subtype without actually inheriting from the ABC.",
    explanation: "Allows retrofitting third-party classes into your interface hierarchy without modifying external source code.",
    hint: "A class registered via ABC.register() recognized by issubclass() without inheritance.",
    level: "moderate",
    codeExample: "BaseDatabase.register(ExternalMongoConnector)"
  },
  {
    question: "What is the difference between Abstract Base Classes (ABCs) and Duck Typing?",
    shortAnswer: "ABCs enforce strict nominal contracts at instantiation time (failing immediately if a method is missing); Duck Typing resolves methods dynamically at invocation time (failing only when called).",
    explanation: "ABCs are ideal for large frameworks and strict plugins; Duck Typing is ideal for maximum flexibility.",
    hint: "ABCs check at instantiation; Duck typing checks at invocation time.",
    level: "moderate",
    codeExample: "# ABC: fail fast on init\n# Duck: fail when method is called"
  },
  {
    question: "Can an abstract method contain actual working implementation code in the ABC?",
    shortAnswer: "Yes. An abstract method can have code, and subclasses can invoke it using 'super().abstract_method()', but the subclass must still override the method signature.",
    explanation: "Useful for providing common base logic or fallback templates.",
    hint: "Yes, abstract methods can contain code callable via super().",
    level: "complex",
    codeExample: "@abstractmethod\ndef log(self):\n    print('Base logging step')  # Callable via super().log()"
  },
  {
    question: "What is the 'Template Method' design pattern using ABCs?",
    shortAnswer: "An architectural pattern where the ABC defines a concrete workflow method that calls one or more abstract helper methods, allowing subclasses to customize individual steps without altering the overall algorithm.",
    explanation: "Common in data pipelines, payroll engines, and ETL frameworks.",
    hint: "A concrete workflow method in the ABC that orchestrates abstract steps.",
    level: "moderate",
    codeExample: "def generate_payslip(self):\n    gross = self.calculate_gross()\n    return gross - (gross * self.tax_rate)"
  },
  {
    question: "What is 'collections.abc' in the Python Standard Library?",
    shortAnswer: "A standard library module providing built-in abstract base classes (e.g. Iterable, Sequence, Mapping, Set, MutableMapping) representing container data structures.",
    explanation: "Used to build custom collections that integrate with Python's standard container protocols.",
    hint: "Standard library ABCs for Sequences, Mappings, and Iterables.",
    level: "basic",
    codeExample: "from collections.abc import Sequence\nclass CustomList(Sequence): pass"
  },
  {
    question: "What free methods does 'collections.abc.Sequence' provide once you implement '__len__' and '__getitem__'?",
    shortAnswer: "It automatically provides '__iter__', '__contains__' ('in'), '__reversed__', 'index()', and 'count()'.",
    explanation: "Drastically reduces custom container boilerplate.",
    hint: "Provides __iter__, __contains__, count(), and index() automatically.",
    level: "moderate",
    codeExample: "# Implement __len__ & __getitem__ -> get count() & index() for free!"
  },
  {
    question: "What is the '__subclasshook__' method in ABCs?",
    shortAnswer: "A special classmethod on an ABC that dynamically decides whether an external class is a subclass during 'issubclass(Candidate, ABC)', powering structural dynamic subtyping.",
    explanation: "Used by collections.abc to recognize duck-typed classes automatically.",
    hint: "Customizes issubclass() evaluation dynamically.",
    level: "complex",
    codeExample: "@classmethod\ndef __subclasshook__(cls, C):\n    if any('draw' in B.__dict__ for B in C.__mro__): return True\n    return NotImplemented"
  },
  {
    question: "Can an abstract class have concrete (non-abstract) methods?",
    shortAnswer: "Yes. ABCs frequently contain a mix of abstract methods (enforcing child implementation) and concrete methods (providing shared utility logic).",
    explanation: "Standard design for base classes.",
    hint: "Yes, ABCs can contain both abstract and concrete methods.",
    level: "basic",
    codeExample: "class Base(ABC):\n    @abstractmethod\n    def run(self): pass\n    def helper(self): return True"
  },
  {
    question: "Can you combine '@abstractmethod' with '@classmethod' and '@staticmethod'?",
    shortAnswer: "Yes. Stack '@classmethod' or '@staticmethod' on top of '@abstractmethod' (e.g. @classmethod @abstractmethod def factory(cls):).",
    explanation: "Forces subclasses to implement specialized factory constructors or static utilities.",
    hint: "Yes, stack @classmethod above @abstractmethod.",
    level: "moderate",
    codeExample: "@classmethod\n@abstractmethod\ndef from_dict(cls, data): pass"
  },
  {
    question: "What metaclass powers 'abc.ABC' under the hood?",
    shortAnswer: "'abc.ABCMeta'. Inheriting from 'abc.ABC' is simply a modern, clean shorthand for writing 'class MyClass(metaclass=ABCMeta):'.",
    explanation: "Introduced in Python 3.4 for cleaner syntax.",
    hint: "abc.ABCMeta.",
    level: "basic",
    codeExample: "class MyABC(ABC): pass  # Equivalent to (metaclass=ABCMeta)"
  },
  {
    question: "Does 'abc.register()' verify that the registered class actually implements the abstract methods?",
    shortAnswer: "No! 'register()' trusts the developer and only updates subclass registry caches; it does not perform runtime signature verification.",
    explanation: "Allows runtime duck typing without compiler overhead.",
    hint: "No, register() does not verify methods; it trusts the developer.",
    level: "complex",
    codeExample: "# register() updates issubclass caches without validating methods"
  },
  {
    question: "How do you define an abstract setter on an abstract property?",
    shortAnswer: "By defining an abstract getter first, and then decorating the setter with '@property_name.setter' and '@abstractmethod'.",
    explanation: "Forces subclasses to provide both a getter and a validated setter.",
    hint: "Decorate setter with @prop.setter and @abstractmethod.",
    level: "complex",
    codeExample: "@prop.setter\n@abstractmethod\ndef prop(self, val): pass"
  },
  {
    question: "What is the difference between 'typing.Protocol' and 'abc.ABC'?",
    shortAnswer: "'typing.Protocol' uses purely structural subtyping (checked statically by mypy without inheritance); 'abc.ABC' uses nominal inheritance and runtime instantiation blocking.",
    explanation: "Protocols are for type hints and static analysis; ABCs are for runtime behavioral enforcement.",
    hint: "Protocols = Static structural typing; ABCs = Runtime nominal enforcement.",
    level: "moderate",
    codeExample: "# Protocol: structural static typing\n# ABC: nominal runtime enforcement"
  },
  {
    question: "Why should you NOT make every class an ABC by default?",
    shortAnswer: "Because premature abstraction introduces unnecessary layers of boilerplate and rigid hierarchies; use concrete classes or duck typing first, introducing ABCs only when building formal plugin frameworks or enforcing strict contracts.",
    explanation: "Adheres to the YAGNI (You Aren't Gonna Need It) principle.",
    hint: "Avoids premature abstraction and unnecessary boilerplate.",
    level: "basic",
    codeExample: "# Use concrete classes first; introduce ABCs when plugins/contracts are needed"
  },
  {
    question: "Can an abstract class define an '__init__' constructor?",
    shortAnswer: "Yes. An ABC constructor can initialize common base state (e.g. host, port, credentials), which concrete subclasses invoke via 'super().__init__()'.",
    explanation: "Standard practice for shared state initialization.",
    hint: "Yes, ABC constructors initialize shared base state.",
    level: "basic",
    codeExample: "class Base(ABC):\n    def __init__(self, name): self.name = name"
  },
  {
    question: "What happens if a concrete subclass implements all abstract methods except one?",
    shortAnswer: "The subclass remains an abstract class itself and cannot be instantiated, raising TypeError on initialization.",
    explanation: "All abstract methods across all ancestors must be fulfilled.",
    hint: "The subclass remains abstract and cannot be instantiated.",
    level: "basic",
    codeExample: "# Subclass is still abstract until ALL abstract methods are overridden"
  },
  {
    question: "How does Python determine which methods are abstract on a class object?",
    shortAnswer: "CPython inspects the '__abstractmethods__' attribute on the class, which stores a frozenset of unfulfilled abstract method names.",
    explanation: "If '__abstractmethods__' is non-empty, instantiation is blocked.",
    hint: "Inspects the frozenset stored in Class.__abstractmethods__.",
    level: "complex",
    codeExample: "print(IncompleteClass.__abstractmethods__)  # frozenset({'execute'})"
  },
  {
    question: "Can an ABC inherit from another ABC?",
    shortAnswer: "Yes. Derived ABCs can inherit abstract methods, add new abstract methods, or fulfill some abstract methods while leaving others for downstream concrete classes.",
    explanation: "Allows building multi-tiered contract hierarchies.",
    hint: "Yes, ABCs can extend other ABCs.",
    level: "basic",
    codeExample: "class AdvancedDatabase(BaseDatabase, ABC):\n    @abstractmethod\n    def rollback(self): pass"
  },
  {
    question: "How do ABCs prevent fragile base class bugs in large enterprise development teams?",
    shortAnswer: "By turning runtime missing method bugs into immediate instantiation errors, guaranteeing that code breaks immediately during development rather than silently failing in production.",
    explanation: "Enforces architectural contracts across distributed engineering teams.",
    hint: "Converts missing method runtime crashes into immediate instantiation errors.",
    level: "moderate",
    codeExample: "# Fail-fast at instantiation rather than failing in production"
  },
  {
    question: "What is the relationship between ABCs and the Interface Segregation Principle (ISP)?",
    shortAnswer: "ABCs should be small and focused on specific responsibilities (e.g. Reader, Writer, Cleaner) rather than massive monolithic interfaces, allowing classes to implement only what they need.",
    explanation: "Promotes clean, decoupled SOLID architecture.",
    hint: "Design small, cohesive ABCs rather than giant monolithic interfaces.",
    level: "moderate",
    codeExample: "# Better: class Reader(ABC) + class Writer(ABC) vs class GiantFileManager(ABC)"
  },
  {
    question: "What is the ultimate golden rule for Abstract Base Classes in Python?",
    shortAnswer: "Use ABCs when you need strict, fail-fast contract enforcement at instantiation time or when creating framework plugins; keep abstract interfaces small and cohesive, and leverage the Template Method pattern for shared workflows.",
    explanation: "Provides the perfect balance between Pythonic flexibility and enterprise architectural safety.",
    hint: "Use ABCs for strict fail-fast contracts and plugin frameworks; keep interfaces small.",
    level: "basic",
    codeExample: "# Strict, fail-fast interface contracts with clean template methods"
  }
];

export default questions;
