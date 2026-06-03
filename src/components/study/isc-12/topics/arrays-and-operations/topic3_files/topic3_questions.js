const questions = [
    {
        question: "What is the time complexity of linear search?",
        shortAnswer: "O(n) worst case, O(1) best case.",
        explanation: "In the worst case, you examine every element. In the best case, the target is at the first position.",
        hint: "Linear time.",
        level: "basic",
        codeExample: "// n elements, up to n comparisons"
    },
    {
        question: "What is the time complexity of binary search?",
        shortAnswer: "O(log n).",
        explanation: "Each step halves the search space, so the number of steps is log₂(n). For 1 million elements, only ~20 steps.",
        hint: "Logarithmic time.",
        level: "basic",
        codeExample: "// log₂(1,000,000) ≈ 20"
    },
    {
        question: "What is the prerequisite for binary search?",
        shortAnswer: "The array must be sorted.",
        explanation: "Binary search relies on the property that all elements in the left half are smaller than the middle and all in the right half are larger.",
        hint: "Sorted order is mandatory.",
        level: "basic",
        codeExample: "Arrays.sort(arr); // before binary search"
    },
    {
        question: "What happens if you apply binary search to an unsorted array?",
        shortAnswer: "The result is incorrect (may return -1 even if element exists).",
        explanation: "Binary search assumes sorted order. If the array is unsorted, the mid comparison is meaningless, and the algorithm will fail.",
        hint: "Garbage in, garbage out.",
        level: "intermediate",
        codeExample: "// Returns wrong index or -1"
    },
    {
        question: "What is the space complexity of iterative binary search?",
        shortAnswer: "O(1).",
        explanation: "Only a few integer variables (low, high, mid) are used, regardless of array size.",
        hint: "Constant extra space.",
        level: "basic",
        codeExample: "// No recursion, no extra arrays"
    },
    {
        question: "What is the space complexity of recursive binary search?",
        shortAnswer: "O(log n) due to call stack.",
        explanation: "Each recursive call adds a frame to the stack. With log n depth, space is O(log n).",
        hint: "Stack depth.",
        level: "intermediate",
        codeExample: "// Recursion uses memory for each call"
    },
    {
        question: "How do you prevent integer overflow when calculating mid?",
        shortAnswer: "Use low + (high - low) / 2 instead of (low + high) / 2.",
        explanation: "For large arrays, low + high may exceed Integer.MAX_VALUE. The alternative expression avoids overflow.",
        hint: "Safe mid calculation.",
        level: "expert",
        codeExample: "int mid = low + (high - low) / 2;"
    },
    {
        question: "When is linear search preferred over binary search?",
        shortAnswer: "For small arrays, unsorted data, or when the array changes frequently.",
        explanation: "Sorting has O(n log n) cost. If you search only once, linear search on unsorted data (O(n)) may be cheaper than sorting + binary search.",
        hint: "One-time search on unsorted data.",
        level: "intermediate",
        codeExample: "// Linear search: O(n); Sorting + binary: O(n log n + log n)"
    },
    {
        question: "Can binary search be used on a linked list?",
        shortAnswer: "Not efficiently, because random access is O(n).",
        explanation: "Binary search requires O(1) access to the middle element. Linked lists require traversal to reach the middle, making binary search O(n log n) – worse than linear.",
        hint: "No random access.",
        level: "expert",
        codeExample: "// Use linear search or convert to array"
    },
    {
        question: "What does Java's Arrays.binarySearch() return if the element is not found?",
        shortAnswer: "-(insertion point) - 1.",
        explanation: "The insertion point is the index where the element would be inserted to maintain sorted order. The negative value indicates not found and provides insertion position.",
        hint: "Negative return value.",
        level: "intermediate",
        codeExample: "int idx = Arrays.binarySearch(arr, 5); if (idx < 0) { int insertPos = -idx - 1; }"
    },
    {
        question: "How do you find the first occurrence of a duplicate using binary search?",
        shortAnswer: "Modify binary search to continue searching left even after finding the target.",
        explanation: "When you find the target, don't return immediately; store the index and set high = mid - 1 to search for an earlier occurrence.",
        hint: "Leftmost binary search.",
        level: "expert",
        codeExample: "if (arr[mid] == target) { result = mid; high = mid - 1; }"
    },
    {
        question: "What is the best case for linear search?",
        shortAnswer: "O(1) – target is the first element.",
        explanation: "If the target is at index 0, the search terminates after one comparison.",
        hint: "Best case: first element.",
        level: "basic",
        codeExample: "// arr[0] == target"
    },
    {
        question: "What is the worst case for binary search?",
        shortAnswer: "O(log n) – target is not present or at the last comparison.",
        explanation: "Binary search always takes about log₂(n) steps in the worst case, regardless of where the target is (or if absent).",
        hint: "Always logarithmic.",
        level: "basic",
        codeExample: "// Even if not found, log n steps"
    },
    {
        question: "Can you use binary search on an array of strings?",
        shortAnswer: "Yes, if the array is sorted lexicographically.",
        explanation: "Strings implement Comparable, so you can use compareTo() to check ordering. Java's Arrays.binarySearch() works with any Comparable type.",
        hint: "Alphabetical order.",
        level: "intermediate",
        codeExample: "String[] words = {\"apple\", \"banana\", \"cherry\"}; int idx = Arrays.binarySearch(words, \"banana\");"
    },
    {
        question: "What is the difference between linear search and binary search in terms of stability?",
        shortAnswer: "Linear search naturally finds the first occurrence; binary search may return any occurrence.",
        explanation: "Linear search scans from left, so it always returns the smallest index. Standard binary search stops at the first match found, which may not be the leftmost.",
        hint: "First vs any occurrence.",
        level: "intermediate",
        codeExample: "// Use modified binary search for first/last"
    },
    {
        question: "How many comparisons does binary search need for an array of 1,000,000 elements?",
        shortAnswer: "At most 20 comparisons (log₂(1,000,000) ≈ 20).",
        explanation: "Each comparison halves the search space. After 20 steps, the range reduces to about 1 element.",
        hint: "Logarithmic growth.",
        level: "basic",
        codeExample: "// 2^20 = 1,048,576"
    },
    {
        question: "What is the 'ternary search' and how does it compare to binary search?",
        shortAnswer: "Ternary search divides into three parts; it's O(log₃ n) but with more comparisons per step, often slower in practice.",
        explanation: "Ternary search does 2 comparisons per step vs binary search's 1, making it less efficient despite the smaller base.",
        hint: "Not better than binary.",
        level: "expert",
        codeExample: "// Binary search is generally preferred"
    },
    {
        question: "Can binary search be used on a rotated sorted array?",
        shortAnswer: "Yes, with modifications (e.g., search in rotated sorted array).",
        explanation: "You can find the pivot and then apply binary search, or use a modified binary search that checks which half is sorted.",
        hint: "Advanced variant.",
        level: "expert",
        codeExample: "// Check if left half is sorted, then decide"
    },
    {
        question: "What is the 'exponential search' and when is it used?",
        shortAnswer: "Exponential search finds range then binary search; used for unbounded or infinite arrays.",
        explanation: "First, find a range where the target might be by doubling the index, then binary search within that range.",
        hint: "For arrays with unknown size.",
        level: "expert",
        codeExample: "// Used in unbounded binary search"
    },
    {
        question: "What is the worst-case input for linear search?",
        shortAnswer: "Target is the last element or not present.",
        explanation: "You must examine all n elements, resulting in O(n) comparisons.",
        hint: "Full scan.",
        level: "basic",
        codeExample: "// Target at index n-1 or not in array"
    },
    {
        question: "How do you search for a target in a 2D array where rows and columns are sorted?",
        shortAnswer: "Use a modified binary search (e.g., start from top-right corner).",
        explanation: "Start from the top-right element. If target is smaller, move left; if larger, move down. This is O(m+n).",
        hint: "2D binary search.",
        level: "expert",
        codeExample: "int row = 0, col = matrix[0].length-1; while (row < rows && col >= 0) { ... }"
    },
    {
        question: "What is the 'interpolation search'?",
        shortAnswer: "An improved binary search for uniformly distributed data; estimates position using formula.",
        explanation: "Instead of always going to the middle, it predicts the position based on the values. Best-case O(log log n), worst-case O(n).",
        hint: "Heuristic position.",
        level: "expert",
        codeExample: "// pos = low + ((target - arr[low]) * (high - low) / (arr[high] - arr[low]))"
    },
    {
        question: "Why is binary search not used for small arrays?",
        shortAnswer: "Linear search has less overhead and may be faster due to cache locality.",
        explanation: "For n < 50-100, the constant factors of binary search (branching, calculations) can outweigh the logarithmic advantage.",
        hint: "Overhead matters.",
        level: "intermediate",
        codeExample: "// Linear search can be faster for tiny arrays"
    },
    {
        question: "What is the 'binary search tree'? Is it the same as binary search?",
        shortAnswer: "No, BST is a data structure that supports binary search-like operations, but binary search is an algorithm for arrays.",
        explanation: "Binary search works on sorted arrays. Binary search trees are hierarchical structures that also achieve O(log n) search but allow dynamic insertion/deletion.",
        hint: "Array vs tree.",
        level: "intermediate",
        codeExample: "// Different concepts"
    },
    {
        question: "How do you implement binary search on an array in descending order?",
        shortAnswer: "Reverse the comparison logic.",
        explanation: "If the array is sorted descending, check if arr[mid] > target to decide to go left or right.",
        hint: "Adjust the condition.",
        level: "intermediate",
        codeExample: "if (arr[mid] == target) return mid; else if (arr[mid] > target) low = mid + 1; else high = mid - 1;"
    },
    {
        question: "What is the 'find the square root' problem using binary search?",
        shortAnswer: "Use binary search on the range [0, x] to find integer sqrt.",
        explanation: "Treat it as a search problem: find the largest integer n such that n*n <= x.",
        hint: "Binary search on answer.",
        level: "intermediate",
        codeExample: "long low=0, high=x, ans=0; while (low<=high) { long mid = low+(high-low)/2; if (mid*mid <= x) { ans=mid; low=mid+1; } else high=mid-1; }"
    },
    {
        question: "What is the 'lower bound' and 'upper bound' in binary search?",
        shortAnswer: "Lower bound: first index where arr[i] >= target; upper bound: first index where arr[i] > target.",
        explanation: "These are standard functions in C++ and can be implemented in Java. They are useful for range queries.",
        hint: "First not less than, first greater than.",
        level: "expert",
        codeExample: "// lowerBound returns insertion point for target"
    },
    {
        question: "Can binary search be used on a sorted list of custom objects?",
        shortAnswer: "Yes, by implementing Comparable or using a Comparator.",
        explanation: "You need to define ordering for the objects. Java's Arrays.binarySearch() works with Comparable or takes a Comparator.",
        hint: "Custom comparison.",
        level: "intermediate",
        codeExample: "Arrays.binarySearch(objArray, key, Comparator.comparing(Person::getName));"
    },
    {
        question: "What is the performance of binary search on a sorted array vs a balanced binary search tree?",
        shortAnswer: "Binary search on array: O(log n) with better cache locality; BST: O(log n) but with pointer overhead.",
        explanation: "Arrays are contiguous, so binary search benefits from CPU caching. BST nodes are scattered, causing more cache misses.",
        hint: "Cache efficiency.",
        level: "expert",
        codeExample: "// Array is often faster for static data"
    },
    {
        question: "How does Java's Collections.binarySearch() differ from Arrays.binarySearch()?",
        shortAnswer: "Collections.binarySearch() works on List objects, Arrays.binarySearch() on arrays.",
        explanation: "Both require sorted input. Collections.binarySearch() works for any List that supports random access (like ArrayList); for LinkedList, it degrades to O(n).",
        hint: "List vs array.",
        level: "intermediate",
        codeExample: "Collections.binarySearch(list, key);"
    }
];

export default questions;