const questions = [
    {
        question: "What is the default value of elements in an int array in Java?",
        shortAnswer: "0",
        explanation: "When you create an array of primitive type int, all elements are initialized to 0 by default. For double it's 0.0, boolean it's false, and for reference types (like String) it's null.",
        hint: "Think about default values of class fields.",
        level: "basic",
        codeExample: "int[] arr = new int[5]; // all elements are 0"
    },
    {
        question: "Can we change the size of an array after it is created?",
        shortAnswer: "No",
        explanation: "Arrays in Java are fixed-size. Once created, the length cannot be changed. To have a growable structure, use ArrayList.",
        hint: "Array length is immutable.",
        level: "basic",
        codeExample: "int[] arr = new int[5]; // arr.length is always 5"
    },
    {
        question: "What is the difference between int[] arr and int arr[]?",
        shortAnswer: "No functional difference, only style preference.",
        explanation: "Both are valid syntax for declaring an array. int[] arr is preferred for clarity, as it emphasizes that 'arr' is an array of ints.",
        hint: "The brackets can be placed with type or variable name.",
        level: "basic",
        codeExample: "int[] arr1; int arr2[]; // both are valid"
    },
    {
        question: "How do you get the length of a 2D array?",
        shortAnswer: "array.length gives number of rows, array[0].length gives number of columns (if rectangular).",
        explanation: "For a 2D array (matrix), array.length returns the number of rows. To get the number of columns, use array[0].length, assuming all rows have the same length (rectangular matrix).",
        hint: "Think of a 2D array as an array of arrays.",
        level: "intermediate",
        codeExample: "int[][] matrix = new int[3][4]; int rows = matrix.length; // 3, int cols = matrix[0].length; // 4"
    },
    {
        question: "What is a jagged array in Java?",
        shortAnswer: "A 2D array where rows can have different lengths.",
        explanation: "In Java, a 2D array is an array of arrays, so each row can be a different length. This is called a jagged or ragged array.",
        hint: "Not all matrices are rectangular.",
        level: "intermediate",
        codeExample: "int[][] jagged = new int[3][]; jagged[0] = new int[2]; jagged[1] = new int[4]; jagged[2] = new int[1];"
    },
    {
        question: "How is a 2D array stored in memory in Java?",
        shortAnswer: "As an array of references to 1D arrays.",
        explanation: "In Java, a 2D array is actually a 1D array where each element is a reference to another 1D array. This allows jagged arrays but may have cache performance implications compared to C/C++ row-major storage.",
        hint: "Array of arrays.",
        level: "expert",
        codeExample: "int[][] arr = new int[2][3]; // arr[0] and arr[1] point to separate int[3] arrays"
    },
    {
        question: "What is ArrayIndexOutOfBoundsException?",
        shortAnswer: "Exception thrown when accessing an index outside the valid range (0 to length-1).",
        explanation: "Arrays are zero-indexed. Trying to access a negative index or an index >= length causes this runtime exception.",
        hint: "Check loop conditions.",
        level: "basic",
        codeExample: "int[] arr = new int[5]; arr[5] = 10; // throws exception"
    },
    {
        question: "How do you copy an array in Java?",
        shortAnswer: "Using System.arraycopy(), Arrays.copyOf(), or clone().",
        explanation: "Direct assignment (arr2 = arr1) only copies the reference, not the elements. To copy contents, use built-in methods or a loop.",
        hint: "Shallow copy vs deep copy.",
        level: "intermediate",
        codeExample: "int[] original = {1,2,3}; int[] copy = Arrays.copyOf(original, original.length);"
    },
    {
        question: "What is the time complexity of accessing an element in an array by index?",
        shortAnswer: "O(1) - constant time.",
        explanation: "Array elements are stored in contiguous memory, so the address of any element can be calculated directly using the base address and index.",
        hint: "Random access property.",
        level: "basic",
        codeExample: "int x = arr[100]; // instantaneous regardless of array size"
    },
    {
        question: "Can an array store both integers and strings?",
        shortAnswer: "No, arrays are homogeneous.",
        explanation: "In Java, arrays are typed. An int[] can only store ints, a String[] only strings. To store mixed types, use Object[] or a collection.",
        hint: "Type safety.",
        level: "intermediate",
        codeExample: "Object[] mixed = {1, \"hello\", 3.14}; // allowed but not type-safe"
    },
    {
        question: "What happens when you print an array directly using System.out.println(arr)?",
        shortAnswer: "It prints a cryptic string with the array's type and hashcode.",
        explanation: "Arrays don't override toString(), so the default Object.toString() is used. Use Arrays.toString() for 1D or Arrays.deepToString() for 2D.",
        hint: "Use utility methods.",
        level: "basic",
        codeExample: "System.out.println(Arrays.toString(arr));"
    },
    {
        question: "What is the 'enhanced for loop' and how does it work with arrays?",
        shortAnswer: "A simplified loop syntax for iterating over arrays/collections without using an index.",
        explanation: "Enhanced for loop (for-each) iterates through each element automatically. It cannot modify the array and doesn't provide index access.",
        hint: "Read-only iteration.",
        level: "basic",
        codeExample: "for (int num : arr) { System.out.println(num); }"
    },
    {
        question: "How do you initialize a 2D array with specific values without a loop?",
        shortAnswer: "Using an array initializer with nested braces.",
        explanation: "You can provide values row by row inside curly braces. The compiler infers dimensions from the pattern.",
        hint: "Static initialization.",
        level: "intermediate",
        codeExample: "int[][] matrix = {{1,2},{3,4},{5,6}};"
    },
    {
        question: "What is the difference between array.length and String.length()?",
        shortAnswer: "length is a property for arrays, length() is a method for Strings.",
        explanation: "Arrays have a public final field 'length'. Strings have a method 'length()' that returns the number of characters.",
        hint: "One is field, one is method.",
        level: "basic",
        codeExample: "int[] arr = new int[3]; int len = arr.length; String s = \"hi\"; int l = s.length();"
    },
    {
        question: "How does Java handle multidimensional arrays differently from languages like C?",
        shortAnswer: "Java uses array-of-arrays (not a single contiguous block).",
        explanation: "In C, a 2D array is a single contiguous block. In Java, each row is a separate object, allowing jagged arrays but with potential overhead.",
        hint: "Memory layout implications.",
        level: "expert",
        codeExample: "int[][] arr = new int[2][3]; // arr[0] and arr[1] are separate objects"
    },
    {
        question: "What is an anonymous array in Java?",
        shortAnswer: "An array created without assigning it to a variable, used directly as an argument.",
        explanation: "You can create an array on the fly using 'new int[]{1,2,3}' and pass it to a method. No variable name is needed.",
        hint: "Inline array creation.",
        level: "intermediate",
        codeExample: "printArray(new int[]{10,20,30});"
    },
    {
        question: "How do you return an array from a method?",
        shortAnswer: "Specify the array type as the return type and return the array reference.",
        explanation: "Methods can return arrays just like any other object. The returned array can be assigned to an array variable.",
        hint: "Arrays are objects.",
        level: "basic",
        codeExample: "public int[] getNumbers() { return new int[]{1,2,3}; }"
    },
    {
        question: "What is the performance implication of accessing a 2D array row-wise vs column-wise?",
        shortAnswer: "Row-wise access is faster due to spatial locality and caching.",
        explanation: "Since Java stores 2D arrays as arrays of arrays, accessing elements in row-major order (row by row) accesses contiguous memory, reducing cache misses. Column-wise access jumps between rows and is slower.",
        hint: "Cache friendliness.",
        level: "expert",
        codeExample: "// Row-wise (fast): for (int i=0; i<rows; i++) for (int j=0; j<cols; j++) sum += matrix[i][j];"
    },
    {
        question: "Can we create an array with size 0 in Java?",
        shortAnswer: "Yes, an array of length 0 is valid.",
        explanation: "You can create an array with zero elements (e.g., new int[0]). It's not null and can be used safely in loops (will iterate zero times).",
        hint: "Empty array is different from null.",
        level: "intermediate",
        codeExample: "int[] empty = new int[0]; System.out.println(empty.length); // 0"
    },
    {
        question: "What is the 'ArrayStoreException'?",
        shortAnswer: "Exception thrown when storing an incompatible type into an array.",
        explanation: "If you have an array of a supertype but try to store a subtype that doesn't fit the actual runtime component type, this exception occurs.",
        hint: "Array type checking at runtime.",
        level: "expert",
        codeExample: "String[] strings = new String[2]; Object[] objects = strings; objects[0] = 123; // ArrayStoreException"
    },
    {
        question: "How do you sort an array in Java?",
        shortAnswer: "Using Arrays.sort() method.",
        explanation: "The Arrays utility class provides sort() for primitive and object arrays. For primitives, it uses Dual-Pivot Quicksort; for objects, Timsort.",
        hint: "Utility method.",
        level: "basic",
        codeExample: "int[] arr = {3,1,4,2}; Arrays.sort(arr); // arr becomes [1,2,3,4]"
    },
    {
        question: "What is the difference between deep copy and shallow copy for 2D arrays?",
        shortAnswer: "Shallow copy copies only the row references; deep copy copies each row's elements.",
        explanation: "clone() on a 2D array creates a shallow copy (new outer array but rows are shared). To deep copy, you must copy each row individually.",
        hint: "Shared vs independent inner arrays.",
        level: "expert",
        codeExample: "int[][] shallow = original.clone(); // rows still reference same inner arrays"
    },
    {
        question: "How does the JVM represent an array object in memory?",
        shortAnswer: "Header + length field + contiguous element data (for primitive arrays).",
        explanation: "Array objects have an object header (mark word, class pointer), a length field, and then the elements stored consecutively. For reference arrays, elements are references.",
        hint: "Heap layout.",
        level: "expert",
        codeExample: "Not directly visible in Java, but important for performance understanding."
    },
    {
        question: "What is the maximum size of an array in Java?",
        shortAnswer: "Integer.MAX_VALUE - 5 (approximately 2^31 - 1) depending on JVM.",
        explanation: "Array indices are ints, so max length is Integer.MAX_VALUE. However, practical limits are lower due to heap memory constraints and JVM implementation specifics.",
        hint: "Index type limitation.",
        level: "expert",
        codeExample: "int[] huge = new int[Integer.MAX_VALUE]; // may cause OutOfMemoryError"
    },
    {
        question: "Can we have an array of generics in Java?",
        shortAnswer: "No, you cannot create arrays of generic types directly due to type erasure.",
        explanation: "Generic array creation (new T[10]) is not allowed because the runtime cannot verify type safety. Use ArrayList<T> instead.",
        hint: "Type erasure limitation.",
        level: "expert",
        codeExample: "List<String>[] listArray = new List<String>[10]; // compile error"
    },
    {
        question: "What is the 'varargs' feature and how does it relate to arrays?",
        shortAnswer: "Varargs (variable arguments) allow methods to accept zero or more arguments, which are internally treated as an array.",
        explanation: "When you declare a parameter as 'String... strings', it can be called with any number of String arguments, and inside the method, 'strings' is a String[].",
        hint: "Syntactic sugar for arrays.",
        level: "intermediate",
        codeExample: "public void printAll(String... names) { for (String n : names) System.out.println(n); }"
    },
    {
        question: "How do you convert an array to a List and vice versa?",
        shortAnswer: "Arrays.asList() and List.toArray().",
        explanation: "Arrays.asList() returns a fixed-size list backed by the array. List.toArray() returns an array containing list elements.",
        hint: "Conversion utilities.",
        level: "intermediate",
        codeExample: "List<String> list = Arrays.asList(\"a\",\"b\"); String[] arr = list.toArray(new String[0]);"
    },
    {
        question: "What is the performance cost of using a 2D array vs a flattened 1D array?",
        shortAnswer: "Flattened 1D array can be faster due to single memory allocation and better cache locality.",
        explanation: "A flattened 1D array (index = row * cols + col) uses one contiguous block, reducing overhead of multiple objects and improving cache behavior. However, readability may suffer.",
        hint: "Manual index calculation.",
        level: "expert",
        codeExample: "int[] flat = new int[rows*cols]; int value = flat[row*cols + col];"
    },
    {
        question: "How do you fill an array with a specific value?",
        shortAnswer: "Using Arrays.fill() method.",
        explanation: "Arrays.fill(array, value) assigns the given value to every element of the array. For 2D arrays, you need to fill each row separately.",
        hint: "Utility method for initialization.",
        level: "basic",
        codeExample: "int[] arr = new int[5]; Arrays.fill(arr, 10); // all elements become 10"
    }
];

export default questions;