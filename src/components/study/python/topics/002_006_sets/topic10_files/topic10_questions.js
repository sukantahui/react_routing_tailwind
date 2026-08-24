// src/components/study/python/topics/002_006_sets/topic10_files/topic10_questions.js
// 30 Comprehensive Master Review Questions for Topic 10: Union, Intersection, and Difference

const questions = [
  {
    question: "What is the return value of A | B if A = {'Python', 'React'} and B = {'React', 'Django'}?",
    shortAnswer: "{'Python', 'React', 'Django'}.",
    explanation: "Union combines all elements from both sets into a single set, keeping exactly one instance of the shared element 'React'.",
    hint: "Union merges elements without duplicates.",
    level: "basic",
    codeExample: "A = {\"Python\", \"React\"}\nB = {\"React\", \"Django\"}\nprint(A | B)  # {'Python', 'React', 'Django'}"
  },
  {
    question: "What is the return value of A & B if A = {'Python', 'React'} and B = {'React', 'Django'}?",
    shortAnswer: "{'React'}.",
    explanation: "Intersection extracts only elements that exist simultaneously in both sets A and B, which is 'React'.",
    hint: "Intersection keeps only shared elements.",
    level: "basic",
    codeExample: "A = {\"Python\", \"React\"}\nB = {\"React\", \"Django\"}\nprint(A & B)  # {'React'}"
  },
  {
    question: "What is the result of A - B versus B - A if A = {1, 2, 3} and B = {3, 4, 5}?",
    shortAnswer: "A - B is {1, 2}; B - A is {4, 5}.",
    explanation: "A - B removes elements of B from A (leaving 1, 2). B - A removes elements of A from B (leaving 4, 5). Difference is non-commutative.",
    hint: "Subtraction order determines which set loses elements.",
    level: "basic",
    codeExample: "A, B = {1, 2, 3}, {3, 4, 5}\nprint(\"A - B:\", A - B)  # {1, 2}\nprint(\"B - A:\", B - A)  # {4, 5}"
  },
  {
    question: "How does Python optimize the time complexity of the set intersection (A & B)?",
    shortAnswer: "Python iterates over the smaller set and performs O(1) hash lookups in the larger set, achieving O(min(len(A), len(B))).",
    explanation: "If set A has 1,000,000 items and set B has 5 items, Python loops only 5 times through set B and checks if each exists in set A, executing in microsecond speed.",
    hint: "Python loops over the smaller set to minimize checks.",
    level: "expert",
    codeExample: "big = set(range(1000000))\nsmall = {5, 10, 9999999}\n# Loops 3 times through 'small', checking 'big' in O(1)\nres = big & small"
  },
  {
    question: "What is the difference between A.union(B) and A |= B?",
    shortAnswer: "A.union(B) returns a NEW set without modifying A; A |= B mutates set A in place and returns None.",
    explanation: "union() is a pure function that leaves both operands untouched. |= (or update()) directly adds the elements into set A's internal hash table.",
    hint: "union creates a new set; |= modifies A in place.",
    level: "basic",
    codeExample: "A = {1, 2}\nC = A.union({3})  # A is still {1, 2}\nA |= {3}          # A is now {1, 2, 3}"
  },
  {
    question: "Why does A.intersection([1, 2, 3]) work, while A & [1, 2, 3] raises a TypeError?",
    shortAnswer: "The & operator requires both operands to be set instances; the .intersection() method accepts any iterable.",
    explanation: "Python enforces strict operand typing on bitwise/set operators (&, |, -, ^), while named methods accept any iterable container.",
    hint: "Operators strictly require sets; methods accept any iterable.",
    level: "moderate",
    codeExample: "A = {1, 2}\n# A & [2, 3]            # TypeError\nres = A.intersection([2, 3]) # Valid! Returns {2}"
  },
  {
    question: "How can you find the elements present in ALL three sets: A, B, and C?",
    shortAnswer: "A & B & C or A.intersection(B, C).",
    explanation: "Chaining the intersection operator or passing multiple collections to the intersection method extracts only elements shared by all three sets.",
    hint: "Chain & or pass multiple arguments to intersection().",
    level: "basic",
    codeExample: "A, B, C = {1, 2, 3}, {2, 3, 4}, {3, 4, 5}\nprint(A & B & C)  # {3}"
  },
  {
    question: "What is the result of A - B - C if A = {1, 2, 3, 4}, B = {2}, and C = {3}?",
    shortAnswer: "{1, 4}.",
    explanation: "Operation evaluates left-to-right: (A - B) gives {1, 3, 4}. Then {1, 3, 4} - C removes 3, leaving {1, 4}.",
    hint: "Subtract sequentially from left to right.",
    level: "basic",
    codeExample: "A, B, C = {1, 2, 3, 4}, {2}, {3}\nprint(A - B - C)  # {1, 4}"
  },
  {
    question: "What is the output of set.intersection() called with zero additional arguments: A.intersection()?",
    shortAnswer: "A shallow copy of set A.",
    explanation: "Calling s.intersection() with no arguments returns a brand new set containing all elements of s, equivalent to s.copy().",
    hint: "With no arguments, it returns a clone of A.",
    level: "moderate",
    codeExample: "A = {10, 20}\nclone = A.intersection()\nprint(clone == A)       # True\nprint(clone is not A)   # True"
  },
  {
    question: "What happens when you execute A &= B (intersection_update)?",
    shortAnswer: "Set A is mutated in place to retain only elements that also exist in B; all other elements are deleted from A.",
    explanation: "&= removes non-overlapping elements directly from set A's hash table and returns None.",
    hint: "&= keeps only shared items in A.",
    level: "moderate",
    codeExample: "A = {1, 2, 3}\nB = {2, 3, 4}\nA &= B\nprint(A)  # {2, 3}"
  },
  {
    question: "What happens when you execute A -= B (difference_update)?",
    shortAnswer: "Set A is mutated in place by removing any element that exists in B.",
    explanation: "-= removes members of B directly from A and returns None.",
    hint: "-= removes matching items from A.",
    level: "basic",
    codeExample: "A = {10, 20, 30}\nB = {20, 40}\nA -= B\nprint(A)  # {10, 30}"
  },
  {
    question: "How can you use set difference to find which skills a candidate is missing for a job vacancy?",
    shortAnswer: "missing_skills = required_skills - candidate_skills.",
    explanation: "Subtracting candidate skills from required skills leaves only the criteria the candidate has not yet mastered.",
    hint: "Required minus Candidate gives missing skills.",
    level: "basic",
    codeExample: "required = {\"Python\", \"Docker\", \"AWS\"}\ncandidate = {\"Python\"}\nprint(required - candidate)  # {'Docker', 'AWS'}"
  },
  {
    question: "What is the output of {1, 2} & set()?",
    shortAnswer: "set() (empty set).",
    explanation: "An empty set shares zero elements with {1, 2}, so intersection yields set().",
    hint: "Intersection with empty set is always empty.",
    level: "basic",
    codeExample: "print({1, 2} & set())  # set()"
  },
  {
    question: "What is the output of {1, 2} | set()?",
    shortAnswer: "{1, 2}.",
    explanation: "Union with an empty set adds zero new elements, returning a new set with {1, 2}.",
    hint: "Union with empty set returns the original elements.",
    level: "basic",
    codeExample: "print({1, 2} | set())  # {1, 2}"
  },
  {
    question: "What is the output of {1, 2} - set()?",
    shortAnswer: "{1, 2}.",
    explanation: "Subtracting an empty set removes zero elements, returning {1, 2}.",
    hint: "Subtracting empty set leaves elements unchanged.",
    level: "basic",
    codeExample: "print({1, 2} - set())  # {1, 2}"
  },
  {
    question: "What is the output of set() - {1, 2}?",
    shortAnswer: "set() (empty set).",
    explanation: "Subtracting from an empty set leaves an empty set.",
    hint: "Subtracting from empty set remains empty.",
    level: "basic",
    codeExample: "print(set() - {1, 2})  # set()"
  },
  {
    question: "Can set intersection be used to compare two dictionaries by their keys?",
    shortAnswer: "Yes, dict1.keys() & dict2.keys() returns a set of shared keys.",
    explanation: "In Python 3, dictionary key views support set operations directly without manual conversion.",
    hint: "dict.keys() supports & directly.",
    level: "moderate",
    codeExample: "d1 = {\"a\": 1, \"b\": 2}\nd2 = {\"b\": 9, \"c\": 8}\nprint(d1.keys() & d2.keys())  # {'b'}"
  },
  {
    question: "How can you merge three sets A, B, and C into a single new set using a method?",
    shortAnswer: "A.union(B, C).",
    explanation: "The union() method accepts multiple iterable arguments separated by commas, merging them all into a new set.",
    hint: "Pass B and C as comma-separated arguments to union().",
    level: "basic",
    codeExample: "A, B, C = {1}, {2}, {3}\nprint(A.union(B, C))  # {1, 2, 3}"
  },
  {
    question: "What is the result of A & B when sets A and B are completely disjoint (have no common items)?",
    shortAnswer: "set() (an empty set).",
    explanation: "Disjoint sets share zero elements, so their intersection produces an empty set.",
    hint: "Disjoint sets produce empty intersection.",
    level: "basic",
    codeExample: "A = {\"A\", \"B\"}\nB = {\"C\", \"D\"}\nprint(A & B)  # set()"
  },
  {
    question: "What is the distributive law of Intersection over Union in Python set algebra?",
    shortAnswer: "A & (B | C) == (A & B) | (A & C).",
    explanation: "Intersecting A with the union of B and C is mathematically identical to uniting the intersection of (A, B) and (A, C).",
    hint: "Intersection distributes over Union.",
    level: "expert",
    codeExample: "A, B, C = {1, 2}, {2, 3}, {3, 4}\nprint((A & (B | C)) == ((A & B) | (A & C)))  # True"
  },
  {
    question: "What is the distributive law of Union over Intersection in Python set algebra?",
    shortAnswer: "A | (B & C) == (A | B) & (A | C).",
    explanation: "Uniting A with the intersection of B and C is mathematically identical to intersecting the union of (A, B) and (A, C).",
    hint: "Union distributes over Intersection.",
    level: "expert",
    codeExample: "A, B, C = {1, 2}, {2, 3}, {3, 4}\nprint((A | (B & C)) == ((A | B) & (A | C)))  # True"
  },
  {
    question: "How do you remove all punctuation characters from a string using set difference?",
    shortAnswer: "import string; clean_chars = set(text) - set(string.punctuation).",
    explanation: "Subtracting the punctuation set from the text character set leaves only alphanumeric and whitespace characters.",
    hint: "Subtract string.punctuation set from text set.",
    level: "basic",
    codeExample: "import string\ntext = \"hello, world!\"\nclean = set(text) - set(string.punctuation)\nprint(clean)"
  },
  {
    question: "What happens if you reassign A = A.intersection(B) vs executing A.intersection_update(B)?",
    shortAnswer: "Both update A, but intersection_update() mutates the existing memory object in place without allocating a new object.",
    explanation: "Reassignment creates a new set object and updates the variable name. intersection_update() modifies the existing object, updating any shared references.",
    hint: "intersection_update modifies in place without allocating a new object.",
    level: "moderate",
    codeExample: "A = {1, 2, 3}\nref = A\nA.intersection_update({2, 3})\nprint(ref)  # {2, 3} (Reflected in alias!)"
  },
  {
    question: "What is the output of: s = {1, 2, 3}; print(s - s)?",
    shortAnswer: "set() (empty set).",
    explanation: "Subtracting any set from itself removes all of its elements, leaving an empty set.",
    hint: "A set minus itself is empty.",
    level: "basic",
    codeExample: "s = {1, 2, 3}\nprint(s - s)  # set()"
  },
  {
    question: "What is the output of: s = {1, 2, 3}; print(s & s)?",
    shortAnswer: "{1, 2, 3} (a new set with identical elements).",
    explanation: "Intersecting a set with itself yields an identical set (idempotent operation).",
    hint: "Intersection with self returns the set itself.",
    level: "basic",
    codeExample: "s = {1, 2, 3}\nprint(s & s)  # {1, 2, 3}"
  },
  {
    question: "What is the output of: s = {1, 2, 3}; print(s | s)?",
    shortAnswer: "{1, 2, 3} (a new set with identical elements).",
    explanation: "Uniting a set with itself is idempotent and yields an identical set.",
    hint: "Union with self returns the set itself.",
    level: "basic",
    codeExample: "s = {1, 2, 3}\nprint(s | s)  # {1, 2, 3}"
  },
  {
    question: "How can you find common email subscribers across two independent newsletter lists in O(N) time?",
    shortAnswer: "common_emails = set(list_a) & set(list_b).",
    explanation: "Converting both lists to sets and intersecting them runs in O(len(A) + len(B)) time, finding shared subscribers instantaneously.",
    hint: "Convert lists to sets and use the & operator.",
    level: "basic",
    codeExample: "list_a = [\"s@test.com\", \"m@test.com\"]\nlist_b = [\"m@test.com\", \"d@test.com\"]\nprint(set(list_a) & set(list_b))  # {'m@test.com'}"
  },
  {
    question: "How do you find words that appear in document 1 but NOT in document 2?",
    shortAnswer: "set(doc1.split()) - set(doc2.split()).",
    explanation: "Splitting text into word lists, converting to sets, and applying difference (-) extracts unique vocabulary from doc1.",
    hint: "Subtract doc2 words set from doc1 words set.",
    level: "basic",
    codeExample: "doc1 = \"learn python programming in barrackpore\"\ndoc2 = \"learn javascript programming in kolkata\"\nunique_to_doc1 = set(doc1.split()) - set(doc2.split())\nprint(unique_to_doc1)  # {'python', 'barrackpore'}"
  },
  {
    question: "Why is set difference (A - B) faster than list filtering [x for x in A if x not in B]?",
    shortAnswer: "Set difference uses O(1) hash lookups; the list comprehension does slow O(len(B)) scans for every item in A if B is a list.",
    explanation: "If B is a list, the list comprehension runs in O(len(A) * len(B)) quadratic time. Set difference runs in fast O(len(A)) linear time.",
    hint: "Set difference runs in O(len(A)) time instead of O(N*M).",
    level: "expert",
    codeExample: "# Set difference: O(len(A))\n# Nested list scan: O(len(A) * len(B))"
  },
  {
    question: "What is the key takeaway for a software developer regarding Union, Intersection, and Difference?",
    shortAnswer: "Use Union (|) to aggregate, Intersection (&) to filter commonalities, and Difference (-) to isolate missing items or exclusions.",
    explanation: "These three operations form the foundation of high-performance data processing, access control, and deduplication logic in Python applications.",
    hint: "Union = Aggregate; Intersection = Match; Difference = Exclude.",
    level: "basic",
    codeExample: "# Core Triad:\n# Aggregate: A | B\n# Match:     A & B\n# Exclude:   A - B"
  }
];

export default questions;
