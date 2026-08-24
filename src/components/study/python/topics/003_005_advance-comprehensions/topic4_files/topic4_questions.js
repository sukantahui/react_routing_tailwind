// src/components/study/python/topics/003_005_advance-comprehensions/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: any() and all() predicates for quick boolean checks

const questions = [
  {
    question: "What is the fundamental difference between 'any(iterable)' and 'all(iterable)' in Python?",
    shortAnswer: "'any()' returns True if AT LEAST ONE element in the iterable is truthy; 'all()' returns True ONLY IF EVERY element in the iterable is truthy.",
    explanation: "The two core boolean aggregation predicates in Python.",
    hint: "any() needs at least one True; all() requires every element to be True.",
    level: "basic",
    codeExample: "any([False, True, False]) # True; all([True, True, False]) # False"
  },
  {
    question: "How does 'Short-Circuit Evaluation' operate in 'any()' and 'all()'?",
    shortAnswer: "'any()' stops iterating immediately upon finding the first 'True' value; 'all()' stops iterating immediately upon finding the first 'False' value, leaving remaining elements unevaluated.",
    explanation: "Optimizes CPU cycles and prevents unnecessary downstream evaluations.",
    hint: "any() halts on first True; all() halts on first False.",
    level: "basic",
    codeExample: "any(x == 0 for x in range(1_000_000)) # Halts after testing 0!"
  },
  {
    question: "What is 'Vacuous Truth' and why does 'all([])' evaluate to 'True' in Python?",
    shortAnswer: "In formal mathematical logic, a universal claim about all members of an empty set is vacuously true because there are no counterexamples (no elements that are False) to invalidate it.",
    explanation: "A fundamental mathematical and programming principle.",
    hint: "There are no False elements in an empty list, so all([]) evaluates to True.",
    level: "moderate",
    codeExample: "all([]) # True; any([]) # False"
  },
  {
    question: "How do you prevent an empty list from falsely passing an 'all()' validation guard?",
    shortAnswer: "Check that the sequence is non-empty before calling 'all()': 'if sequence and all(condition for x in sequence): ...'.",
    explanation: "Defensive validation against vacuous truth.",
    hint: "Use 'if seq and all(...)'.",
    level: "basic",
    codeExample: "is_valid = bool(scores) and all(s >= 60 for s in scores)"
  },
  {
    question: "Why is writing 'any([check(x) for x in stream])' a major performance anti-pattern?",
    shortAnswer: "Using square brackets creates a full List Comprehension in memory first, executing 'check(x)' on EVERY item and defeating short-circuiting; using a generator expression 'any(check(x) for x in stream)' halts on the first match.",
    explanation: "Eager list allocation negates short-circuit optimization.",
    hint: "Square brackets build the entire list first, defeating short-circuiting.",
    level: "moderate",
    codeExample: "# BAD: any([f(x) for x in data]) -> GOOD: any(f(x) for x in data)"
  },
  {
    question: "How do De Morgan's Laws apply to 'any()' and 'all()' in Python?",
    shortAnswer: "'not all(conditions)' is logically equivalent to 'any(not c for c in conditions)', and 'not any(conditions)' is logically equivalent to 'all(not c for c in conditions)'.",
    explanation: "Boolean duality transformations.",
    hint: "not all(P) == any(not P); not any(P) == all(not P).",
    level: "moderate",
    codeExample: "not all(x > 0 for x in nums) == any(x <= 0 for x in nums)"
  },
  {
    question: "How do you check if all elements in a 2D matrix are greater than zero?",
    shortAnswer: "Using nested generator expressions with 'all()': 'all(all(cell > 0 for cell in row) for row in matrix)'.",
    explanation: "Validates 2D matrices across all rows and columns.",
    hint: "Use all(all(c > 0 for c in row) for row in matrix).",
    level: "basic",
    codeExample: "all(all(x >= 0 for x in row) for row in score_matrix)"
  },
  {
    question: "How do you verify that a dictionary contains ALL required keys using 'all()'?",
    shortAnswer: "Using 'all(key in my_dict for key in required_keys)' (or 'required_keys.issubset(my_dict.keys())').",
    explanation: "Validates schema completeness before processing payloads.",
    hint: "Use all(k in d for k in required_keys).",
    level: "basic",
    codeExample: "has_all_keys = all(k in student for k in ['id', 'name', 'course'])"
  },
  {
    question: "What is the best-case and worst-case time complexity of 'any()' over a sequence of N elements?",
    shortAnswer: "Best-case is O(1) if the very first element is True; worst-case is O(N) if all elements are False or the only True element is at the end.",
    explanation: "Short-circuit algorithmic complexity.",
    hint: "O(1) best case (first item True); O(N) worst case (no True items).",
    level: "basic",
    codeExample: "# Best case O(1), Worst case O(N)"
  },
  {
    question: "How do you check if at least one string in a list contains whitespace?",
    shortAnswer: "Using 'any(' ' in s for s in string_list)'.",
    explanation: "Simple substring containment test.",
    hint: "Use any(' ' in s for s in list).",
    level: "basic",
    codeExample: "has_spaces = any(' ' in tag for tag in skill_tags)"
  },
  {
    question: "How do you verify that all numbers in a list are strictly positive and even?",
    shortAnswer: "Using 'all(x > 0 and x % 2 == 0 for x in numbers)'.",
    explanation: "Combines multiple boolean conditions within a single generator predicate.",
    hint: "Combine conditions with 'and' inside generator.",
    level: "basic",
    codeExample: "all(x > 0 and x % 2 == 0 for x in [2, 4, 6, 8])"
  },
  {
    question: "Can 'any()' and 'all()' be passed custom objects or classes?",
    shortAnswer: "Yes. Python tests each object for truthiness using its '__bool__()' or '__len__()' dunder method.",
    explanation: "Truth value testing protocol in Python.",
    hint: "Yes, Python evaluates truthiness via __bool__() or __len__().",
    level: "basic",
    codeExample: "all([Student(active=True), Student(active=True)])"
  },
  {
    question: "How do you check if two sets share any common elements using 'any()'?",
    shortAnswer: "Using 'any(item in set_b for item in set_a)' (or 'bool(set_a & set_b)').",
    explanation: "Tests for set intersection / overlap.",
    hint: "Use any(x in set_b for x in set_a) or bool(a & b).",
    level: "basic",
    codeExample: "has_overlap = any(s in batch_b for s in batch_a)"
  },
  {
    question: "How do you check if a candidate meets at least one scholarship prerequisite?",
    shortAnswer: "Using 'any(prereq in candidate_skills for prereq in required_prereqs)'.",
    explanation: "Multi-option eligibility verification.",
    hint: "Use any(req in candidate_skills for req in required).",
    level: "basic",
    codeExample: "any(course in completed for course in ['AI-101', 'ML-201'])"
  },
  {
    question: "Why should you avoid creating a list inside 'all()' when validating a database query?",
    shortAnswer: "Building an eager list queries/evaluates all rows into RAM; a generator halts on the very first invalid row without querying the remaining rows.",
    explanation: "Database I/O optimization via lazy generator streaming.",
    hint: "Generator halts on first invalid row without processing remaining database rows.",
    level: "moderate",
    codeExample: "all(row.is_valid() for row in db_cursor) # Streams O(1)"
  },
  {
    question: "How do you verify that all strings in a collection are non-empty?",
    shortAnswer: "Using 'all(bool(s.strip()) for s in strings)' or 'all(s.strip() != '' for s in strings)'.",
    explanation: "Validates string collections against whitespace-only values.",
    hint: "Use all(bool(s.strip()) for s in strings).",
    level: "basic",
    codeExample: "all(bool(name.strip()) for name in candidate_names)"
  },
  {
    question: "What is the return type of 'any()' and 'all()'?",
    shortAnswer: "Always a pure boolean primitive: 'bool' ('True' or 'False').",
    explanation: "Guaranteed boolean return type.",
    hint: "Always returns True or False (type bool).",
    level: "basic",
    codeExample: "type(any([1, 2])) # <class 'bool'>"
  },
  {
    question: "How do you check if an IP address is valid (all 4 octets between 0 and 255)?",
    shortAnswer: "Using 'octets = ip.split('.')' followed by 'len(octets) == 4 and all(o.isdigit() and 0 <= int(o) <= 255 for o in octets)'.",
    explanation: "Classic network validation recipe.",
    hint: "Split by dot, check length == 4, and use all() on integer range 0..255.",
    level: "moderate",
    codeExample: "len(parts) == 4 and all(0 <= int(p) <= 255 for p in parts if p.isdigit())"
  },
  {
    question: "How do you check if ANY transaction in a ledger is flagged as fraudulent?",
    shortAnswer: "Using 'any(tx['risk_score'] > 0.85 for tx in ledger)'.",
    explanation: "Fraud detection telemetry scan.",
    hint: "Use any(tx['risk_score'] > threshold for tx in transactions).",
    level: "basic",
    codeExample: "has_fraud = any(tx['is_fraud'] for tx in transaction_ledger)"
  },
  {
    question: "How do you check if ALL values in a dictionary meet a criterion?",
    shortAnswer: "Using 'all(val >= threshold for val in my_dict.values())'.",
    explanation: "Iterates over dictionary values directly.",
    hint: "Use all(v >= threshold for v in d.values()).",
    level: "basic",
    codeExample: "all(fee >= 10000 for fee in course_fees.values())"
  },
  {
    question: "Can 'any()' and 'all()' be used with infinite iterators (like 'itertools.count()')?",
    shortAnswer: "Yes, provided the short-circuit condition is met; 'any(x == 5 for x in itertools.count())' terminates at 5, but if the condition is never met, it will loop indefinitely.",
    explanation: "Short-circuiting on infinite generator streams.",
    hint: "Yes, but they will hang indefinitely if the short-circuit condition is never triggered.",
    level: "complex",
    codeExample: "any(x == 10 for x in itertools.count()) # Terminates cleanly at 10"
  },
  {
    question: "How do you verify that a list is sorted in strictly ascending order using 'all()'?",
    shortAnswer: "Using 'all(seq[i] < seq[i+1] for i in range(len(seq) - 1))'.",
    explanation: "Pairwise sorted order verification.",
    hint: "Compare adjacent elements: all(a < b for a, b in zip(seq, seq[1:])).",
    level: "moderate",
    codeExample: "all(arr[i] <= arr[i+1] for i in range(len(arr) - 1))"
  },
  {
    question: "What is the cognitive benefit of using 'all()' vs writing a manual 'for' loop with boolean flags?",
    shortAnswer: "'all()' expresses the declarative intent in a single expressive statement, eliminating 5 lines of boilerplate flag tracking ('flag = True; for x in seq: if not cond: flag = False; break').",
    explanation: "Declarative code clarity.",
    hint: "Replaces boilerplate flag variables with a single declarative expression.",
    level: "basic",
    codeExample: "# all(cond for x in seq) vs 5 lines of flag boilerplate"
  },
  {
    question: "How do you check if at least one student in a batch received distinction honors?",
    shortAnswer: "Using 'any(s['score'] >= 90 for s in batch_students)'.",
    explanation: "Batch threshold telemetry predicate.",
    hint: "Use any(s['score'] >= 90 for s in students).",
    level: "basic",
    codeExample: "has_distinction = any(s['score'] >= 90 for s in students)"
  },
  {
    question: "What is the ultimate golden rule for using 'any()' and 'all()' in Python?",
    shortAnswer: "Always pass Generator Expressions without square brackets for instant O(1) memory short-circuit evaluation, guard against vacuous truth with 'if seq and all(...)', and use them to replace verbose flag-tracking loops.",
    explanation: "The complete enterprise guideline for boolean predicate operations in Python.",
    hint: "Always use generator expressions, guard against vacuous truth on empty sequences, and short-circuit early.",
    level: "basic",
    codeExample: "# Python Boolean Predicate Mastery"
  }
];

export default questions;
