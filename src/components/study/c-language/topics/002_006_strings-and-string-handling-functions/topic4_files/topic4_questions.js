const questions = [
  {
    question: "What are the two primary ways to represent a collection/array of strings in C?",
    shortAnswer: "1. 2D character array `char arr[M][N]`, and 2. Array of character pointers `char *arr[M]`.",
    explanation: "2D char arrays allocate fixed contiguous memory blocks; array of pointers stores memory addresses to variable-length strings.",
    hint: "2D char array vs Array of char pointers.",
    level: "basic"
  },
  {
    question: "What is the memory wastage drawback of using a 2D character array `char names[100][50]`?",
    shortAnswer: "Internal Fragmentation: Short strings waste unused trailing bytes in each 50-byte row slot.",
    explanation: "If a name is 'Roy' (4 bytes with `\\0`), 46 bytes in that row remain allocated and completely unused.",
    hint: "Fixed row size leads to internal memory fragmentation.",
    level: "intermediate"
  },
  {
    question: "What is a 'Ragged Array' (or Jagged Array) of strings in C?",
    shortAnswer: "An array of pointers `const char *arr[]` where each pointer points to a string of exact variable length.",
    explanation: "Saves memory by only allocating the exact number of bytes each string requires without fixed column padding.",
    hint: "Array of pointers pointing to variable-length strings.",
    level: "intermediate"
  },
  {
    question: "Why is sorting an array of string pointers `char *arr[]` significantly faster than sorting a 2D array `char arr[][50]`?",
    shortAnswer: "Sorting pointers swaps only 8-byte pointer addresses, whereas 2D arrays copy entire 50-byte string buffers.",
    explanation: "Swapping 8 bytes takes O(1) CPU instructions, whereas copying long strings using `strcpy()` requires O(N) memory moves.",
    hint: "Pointer swapping vs Buffer copying.",
    level: "advanced"
  },
  {
    question: "How do you access the 3rd character of the 2nd string in `char names[5][20]`?",
    shortAnswer: "`names[1][2]`.",
    explanation: "Zero-based indexing: 2nd string is row 1, 3rd character is column 2.",
    hint: "Row index 1, Col index 2.",
    level: "basic"
  },
  {
    question: "How do you pass a 2D array of strings to a function?",
    shortAnswer: "`void process(char names[][MAX_LEN], int count);`",
    explanation: "The second dimension `MAX_LEN` is mandatory so the compiler can compute row offsets.",
    hint: "Must specify column width MAX_LEN.",
    level: "basic"
  },
  {
    question: "How do you pass an array of string pointers to a function?",
    shortAnswer: "`void process(const char *names[], int count);` or `void process(const char **names, int count);`.",
    explanation: "An array of pointers decays into a double pointer (`char**`).",
    hint: "char *names[] or char **names.",
    level: "basic"
  },
  {
    question: "How do you perform a linear search for a target name in an array of strings in C?",
    shortAnswer: "Loop through strings and compare each using `strcmp(names[i], target) == 0`.",
    explanation: "If `strcmp` returns 0, the target string is found at index i.",
    hint: "strcmp inside loop.",
    level: "basic"
  },
  {
    question: "How do you perform Binary Search on a sorted array of strings?",
    shortAnswer: "Use standard binary search with `int cmp = strcmp(arr[mid], target);`.",
    explanation: "If `cmp == 0`, match found; if `cmp < 0`, `low = mid + 1`; if `cmp > 0`, `high = mid - 1`.",
    hint: "Binary search driven by strcmp.",
    level: "intermediate"
  },
  {
    question: "How do you sort an array of strings using `qsort()` from `<stdlib.h>`?",
    shortAnswer: "Pass a comparator that casts `const void *` to `const char **` and calls `strcmp` on dereferenced pointers.",
    explanation: "`qsort` passes pointers to the array elements. For `char *arr[]`, elements are `char*`, so comparator receives `char**`.",
    hint: "Cast to (const char**) in comparator.",
    level: "advanced",
    codeExample: "int cmpStrings(const void *a, const void *b) {\n    return strcmp(*(const char**)a, *(const char**)b);\n}"
  },
  {
    question: "What is the memory size of `char *cities[5]` on a 64-bit operating system?",
    options: ["5 bytes", "40 bytes (5 pointers * 8 bytes)", "20 bytes", "100 bytes"],
    correctAnswer: 1,
    explanation: "Each pointer occupies 8 bytes on a 64-bit architecture: 5 * 8 = 40 bytes (excluding the strings pointed to)."
  },
  {
    question: "What is command line arguments `char *argv[]` in `main(int argc, char *argv[])`?",
    shortAnswer: "An array of character pointers (array of strings) passed from the terminal to the program.",
    explanation: "`argv[0]` holds the program name, and `argv[1]` through `argv[argc - 1]` hold terminal arguments.",
    hint: "Terminal arguments array of string pointers.",
    level: "intermediate"
  },
  {
    question: "What will happen if you attempt to modify `cities[0][0] = 'K'` when `cities` is declared as `char *cities[] = {\"Barrackpore\"};`?",
    shortAnswer: "Runtime Segmentation Fault because \"Barrackpore\" is a string literal in read-only `.rodata` memory.",
    explanation: "Array of char pointers pointing to literals cannot be mutated.",
    hint: "Points to read-only string literal.",
    level: "intermediate"
  },
  {
    question: "How do you dynamically allocate a 2D array of strings of custom dimensions at runtime?",
    shortAnswer: "Allocate an array of `char*` via `malloc(rows * sizeof(char*))`, then allocate each row with `malloc(cols * sizeof(char))`.",
    explanation: "Creates a fully dynamic, heap-allocated matrix of strings.",
    hint: "Two-stage malloc allocation.",
    level: "advanced"
  },
  {
    question: "How do you deallocate a dynamically allocated 2D array of strings?",
    shortAnswer: "Free each individual row first in a loop, then free the master pointer array.",
    explanation: "Freeing the master array first loses references to row buffers, causing severe memory leaks.",
    hint: "Free inner rows first, then free outer pointer array.",
    level: "advanced"
  },
  {
    question: "How do you find the longest string in an array of strings in C?",
    shortAnswer: "Iterate through the array, compute `strlen(arr[i])`, and track the index with maximum length.",
    explanation: "Linear scan in O(total characters) time.",
    hint: "Track max strlen index.",
    level: "basic"
  },
  {
    question: "How do you convert all strings in an array of strings to uppercase?",
    shortAnswer: "Nested loop: outer loop selects string `arr[i]`, inner loop converts characters `arr[i][j]` using ASCII offset.",
    explanation: "Applicable to mutable 2D char arrays or heap-allocated strings.",
    hint: "Nested string and character loop.",
    level: "basic"
  },
  {
    question: "What does `argc` represent in `int main(int argc, char *argv[])`?",
    shortAnswer: "Argument Count: The total number of command-line arguments passed (including program executable name).",
    explanation: "`argc` is always >= 1.",
    hint: "Total number of arguments in argv.",
    level: "basic"
  },
  {
    question: "What is guaranteed about `argv[argc]` in the ISO C standard?",
    shortAnswer: "`argv[argc]` is guaranteed to be a `NULL` pointer sentinel.",
    explanation: "Allows looping through arguments using `for (char **p = argv; *p != NULL; p++)`.",
    hint: "argv[argc] is always NULL.",
    level: "intermediate"
  },
  {
    question: "How do you sort an array of strings in descending alphabetical order?",
    shortAnswer: "In the sorting condition, swap when `strcmp(s1, s2) < 0` instead of `> 0`.",
    explanation: "Inverts the comparison to order Z to A.",
    hint: "strcmp < 0 for descending order.",
    level: "basic"
  },
  {
    question: "Why can't you initialize a 2D char array with `char names[2][10] = {\"VeryLongCityNameHere\"};`?",
    shortAnswer: "The string exceeds the 10-byte column capacity, causing compiler warnings or dropped null terminators.",
    explanation: "Always ensure column width exceeds maximum string length + 1.",
    hint: "Exceeds column width bound.",
    level: "basic"
  },
  {
    question: "How do you read N full-line strings with spaces from the user into a 2D array?",
    shortAnswer: "Using a loop with `fgets(names[i], sizeof(names[i]), stdin);` and trimming `\\n`.",
    explanation: "Safely bounds each line to the maximum column width.",
    hint: "fgets inside loop.",
    level: "basic"
  },
  {
    question: "What is the memory advantage of using `char *menu[] = {\"File\", \"Edit\", \"View\", \"Help\"};` for UI menus?",
    shortAnswer: "Zero wasted space. Each menu label uses only its exact string length in ROM/Flash memory.",
    explanation: "Fixed 2D array `char[4][20]` would waste 60+ bytes of memory.",
    hint: "Tight memory footprint in firmware/embedded systems.",
    level: "intermediate"
  },
  {
    question: "What happens if you pass `char names[5][20]` to a function expecting `char **names`?",
    shortAnswer: "Compiler type mismatch warning and runtime crash when dereferenced.",
    explanation: "A contiguous 2D array `names[5][20]` is NOT an array of pointers in memory; it is a flat 100-byte buffer.",
    hint: "Contiguous 2D grid != array of pointer addresses.",
    level: "advanced"
  },
  {
    question: "How do you copy a 2D array of strings to another 2D array?",
    shortAnswer: "Loop through rows and call `strcpy(dest[i], src[i]);` or copy entire block with `memcpy(dest, src, sizeof(dest));`.",
    explanation: "`memcpy` is fastest because 2D arrays reside contiguously in memory.",
    hint: "Row-by-row strcpy or single memcpy.",
    level: "basic"
  }
];

export default questions;
