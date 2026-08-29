const topic5_questions = [
  {
    question: "What is the theoretical lower bound for any comparison-based sorting algorithm in the worst case?",
    options: [
      "Omega(N)",
      "Omega(N log N)",
      "Omega(N^2)",
      "Omega(log N)"
    ],
    correctAnswer: 1,
    explanation: "Any comparison-based sort forms a binary decision tree with N! leaves. The tree height must be at least log_2(N!) = Omega(N log N)."
  },
  {
    question: "Why can non-comparison sorting algorithms like Counting Sort and Radix Sort achieve O(N) linear time?",
    options: [
      "Because they violate the laws of mathematics",
      "Because they do NOT use pairwise comparisons to order elements; instead, they use direct array indexing on bounded integer keys",
      "Because they only work on arrays of size 2",
      "Because they run on GPU quantum accelerators"
    ],
    correctAnswer: 1,
    explanation: "The Omega(N log N) lower bound only applies to comparison-based models. Non-comparison sorts use element values directly as array memory indices."
  },
  {
    question: "Which of the following correctly orders the asymptotic growth rates from slowest to fastest?",
    options: [
      "O(N) < O(log N) < O(N^2) < O(1)",
      "O(1) < O(log* N) < O(log log N) < O(log N) < O(sqrt(N)) < O(N) < O(N log N) < O(N^2)",
      "O(N!) < O(2^N) < O(N^2) < O(N)",
      "O(sqrt(N)) < O(log N) < O(1)"
    ],
    correctAnswer: 1,
    explanation: "O(1) is constant, O(log* N) is iterated log, O(log log N) is double log, O(log N) is log, O(sqrt(N)) is sub-linear, O(N) is linear, O(N log N) is linearithmic, and O(N^2) is quadratic."
  },
  {
    question: "How does Stirling's Approximation establish that log_2(N!) = Theta(N log N)?",
    options: [
      "By calculating ln(N!) ≈ N ln N - N + O(ln N), proving the leading term is N log N",
      "By multiplying N by itself N times",
      "By assuming all elements in the array are equal to 0",
      "By converting the factorial into a linear summation of 1s"
    ],
    correctAnswer: 0,
    explanation: "Stirling's approximation shows ln(N!) = N ln(N) - N + O(ln N). Converting to base 2 yields log_2(N!) = Theta(N log_2 N), setting the binary decision tree height bound."
  },
  {
    question: "How many leaves must a decision tree contain to correctly sort an array of N distinct elements?",
    options: [
      "N leaves",
      "2^N leaves",
      "N! leaves (one for each possible input permutation)",
      "N^2 leaves"
    ],
    correctAnswer: 2,
    explanation: "There are N! possible initial permutations of N items. To produce the correct sorted output for every permutation, the decision tree must have at least N! leaves."
  },
  {
    question: "If a binary decision tree has L leaves, what is the minimum tree height h?",
    options: [
      "h >= ceil(log_2 L)",
      "h = L / 2",
      "h = sqrt(L)",
      "h = 2^L"
    ],
    correctAnswer: 0,
    explanation: "A binary tree of height h has at most 2^h leaves. Therefore, 2^h >= L => h >= ceil(log_2 L)."
  },
  {
    question: "What is the minimum number of comparisons needed in the worst case to sort N = 3 elements?",
    options: [
      "2 comparisons",
      "3 comparisons (ceil(log_2(3!)) = ceil(log_2(6)) = 3)",
      "6 comparisons",
      "1 comparison"
    ],
    correctAnswer: 1,
    explanation: "3! = 6 permutations. ceil(log_2(6)) = 3. At least 3 comparisons are mathematically required."
  },
  {
    question: "What is the minimum number of comparisons needed in the worst case to sort N = 4 elements?",
    options: [
      "4 comparisons",
      "5 comparisons (ceil(log_2(4!)) = ceil(log_2(24)) = 5)",
      "6 comparisons",
      "24 comparisons"
    ],
    correctAnswer: 1,
    explanation: "4! = 24 permutations. Since 2^4 = 16 < 24 <= 32 = 2^5, ceil(log_2(24)) = 5 comparisons."
  },
  {
    question: "What is the minimum number of comparisons needed in the worst case to sort N = 5 elements?",
    options: [
      "5 comparisons",
      "7 comparisons (ceil(log_2(5!)) = ceil(log_2(120)) = 7)",
      "10 comparisons",
      "120 comparisons"
    ],
    correctAnswer: 1,
    explanation: "5! = 120 permutations. Since 2^6 = 64 < 120 <= 128 = 2^7, ceil(log_2(120)) = 7 comparisons."
  },
  {
    question: "Why is MergeSort considered an asymptotically optimal comparison sorting algorithm?",
    options: [
      "Because its worst-case runtime is O(N log N), matching the theoretical lower bound Omega(N log N)",
      "Because it sorts without comparisons",
      "Because it runs in O(N) time on all inputs",
      "Because it uses 0 auxiliary memory"
    ],
    correctAnswer: 0,
    explanation: "MergeSort achieves worst-case O(N log N) time complexity, which matches the theoretical lower bound Omega(N log N) derived from decision trees."
  },
  {
    question: "Why is HeapSort considered an asymptotically optimal in-place comparison sort?",
    options: [
      "Because HeapSort runs in O(N log N) time in the worst case and requires only O(1) auxiliary space",
      "Because HeapSort requires an extra array of size N",
      "Because HeapSort is linear time",
      "Because HeapSort never swaps elements"
    ],
    correctAnswer: 0,
    explanation: "HeapSort achieves O(N log N) worst-case time complexity while operating in-place with O(1) extra space."
  },
  {
    question: "What is the worst-case time complexity of QuickSort with standard deterministic pivot selection?",
    options: [
      "O(N log N)",
      "O(N^2) (e.g. on already sorted arrays with first/last element pivot)",
      "O(log N)",
      "O(N)"
    ],
    correctAnswer: 1,
    explanation: "If the pivot splits the array into 0 and N-1 elements at every step, recurrence is T(N) = T(N-1) + O(N) = O(N^2)."
  },
  {
    question: "How does Randomized QuickSort avoid the O(N^2) worst-case in practice?",
    options: [
      "By picking a random pivot, ensuring a balanced split with high probability, achieving O(N log N) expected time",
      "By converting into MergeSort",
      "By eliminating comparisons",
      "By limiting array size to 10"
    ],
    correctAnswer: 0,
    explanation: "Choosing a random pivot eliminates adversarial worst-case inputs and guarantees O(N log N) expected time regardless of input ordering."
  },
  {
    question: "In information theory, how much information (in bits) is obtained from a single comparison A[i] < A[j]?",
    options: [
      "At most 1 bit of information (since answer is binary TRUE or FALSE)",
      "N bits of information",
      "log_2(N) bits",
      "0 bits"
    ],
    correctAnswer: 0,
    explanation: "A binary comparison has only 2 outcomes (true or false), providing at most 1 bit of information (Shannon entropy). To resolve 1 of N! states requires log_2(N!) bits."
  },
  {
    question: "Why can Counting Sort sort N integers in O(N + K) time where K is the maximum element value?",
    options: [
      "Because it counts key occurrences in a frequency array and reconstructs sorted output without pairwise comparisons",
      "Because it uses binary trees",
      "Because it skips negative numbers",
      "Because K is always equal to 1"
    ],
    correctAnswer: 0,
    explanation: "Counting Sort uses integer keys directly as array indices to count frequencies in O(N + K) time, bypassing pairwise comparisons."
  },
  {
    question: "When is Counting Sort inefficient compared to MergeSort/QuickSort?",
    options: [
      "When the range of keys K is substantially larger than N (e.g. K = N^3 or 32-bit arbitrary integers)",
      "When N is large",
      "When array is already sorted",
      "When elements are floating point"
    ],
    correctAnswer: 0,
    explanation: "If K = N^3 (e.g. sorting 1,000 numbers with values up to 1 Billion), Counting Sort requires O(N^3) memory and time, making O(N log N) comparison sorts vastly superior."
  },
  {
    question: "What is the time complexity of Radix Sort on N d-digit numbers in base b?",
    options: [
      "O(d * (N + b))",
      "O(N^d)",
      "O(d * log N)",
      "O(N log N)"
    ],
    correctAnswer: 0,
    explanation: "Radix Sort applies a stable digit-sort (like Counting Sort) across all d digits, taking O(d * (N + b)) time."
  },
  {
    question: "If we have N numbers in the range [0, N^2 - 1], how can Radix Sort sort them in O(N) linear time?",
    options: [
      "By representing the numbers in base N, so each number has d = 2 digits, taking 2 * (N + N) = O(N) time",
      "By running binary search",
      "By squaring the array",
      "It is impossible"
    ],
    correctAnswer: 0,
    explanation: "In base N, any number up to N^2 - 1 has at most 2 digits (d = 2). Radix Sort takes 2 * (N + N) = 4N = O(N) time!"
  },
  {
    question: "What is an adversary argument in algorithmic complexity lower bounds?",
    options: [
      "A malicious player that dynamically constructs input data during algorithm execution to force the maximum number of comparisons",
      "A compiler that flags errors",
      "A hardware fault simulator",
      "An automated unit test"
    ],
    correctAnswer: 0,
    explanation: "An adversary provides answers to comparison queries in a way that maximizes the remaining candidate permutations, establishing rigorous lower bounds."
  },
  {
    question: "What is the lower bound for finding the MINIMUM element in an unsorted array of N elements?",
    options: [
      "Omega(log N)",
      "Omega(N - 1) = Omega(N) comparisons",
      "Omega(N log N)",
      "Omega(1)"
    ],
    correctAnswer: 1,
    explanation: "Every element except the minimum must lose at least 1 comparison. Therefore, at least N - 1 comparisons are strictly necessary."
  },
  {
    question: "What is the minimum number of comparisons needed to find BOTH the minimum and maximum simultaneously in an array of N elements?",
    options: [
      "2N - 2 comparisons",
      "ceil(3N / 2) - 2 comparisons",
      "N log N comparisons",
      "N comparisons"
    ],
    correctAnswer: 1,
    explanation: "By comparing elements in pairs (1 comparison per pair) and then comparing winners with max and losers with min (2 comparisons per pair), total is 3N/2 - 2."
  },
  {
    question: "What is the lower bound for finding the SECOND LARGEST element in an array of N elements using the Tournament Method?",
    options: [
      "N + ceil(log_2 N) - 2 comparisons",
      "2N comparisons",
      "N log N comparisons",
      "log_2(N) comparisons"
    ],
    correctAnswer: 0,
    explanation: "The tournament tree finds the maximum in N - 1 comparisons. The second largest must have lost directly to the maximum, requiring log_2(N) - 1 further comparisons."
  },
  {
    question: "Which comparison sort has the minimum number of comparisons among all sorting algorithms (though high bookkeeping overhead)?",
    options: [
      "Ford-Johnson Merge-Insertion Sort",
      "Bubble Sort",
      "Selection Sort",
      "BogoSort"
    ],
    correctAnswer: 0,
    explanation: "The Ford-Johnson algorithm (merge-insertion sort) minimizes the total comparison count very close to the theoretical ceil(log_2(N!)) bound."
  },
  {
    question: "Can any comparison-based sorting algorithm sort an already-sorted array in O(N) time?",
    options: [
      "Yes, algorithms like Insertion Sort, Bubble Sort, and TimSort verify sortedness with N - 1 comparisons in O(N) best-case time",
      "No, all comparison sorts must take Omega(N log N) on every input",
      "Only on quantum computers",
      "Only if N is power of 2"
    ],
    correctAnswer: 0,
    explanation: "The Omega(N log N) bound is a WORST-CASE lower bound. On specific pre-sorted inputs, algorithms can check sortedness in O(N) best-case time."
  },
  {
    question: "What is TimSort's time complexity across best, average, and worst cases?",
    options: [
      "Best: O(N), Average: O(N log N), Worst: O(N log N)",
      "Best: O(1), Average: O(N^2), Worst: O(N^2)",
      "Best: O(N log N), Average: O(N^2), Worst: O(N^2)",
      "Best: O(log N), Average: O(N), Worst: O(N log N)"
    ],
    correctAnswer: 0,
    explanation: "TimSort (used in Python and Java `Arrays.sort()`) identifies existing sorted runs in O(N) time and merges them in O(N log N) worst-case time."
  },
  {
    question: "Which of the following sorting algorithms is UNSTABLE?",
    options: [
      "MergeSort",
      "QuickSort / HeapSort",
      "Insertion Sort",
      "Counting Sort"
    ],
    correctAnswer: 1,
    explanation: "Standard QuickSort and HeapSort perform long-distance swaps that can invert the relative order of duplicate elements, making them unstable."
  },
  {
    question: "If an algorithm runs in O(N^2) and another in O(N log N), at what value of N does O(N log N) consistently outperform O(N^2) in practice?",
    options: [
      "For almost all N >= 30 to 50",
      "Only for N > 10^12",
      "Never",
      "Only for N = 1"
    ],
    correctAnswer: 0,
    explanation: "While simple O(N^2) algorithms like insertion sort have very low constant factors for tiny N (< 20), O(N log N) algorithms dominate for N >= 30."
  },
  {
    question: "What is the Stirling approximation formula for N!?",
    options: [
      "N! ≈ sqrt(2 * pi * N) * (N / e)^N",
      "N! ≈ N^N",
      "N! ≈ 2^N",
      "N! ≈ e^N"
    ],
    correctAnswer: 0,
    explanation: "Stirling's formula is N! ≈ sqrt(2 * pi * N) * (N / e)^N, which provides the asymptotic proof that log(N!) = Theta(N log N)."
  },
  {
    question: "What is the lower bound for searching an element in an UNSORTED array of N elements?",
    options: [
      "Omega(N)",
      "Omega(log N)",
      "Omega(1)",
      "Omega(N log N)"
    ],
    correctAnswer: 0,
    explanation: "In an unsorted array, an adversary could place the target in the very last checked slot, requiring Omega(N) comparisons."
  },
  {
    question: "What is the fundamental conclusion of the Decision Tree Lower Bound Theorem?",
    options: [
      "Comparison-based sorting has a mathematical barrier of Omega(N log N); to achieve linear time, one must exploit the internal structure of keys using non-comparison techniques",
      "All algorithms should be written in Python",
      "Computers can sort in O(1) time with enough RAM",
      "MergeSort is slow"
    ],
    correctAnswer: 0,
    explanation: "The Omega(N log N) bound proves that pairwise comparisons cannot beat N log N. Breaking this limit requires non-comparison models like Radix or Counting Sort."
  }
];

export default topic5_questions;
