/**
 * Module 001_006: Topic 13: Finding minimum, maximum, second highest, and average in an array
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the optimal Time and Space Complexity to find minimum, maximum, second highest, and average in an array?",
    shortAnswer: "Time Complexity: $O(N)$ linear time (in a single pass); Space Complexity: $O(1)$ constant auxiliary memory.",
    explanation: "Optimal single-pass aggregation.",
    hint: "O(N) time in a single pass and O(1) auxiliary space.",
    level: "basic",
    codeExample: "// Single loop calculates all statistics simultaneously"
  },
  {
    question: "Why is sorting an array to find the maximum or second highest considered inefficient?",
    shortAnswer: "Because sorting takes $O(N \\log N)$ time and potentially mutates the array, whereas a single linear traversal finds both in $O(N)$ time with zero side effects.",
    explanation: "Algorithmic efficiency comparison.",
    hint: "Sorting is O(N log N); linear scan is O(N) and does not modify the array.",
    level: "basic",
    codeExample: "// Linear scan O(N) is faster than Arrays.sort() O(N log N)"
  },
  {
    question: "How do you correctly find the DISTINCT second highest element in an array?",
    shortAnswer: "Initialize `max1 = Double.NEGATIVE_INFINITY, max2 = Double.NEGATIVE_INFINITY;` for each element `val`: if `val > max1`, set `max2 = max1; max1 = val;` else if `val > max2 && val != max1`, set `max2 = val;`.",
    explanation: "Distinct second maximum algorithm.",
    hint: "Update max2 when a new max1 is found or when val is between max1 and max2.",
    level: "intermediate",
    codeExample: "if (v > m1) { m2 = m1; m1 = v; } else if (v > m2 && v != m1) { m2 = v; }"
  },
  {
    question: "What should initial `min` and `max` values be set to when finding extrema in primitive `int[]` arrays?",
    shortAnswer: "Set `min = arr[0]` and `max = arr[0]` (or `Integer.MAX_VALUE` and `Integer.MIN_VALUE`). Never initialize `max = 0` because it fails on all-negative arrays!",
    explanation: "Extrema initialization trap.",
    hint: "Initialize to arr[0] or Integer.MIN_VALUE / MAX_VALUE, never 0.",
    level: "basic",
    codeExample: "int min = arr[0], max = arr[0];"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee demo, what was the second highest fee in `{18000, 12000, 25000, 14000, 25000, 15000}`?",
    shortAnswer: "₹18,000 in Indian Rupees (₹), correctly ignoring the duplicate ₹25,000 maximum.",
    explanation: "Demonstrates distinct second maximum handling.",
    hint: "₹18,000 (duplicate ₹25,000 is ignored).",
    level: "basic",
    codeExample: "// Max1 = ₹25,000 | Max2 = ₹18,000"
  },
  {
    question: "What happens if an array with all duplicate values `[15000, 15000, 15000]` is evaluated for a second highest element?",
    shortAnswer: "`max2` remains `Double.NEGATIVE_INFINITY` (or `Integer.MIN_VALUE`), correctly indicating that no distinct second maximum exists.",
    explanation: "All-duplicate edge case handling.",
    hint: "No distinct second maximum exists; max2 remains NEGATIVE_INFINITY.",
    level: "intermediate",
    codeExample: "if (Double.isInfinite(max2)) System.out.println(\"No distinct second max\");"
  },
  {
    question: "How do you calculate the arithmetic average of an integer array without integer division truncation?",
    shortAnswer: "Cast the sum or denominator to `double`: `double avg = (double) sum / arr.length;`.",
    explanation: "Floating-point division accuracy.",
    hint: "Cast sum to double: (double) sum / arr.length.",
    level: "basic",
    codeExample: "double avg = (double) sum / arr.length;"
  },
  {
    question: "What happens if you attempt to calculate the average of an empty array (`new int[0]`)?",
    shortAnswer: "Dividing by `arr.length` (0) in floating-point yields `NaN` (or `ArithmeticException: / by zero` for integer division); guard against `arr.length == 0` first!",
    explanation: "Zero-length defensive boundary validation.",
    hint: "Throws ArithmeticException or returns NaN; guard with arr.length > 0.",
    level: "basic",
    codeExample: "if (arr.length == 0) throw new IllegalArgumentException(\"Empty array\");"
  },
  {
    question: "How do you find the second lowest (second minimum) element in an array?",
    shortAnswer: "Initialize `min1 = Double.POSITIVE_INFINITY, min2 = Double.POSITIVE_INFINITY;` and update: if `val < min1`, set `min2 = min1; min1 = val;` else if `val < min2 && val != min1`, set `min2 = val;`.",
    explanation: "Distinct second minimum algorithm.",
    hint: "Invert second maximum logic using min1 and min2 initialized to POSITIVE_INFINITY.",
    level: "intermediate",
    codeExample: "if (v < m1) { m2 = m1; m1 = v; } else if (v < m2 && v != m1) { m2 = v; }"
  },
  {
    question: "Can `sum` overflow when calculating the average of a very large `int[]` array?",
    shortAnswer: "YES! If elements are large integers, `int sum` can exceed $2^{31}-1$; always declare `long sum = 0L;` to prevent integer overflow.",
    explanation: "Arithmetic accumulator overflow protection.",
    hint: "Use long sum = 0L to prevent integer overflow.",
    level: "intermediate",
    codeExample: "long sum = 0L; for (int x : arr) sum += x; double avg = (double) sum / arr.length;"
  },
  {
    question: "How can Java 8 Streams find min, max, sum, and average on an `int[]` array?",
    shortAnswer: "Using `IntStream.of(arr).summaryStatistics()`, which returns an `IntSummaryStatistics` object containing min, max, count, sum, and average.",
    explanation: "Modern Java Stream API summary statistics.",
    hint: "IntStream.of(arr).summaryStatistics().",
    level: "intermediate",
    codeExample: "IntSummaryStatistics stats = IntStream.of(arr).summaryStatistics();"
  },
  {
    question: "What is the Time Complexity of `IntStream.of(arr).summaryStatistics()`?",
    shortAnswer: "$O(N)$ linear time in a single pass.",
    explanation: "Stream summary statistics pipeline.",
    hint: "O(N) linear time.",
    level: "intermediate",
    codeExample: "// O(N) stream aggregation"
  },
  {
    question: "In the Coder & AccoTax Barrackpore banking auditor, how are student tuition balances aggregated?",
    shortAnswer: "Using a single $O(N)$ pass that computes total revenue, average payment, minimum balance, and peak scholarship recipient in Indian Rupees (₹).",
    explanation: "Production single-pass ledger analytics.",
    hint: "Single-pass O(N) batch revenue and extrema analytics in ₹.",
    level: "basic",
    codeExample: "ArrayStatistics stats = computeStatistics(batchFees);"
  },
  {
    question: "How do you find the index of the maximum element in an array?",
    shortAnswer: "`int maxIdx = 0; for (int i = 1; i < arr.length; i++) if (arr[i] > arr[maxIdx]) maxIdx = i;`.",
    explanation: "Index-based extrema tracking.",
    hint: "Track maxIdx = i whenever arr[i] > arr[maxIdx].",
    level: "basic",
    codeExample: "int maxIdx = 0; for (int i=1; i<a.length; i++) if (a[i]>a[maxIdx]) maxIdx = i;"
  },
  {
    question: "How do you find the index of the minimum element in an array?",
    shortAnswer: "`int minIdx = 0; for (int i = 1; i < arr.length; i++) if (arr[i] < arr[minIdx]) minIdx = i;`.",
    explanation: "Index-based minimum tracking.",
    hint: "Track minIdx = i whenever arr[i] < arr[minIdx].",
    level: "basic",
    codeExample: "int minIdx = 0; for (int i=1; i<a.length; i++) if (a[i]<a[minIdx]) minIdx = i;"
  },
  {
    question: "What is the 'Tournament Method' for finding minimum and maximum simultaneously?",
    shortAnswer: "Comparing pairs of elements first, then comparing the smaller with `min` and the larger with `max`, reducing total comparisons from $2(N-1)$ to $\\lceil 3N/2 \\rceil - 2$.",
    explanation: "Pairwise comparison optimization.",
    hint: "Compares elements in pairs to reduce total comparisons to 1.5N.",
    level: "advanced",
    codeExample: "// Pairwise comparisons reduce checks to ~1.5N"
  },
  {
    question: "How do you calculate the Median of an array?",
    shortAnswer: "Sort the array ($O(N \\log N)$); if length $N$ is odd, median is `arr[N/2]`; if even, median is `(arr[N/2 - 1] + arr[N/2]) / 2.0`.",
    explanation: "Median statistical formula.",
    hint: "Sort array; pick middle element or average of two middle elements.",
    level: "basic",
    codeExample: "Arrays.sort(a); double med = (n%2!=0) ? a[n/2] : (a[n/2-1]+a[n/2])/2.0;"
  },
  {
    question: "What algorithm finds the $k$-th smallest/largest element in $O(N)$ average time?",
    shortAnswer: "Quickselect (Hoare's Selection Algorithm), which partitions the array around a pivot like Quicksort but recurses only into the relevant partition.",
    explanation: "Linear average-time order statistics.",
    hint: "Quickselect algorithm runs in O(N) average time.",
    level: "advanced",
    codeExample: "// Quickselect finds k-th order statistic in O(N) average time"
  },
  {
    question: "How do you calculate the Mode (most frequent element) of an array?",
    shortAnswer: "Using a `HashMap<Integer, Integer>` frequency map in $O(N)$ time, or by sorting first in $O(N \\log N)$ time and counting adjacent runs.",
    explanation: "Mode frequency calculation.",
    hint: "Use HashMap frequency counter or sort and count adjacent duplicates.",
    level: "intermediate",
    codeExample: "Map<Double, Integer> freq = new HashMap<>(); // Frequency map"
  },
  {
    question: "How do you calculate the Standard Deviation of an array?",
    shortAnswer: "1. Calculate average $\\mu$; 2. Compute sum of squared differences $\\sum (x_i - \\mu)^2$; 3. Standard deviation is $\\sigma = \\sqrt{\\frac{\\sum (x_i - \\mu)^2}{N}}$.",
    explanation: "Two-pass standard deviation formula.",
    hint: "sqrt( sum((x - avg)^2) / N ).",
    level: "intermediate",
    codeExample: "double variance = sumSqDiff / arr.length; double stdDev = Math.sqrt(variance);"
  },
  {
    question: "Can Standard Deviation be computed in a single pass?",
    shortAnswer: "YES! Using Welford's Algorithm or by maintaining $\\sum x$ and $\\sum x^2$ simultaneously.",
    explanation: "Online single-pass variance calculation.",
    hint: "Yes, using Welford's algorithm or tracking sum of squares.",
    level: "advanced",
    codeExample: "// Welford's algorithm computes variance numerically stably in 1 pass"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happens if `computeStatistics()` receives a single-element array `[15000.0]`?",
    shortAnswer: "Min = ₹15,000, Max = ₹15,000, Average = ₹15,000, and 2nd Highest = `Double.NEGATIVE_INFINITY` (indicates no second distinct element in ₹).",
    explanation: "Single-element boundary safety.",
    hint: "Min, max, and avg are ₹15,000; second max is NEGATIVE_INFINITY.",
    level: "basic",
    codeExample: "// stats for single element array"
  },
  {
    question: "How do you count elements that are strictly above the array average?",
    shortAnswer: "First pass computes `avg`; second pass counts elements where `arr[i] > avg` in $O(N)$ time.",
    explanation: "Two-pass statistical filtering.",
    hint: "First compute avg, then count elements matching val > avg.",
    level: "basic",
    codeExample: "int count = 0; for (double x : arr) if (x > avg) count++;"
  },
  {
    question: "Why should `Double.isInfinite(secondMax)` be checked before printing the second highest value?",
    shortAnswer: "To prevent printing `-Infinity` to users when all elements in the array are identical or when the array contains only one element.",
    explanation: "User-friendly output formatting.",
    hint: "Prevents printing -Infinity when no second distinct value exists.",
    level: "basic",
    codeExample: "if (Double.isInfinite(m2)) System.out.println(\"None\");"
  },
  {
    question: "What is the effect of NaN values in a `double[]` array on `Math.max()`?",
    shortAnswer: "If either argument to `Math.max(a, b)` is `NaN`, the result is `NaN`; filter out `Double.isNaN()` before computing statistics!",
    explanation: "IEEE 754 NaN propagation rule.",
    hint: "NaN propagates through Math.max; check !Double.isNaN(val) first.",
    level: "intermediate",
    codeExample: "if (!Double.isNaN(val) && val > max) max = val;"
  },
  {
    question: "How do you find the 3rd highest distinct element in an array?",
    shortAnswer: "Maintain three variables (`max1`, `max2`, `max3`) initialized to `Double.NEGATIVE_INFINITY` and update them in cascading order during the loop.",
    explanation: "Cascading top-K linear scan.",
    hint: "Maintain max1, max2, max3 and cascade updates in a single loop.",
    level: "intermediate",
    codeExample: "if (v>m1){m3=m2;m2=m1;m1=v;}else if(v>m2&&v!=m1){m3=m2;m2=v;}else if(v>m3&&v!=m2&&v!=m1){m3=v;}"
  },
  {
    question: "What data structure finds top-K largest elements in a streaming array in $O(N \\log K)$ time?",
    shortAnswer: "A Min-Heap (`PriorityQueue<Double>` of size $K$).",
    explanation: "Heap-based top-K streaming selection.",
    hint: "Min-Heap PriorityQueue of capacity K.",
    level: "advanced",
    codeExample: "PriorityQueue<Double> minHeap = new PriorityQueue<>(k);"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 13 for Java developers?",
    shortAnswer: "Minimum, maximum, distinct second maximum, sum, and average can all be computed in a single $O(N)$ pass with $O(1)$ space, safely guarding against empty arrays, overflows, and duplicate values.",
    explanation: "Mastery of single-pass statistical array aggregations.",
    hint: "Compute all statistics in a single O(N) pass with proper edge case handling.",
    level: "basic",
    codeExample: "// Summary: Single pass O(N) min, max, 2nd max, sum, avg"
  },
  {
    question: "What is the next topic (Topic 14) in Module 001_006?",
    shortAnswer: "Two-dimensional (2D) arrays: declaration, instantiation, and matrix visualization.",
    explanation: "Topic 14 transitions into multidimensional arrays, matrix row-column grids, and JVM reference structures.",
    hint: "Two-dimensional (2D) arrays: declaration, instantiation, and matrix visualization.",
    level: "basic",
    codeExample: "// Topic 14: 2D Arrays and Matrix Grid Visualization"
  },
  {
    question: "Can Java Records encapsulate statistical results cleanly?",
    shortAnswer: "YES! `public record ArrayStats(double min, double max, double avg) {}` provides a concise, immutable, type-safe container for multi-value method returns.",
    explanation: "Java 16+ Records for statistical return objects.",
    hint: "Yes, Java records provide immutable, clean multi-value return objects.",
    level: "basic",
    codeExample: "public record Stats(double min, double max, double avg) {}"
  }
];

export default questions;
