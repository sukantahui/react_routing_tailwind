// src/components/study/python/topics/003_001_object-oriented-python/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Properties & Getters/Setters with @property

const questions = [
  {
    question: "What is the purpose of the '@property' decorator in Python?",
    shortAnswer: "To turn a method into a managed read-only attribute getter that can be accessed with standard dot syntax (e.g. obj.price) without needing parentheses (obj.price()).",
    explanation: "Allows methods to behave syntactically like attributes while executing behind-the-scenes logic.",
    hint: "Turns a method into a getter accessed without parentheses.",
    level: "basic",
    codeExample: "class Circle:\n    @property\n    def area(self): return 3.14 * self.r ** 2"
  },
  {
    question: "How do you define a setter for a property in Python?",
    shortAnswer: "By decorating a method of the same name with '@<property_name>.setter' taking 'self' and the new value as parameters.",
    explanation: "The setter intercepts attribute assignment (obj.attr = val) to validate or transform the incoming value.",
    hint: "Use @property_name.setter above a method with the same name.",
    level: "basic",
    codeExample: "@price.setter\ndef price(self, value):\n    if value < 0: raise ValueError\n    self._price = value"
  },
  {
    question: "What causes the fatal 'RecursionError: maximum recursion depth exceeded' bug inside a property setter?",
    shortAnswer: "Assigning to the public property name (self.price = val) inside the setter instead of the internal protected backing variable (self._price = val), causing the setter to infinitely call itself.",
    explanation: "A classic Python OOP pitfall for beginners and intermediate developers.",
    hint: "Assigning to self.attr instead of self._attr re-triggers the setter infinitely.",
    level: "moderate",
    codeExample: "# BUG: @x.setter\n#      def x(self, v): self.x = v  # RecursionError!\n# FIX: self._x = v"
  },
  {
    question: "How do you create a Read-Only property in Python?",
    shortAnswer: "Simply define the '@property' getter method without defining any corresponding '@<attr>.setter' method.",
    explanation: "Any attempt by client code to assign to the property raises 'AttributeError: can't set attribute'.",
    hint: "Define only the @property getter without a setter.",
    level: "basic",
    codeExample: "@property\ndef read_only_id(self):\n    return self._id"
  },
  {
    question: "What is the 'Uniform Access Principle' in Python?",
    shortAnswer: "The architectural principle that all services offered by a module or object should be accessible via a uniform notation (dot syntax), regardless of whether they are implemented through plain data storage or algorithmic computation.",
    explanation: "Allows developers to start with simple attributes and refactor to properties later without breaking callers.",
    hint: "Uniform dot syntax access regardless of storage vs computation.",
    level: "moderate",
    codeExample: "obj.price  # Works identically whether a plain variable or a @property"
  },
  {
    question: "Why does Python avoid Java/C++ style boilerplate getters and setters (get_name(), set_name()) by default?",
    shortAnswer: "Because Python's '@property' mechanism makes premature getters/setters obsolete; you can start with plain public attributes and add validation properties later without changing client code.",
    explanation: "Eliminates hundreds of lines of useless boilerplate code in domain models.",
    hint: "Avoids boilerplate because @property allows non-breaking refactoring later.",
    level: "basic",
    codeExample: "# Pythonic: self.name\n# Unpythonic: def get_name(self): return self.name"
  },
  {
    question: "What is a 'Computed Property'?",
    shortAnswer: "A property calculated dynamically on the fly from other attributes whenever it is read (e.g., full_name, net_salary, is_expired).",
    explanation: "Always reflects the latest state without requiring manual synchronization methods.",
    hint: "A property calculated dynamically from other object attributes.",
    level: "basic",
    codeExample: "@property\ndef full_name(self):\n    return f'{self.first} {self.last}'"
  },
  {
    question: "How do you define a deleter hook for a property in Python?",
    shortAnswer: "Using the '@<property_name>.deleter' decorator above a method of the same name.",
    explanation: "Executed automatically when 'del obj.property_name' is called.",
    hint: "Use @property_name.deleter.",
    level: "basic",
    codeExample: "@price.deleter\ndef price(self):\n    del self._price"
  },
  {
    question: "What is 'functools.cached_property' and when should you use it?",
    shortAnswer: "A property decorator that computes its value once upon first access and stores the result in the instance's __dict__, serving all subsequent reads instantly from memory.",
    explanation: "Ideal for expensive I/O operations, complex math, or database aggregations that don't change frequently.",
    hint: "Computes once and caches the result on the instance.",
    level: "moderate",
    codeExample: "from functools import cached_property\n@cached_property\ndef heavy_report(self): return compute()"
  },
  {
    question: "How do you invalidate / clear the cache of a 'cached_property' on an instance?",
    shortAnswer: "By deleting the attribute from the instance using 'del obj.cached_property_name'.",
    explanation: "The next read will re-execute the cached_property function and cache the fresh result.",
    hint: "Call del obj.cached_attr to invalidate the cache.",
    level: "moderate",
    codeExample: "del student.heavy_report  # Forces recalculation on next access"
  },
  {
    question: "Can properties be inherited and overridden in subclasses?",
    shortAnswer: "Yes. Subclasses can override property getters, setters, or extend them using super().",
    explanation: "Properties participate fully in Python's standard polymorphism and MRO.",
    hint: "Yes, properties can be inherited and overridden in subclasses.",
    level: "basic",
    codeExample: "class PremiumOrder(Order):\n    @Order.price.setter\n    def price(self, val): super(PremiumOrder, type(self)).price.fset(self, val)"
  },
  {
    question: "What is the underlying descriptor mechanism powering '@property'?",
    shortAnswer: "The 'property' class is a built-in Python descriptor implementing __get__, __set__, and __delete__ methods.",
    explanation: "When obj.attr is read, CPython calls property.__get__(self, obj, Class).",
    hint: "Built-in descriptor implementing __get__, __set__, and __delete__.",
    level: "complex",
    codeExample: "p = property(fget=get_x, fset=set_x, fdel=del_x)"
  },
  {
    question: "Can a property accept additional arguments beyond 'self' in the getter?",
    shortAnswer: "No. A property getter can only take 'self' because it is accessed like a plain attribute without function arguments.",
    explanation: "If you need parameters, use a regular method instead of a property.",
    hint: "No, getters only accept 'self'.",
    level: "basic",
    codeExample: "# Getters only accept self: def attr(self):"
  },
  {
    question: "What is a 'Bi-Directional Property' pattern?",
    shortAnswer: "Two properties (e.g. celsius and fahrenheit) where setting either one automatically converts and updates the internal canonical state, keeping both in sync.",
    explanation: "Common in unit conversion, financial currencies, and dimensional measurements.",
    hint: "Properties converting back and forth between two units of measurement.",
    level: "moderate",
    codeExample: "# fahrenheit setter converts to celsius and updates self.celsius"
  },
  {
    question: "What happens if a property setter raises an exception during assignment?",
    shortAnswer: "The exception halts execution, and the internal backing variable remains unchanged at its prior valid value.",
    explanation: "Guarantees transactional integrity and prevents corrupted states.",
    hint: "Execution is aborted and the internal state remains unchanged.",
    level: "basic",
    codeExample: "try: obj.age = -5\nexcept ValueError: pass  # obj.age is still valid"
  },
  {
    question: "Can you define a property setter without defining the @property getter first?",
    shortAnswer: "No. The '@property' getter defines the base property object; attempting '@x.setter' before '@property def x' raises a NameError.",
    explanation: "The setter is an attribute method on the existing property instance.",
    hint: "No, @property getter must be defined first.",
    level: "basic",
    codeExample: "# Must define @property first before @attr.setter"
  },
  {
    question: "What is the difference between 'property()' function syntax and '@property' decorator syntax?",
    shortAnswer: "They are identical under the hood; 'attr = property(fget, fset, fdel)' is the legacy functional syntax, whereas '@property' is the modern decorator syntax.",
    explanation: "Decorator syntax is cleaner and standard in Python 3.",
    hint: "Decorator syntax is modern syntactic sugar for property(fget, fset).",
    level: "moderate",
    codeExample: "price = property(get_price, set_price)"
  },
  {
    question: "Why should property getters be fast and lightweight?",
    shortAnswer: "Because developers expect attribute access (obj.attr) to be instantaneous; slow network/database I/O in a getter causes hidden latency and unexpected performance bugs.",
    explanation: "Use explicit fetch_data() methods or @cached_property for expensive operations.",
    hint: "Attribute access is expected to be fast; avoid heavy I/O in getters.",
    level: "moderate",
    codeExample: "# Avoid heavy DB queries in property getters"
  },
  {
    question: "Can properties be used on classes with '__slots__'?",
    shortAnswer: "Yes. Properties work seamlessly with __slots__, and internal backing variables (_attr) can be declared in __slots__.",
    explanation: "Allows combining high memory optimization with validated property getters/setters.",
    hint: "Yes, properties are fully compatible with __slots__.",
    level: "complex",
    codeExample: "class Point:\n    __slots__ = ('_x',)\n    @property\n    def x(self): return self._x"
  },
  {
    question: "How do you add a docstring to a property?",
    shortAnswer: "Write the docstring directly inside the '@property' getter method.",
    explanation: "The property descriptor automatically extracts the docstring from the getter for help() and IDE tooltips.",
    hint: "Write the docstring inside the @property getter function.",
    level: "basic",
    codeExample: "@property\ndef price(self):\n    '''The gross course fee in INR.'''\n    return self._price"
  },
  {
    question: "What happens when you inspect 'type(ClassName.property_name)' on the class itself?",
    shortAnswer: "It returns <class 'property'>, representing the property descriptor object.",
    explanation: "Demonstrates that properties live on the class and intercept instance access.",
    hint: "Returns <class 'property'> descriptor object.",
    level: "moderate",
    codeExample: "print(type(Student.fee))  # <class 'property'>"
  },
  {
    question: "Can a property setter transform the incoming value before saving (e.g. strip whitespace, uppercase)?",
    shortAnswer: "Yes. Sanitizing and normalizing incoming data (e.g., self._email = value.strip().lower()) is a major use case for setters.",
    explanation: "Guarantees clean, consistent data formatting.",
    hint: "Yes, normalizing/sanitizing data is a standard setter use case.",
    level: "basic",
    codeExample: "@name.setter\ndef name(self, val): self._name = val.strip().title()"
  },
  {
    question: "How do dataclasses in Python 3.7+ interact with properties?",
    shortAnswer: "Dataclasses generate __init__ assignments that route through property setters automatically if fields are configured with property descriptors.",
    explanation: "Provides instant validation during dataclass instantiation.",
    hint: "Dataclass __init__ routes assignments through property setters.",
    level: "moderate",
    codeExample: "@dataclass\nclass Product: price: float"
  },
  {
    question: "What is the danger of returning mutable objects from a property getter?",
    shortAnswer: "External code can mutate the returned list/dict directly (e.g. obj.items.append(x)), bypassing any validation logic in the setter.",
    explanation: "Best practice: return a copy (return list(self._items)) or an immutable tuple.",
    hint: "Callers can mutate internal collections; return defensive copies or tuples.",
    level: "moderate",
    codeExample: "@property\ndef tags(self): return tuple(self._tags)"
  },
  {
    question: "What is the golden rule for using Properties in Python architecture?",
    shortAnswer: "Use plain public attributes for simple data, refactor to @property only when validation, transformation, or computed state is required, and keep getters fast and side-effect free.",
    explanation: "Embraces Pythonic simplicity and the Uniform Access Principle.",
    hint: "Plain attributes first; refactor to @property when validation is needed.",
    level: "basic",
    codeExample: "# Start simple, refactor to @property seamlessly when needed"
  }
];

export default questions;
