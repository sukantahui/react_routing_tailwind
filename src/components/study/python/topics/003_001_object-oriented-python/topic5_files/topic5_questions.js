// src/components/study/python/topics/003_001_object-oriented-python/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Class methods & Static methods

const questions = [
  {
    question: "What is a Class Method in Python?",
    shortAnswer: "A method decorated with @classmethod that receives the class itself ('cls') as its first parameter instead of an instance reference ('self').",
    explanation: "Class methods can access and modify class-level state and act as alternative constructors.",
    hint: "Decorated with @classmethod and receives 'cls'.",
    level: "basic",
    codeExample: "class Bank:\n    @classmethod\n    def get_code(cls):\n        return cls.bank_code"
  },
  {
    question: "What is a Static Method in Python?",
    shortAnswer: "A method decorated with @staticmethod that receives neither 'self' nor 'cls', behaving like a plain utility function logically scoped to the class namespace.",
    explanation: "Static methods do not depend on or modify instance or class state.",
    hint: "Decorated with @staticmethod and receives neither self nor cls.",
    level: "basic",
    codeExample: "class MathUtils:\n    @staticmethod\n    def add(a, b): return a + b"
  },
  {
    question: "What is the primary advantage of using '@classmethod' for alternative constructors / factory methods?",
    shortAnswer: "When subclasses inherit the classmethod factory, 'cls(...)' dynamically instantiates the derived subclass rather than the hardcoded parent class, preserving polymorphism.",
    explanation: "If you hardcoded ParentClass(...) instead of cls(...), calling SubClass.from_dict() would incorrectly return a ParentClass instance.",
    hint: "cls(...) instantiates the derived subclass polymorphically when inherited.",
    level: "moderate",
    codeExample: "@classmethod\ndef from_dict(cls, data):\n    return cls(**data)"
  },
  {
    question: "Can a Class Method access instance attributes (self.attribute)?",
    shortAnswer: "No. Because a class method is bound to the class ('cls'), no specific instance ('self') is provided, so instance attributes are completely inaccessible.",
    explanation: "Attempting to access instance attributes inside a class method will cause a NameError or AttributeError.",
    hint: "No, because 'self' does not exist in class methods.",
    level: "basic",
    codeExample: "@classmethod\ndef show(cls):\n    # self.name is NOT accessible here!"
  },
  {
    question: "Can an Instance Method call a Class Method or Static Method?",
    shortAnswer: "Yes. An instance method can call class and static methods via 'self.class_method()' or 'self.static_method()', or explicitly via 'ClassName.method()'.",
    explanation: "Python resolves the method on the class during attribute lookup.",
    hint: "Yes, via self.method_name() or ClassName.method_name().",
    level: "basic",
    codeExample: "def generate_slip(self):\n    tax = self.calculate_tax(self.salary)  # Calls static method"
  },
  {
    question: "Can Static Methods and Class Methods be invoked through an instance reference (e.g. obj.static_method())?",
    shortAnswer: "Yes. In Python, both ClassName.method() and obj.method() work identically for @classmethod and @staticmethod.",
    explanation: "CPython handles method descriptor resolution consistently whether called on the class or an instance.",
    hint: "Yes, both Class.method() and obj.method() syntax are valid.",
    level: "basic",
    codeExample: "emp.validate_pan('ABCDE1234F')  # Valid static method call"
  },
  {
    question: "Why would you use a '@staticmethod' instead of a standalone function outside the class?",
    shortAnswer: "To logically group utility functions with the domain model they serve (high cohesion), making the codebase cleaner, modular, and easier to navigate.",
    explanation: "For example, Employee.validate_pan_card() makes the domain relationship explicit.",
    hint: "Improves code cohesion by grouping related utilities inside the class namespace.",
    level: "moderate",
    codeExample: "# Logical domain namespace: FinancialUtils.calculate_emi(...)"
  },
  {
    question: "What is the difference in memory and object type between an instance method, a class method, and a static method?",
    shortAnswer: "An instance method returns a bound method object bound to an instance; a @classmethod returns a bound method object bound to the class; a @staticmethod returns a standard unbound Python function.",
    explanation: "Inspecting type(obj.method) reflects these internal descriptor bindings.",
    hint: "Instance bound method vs Class bound method vs plain function.",
    level: "complex",
    codeExample: "type(inst.inst_method)   # <class 'method'> (bound to inst)\ntype(inst.class_method)  # <class 'method'> (bound to Class)\ntype(inst.static_method) # <class 'function'>"
  },
  {
    question: "What error occurs if you forget the '@classmethod' decorator on a method declared with 'def factory(cls, data):' and call it as 'ClassName.factory(data)'?",
    shortAnswer: "TypeError: factory() missing 1 required positional argument: 'data'.",
    explanation: "Without @classmethod, Python treats it as a regular instance method expecting an instance in the first parameter.",
    hint: "Treated as a regular instance method missing an argument.",
    level: "moderate",
    codeExample: "# BUG: def from_dict(cls, data):\n# FIX: @classmethod\n#      def from_dict(cls, data):"
  },
  {
    question: "Can a Class Method modify class-level state globally?",
    shortAnswer: "Yes. By assigning to 'cls.class_attribute = new_value', the change is applied globally to the class namespace in RAM.",
    explanation: "Affects all instances that look up that class attribute.",
    hint: "Yes, modifying cls.attr modifies the class attribute globally.",
    level: "basic",
    codeExample: "@classmethod\ndef update_branch(cls, name):\n    cls.branch_name = name"
  },
  {
    question: "How do you define multiple constructors in Python without constructor overloading?",
    shortAnswer: "By defining class methods decorated with @classmethod (e.g. from_dict, from_json, from_csv, from_timestamp) that parse different input formats and call cls(...).",
    explanation: "This is the canonical Pythonic solution to method overloading.",
    hint: "Use @classmethod factory methods (from_dict, from_json, etc.).",
    level: "basic",
    codeExample: "@classmethod\ndef from_json(cls, json_str):\n    return cls(**json.loads(json_str))"
  },
  {
    question: "What is the descriptor protocol mechanism behind '@classmethod' and '@staticmethod'?",
    shortAnswer: "Both decorators implement the '__get__' descriptor method: classmethod binds the class object to the function, while staticmethod returns the underlying function as-is without binding.",
    explanation: "Decorators in Python leverage descriptors to customize attribute access.",
    hint: "They use the __get__ descriptor to customize method binding.",
    level: "complex",
    codeExample: "# classmethod.__get__ binds cls; staticmethod.__get__ returns raw function"
  },
  {
    question: "Can a Static Method be overridden in a subclass?",
    shortAnswer: "Yes. Subclasses can override static methods just like any other method in Python.",
    explanation: "Attribute lookup will resolve the subclass's static method version.",
    hint: "Yes, static methods participate in standard inheritance and overriding.",
    level: "basic",
    codeExample: "class Child(Parent):\n    @staticmethod\n    def helper(): return 'custom'"
  },
  {
    question: "Can a Class Method be overridden in a subclass?",
    shortAnswer: "Yes. Subclasses can override class methods, and 'cls' will automatically reference the subclass.",
    explanation: "Preserves polymorphic behavior across the entire hierarchy.",
    hint: "Yes, class methods can be overridden polymorphically.",
    level: "basic",
    codeExample: "class Child(Parent):\n    @classmethod\n    def factory(cls): return cls()"
  },
  {
    question: "What naming conventions are recommended for @classmethod alternative constructors?",
    shortAnswer: "Prefix with 'from_' or 'by_' (e.g. from_dict, from_json, from_csv, from_file, from_timestamp).",
    explanation: "Follows standard Python library conventions (e.g. datetime.fromtimestamp, dict.fromkeys).",
    hint: "Prefix with 'from_' (e.g. from_dict, from_json).",
    level: "basic",
    codeExample: "User.from_dict(data)\nLogEntry.from_timestamp(ts)"
  },
  {
    question: "What built-in standard library classmethods exist in Python?",
    shortAnswer: "Examples include 'dict.fromkeys()', 'datetime.fromtimestamp()', 'datetime.now()', and 'int.from_bytes()'.",
    explanation: "These are classic examples of @classmethod factory constructors.",
    hint: "dict.fromkeys, datetime.fromtimestamp, int.from_bytes.",
    level: "moderate",
    codeExample: "d = dict.fromkeys(['a', 'b'], 0)"
  },
  {
    question: "Can a class method call another class method on the same class?",
    shortAnswer: "Yes: using 'cls.other_class_method(*args)'.",
    explanation: "Ensures the method call resolves against the active class.",
    hint: "Use cls.other_class_method().",
    level: "basic",
    codeExample: "@classmethod\ndef batch_create(cls, items):\n    return [cls.from_dict(i) for i in items]"
  },
  {
    question: "When should you prefer a standalone module-level function over a @staticmethod?",
    shortAnswer: "When the function is generic across multiple unrelated classes or does not logically belong to any single class domain.",
    explanation: "Avoid forcing generic utilities into classes unnecessarily.",
    hint: "When the function is generic across multiple unrelated classes.",
    level: "moderate",
    codeExample: "# Generic math helpers: math.sqrt(x) vs class methods"
  },
  {
    question: "Can you pass arguments to a @staticmethod just like a normal function?",
    shortAnswer: "Yes. Arguments are passed directly in order with no implicit first argument injected.",
    explanation: "Behaves 100% like a normal Python function.",
    hint: "Yes, arguments match the declared parameters 1-to-1.",
    level: "basic",
    codeExample: "MathUtils.calculate_emi(25000, 10.0, 12)"
  },
  {
    question: "What is the difference between 'cls' and 'self' in class definitions?",
    shortAnswer: "'self' points to a specific living instance object; 'cls' points to the class object itself.",
    explanation: "'self' accesses instance state; 'cls' accesses class state and creates new instances.",
    hint: "self = instance object; cls = class object.",
    level: "basic",
    codeExample: "# self = instance; cls = class"
  },
  {
    question: "Can you decorate a method with both @classmethod and @property in modern Python?",
    shortAnswer: "In Python 3.9–3.10 this was briefly supported, but it was deprecated in Python 3.11 and removed in 3.13; instead, use a custom metaclass property.",
    explanation: "Chaining @classmethod and @property causes architectural ambiguity.",
    hint: "Deprecated in Python 3.11+; use metaclass properties instead.",
    level: "complex",
    codeExample: "# Deprecated in Python 3.11+; avoid chaining @classmethod and @property"
  },
  {
    question: "How do you test a @staticmethod in isolation in unit tests?",
    shortAnswer: "Directly import and call 'ClassName.static_method(args)' without creating any mock objects or class instances.",
    explanation: "Static methods are pure and trivial to unit test.",
    hint: "Directly call ClassName.static_method(args) without instantiating.",
    level: "basic",
    codeExample: "assert TaxUtils.calculate_gst(100.0) == 18.0"
  },
  {
    question: "What is the performance difference between calling an instance method, class method, and static method?",
    shortAnswer: "Static methods are marginally faster because they avoid argument binding descriptors; however, the difference is negligible in most applications.",
    explanation: "CPython optimizes method descriptors efficiently.",
    hint: "Static methods avoid argument binding; performance difference is negligible.",
    level: "complex",
    codeExample: "# Micro-benchmark difference is minimal"
  },
  {
    question: "Can a subclass change a parent class method into an instance method?",
    shortAnswer: "Technically yes, but doing so violates the Liskov Substitution Principle (LSP) and creates severe type confusion.",
    explanation: "Always maintain consistent method signatures across inheritance.",
    hint: "Technically possible but strongly discouraged as an anti-pattern.",
    level: "complex",
    codeExample: "# Anti-pattern: changing method archetypes in subclasses"
  },
  {
    question: "What is the ultimate decision guideline for choosing between Instance, Class, and Static methods?",
    shortAnswer: "Needs instance state? -> Instance Method. Needs class state / factory instantiation? -> Class Method (@classmethod). Needs neither? -> Static Method (@staticmethod).",
    explanation: "The definitive 3-tier rule in Python OOP architecture.",
    hint: "Instance state -> Instance; Class state/Factory -> Class; Neither -> Static.",
    level: "basic",
    codeExample: "# 1. self -> Instance Method\n# 2. cls -> Class Method\n# 3. None -> Static Method"
  }
];

export default questions;
