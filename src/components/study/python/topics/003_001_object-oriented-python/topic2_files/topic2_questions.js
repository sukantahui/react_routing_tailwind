// src/components/study/python/topics/003_001_object-oriented-python/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Constructors & the __init__() method

const questions = [
  {
    question: "What is the purpose of the '__init__' method in a Python class?",
    shortAnswer: "To initialize a newly created object instance by assigning initial attributes and establishing invariants upon creation.",
    explanation: "Automatically executed after '__new__' allocates the object in heap memory.",
    hint: "Initializes instance attributes after memory allocation.",
    level: "basic",
    codeExample: "class Student:\n    def __init__(self, name):\n        self.name = name"
  },
  {
    question: "Why must the first parameter of '__init__' always be 'self'?",
    shortAnswer: "Because Python automatically passes the active newly allocated object instance as the first argument when invoking the constructor.",
    explanation: "Allows attributes to be assigned directly to that specific instance's namespace (self.name = ...).",
    hint: "Explicit reference to the newly created instance.",
    level: "basic",
    codeExample: "def __init__(self, student_id):\n    self.student_id = student_id"
  },
  {
    question: "What happens if '__init__' attempts to return a value other than None?",
    shortAnswer: "Python raises a TypeError: __init__() should return None, not 'type'.",
    explanation: "Because '__new__' is responsible for returning the object, '__init__' is strictly an in-place initializer and must return None.",
    hint: "Raises TypeError if returning any non-None value.",
    level: "basic",
    codeExample: "# TypeError: __init__() should return None\ndef __init__(self): return 100"
  },
  {
    question: "What is the danger of using a mutable default argument like 'def __init__(self, items=[])'?",
    shortAnswer: "The empty list is created only once when the function is defined in memory; consequently, ALL instances initialized with the default argument share the exact same list in RAM, causing severe data pollution across objects.",
    explanation: "Modifying items on instance A silently mutates the items on instance B.",
    hint: "All instances share the exact same mutable object in memory.",
    level: "moderate",
    codeExample: "# DANGEROUS BUG:\ndef __init__(self, items=[]):\n    self.items = items"
  },
  {
    question: "What is the canonical Python solution to the mutable default argument trap in '__init__'?",
    shortAnswer: "Set the default parameter to None, and create a fresh new list/dict inside '__init__': self.items = list(items) if items is not None else [].",
    explanation: "Ensures every instance gets its own independent heap allocation.",
    hint: "Default to None and initialize freshly inside the method.",
    level: "basic",
    codeExample: "def __init__(self, items=None):\n    self.items = list(items) if items is not None else []"
  },
  {
    question: "How do you enforce parameter validation inside a constructor?",
    shortAnswer: "By checking parameter conditions at the start of __init__ and raising appropriate exceptions like ValueError or TypeError if invariants are violated.",
    explanation: "Guarantees that an invalid object can never be successfully created in memory.",
    hint: "Validate arguments and raise ValueError/TypeError before assigning attributes.",
    level: "basic",
    codeExample: "if fee <= 0:\n    raise ValueError('Fee must be positive!')"
  },
  {
    question: "What is the 'Alternative Constructor' pattern in Python?",
    shortAnswer: "A class method decorated with @classmethod that parses non-standard inputs (like JSON dictionaries, files, or strings) and calls cls(...) to return a new instance.",
    explanation: "Python does not support traditional method overloading, so classmethods like .from_dict() provide clean multi-constructor factories.",
    hint: "Using @classmethod factory methods (e.g. from_dict, from_csv).",
    level: "moderate",
    codeExample: "@classmethod\ndef from_dict(cls, data):\n    return cls(data['id'], data['name'])"
  },
  {
    question: "How do you call the parent superclass constructor from a subclass '__init__'?",
    shortAnswer: "Using the super().__init__(*args, **kwargs) call at the top of the subclass constructor.",
    explanation: "Delegates initialization of inherited attributes to the superclass.",
    hint: "Call super().__init__(...).",
    level: "basic",
    codeExample: "class GraduateStudent(Student):\n    def __init__(self, name, thesis):\n        super().__init__(name)\n        self.thesis = thesis"
  },
  {
    question: "Can '__init__' accept variable positional (*args) and keyword arguments (**kwargs)?",
    shortAnswer: "Yes. Using *args and **kwargs allows constructors to accept arbitrary extra arguments or pass parameters dynamically up to a superclass.",
    explanation: "Commonly used in framework base classes and decorators.",
    hint: "Yes, standard *args and **kwargs syntax is fully supported.",
    level: "moderate",
    codeExample: "def __init__(self, name, **extra_attrs):\n    self.name = name\n    self.extra = extra_attrs"
  },
  {
    question: "What happens if a class does not define an '__init__' method?",
    shortAnswer: "Python executes the default empty __init__ inherited from the root 'object' class, which takes no arguments and performs no attribute assignment.",
    explanation: "Instances can still be created, but initial attributes must be added manually.",
    hint: "Inherits default empty __init__ from object class.",
    level: "basic",
    codeExample: "class Empty:\n    pass\ne = Empty()  # Works with 0 arguments"
  },
  {
    question: "What is a 'Computed' or 'Derived' attribute inside '__init__'?",
    shortAnswer: "An attribute calculated automatically from other input parameters during construction (e.g., self.net_salary = basic + hra - deductions).",
    explanation: "Simplifies object state by calculating dependent fields once at creation.",
    hint: "An attribute calculated from other constructor parameters.",
    level: "basic",
    codeExample: "self.net_fee = self.gross_fee * (1 - self.discount / 100)"
  },
  {
    question: "Can an object be created if an exception is raised inside '__init__'?",
    shortAnswer: "No. If an exception is raised inside __init__, object construction is aborted, no valid reference is returned, and the allocated memory is immediately garbage collected.",
    explanation: "Prevents invalid or half-initialized objects from existing in memory.",
    hint: "Construction is aborted and the incomplete object is discarded.",
    level: "moderate",
    codeExample: "try:\n    s = Student(age=-5)  # Raises ValueError\nexcept ValueError:\n    # 's' was never created"
  },
  {
    question: "Why should you avoid performing heavy blocking network or disk I/O operations inside '__init__'?",
    shortAnswer: "Because constructors should be fast, predictable, and fail-safe; heavy I/O causes delays during instantiation, complicates unit testing, and makes mock testing difficult.",
    explanation: "Best practice: use factory methods or explicit .connect() / .load() methods for slow operations.",
    hint: "Constructors should be lightweight; separate heavy I/O into explicit methods.",
    level: "complex",
    codeExample: "# Better: conn = DBConnection(); conn.connect()"
  },
  {
    question: "What is the difference between keyword-only arguments and positional-only arguments in '__init__'?",
    shortAnswer: "Positional-only arguments (before /) must be passed by position; keyword-only arguments (after *) must be explicitly passed by name (e.g. def __init__(self, name, *, fee):).",
    explanation: "Keyword-only arguments prevent ambiguous argument placement in large constructors.",
    hint: "Use * to enforce keyword-only parameters.",
    level: "moderate",
    codeExample: "def __init__(self, name: str, *, is_admin: bool = False):\n    self.name = name\n    self.is_admin = is_admin"
  },
  {
    question: "What is 'Constructor Chaining'?",
    shortAnswer: "The practice where a subclass constructor explicitly invokes its parent superclass constructor via super().__init__() to ensure complete layered initialization.",
    explanation: "Essential for robust multi-level inheritance hierarchies.",
    hint: "Subclass invoking super().__init__() to initialize parent state.",
    level: "moderate",
    codeExample: "class B(A):\n    def __init__(self):\n        super().__init__()"
  },
  {
    question: "How do dataclasses in Python 3.7+ simplify '__init__' creation?",
    shortAnswer: "The @dataclass decorator automatically generates the __init__, __repr__, and __eq__ methods from type-annotated class variables without manual boilerplate.",
    explanation: "Eliminates repetitive 'self.x = x' assignment code.",
    hint: "Automatically writes __init__ from annotated fields.",
    level: "moderate",
    codeExample: "from dataclasses import dataclass\n@dataclass\nclass Student:\n    name: str\n    fee: float"
  },
  {
    question: "Can '__init__' be called manually on an existing object after instantiation?",
    shortAnswer: "Yes (e.g. obj.__init__(...)), which re-executes the initialization logic and overwrites existing attributes on the object.",
    explanation: "Generally discouraged in production code unless intentionally resetting an object's state.",
    hint: "Yes, it re-runs attribute initialization on the existing instance.",
    level: "moderate",
    codeExample: "s = Student('A')\ns.__init__('B')  # Re-initializes s.name to 'B'"
  },
  {
    question: "What is the difference between class attributes defined outside '__init__' and instance attributes defined inside '__init__'?",
    shortAnswer: "Class attributes are shared across all instances; instance attributes (self.attr) are uniquely owned by each individual instance.",
    explanation: "Modifying self.attr affects only that specific instance.",
    hint: "Class attributes are shared; instance attributes are unique per instance.",
    level: "basic",
    codeExample: "class Bank:\n    branch = 'Barrackpore'  # Class\n    def __init__(self, num): self.num = num  # Instance"
  },
  {
    question: "How do you handle optional dependencies or configuration dictionaries inside '__init__'?",
    shortAnswer: "Use dict.get() with fallback defaults (e.g. self.timeout = config.get('timeout', 30)).",
    explanation: "Prevents KeyError crashes when optional settings are omitted.",
    hint: "Use config.get('key', default).",
    level: "basic",
    codeExample: "def __init__(self, config=None):\n    cfg = config or {}\n    self.port = cfg.get('port', 8080)"
  },
  {
    question: "What is the 'Self-Assignment' pattern in '__init__'?",
    shortAnswer: "Assigning passed parameter values directly to instance attributes with the same name: self.name = name.",
    explanation: "Binds the local parameter into the instance's __dict__ namespace.",
    hint: "Binding parameters to self: self.name = name.",
    level: "basic",
    codeExample: "self.student_id = student_id"
  },
  {
    question: "Why should you avoid creating circular references inside '__init__'?",
    shortAnswer: "Because objects referencing each other (e.g. parent.child = child; child.parent = parent) complicate garbage collection and can delay deallocation.",
    explanation: "Use weakref (weak references) if reciprocal parent-child links are required.",
    hint: "Causes cyclic reference graphs that delay GC; use weakref instead.",
    level: "complex",
    codeExample: "import weakref\nself.parent = weakref.ref(parent)"
  },
  {
    question: "Can an '__init__' method be asynchronous (async def __init__)?",
    shortAnswer: "No. Python does not support async __init__; instead, use an async classmethod factory (e.g. async def create(): ...).",
    explanation: "Constructors must return synchronously.",
    hint: "No, use async classmethod factories instead.",
    level: "complex",
    codeExample: "@classmethod\nasync def create(cls):\n    inst = cls()\n    await inst.setup()\n    return inst"
  },
  {
    question: "What is the recommended order of operations inside a production '__init__' method?",
    shortAnswer: "1. super().__init__() call; 2. Validate input parameters; 3. Bind core instance attributes; 4. Calculate derived/computed fields.",
    explanation: "Ensures that inherited state is initialized and invalid arguments fail before any state is mutated.",
    hint: "Super call -> Validation -> Attribute binding -> Derived calculations.",
    level: "moderate",
    codeExample: "# 1. super().__init__()\n# 2. validate(fee)\n# 3. self.fee = fee\n# 4. self.net = calc()"
  },
  {
    question: "How do you enforce type checking in '__init__' dynamically at runtime?",
    shortAnswer: "Using isinstance() checks or runtime data validation libraries like Pydantic or typeguard.",
    explanation: "Raises TypeError if unexpected argument types are provided.",
    hint: "Use isinstance(val, type) or Pydantic.",
    level: "moderate",
    codeExample: "if not isinstance(age, int):\n    raise TypeError('Age must be an integer!')"
  },
  {
    question: "What is the ultimate benefit of a well-designed '__init__' constructor?",
    shortAnswer: "It guarantees that an object is born in a 100% valid, self-consistent state, protecting the application from runtime bugs and null pointer errors.",
    explanation: "Forms the cornerstone of robust object-oriented software engineering.",
    hint: "Guarantees complete validity and self-consistency from birth.",
    level: "basic",
    codeExample: "# Validated state from creation guarantees zero corrupted objects"
  }
];

export default questions;
