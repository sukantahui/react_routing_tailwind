const questions = [
  {
    "id": 1,
    "question": "What is the primary concept of Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #1 - Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line. Always avoid common pitfall: Printing the array reference directly (System.out.println(arr)) instead of looping through elements.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line."
  },
  {
    "id": 2,
    "question": "How does Java allocate memory for Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #2 - Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Vertical Output: Use System.out.println(arr[i]); to print each element on a new line. Always avoid common pitfall: Printing a trailing separator (comma or comma-space) after the very last element.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Vertical Output: Use System.out.println(arr[i]); to print each element on a new line."
  },
  {
    "id": 3,
    "question": "What is the time complexity associated with Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #3 - Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs. Always avoid common pitfall: Forgetting a final System.out.println() after a horizontal print loop, causing subsequent output to run together.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs."
  },
  {
    "id": 4,
    "question": "Which common ICSE board exam mistake occurs in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #4 - Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents. Always avoid common pitfall: Printing the array reference directly (System.out.println(arr)) instead of looping through elements.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents."
  },
  {
    "id": 5,
    "question": "How is zero-based indexing relevant to Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #5 - Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation. Always avoid common pitfall: Printing a trailing separator (comma or comma-space) after the very last element.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation."
  },
  {
    "id": 6,
    "question": "What exception is thrown if boundaries are violated in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #1 - Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line. Always avoid common pitfall: Forgetting a final System.out.println() after a horizontal print loop, causing subsequent output to run together.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line."
  },
  {
    "id": 7,
    "question": "Can negative values be used in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #2 - Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Vertical Output: Use System.out.println(arr[i]); to print each element on a new line. Always avoid common pitfall: Printing the array reference directly (System.out.println(arr)) instead of looping through elements.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Vertical Output: Use System.out.println(arr[i]); to print each element on a new line."
  },
  {
    "id": 8,
    "question": "How does the 'new' operator interact with Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #3 - Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs. Always avoid common pitfall: Printing a trailing separator (comma or comma-space) after the very last element.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs."
  },
  {
    "id": 9,
    "question": "What role does the length property play in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #4 - Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents. Always avoid common pitfall: Forgetting a final System.out.println() after a horizontal print loop, causing subsequent output to run together.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents."
  },
  {
    "id": 10,
    "question": "How does the stack memory differ from heap memory in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #5 - Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation. Always avoid common pitfall: Printing the array reference directly (System.out.println(arr)) instead of looping through elements.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation."
  },
  {
    "id": 11,
    "question": "Is the size of an array fixed or dynamic in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #1 - Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line. Always avoid common pitfall: Printing a trailing separator (comma or comma-space) after the very last element.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line."
  },
  {
    "id": 12,
    "question": "What are the default values assigned by the JVM in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #2 - Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Vertical Output: Use System.out.println(arr[i]); to print each element on a new line. Always avoid common pitfall: Forgetting a final System.out.println() after a horizontal print loop, causing subsequent output to run together.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Vertical Output: Use System.out.println(arr[i]); to print each element on a new line."
  },
  {
    "id": 13,
    "question": "How does Scanner input work when dealing with Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #3 - Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs. Always avoid common pitfall: Printing the array reference directly (System.out.println(arr)) instead of looping through elements.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs."
  },
  {
    "id": 14,
    "question": "What is the difference between declaring and instantiating in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #4 - Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents. Always avoid common pitfall: Printing a trailing separator (comma or comma-space) after the very last element.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents."
  },
  {
    "id": 15,
    "question": "Can an array hold elements of different data types in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #5 - Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation. Always avoid common pitfall: Forgetting a final System.out.println() after a horizontal print loop, causing subsequent output to run together.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation."
  },
  {
    "id": 16,
    "question": "How do we traverse in reverse order when applying Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #1 - Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line. Always avoid common pitfall: Printing the array reference directly (System.out.println(arr)) instead of looping through elements.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line."
  },
  {
    "id": 17,
    "question": "What happens if you print an array reference directly in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #2 - Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Vertical Output: Use System.out.println(arr[i]); to print each element on a new line. Always avoid common pitfall: Printing a trailing separator (comma or comma-space) after the very last element.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Vertical Output: Use System.out.println(arr[i]); to print each element on a new line."
  },
  {
    "id": 18,
    "question": "How does BlueJ visualize the operations in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #3 - Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs. Always avoid common pitfall: Forgetting a final System.out.println() after a horizontal print loop, causing subsequent output to run together.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs."
  },
  {
    "id": 19,
    "question": "How do you write a Variable Description Table (VDT) entry for Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #4 - Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents. Always avoid common pitfall: Printing the array reference directly (System.out.println(arr)) instead of looping through elements.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents."
  },
  {
    "id": 20,
    "question": "What happens if the array reference is null in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #5 - Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation. Always avoid common pitfall: Printing a trailing separator (comma or comma-space) after the very last element.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation."
  },
  {
    "id": 21,
    "question": "How can you pass an array to a method in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #1 - Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line. Always avoid common pitfall: Forgetting a final System.out.println() after a horizontal print loop, causing subsequent output to run together.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Horizontal Output: Use System.out.print(arr[i] + ' '); to print elements separated by spaces on one line."
  },
  {
    "id": 22,
    "question": "Can an array have a length of 0 in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #2 - Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Vertical Output: Use System.out.println(arr[i]); to print each element on a new line. Always avoid common pitfall: Printing the array reference directly (System.out.println(arr)) instead of looping through elements.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Vertical Output: Use System.out.println(arr[i]); to print each element on a new line.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Vertical Output: Use System.out.println(arr[i]); to print each element on a new line."
  },
  {
    "id": 23,
    "question": "Why is array access O(1) constant time in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #3 - Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs. Always avoid common pitfall: Printing a trailing separator (comma or comma-space) after the very last element.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Indexed Format: Print 'Index ' + i + ': ' + arr[i] for detailed debug or trace outputs."
  },
  {
    "id": 24,
    "question": "How do you prevent off-by-one errors in Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #4 - Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents. Always avoid common pitfall: Forgetting a final System.out.println() after a horizontal print loop, causing subsequent output to run together.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Avoid Direct Object Print: Printing 'System.out.println(arr);' displays internal type hash (e.g. [I@15db9742), not contents."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full marks on Displaying Array Elements?",
    "shortAnswer": "Displaying Array Elements: Fundamental rule #5 - Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
    "explanation": "In ICSE Class 10 Java, Displaying Array Elements requires strict adherence to memory rules. Displaying array contents is a core component of every ICSE Section B program. Output can be formatted on a single line separated by spaces, on multiple lines with index markers, or cleanly in tabular format using escape characters like '\\t'. Key requirement: Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation. Always avoid common pitfall: Printing the array reference directly (System.out.println(arr)) instead of looping through elements.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// DisplayArrayElements.java\nint[] arr = new int[5];\n// Arrays.toString(): Utility method java.util.Arrays.toString(arr) provides standard bracketed representation."
  }
];

export default questions;
