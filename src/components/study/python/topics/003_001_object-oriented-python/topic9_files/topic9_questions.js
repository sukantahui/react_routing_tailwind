// src/components/study/python/topics/003_001_object-oriented-python/topic9_files/topic9_questions.js
// Comprehensive Master Review Questions for Topic 9: Method Overriding & super() function

const questions = [
  {
    question: "What is Method Overriding in Python?",
    shortAnswer: "When a child subclass defines a method with the exact same name as a method in its parent superclass, providing a specialized implementation that overrides the parent version.",
    explanation: "Allows polymorphic behavior where calling obj.method() executes the most derived subclass implementation.",
    hint: "Subclass redefining a method inherited from a parent class.",
    level: "basic",
    codeExample: "class Child(Parent):\n    def speak(self):\n        return 'Child voice'"
  },
  {
    question: "What does the 'super()' function do in Python?",
    shortAnswer: "Returns a proxy object that delegates method and attribute lookups to the next class in the active instance's Method Resolution Order (MRO).",
    explanation: "Allows subclasses to call and extend inherited parent logic dynamically.",
    hint: "Returns a proxy delegating method calls to the next class in the MRO.",
    level: "basic",
    codeExample: "def render(self):\n    super().render()\n    self.render_custom()"
  },
  {
    question: "What is the difference between 'super().method()' and 'ParentClass.method(self)'?",
    shortAnswer: "'super().method()' dynamically traverses the instance's MRO and works properly with multiple inheritance; 'ParentClass.method(self)' hardcodes the parent and breaks cooperative diamond inheritance.",
    explanation: "Always use super() rather than hardcoded class names.",
    hint: "super() follows MRO dynamically; hardcoded calls break multiple inheritance.",
    level: "moderate",
    codeExample: "# Good: super().save()\n# Fragile: ParentClass.save(self)"
  },
  {
    question: "What is the difference between 'Extending' a method and 'Replacing' a method in a subclass?",
    shortAnswer: "Extending calls 'super().method()' to execute parent logic before or after adding custom code; Replacing provides entirely new logic without calling 'super()', discarding parent behavior.",
    explanation: "Extending preserves parent invariants; replacing completely overrides them.",
    hint: "Extending calls super(); Replacing omits super() completely.",
    level: "basic",
    codeExample: "# Extending: super().run(); do_more()\n# Replacing: do_completely_new_thing()"
  },
  {
    question: "How does 'super()' know which class to call next in Python 3 without arguments?",
    shortAnswer: "Python 3 compiler automatically injects the active class and the current instance into a hidden '__class__' cell within the method scope.",
    explanation: "Eliminates the legacy Python 2 requirement of writing 'super(CurrentClass, self)'.",
    hint: "Python 3 injects the active class and instance automatically into the method.",
    level: "complex",
    codeExample: "# Modern Python 3: super().__init__()"
  },
  {
    question: "Does 'super()' always call the immediate lexical parent class of the current class?",
    shortAnswer: "No! In multiple inheritance, 'super()' calls the NEXT class in the active instance's MRO chain, which may be a sibling class or mixin rather than a direct parent.",
    explanation: "This is the cornerstone of cooperative multiple inheritance in Python.",
    hint: "No, it calls the NEXT class in the instance's MRO list.",
    level: "complex",
    codeExample: "# In diamond A->B,C->D, B's super() calls C, not A!"
  },
  {
    question: "What is 'Cooperative Multiple Inheritance' in Python?",
    shortAnswer: "A design pattern where every class in a multiple-inheritance hierarchy calls 'super().method()' using compatible arguments, ensuring every ancestor in the diamond is called exactly once.",
    explanation: "Prevents double-execution of methods in diamond inheritance graphs.",
    hint: "Every class in the hierarchy calls super() to ensure all ancestors execute once.",
    level: "complex",
    codeExample: "# Every mixin calls super().process() in sequence"
  },
  {
    question: "How should constructors in cooperative multiple inheritance handle differing arguments across mixins?",
    shortAnswer: "By accepting '**kwargs', extracting needed keyword arguments, and forwarding remaining '**kwargs' up through 'super().__init__(**kwargs)'.",
    explanation: "Guarantees that root object.__init__() eventually receives 0 leftover kwargs.",
    hint: "Accept **kwargs, extract what is needed, and pass remainder to super().__init__(**kwargs).",
    level: "moderate",
    codeExample: "def __init__(self, my_arg=None, **kwargs):\n    super().__init__(**kwargs)\n    self.my_arg = my_arg"
  },
  {
    question: "What happens if a class in a cooperative diamond chain forgets to call 'super().method()'?",
    shortAnswer: "The MRO traversal is halted at that class, and all remaining ancestral classes further down the MRO list will never have their method executed.",
    explanation: "Breaks the cooperative chain across all sibling mixins.",
    hint: "Halts MRO traversal and prevents subsequent ancestral classes from executing.",
    level: "complex",
    codeExample: "# Omitting super() terminates the cooperative pipeline early"
  },
  {
    question: "Can 'super()' be used to call Class Methods (@classmethod)?",
    shortAnswer: "Yes. Calling 'super().class_method(*args)' inside a subclass classmethod correctly invokes the parent classmethod with 'cls' bound to the calling subclass.",
    explanation: "Preserves polymorphic classmethod inheritance.",
    hint: "Yes, super() works seamlessly with class methods.",
    level: "moderate",
    codeExample: "@classmethod\ndef from_dict(cls, d):\n    inst = super().from_dict(d)\n    return inst"
  },
  {
    question: "Can 'super()' be used to call Static Methods (@staticmethod)?",
    shortAnswer: "Yes. 'super().static_method(*args)' resolves and executes the parent's static method.",
    explanation: "Static methods participate in standard MRO resolution.",
    hint: "Yes, super() can invoke parent static methods.",
    level: "basic",
    codeExample: "super().validate_pan(pan)"
  },
  {
    question: "Can 'super()' be used to access property getters and setters?",
    shortAnswer: "Yes. 'super().property_name' reads the parent property getter, and 'super(SubClass, SubClass).prop.fset(self, val)' or super()._prop can invoke parent setters.",
    explanation: "Allows subclasses to extend validated property setters.",
    hint: "Yes, super().prop reads parent property getters.",
    level: "complex",
    codeExample: "val = super().price"
  },
  {
    question: "What error occurs if you call 'super().non_existent_method()' when no ancestor defines that method?",
    shortAnswer: "AttributeError: 'super' object has no attribute 'non_existent_method'.",
    explanation: "Because MRO search reaches the end of the chain without finding the method.",
    hint: "Raises AttributeError if the method doesn't exist in the MRO.",
    level: "basic",
    codeExample: "# AttributeError: 'super' object has no attribute 'missing'"
  },
  {
    question: "What is the 2-argument syntax of 'super(Class, obj)' used for outside method bodies?",
    shortAnswer: "It binds the super proxy to a specific class and object instance from outside the class (e.g., super(Child, my_instance).method()).",
    explanation: "Useful in dynamic metaprogramming and reflection.",
    hint: "Explicitly binds super proxy to a class and instance from external code.",
    level: "complex",
    codeExample: "super(ChildClass, instance).parent_method()"
  },
  {
    question: "What is the 1-argument syntax of 'super(Class)' (Unbound Super)?",
    shortAnswer: "Returns an unbound super proxy primarily used internally by Python descriptors or when inspecting class methods on classes directly.",
    explanation: "Rarely needed in everyday application programming.",
    hint: "Unbound super proxy used for class descriptor inspection.",
    level: "complex",
    codeExample: "unbound = super(ChildClass)"
  },
  {
    question: "Can a subclass override a method with a different number of required positional parameters?",
    shortAnswer: "Yes in Python, but doing so violates the Liskov Substitution Principle (LSP) and can crash polymorphic callers expecting the parent signature.",
    explanation: "Use default arguments or *args/**kwargs if extra parameters are needed.",
    hint: "Technically allowed by Python, but breaks LSP and polymorphic contracts.",
    level: "moderate",
    codeExample: "# Best practice: maintain compatible parameter signatures in overrides"
  },
  {
    question: "How do you inspect the exact class where an overridden method was defined?",
    shortAnswer: "Using 'method.__qualname__' or 'inspect.getmodule(method)'.",
    explanation: "Shows the defining class path (e.g. 'ParentClass.method_name').",
    hint: "Inspect method.__qualname__.",
    level: "moderate",
    codeExample: "print(child.render.__qualname__)"
  },
  {
    question: "Why should you call 'super().__init__()' at the start of a subclass constructor rather than at the end?",
    shortAnswer: "To ensure that all base class attributes and core invariants are initialized before the subclass attempts to access or customize them.",
    explanation: "Prevents AttributeError when subclass logic relies on parent state.",
    hint: "Initializes parent attributes before subclass logic runs.",
    level: "basic",
    codeExample: "def __init__(self, name, custom):\n    super().__init__(name)  # First\n    self.custom = custom   # Second"
  },
  {
    question: "What is a 'Layered Calculation Stack' using 'super()'?",
    shortAnswer: "An architectural pattern where each subclass overrides a calculation method, calls 'super().calculate()', and applies its own adjustment (discounts, taxes, fees) to the returned value.",
    explanation: "Creates clean, modular, transparent computation pipelines.",
    hint: "Each subclass modifies the value returned by super().calculate().",
    level: "moderate",
    codeExample: "def calculate(self):\n    return super().calculate() - self.discount"
  },
  {
    question: "What happens if a subclass overrides '__str__' or '__repr__' without calling super()?",
    shortAnswer: "The subclass string representation completely replaces the parent format; calling super().__str__() is optional depending on whether parent text should be included.",
    explanation: "Standard practice for custom domain formatting.",
    hint: "Completely replaces parent string format unless super().__str__() is included.",
    level: "basic",
    codeExample: "def __str__(self):\n    return f'{super().__str__()} [VIP]'"
  },
  {
    question: "Can a subclass un-override or delete an overridden method to restore parent behavior?",
    shortAnswer: "Yes: using 'del SubClass.method_name' on the class object removes the child method from SubClass.__dict__, causing Python to fall back to the parent class.",
    explanation: "Attribute resolution immediately resolves parent method again.",
    hint: "del SubClass.method removes the override from the class dict.",
    level: "complex",
    codeExample: "del Child.speak  # Restores Parent.speak behavior"
  },
  {
    question: "How does 'super()' interact with '__getattr__' and dynamic attribute dispatch?",
    shortAnswer: "'super().__getattr__(name)' forwards unhandled attribute lookups to ancestor fallback handlers.",
    explanation: "Common in proxy patterns and ORM models.",
    hint: "Forwards dynamic attribute resolution to parent fallback handlers.",
    level: "complex",
    codeExample: "def __getattr__(self, item):\n    return super().__getattr__(item)"
  },
  {
    question: "Why does Python 2 syntax 'super(Child, self)' cause infinite recursion if you copy-paste it into a subclass?",
    shortAnswer: "If you copy-paste 'super(Parent, self)' into Child, it starts searching the MRO from Parent again, creating an infinite loop.",
    explanation: "Python 3 zero-argument super() completely eliminates this copy-paste bug.",
    hint: "Hardcoding wrong class name in Python 2 super causes infinite recursion.",
    level: "complex",
    codeExample: "# Python 3 zero-argument super() is completely immune to this bug"
  },
  {
    question: "What is the ultimate design rule for method overriding and 'super()'?",
    shortAnswer: "Always use zero-argument super() for constructor chaining and cooperative pipelines, preserve parent method signatures (LSP), and use super() whenever extending rather than completely replacing behavior.",
    explanation: "Ensures reliable, non-breaking inheritance across large codebases.",
    hint: "Use zero-argument super(), maintain signatures (LSP), and chain cooperatively.",
    level: "basic",
    codeExample: "# Clean, cooperative, non-breaking method overriding"
  }
];

export default questions;
