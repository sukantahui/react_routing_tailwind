const questions = [
  {
    question: "What is Linear Search and what are its best and worst case time complexities?",
    shortAnswer: "Linear Search checks every element sequentially. Best Case: O(1) (found at index 0); Worst/Average Case: O(n).",
    explanation: "Linear search starts from index 0 and compares each element with the target value until found or until the array terminates.",
    hint: "Sequential check from first to last.",
    level: "basic"
  },
  {
    question: "What is the mandatory prerequisite for executing Binary Search on an array?",
    shortAnswer: "The array elements MUST be sorted in either ascending or descending order.",
    explanation: "Binary search relies on order to determine whether the target lies in the left half or right half of the current interval.",
    hint: "Sorted sequence is mandatory.",
    level: "basic"
  },
  {
    question: "What is the time complexity of Binary Search in best, average, and worst cases?",
    shortAnswer: "Best Case: O(1) (target is middle element); Average & Worst Case: O(log2 n).",
    explanation: "Because each comparison cuts the remaining search space exactly in half, an array of 1,000,000 elements requires at most ~20 comparisons (log2(1000000) ≈ 19.93).",
    hint: "Logarithmic halving: O(log n).",
    level: "basic"
  },
  {
    question: "Why should we calculate mid as low + (high - low) / 2 instead of (low + high) / 2?",
    shortAnswer: "To prevent potential integer overflow when low and high are very large integers.",
    explanation: "If (low + high) exceeds 2,147,483,647 (INT_MAX), it wraps around to a negative number, causing an invalid memory access or segmentation fault.",
    hint: "Prevents INT_MAX integer overflow.",
    level: "intermediate",
    codeExample: "int mid = low + (high - low) / 2; // Safe from integer overflow"
  },
  {
    question: "How many comparisons does Binary Search need for an array of size 1024 in the worst case?",
    shortAnswer: "11 comparisons (log2(1024) + 1 = 10 + 1 = 11).",
    explanation: "At each step: 1024 -> 512 -> 256 -> 128 -> 64 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1 -> done.",
    hint: "2^10 = 1024.",
    level: "basic"
  },
  {
    question: "When is Linear Search preferable over Binary Search?",
    shortAnswer: "When the array is unsorted, very small (n < 10), or only searched once.",
    explanation: "Sorting an unsorted array takes O(n log n) time. If you only search once, doing Linear Search O(n) is faster than Sorting + Binary Search.",
    hint: "One-off search on unsorted data.",
    level: "intermediate"
  },
  {
    question: "How do you implement Binary Search recursively in C?",
    shortAnswer: "Pass low and high indices; call binarySearch(arr, low, mid - 1, key) or (arr, mid + 1, high, key).",
    explanation: "The base condition is if (low > high) return -1;. Each recursive call handles a halved range on the call stack.",
    hint: "Base case: low > high.",
    level: "intermediate",
    codeExample: "int binarySearchRec(int arr[], int low, int high, int key) {\n    if (low > high) return -1;\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == key) return mid;\n    if (arr[mid] > key) return binarySearchRec(arr, low, mid - 1, key);\n    return binarySearchRec(arr, mid + 1, high, key);\n}"
  },
  {
    question: "What is the space complexity of iterative vs recursive Binary Search in C?",
    shortAnswer: "Iterative: O(1) auxiliary space; Recursive: O(log n) stack frame space.",
    explanation: "Iterative search modifies loop variables without extra stack allocations. Recursive search places log2 n function frames on the stack.",
    hint: "Iterative uses constant memory; recursion uses stack frames.",
    level: "intermediate"
  },
  {
    question: "How do you find the first occurrence (lower bound) of a duplicate element using Binary Search?",
    shortAnswer: "When arr[mid] == target, save mid and continue searching in the left half (high = mid - 1).",
    explanation: "Do not stop immediately at the first match. Keep narrowing high = mid - 1 until the search interval collapses.",
    hint: "high = mid - 1 on match to find leftmost duplicate.",
    level: "advanced"
  },
  {
    question: "How do you find the last occurrence (upper bound) of a duplicate element using Binary Search?",
    shortAnswer: "When arr[mid] == target, save mid and continue searching in the right half (low = mid + 1).",
    explanation: "Setting low = mid + 1 pushes the search boundary towards higher indices to locate the rightmost instance.",
    hint: "low = mid + 1 on match to find rightmost duplicate.",
    level: "advanced"
  },
  {
    question: "What is Sentinel Linear Search and how does it optimize standard linear search?",
    shortAnswer: "It places the search key at the end of the array to eliminate the loop boundary condition (i < n).",
    explanation: "Saves one comparison per iteration by only testing arr[i] == target inside the loop.",
    hint: "Places target at arr[n-1] to remove boundary check.",
    level: "advanced"
  },
  {
    question: "What standard C library function implements Binary Search?",
    shortAnswer: "bsearch() defined in <stdlib.h>.",
    explanation: "bsearch() takes a key, array pointer, element count, element size, and a comparator function pointer.",
    hint: "bsearch() in stdlib.h.",
    level: "intermediate",
    codeExample: "#include <stdlib.h>\nint *res = bsearch(&key, arr, n, sizeof(int), compareInts);"
  },
  {
    question: "What is Ternary Search and how does its complexity compare to Binary Search?",
    shortAnswer: "Ternary Search splits the array into three parts (2 mid points) with O(log3 n) comparisons.",
    explanation: "Although log3 n has fewer recursive levels, it performs 2 comparisons per level (total ~4 log3 n vs ~2 log2 n), making it slightly slower than Binary Search in practice.",
    hint: "Divides space into three parts using mid1 and mid2.",
    level: "advanced"
  },
  {
    question: "How do you search for an element in a 2D sorted matrix (sorted row-wise and column-wise)?",
    shortAnswer: "Start at the top-right corner (or bottom-left) in O(rows + cols) time.",
    explanation: "If current element > target, move left (col--). If current element < target, move down (row++).",
    hint: "Top-right staircase search in O(M + N).",
    level: "advanced"
  },
  {
    question: "What is the return value of Linear Search or Binary Search when the target element is missing?",
    shortAnswer: "Conventionally -1 (an invalid array index).",
    explanation: "Because valid array indices in C range from 0 to n - 1, returning -1 unambiguously signals a missing key.",
    hint: "Sentinel value -1 indicates not found.",
    level: "basic"
  },
  {
    question: "Can Binary Search be applied to a Singly Linked List effectively?",
    shortAnswer: "No, because linked lists do not support O(1) random access to the middle node.",
    explanation: "Finding the middle node of a linked list takes O(n) time, destroying the O(log n) efficiency.",
    hint: "Lack of constant-time indexing ruins logarithmic speed.",
    level: "intermediate"
  },
  {
    question: "What is Exponential Search and when is it useful?",
    shortAnswer: "Finding a range [2^(k-1), 2^k] where target exists, then applying Binary Search.",
    explanation: "Useful for unbounded (infinite) arrays or streaming data where the array length is unknown beforehand.",
    hint: "Doubling step search followed by binary search.",
    level: "advanced"
  },
  {
    question: "What is Interpolation Search and what is its average time complexity on uniformly distributed data?",
    shortAnswer: "Interpolation Search predicts probe position using numerical value interpolation in O(log log n) time.",
    explanation: "Like searching for a name starting with 'Z' near the back of a physical telephone directory instead of the middle.",
    hint: "O(log log n) probe on uniform distribution.",
    level: "advanced"
  },
  {
    question: "What happens in Binary Search if the array is sorted in descending order?",
    shortAnswer: "The branching conditions must be inverted: if (arr[mid] < target) high = mid - 1; else low = mid + 1;.",
    explanation: "Larger elements reside at lower indices and smaller elements reside at higher indices.",
    hint: "Invert low and high updates for descending order.",
    level: "intermediate"
  },
  {
    question: "How does caching affect Linear Search performance on modern CPUs?",
    shortAnswer: "Linear search achieves maximum CPU memory bandwidth due to hardware sequential prefetching.",
    explanation: "For small arrays (n < 64), linear search is often faster than binary search because all elements sit in the same L1 cache line.",
    hint: "Hardware prefetchers love sequential memory reads.",
    level: "advanced"
  },
  {
    question: "What is the worst-case number of comparisons in Linear Search for an array of size n?",
    shortAnswer: "n comparisons (when the element is at index n - 1 or absent).",
    explanation: "Every single element from 0 to n - 1 must be evaluated before concluding.",
    hint: "Evaluates all n items.",
    level: "basic"
  },
  {
    question: "How can we write a generic linear search function in C that works for any data type?",
    shortAnswer: "Using void* pointers, element size, and a custom comparator function pointer.",
    explanation: "Calculate byte offsets as (char*)base + i * elemSize and call comparator(target, currentPtr).",
    hint: "Generic void* + comparator pointer.",
    level: "advanced",
    codeExample: "int genericLinearSearch(const void *base, size_t n, size_t size, const void *key, int (*cmp)(const void*, const void*));"
  },
  {
    question: "How do you count the total occurrences of a target number in a sorted array in O(log n) time?",
    shortAnswer: "(lastOccurrenceIndex - firstOccurrenceIndex + 1) using two Binary Searches.",
    explanation: "One binary search finds the first index; second binary search finds the last index.",
    hint: "Upper bound minus lower bound + 1.",
    level: "intermediate"
  },
  {
    question: "What is the peak element in an array and how can it be found in O(log n)?",
    shortAnswer: "An element greater than its immediate neighbors. Binary search moves toward the side with the larger neighbor.",
    explanation: "If arr[mid] < arr[mid + 1], a peak is guaranteed to exist on the right side (low = mid + 1).",
    hint: "Follow the ascending slope using binary search.",
    level: "advanced"
  },
  {
    question: "Why should we avoid modifying array elements while performing a binary search?",
    shortAnswer: "Mutating elements breaks the sorted ordering invariant, leading to unpredictable or false negative search results.",
    explanation: "Binary search strictly assumes that the array remains immutable and sorted throughout the lookup.",
    hint: "Sorted invariant must remain undisturbed.",
    level: "basic"
  }
];

export default questions;
