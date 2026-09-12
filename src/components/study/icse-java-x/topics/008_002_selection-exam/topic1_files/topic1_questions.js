const questions = [
  {
    "question": "What are the most frequently recurring programming archetypes in ICSE Class X Section B?",
    "shortAnswer": "The top 5 recurring archetypes are: Class Design with tariff slabs, 1D Array Search/Sort, String manipulation (Piglatin/Palindrome), Function Overloading, and Digit-Extraction Special Numbers.",
    "explanation": "CISCE maintains a well-defined syllabus blueprint. Across 2014-2024, Question 3 has almost always been Class Design (Encapsulation), Question 4 is Array Search or Sort (Binary Search or Bubble Sort), Question 5 is String processing (Piglatin, Title Case, or Vowel extraction), Question 6 is Method Overloading (Series or Shapes), and Question 7/8 is Special Number or Matrix operations.",
    "hint": "Prepare 1 program from each of these 5 categories to guarantee solving 4 out of 6 questions.",
    "level": "basic",
    "codeExample": "// Common structure: Class + 3 methods (input, calc, display)"
  },
  {
    "question": "How does the Piglatin string algorithm work in ICSE board questions?",
    "shortAnswer": "Find the index of the first vowel ('A','E','I','O','U'). Slice the string from that vowel to the end, append the prefix before that vowel, and add 'AY'.",
    "explanation": "If input is 'LONDON', the first vowel 'O' is at index 1. Substring from vowel: 'ONDON', prefix: 'L'. Result = 'ONDON' + 'L' + 'AY' = 'ONDONLAY'. If the word starts with a vowel (e.g., 'APPLE'), first vowel is index 0, so result is 'APPLEAY'.",
    "hint": "Always use .toUpperCase() before scanning to handle lowercase inputs safely.",
    "level": "intermediate",
    "codeExample": "int vIdx = -1;\nfor (int i = 0; i < s.length(); i++) {\n    char c = s.charAt(i);\n    if (\"AEIOU\".indexOf(c) != -1) { vIdx = i; break; }\n}\nString piglatin = s.substring(vIdx) + s.substring(0, vIdx) + \"AY\";"
  },
  {
    "question": "What is an Automorphic number, and how has it appeared in CISCE examinations?",
    "shortAnswer": "An Automorphic number is a number whose square ends in the same digits as the number itself (e.g., 25^2 = 625, 76^2 = 5776).",
    "explanation": "To check, count digits `d` of `num`. Compute divisor `10^d`. If `(square % divisor) == num`, then the number is automorphic. In ICSE 2019, students were asked to check this in a menu-driven program.",
    "hint": "Store square in `long` to avoid integer overflow for larger inputs.",
    "level": "intermediate",
    "codeExample": "long sq = (long) n * n;\nint temp = n, div = 1;\nwhile(temp > 0) { div *= 10; temp /= 10; }\nboolean isAuto = (sq % div) == n;"
  },
  {
    "question": "What is a Special (or Krishnamurthy) Number in ICSE Java?",
    "shortAnswer": "A number where the sum of factorials of its digits equals the original number (e.g., 145 = 1! + 4! + 5! = 1 + 24 + 120 = 145).",
    "explanation": "Use a `while(temp > 0)` loop, extract the last digit with `temp % 10`, compute its factorial with a small inner loop `for(int i=1; i<=digit; i++)`, add to sum, and update `temp /= 10`. Finally check `sum == num`.",
    "hint": "0! is 1, though standard ICSE test cases use positive digits 1-9.",
    "level": "basic",
    "codeExample": "int sum = 0, temp = n;\nwhile(temp > 0) {\n    int d = temp % 10, fact = 1;\n    for(int i = 1; i <= d; i++) fact *= i;\n    sum += fact;\n    temp /= 10;\n}"
  },
  {
    "question": "Why does Bubble Sort use `n - 1 - i` comparisons in the inner loop?",
    "shortAnswer": "Because after each outer pass `i`, the largest `i` elements have already bubbled up to their final correct positions at the end of the array.",
    "explanation": "In pass 0, the largest element reaches index `n-1`. In pass 1, the second largest reaches `n-2`. Comparing already sorted elements is redundant, so `j` only needs to iterate up to `n - 1 - i`.",
    "hint": "Using `n - 1` still works correctly but performs unnecessary redundant comparisons.",
    "level": "intermediate",
    "codeExample": "for (int i = 0; i < n - 1; i++) {\n    for (int j = 0; j < n - 1 - i; j++) {\n        if (arr[j] > arr[j + 1]) {\n            int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;\n        }\n    }\n}"
  },
  {
    "question": "What is the key difference between Bubble Sort and Selection Sort as evaluated in CISCE marking schemes?",
    "shortAnswer": "Bubble Sort repeatedly swaps adjacent out-of-order elements, while Selection Sort searches for the minimum element in the unsorted sub-array and performs only one swap per pass.",
    "explanation": "Examiners strictly look for the selection mechanism: an index pointer `minIdx = i`, an inner loop finding the smaller element, and a single swap outside the inner loop. Confusing the two causes severe mark deduction.",
    "hint": "Selection Sort does at most N-1 swaps total; Bubble Sort can do up to N*(N-1)/2 swaps.",
    "level": "intermediate",
    "codeExample": "// Selection Sort swap happens OUTSIDE inner loop:\nint minIdx = i;\nfor(int j = i + 1; j < n; j++) if(arr[j] < arr[minIdx]) minIdx = j;\nint t = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = t;"
  },
  {
    "question": "How should tariff slab calculations (e.g. Electricity, Water, Taxi) be structured to avoid double-charging?",
    "shortAnswer": "Always calculate cumulative tier differences (e.g., first 100 at tier 1, next 200 at tier 2, remaining above 300 at tier 3), never applying the highest rate to the entire volume.",
    "explanation": "If units = 350: First 100 units = 100 * 2.50 = 250. Next 200 units = 200 * 3.50 = 700. Remaining = (350 - 300) * 4.50 = 225. Total = 250 + 700 + 225 = 1175. Multiplying 350 * 4.50 is the most common student error.",
    "hint": "Sketch a number line with boundaries: 0 --- 100 --- 300 --- units.",
    "level": "basic",
    "codeExample": "if (u <= 100) bill = u * 2.5;\nelse if (u <= 300) bill = (100 * 2.5) + ((u - 100) * 3.5);\nelse bill = (100 * 2.5) + (200 * 3.5) + ((u - 300) * 4.5);"
  },
  {
    "question": "What is a Tech Number, which was introduced in recent ICSE board examinations?",
    "shortAnswer": "A number with an even number of digits where the square of the sum of its two equal halves equals the original number (e.g., 3025: 30 + 25 = 55, 55^2 = 3025).",
    "explanation": "Count digits. If odd, reject. If even, compute `div = 10^(digits/2)`. Split into `first = n / div` and `second = n % div`. If `(first + second)^2 == n`, it is a Tech Number.",
    "hint": "Other examples: 2025 (20+25=45, 45^2=2025), 9801 (98+01=99, 99^2=9801).",
    "level": "advanced",
    "codeExample": "int d = String.valueOf(n).length();\nif (d % 2 == 0) {\n    int div = (int)Math.pow(10, d / 2);\n    int sum = (n / div) + (n % div);\n    if (sum * sum == n) System.out.println(\"Tech Number\");\n}"
  },
  {
    "question": "What is a Disarium Number (ICSE 2020)?",
    "shortAnswer": "A number where the sum of its digits powered to their respective positions equals the number itself (e.g., 135 = 1^1 + 3^2 + 5^3 = 1 + 9 + 125 = 135).",
    "explanation": "Unlike Armstrong number where every digit is raised to the same power (count of digits), in Disarium the powers increase left-to-right from 1 to N.",
    "hint": "Reverse the number or extract digits into an array to raise digits to 1, 2, 3...",
    "level": "advanced",
    "codeExample": "String s = String.valueOf(n);\nint sum = 0;\nfor (int i = 0; i < s.length(); i++) {\n    sum += Math.pow(s.charAt(i) - '0', i + 1);\n}\nboolean isDisarium = (sum == n);"
  },
  {
    "question": "What is an Armstrong number and how does it differ from a Disarium number?",
    "shortAnswer": "In an Armstrong number, the sum of digits raised to the power of the total number of digits equals the original number (e.g., 153 = 1^3 + 5^3 + 3^3 = 153).",
    "explanation": "In Armstrong numbers, every digit is raised to the constant power `D` (number of digits). For 3-digit numbers, `d^3`. In Disarium, powers vary by digit position (1, 2, 3...).",
    "hint": "153, 370, 371, 407 are classic 3-digit Armstrong numbers.",
    "level": "basic",
    "codeExample": "int temp = n, sum = 0, digits = String.valueOf(n).length();\nwhile(temp > 0) {\n    sum += Math.pow(temp % 10, digits);\n    temp /= 10;\n}"
  },
  {
    "question": "In String manipulation, how do you capitalize the first letter of each word (Title Case)?",
    "shortAnswer": "Trim the sentence, add a leading space or split words by spaces, and convert character after each space to uppercase.",
    "explanation": "Two common techniques: 1) Split sentence with `sentence.split(\" \")`, then take `w.substring(0,1).toUpperCase() + w.substring(1).toLowerCase()`. 2) Loop through characters, if character is preceded by a space, uppercase it.",
    "hint": "Remember to handle punctuation and multiple consecutive spaces.",
    "level": "intermediate",
    "codeExample": "String[] words = s.trim().split(\"\\\\s+\");\nfor (String w : words) {\n    System.out.print(Character.toUpperCase(w.charAt(0)) + w.substring(1).toLowerCase() + \" \");\n}"
  },
  {
    "question": "What is a Duck Number?",
    "shortAnswer": "A positive number that contains at least one zero, but does NOT start with zero (e.g., 302, 1020).",
    "explanation": "Leading zeros are discarded by numeric types, but when input as a String or integer, a Duck number has '0' not at the beginning. If String begins with '0' (like '0123'), it is not a duck number.",
    "hint": "503 is a Duck number; 543 is not (no zero); 045 is not (starts with 0).",
    "level": "basic",
    "codeExample": "boolean isDuck = (n > 0 && String.valueOf(n).contains(\"0\"));"
  },
  {
    "question": "What is a Neon Number?",
    "shortAnswer": "A number where the sum of the digits of its square is equal to the number itself (e.g., 9^2 = 81 -> 8 + 1 = 9).",
    "explanation": "Compute square = `n * n`. Extract digits of square using `% 10` and sum them. If `sum == n`, it is a Neon number.",
    "hint": "9 is the only non-trivial single-digit Neon number (besides 0 and 1).",
    "level": "basic",
    "codeExample": "int sq = n * n, sum = 0;\nwhile(sq > 0) { sum += sq % 10; sq /= 10; }\nboolean isNeon = (sum == n);"
  },
  {
    "question": "What is a Spy Number?",
    "shortAnswer": "A number where the sum of its digits equals the product of its digits (e.g., 1124: 1+1+2+4 = 8, 1*1*2*4 = 8).",
    "explanation": "Extract each digit using a `while(temp > 0)` loop. Add to `sum`, multiply with `prod`. Check `sum == prod` at the end.",
    "hint": "123 is also a Spy Number: 1+2+3 = 6, 1*2*3 = 6.",
    "level": "basic",
    "codeExample": "int sum = 0, prod = 1, temp = n;\nwhile(temp > 0) {\n    int d = temp % 10;\n    sum += d; prod *= d;\n    temp /= 10;\n}\nboolean isSpy = (sum == prod);"
  },
  {
    "question": "What is a Palindrome Word and how to check it without using reverse() method?",
    "shortAnswer": "A word that reads the same forwards and backwards (e.g. 'MADAM', 'NITIN', 'LEVEL').",
    "explanation": "Compare characters from both ends: `char at i` vs `char at len - 1 - i` up to `len / 2`. If any pair differs, it is not a palindrome.",
    "hint": "This two-pointer technique runs in O(N/2) time and avoids creating a new reversed string.",
    "level": "basic",
    "codeExample": "boolean isPal = true;\nfor (int i = 0; i < s.length() / 2; i++) {\n    if (s.charAt(i) != s.charAt(s.length() - 1 - i)) { isPal = false; break; }\n}"
  },
  {
    "question": "How does Method Overloading work when parameters differ by number vs type?",
    "shortAnswer": "Overloaded methods must have the same name but distinct parameter lists (different number of parameters, different types, or different order of types).",
    "explanation": "The return type alone cannot be used to overload a method. If two methods have identical names and parameter signatures, the compiler throws 'method already defined' error even if return types differ.",
    "hint": "Signature = Method Name + Parameter Types list.",
    "level": "intermediate",
    "codeExample": "void area(double r) { ... }       // Circle\nvoid area(double l, double b) { ... } // Rectangle\nvoid area(int s) { ... }          // Square"
  },
  {
    "question": "What is Binary Search and what is its mandatory prerequisite?",
    "shortAnswer": "Binary Search is a divide-and-conquer search algorithm with O(log N) complexity. The array MUST be sorted beforehand.",
    "explanation": "Binary search compares the target key with the middle element `mid = (low + high) / 2`. If matching, found. If key is smaller, search left half (`high = mid - 1`). Otherwise search right half (`low = mid + 1`).",
    "hint": "Always mention in your VDT that `low`, `high`, `mid` are indices.",
    "level": "intermediate",
    "codeExample": "int low = 0, high = arr.length - 1;\nwhile(low <= high) {\n    int mid = (low + high) / 2;\n    if (arr[mid] == key) return mid;\n    else if (arr[mid] < key) low = mid + 1;\n    else high = mid - 1;\n}"
  },
  {
    "question": "What is Linear Search and when is it preferred over Binary Search?",
    "shortAnswer": "Linear search checks every element one by one from index 0 to N-1. It is preferred when the array is unsorted or small.",
    "explanation": "Linear search has O(N) complexity. It requires no sorting, works on any collection, and stops immediately upon finding the first match.",
    "hint": "Use a boolean flag `boolean found = false;` to track if match occurred.",
    "level": "basic",
    "codeExample": "for (int i = 0; i < arr.length; i++) {\n    if (arr[i] == key) { found = true; pos = i; break; }\n}"
  },
  {
    "question": "How are 2D Arrays traversed for Principal vs Secondary diagonals?",
    "shortAnswer": "For an N × N matrix: Principal (Left) diagonal elements satisfy `i == j`. Secondary (Right) diagonal elements satisfy `i + j == N - 1`.",
    "explanation": "Both diagonals can be traversed in a single loop `for(int i=0; i<N; i++)`: left diagonal is `mat[i][i]`, right diagonal is `mat[i][N - 1 - i]`. This avoids an O(N^2) nested loop.",
    "hint": "For a 4x4 matrix, secondary diagonal indices are: [0][3], [1][2], [2][1], [3][0].",
    "level": "intermediate",
    "codeExample": "int leftSum = 0, rightSum = 0;\nfor (int i = 0; i < N; i++) {\n    leftSum += mat[i][i];\n    rightSum += mat[i][N - 1 - i];\n}"
  },
  {
    "question": "What is a Symmetric Matrix and how to verify it?",
    "shortAnswer": "A square matrix where the element at row `i`, column `j` equals the element at row `j`, column `i` for all elements (A = A^T).",
    "explanation": "Check `mat[i][j] == mat[j][i]` for all `i` and `j`. If any pair doesn't match, set flag to false and break. Only elements where `j > i` need checking.",
    "hint": "Diagonal elements `mat[i][i]` are always equal to themselves.",
    "level": "advanced",
    "codeExample": "boolean sym = true;\nfor (int i = 0; i < N; i++) {\n    for (int j = i + 1; j < N; j++) {\n        if (mat[i][j] != mat[j][i]) { sym = false; break; }\n    }\n    if(!sym) break;\n}"
  },
  {
    "question": "Why should `sc.nextLine()` be called after `sc.nextInt()` when reading strings?",
    "shortAnswer": "`sc.nextInt()` only reads the numeric token and leaves the newline character `\\n` in the buffer. The subsequent `sc.nextLine()` immediately consumes this newline and returns an empty string.",
    "explanation": "Adding a dummy `sc.nextLine();` right after `nextInt()` or `nextDouble()` clears the trailing carriage return from the input buffer so the actual text input can be read properly.",
    "hint": "This is one of the most common student bugs in Class Design questions.",
    "level": "intermediate",
    "codeExample": "int age = sc.nextInt();\nsc.nextLine(); // Flush buffer\nString name = sc.nextLine();"
  },
  {
    "question": "What is the return type and behavior of `compareTo()` when strings match partially?",
    "shortAnswer": "If one string is a prefix of another, `compareTo()` returns `this.length() - another.length()`. Otherwise it returns the difference between the first non-matching characters.",
    "explanation": "\"CAT\".compareTo(\"CATERPILLAR\") returns `3 - 11 = -8`. \"BAT\".compareTo(\"CAT\") returns `'B' - 'C' = 66 - 67 = -1`.",
    "hint": "0 indicates both strings are identical in character content and length.",
    "level": "advanced",
    "codeExample": "int diff = \"APPLE\".compareTo(\"APP\"); // returns 5 - 3 = 2"
  },
  {
    "question": "What is the difference between `Math.round()`, `Math.floor()`, and `Math.ceil()` for negative numbers?",
    "shortAnswer": "`floor()` rounds down (towards -infinity), `ceil()` rounds up (towards +infinity), and `round()` adds 0.5 and floors to long/int.",
    "explanation": "For -4.3: floor(-4.3) is -5.0, ceil(-4.3) is -4.0, round(-4.3) is -4. For -4.8: floor is -5.0, ceil is -4.0, round is -5.",
    "hint": "Remember: 'Floor' goes down into the basement; 'Ceiling' goes up towards the roof.",
    "level": "intermediate",
    "codeExample": "Math.floor(-3.2) -> -4.0\nMath.ceil(-3.2)  -> -3.0\nMath.round(-3.2) -> -3"
  },
  {
    "question": "What is a Pure Method vs an Impure Method?",
    "shortAnswer": "A Pure method (accessor) returns a calculated value without modifying the state of the object or actual arguments. An Impure method (mutator) alters the state of the object or parameters.",
    "explanation": "Example of pure: `int getArea() { return length * breadth; }`. Example of impure: `void setLength(int l) { length = l; }` or array modifying methods.",
    "hint": "Pure functions have no side-effects.",
    "level": "intermediate",
    "codeExample": "// Pure:\nint square(int x) { return x * x; }\n// Impure:\nvoid modify(int[] a) { a[0] = 99; }"
  },
  {
    "question": "How are marks distributed in a 15-mark Section B question in ICSE Board Examinations?",
    "shortAnswer": "Class & Variable declaration: 3 marks, Algorithm Logic & Syntax: 7 marks, Proper Display & formatting: 2 marks, Variable Description Table (VDT) & comments: 3 marks.",
    "explanation": "A student who writes working code without a Variable Description Table loses 3 full marks immediately! Always budget 3 minutes at the end of every program to draw the VDT.",
    "hint": "VDT columns: Variable Name | Data Type | Purpose.",
    "level": "basic",
    "codeExample": "// Mandatory VDT format:\n// Variable Name | Data Type | Purpose"
  }
];

export default questions;
