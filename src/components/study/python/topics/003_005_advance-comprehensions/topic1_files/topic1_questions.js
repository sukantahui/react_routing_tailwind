// src/components/study/python/topics/003_005_advance-comprehensions/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: Nested and Multi-variable Comprehensions with filtering

const questions = [
  {
    question: "What is the Left-to-Right loop ordering rule in multi-clause list comprehensions?",
    shortAnswer: "The 'for' clauses in a comprehension appear in the EXACT same order as standard nested 'for' loops: outer loop first, inner loop second ('[item for outer in matrix for item in outer]').",
    explanation: "Outer loop precedes inner loop left-to-right.",
    hint: "Outer loop is on the left, inner loop is on the right.",
    level: "basic",
    codeExample: "[item for row in matrix for item in row] # Matches for row in matrix: for item in row:"
  },
  {
    question: "Why does '[item for item in row for row in matrix]' fail with a 'NameError: name 'row' is not defined'?",
    shortAnswer: "Because Python reads comprehension clauses from left to right; attempting to iterate over 'row' in the first clause before 'row' is defined in the second clause causes a NameError.",
    explanation: "Clause evaluation order is strictly left-to-right.",
    hint: "Clauses are evaluated left to right; outer 'row' must be defined before inner 'item in row'.",
    level: "basic",
    codeExample: "# NameError: name 'row' is not defined"
  },
  {
    question: "How do you flatten a 2D list of lists into a 1D flat list in Python?",
    shortAnswer: "Using '[item for sublist in matrix for item in sublist]'.",
    explanation: "The standard idiomatic pattern for flattening 2D matrices.",
    hint: "Use [x for row in matrix for x in row].",
    level: "basic",
    codeExample: "matrix = [[1, 2], [3, 4]]\nflat = [x for row in matrix for x in row] # [1, 2, 3, 4]"
  },
  {
    question: "How does 2D matrix flattening differ syntactically from 2D matrix construction?",
    shortAnswer: "Flattening uses multiple 'for' clauses in a single bracket: '[x for row in M for x in row]'; Matrix construction nests two sets of brackets: '[[expr for col in cols] for row in rows]'.",
    explanation: "Single bracket = 1D output; Nested brackets = 2D output.",
    hint: "Flattening has 1 pair of brackets; Matrix construction has nested [[... for col] for row] brackets.",
    level: "moderate",
    codeExample: "flat = [x for r in m for x in r] vs nested = [[0 for c in range(3)] for r in range(3)]"
  },
  {
    question: "How do you generate a Cartesian Product of two lists 'A' and 'B' using a comprehension?",
    shortAnswer: "Using '[(a, b) for a in A for b in B]', which computes all |A| * |B| possible pairs.",
    explanation: "Cartesian product generation without importing itertools.product.",
    hint: "Use [(a, b) for a in A for b in B].",
    level: "basic",
    codeExample: "[(x, y) for x in [1, 2] for y in ['a', 'b']] # [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]"
  },
  {
    question: "How do you transpose a 2D rectangular matrix 'M' using a nested list comprehension?",
    shortAnswer: "Using '[[M[row][col] for row in range(len(M))] for col in range(len(M[0]))]'.",
    explanation: "Swaps row and column indices across the matrix.",
    hint: "Iterate col indices in outer loop and row indices in inner loop.",
    level: "moderate",
    codeExample: "transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]"
  },
  {
    question: "How do you unpack multi-variable tuples directly in a comprehension's loop header?",
    shortAnswer: "By specifying the tuple structure in the 'for' target: '[f\"{name}: {score}\" for (id, name), score in record_pairs]'.",
    explanation: "Eliminates manual index unpacking (e.g. item[0][1]).",
    hint: "Place tuple unpacking pattern directly after the 'for' keyword.",
    level: "basic",
    codeExample: "[name for (sid, name), score in student_data if score >= 90]"
  },
  {
    question: "How do you create a nested dictionary using a nested Dict comprehension?",
    shortAnswer: "Using '{dept: {s[\"id\"]: s[\"score\"] for s in students if s[\"dept\"] == dept} for dept in departments}'.",
    explanation: "Constructs 2-tier hierarchical dictionary mappings.",
    hint: "Nest a dict comprehension inside the value expression of an outer dict comprehension.",
    level: "moderate",
    codeExample: "{dept: {s['id']: s['score'] for s in students if s['dept'] == dept} for dept in depts}"
  },
  {
    question: "Can a composite tuple like '(campus, course)' be used as a key in a Dict comprehension?",
    shortAnswer: "Yes. Tuples containing immutable elements are hashable and can serve as composite multi-attribute dictionary keys: '{(camp, crs): [...] for camp in camps for crs in courses}'.",
    explanation: "Multi-dimensional hash indexing in Python.",
    hint: "Yes, tuples are hashable and serve as multi-dimensional keys.",
    level: "basic",
    codeExample: "{(s['campus'], s['course']): s['name'] for s in students}"
  },
  {
    question: "How do you filter pairs in a Cartesian product to exclude identical self-pairings ('x == y')?",
    shortAnswer: "By adding a filtering guard: '[(x, y) for x in items for y in items if x != y]'.",
    explanation: "Generates all non-reflexive permutations.",
    hint: "Add 'if x != y' at the end of the comprehension.",
    level: "basic",
    codeExample: "[(c1, c2) for c1 in courses for c2 in courses if c1 != c2]"
  },
  {
    question: "How do you generate combinations without duplicates ('A-B' and not 'B-A') using indexed filtering?",
    shortAnswer: "Using 'enumerate': '[(items[i], items[j]) for i in range(len(items)) for j in range(i + 1, len(items))]'.",
    explanation: "Generates strictly upper-triangular index pairs without duplicate ordering.",
    hint: "Iterate j from i + 1 to len(items).",
    level: "moderate",
    codeExample: "[(items[i], items[j]) for i in range(len(items)) for j in range(i + 1, len(items))]"
  },
  {
    question: "How do you flatten a 3D list (Cube / Volume) into a 1D flat list?",
    shortAnswer: "Using 3 sequential 'for' clauses: '[item for layer in cube for row in layer for item in row]'.",
    explanation: "Extends Left-to-Right loop ordering to 3 dimensions.",
    hint: "Chain 3 for clauses: [x for layer in cube for row in layer for x in row].",
    level: "moderate",
    codeExample: "[val for layer in 3d_grid for row in layer for val in row]"
  },
  {
    question: "How do you detect clashes between groups of students in a course scheduling matrix?",
    shortAnswer: "Using set intersection in a comprehension: '[(c1, c2) for c1 in courses for c2 in courses if c1 < c2 and (set(c1[\"students\"]) & set(c2[\"students\"]))'.",
    explanation: "Finds course pairs sharing one or more common enrolled students.",
    hint: "Check if set(c1['students']) & set(c2['students']) is non-empty.",
    level: "complex",
    codeExample: "clashes = [(a['id'], b['id']) for a in courses for b in courses if set(a['s']) & set(b['s'])]"
  },
  {
    question: "Can an inner 'for' loop in a comprehension depend on a variable from the outer 'for' loop?",
    shortAnswer: "Yes. The inner loop iterable can reference the variable bound by the outer loop: '[j for i in range(4) for j in range(i)]'.",
    explanation: "Dynamic dependent range iteration.",
    hint: "Yes, inner for clause can reference outer loop variable directly.",
    level: "basic",
    codeExample: "[y for x in range(3) for y in range(x)] # [0, 0, 1]"
  },
  {
    question: "What is the equivalent 'itertools' function for generating Cartesian products?",
    shortAnswer: "'itertools.product(list_a, list_b)', which returns an iterator of tuple pairs without allocating the full list in memory immediately.",
    explanation: "Memory-optimized alternative for massive Cartesian products.",
    hint: "itertools.product(A, B).",
    level: "moderate",
    codeExample: "import itertools\npairs = list(itertools.product(list_a, list_b))"
  },
  {
    question: "How do you filter a 2D matrix to keep only rows whose elements sum to greater than 100?",
    shortAnswer: "Using '[row for row in matrix if sum(row) > 100]'.",
    explanation: "Filters full sub-lists based on aggregate conditions.",
    hint: "Use [row for row in matrix if sum(row) > 100].",
    level: "basic",
    codeExample: "[row for row in score_matrix if sum(row) >= 250]"
  },
  {
    question: "How do you extract the diagonal elements of a square 2D matrix using a list comprehension?",
    shortAnswer: "Using '[matrix[i][i] for i in range(len(matrix))]'.",
    explanation: "Extracts main diagonal elements in O(N) time.",
    hint: "Use [M[i][i] for i in range(len(M))].",
    level: "basic",
    codeExample: "diagonal = [matrix[i][i] for i in range(len(matrix))]"
  },
  {
    question: "What happens if you have multiple 'if' conditions in a multi-clause comprehension?",
    shortAnswer: "Multiple trailing 'if' clauses act as an implicit logical 'AND': '[x for x in seq if cond1 if cond2]' is identical to '[x for x in seq if cond1 and cond2]'.",
    explanation: "Chained filtering condition mechanics.",
    hint: "Sequential 'if' clauses act as an implicit logical AND.",
    level: "moderate",
    codeExample: "[x for x in range(100) if x % 2 == 0 if x % 5 == 0] # Multiples of 10"
  },
  {
    question: "How do you invert a dictionary of lists into a flattened reverse mapping?",
    shortAnswer: "Using '{item: category for category, items in data.items() for item in items}'.",
    explanation: "Multi-clause dict comprehension for reverse mapping.",
    hint: "Iterate dict items in outer loop and item list in inner loop.",
    level: "moderate",
    codeExample: "{student: course for course, students in course_map.items() for student in students}"
  },
  {
    question: "How do you construct an identity matrix of size N x N using nested list comprehensions?",
    shortAnswer: "Using '[[1 if r == c else 0 for c in range(N)] for r in range(N)]'.",
    explanation: "Combines 2D matrix construction with ternary conditional evaluation.",
    hint: "Use [[1 if r == c else 0 for c in range(N)] for r in range(N)].",
    level: "basic",
    codeExample: "identity_3x3 = [[1 if r == c else 0 for c in range(3)] for r in range(3)]"
  },
  {
    question: "What is the cognitive complexity threshold for multi-clause comprehensions?",
    shortAnswer: "Comprehensions with more than 2 'for' clauses or multiple nested conditions become difficult to read and debug; refactoring into readable helper functions is standard engineering practice.",
    explanation: "Ensuring codebase maintainability.",
    hint: "Limit comprehensions to max 2 for clauses to preserve readability.",
    level: "basic",
    codeExample: "# Avoid 3+ nested for clauses in production code"
  },
  {
    question: "How do you group elements of a matrix by their column index into a list of tuples?",
    shortAnswer: "Using '[tuple(row[col] for row in matrix) for col in range(len(matrix[0]))]' (or 'list(zip(*matrix))').",
    explanation: "Column-wise tuple aggregation.",
    hint: "Use nested comprehension with tuple() or zip(*matrix).",
    level: "moderate",
    codeExample: "[tuple(r[c] for r in matrix) for c in range(cols)]"
  },
  {
    question: "How do you remove duplicates while preserving order across a flattened 2D list in Python 3.7+?",
    shortAnswer: "Using 'list(dict.fromkeys(item for row in matrix for item in row))'.",
    explanation: "High-performance O(N) order-preserving deduplication.",
    hint: "Use list(dict.fromkeys(flat_generator)).",
    level: "complex",
    codeExample: "unique_ordered = list(dict.fromkeys(x for r in m for x in r))"
  },
  {
    question: "How do you create a coordinate grid of (X, Y) points within a bounding box?",
    shortAnswer: "Using '[(x, y) for x in range(min_x, max_x + 1) for y in range(min_y, max_y + 1)]'.",
    explanation: "Standard 2D spatial grid generation.",
    hint: "Use [(x, y) for x in range(...) for y in range(...)].",
    level: "basic",
    codeExample: "grid = [(x, y) for x in range(3) for y in range(3)]"
  },
  {
    question: "What is the ultimate golden rule for Nested and Multi-Variable Comprehensions in Python?",
    shortAnswer: "Always write 'for' clauses in Left-to-Right order matching standard nested loops (outer loop first), use nested brackets for 2D construction and single brackets for flattening, and refactor whenever nesting exceeds 2 levels.",
    explanation: "The complete enterprise guideline for writing clean, efficient multi-variable comprehensions.",
    hint: "Left-to-right loop order, single bracket for flattening, nested brackets for matrix generation.",
    level: "basic",
    codeExample: "# Python Nested Comprehension Mastery"
  }
];

export default questions;
