/**
 * Module 001_008: Topic 1: Algorithmic Problem 1: Prime number generation using Sieve of Eratosthenes
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the Sieve of Eratosthenes?",
    shortAnswer: "An optimal mathematical algorithm for finding all prime numbers up to a given integer limit $N$ by iteratively marking composite numbers (multiples of each prime) as non-prime.",
    explanation: "Core definition of the Sieve of Eratosthenes.",
    hint: "Optimal algorithm for generating all primes up to N by marking multiples.",
    level: "basic",
    codeExample: "boolean[] isPrime = generatePrimesSieve(100);"
  },
  {
    question: "What is the Time Complexity of the Sieve of Eratosthenes?",
    shortAnswer: "$O(N \\log (\\log N))$ time complexity, which is near-linear and substantially faster than trial division.",
    explanation: "Harmonic sum of prime reciprocals proof (Mertens' Theorem).",
    hint: "O(N log(log N)) near-linear time.",
    level: "basic",
    codeExample: "// Sum of N/p over all primes <= N equals O(N log(log N))"
  },
  {
    question: "What is the Space Complexity of the standard Sieve of Eratosthenes?",
    shortAnswer: "$O(N)$ auxiliary memory space for storing the boolean status array `isPrime` of size $N + 1$.",
    explanation: "Sieve space complexity.",
    hint: "O(N) memory for the boolean array.",
    level: "basic",
    codeExample: "boolean[] isPrime = new boolean[limit + 1];"
  },
  {
    question: "Why does the outer loop of the Sieve only need to run up to $\\sqrt{N}$ ($p \\times p \\le N$)?",
    shortAnswer: "Because any composite number $C \\le N$ must have at least one prime factor $\\le \\sqrt{N}$; if all factors were $&gt; \\sqrt{N}$, their product would exceed $N$.",
    explanation: "Square root factor property proof.",
    hint: "Every composite <= N has at least one factor <= sqrt(N).",
    level: "basic",
    codeExample: "for (int p = 2; p * p <= limit; p++) { ... }"
  },
  {
    question: "Why should the inner composite-marking loop start at $p \\times p$ rather than $2 \\times p$?",
    shortAnswer: "Because all smaller multiples ($2p, 3p, \\dots, (p-1)p$) have already been marked as composite by smaller prime factors ($2, 3, \\dots, p-1$) in earlier iterations.",
    explanation: "Critical inner loop optimization.",
    hint: "Smaller multiples have already been marked by smaller primes.",
    level: "intermediate",
    codeExample: "for (int multiple = p * p; multiple <= limit; multiple += p) isPrime[multiple] = false;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how many prime numbers were found up to 50?",
    shortAnswer: "15 primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.",
    explanation: "Prime count up to 50 verification.",
    hint: "15 primes.",
    level: "basic",
    codeExample: "generatePrimesSieve(50) -> 15 primes"
  },
  {
    question: "In the Coder & AccoTax Barrackpore benchmark, how many primes were found up to 100,000?",
    shortAnswer: "9,592 primes.",
    explanation: "Prime count up to 100,000 verification.",
    hint: "9,592 primes.",
    level: "basic",
    codeExample: "generatePrimesSieve(100_000) -> 9,592 primes"
  },
  {
    question: "How does `java.util.BitSet` optimize the memory footprint of the Sieve?",
    shortAnswer: "In standard Java, `boolean[]` allocates 1 byte (8 bits) per boolean element; `BitSet` allocates exactly **1 bit per entry**, reducing memory consumption by **87.5% (8x reduction)**.",
    explanation: "BitSet 8x memory reduction.",
    hint: "BitSet uses 1 bit per number compared to 1 byte per boolean in arrays.",
    level: "intermediate",
    codeExample: "BitSet bitSet = new BitSet(limit + 1); bitSet.clear(multiple);"
  },
  {
    question: "What is the Time Complexity of Naive Trial Division for finding all primes up to $N$?",
    shortAnswer: "$O(N \\sqrt{N})$ time complexity, which is significantly slower than Sieve of Eratosthenes ($O(N \\log (\\log N))$).",
    explanation: "Trial division time complexity comparison.",
    hint: "O(N * sqrt(N)) time.",
    level: "basic",
    codeExample: "for (int i = 2; i <= N; i++) isPrimeTrial(i); // O(N * sqrt(N))"
  },
  {
    question: "What is a 'Segmented Sieve' and when is it necessary?",
    shortAnswer: "A variant that divides the range $[1..N]$ into smaller segments of size $\\sqrt{N}$ that fit in CPU L1/L2 cache, allowing prime generation up to $10^9$ without running out of RAM.",
    explanation: "Segmented sieve for huge ranges and cache locality.",
    hint: "Processes numbers in cache-sized blocks (size sqrt(N)) for huge limits.",
    level: "advanced",
    codeExample: "// Segmented Sieve processes [L, R] using base primes up to sqrt(R)"
  },
  {
    question: "Why are indices 0 and 1 explicitly set to `false` in the Sieve array?",
    shortAnswer: "By mathematical definition, 0 and 1 are neither prime nor composite numbers (primes are integers $&gt; 1$ with exactly two distinct positive divisors: 1 and itself).",
    explanation: "Definition of prime numbers.",
    hint: "0 and 1 are not prime by definition.",
    level: "basic",
    codeExample: "isPrime[0] = false; isPrime[1] = false;"
  },
  {
    question: "How can potential 32-bit integer overflow occur in `p * p` during the Sieve?",
    shortAnswer: "If `p > 46,340`, `p * p` exceeds `Integer.MAX_VALUE` ($2.14 \\times 10^9$), overflowing into negative numbers and crashing with `ArrayIndexOutOfBoundsException`. Use `(long) p * p` or limit `p * p <= limit`.",
    explanation: "Integer overflow safety in Sieve inner loop.",
    hint: "If p > 46,340, p * p overflows 32-bit integer. Guard with p * p <= limit or use long.",
    level: "advanced",
    codeExample: "for (long multiple = (long) p * p; multiple <= limit; multiple += p) { ... }"
  },
  {
    question: "What is the 'Linear Sieve' (Sieve of Euler)?",
    shortAnswer: "An advanced algorithm that visits and marks each composite number **EXACTLY ONCE** (by its smallest prime factor), achieving strict $O(N)$ linear time complexity.",
    explanation: "Linear sieve O(N) mechanics.",
    hint: "Marks each composite exactly once, achieving strict O(N) linear time.",
    level: "advanced",
    codeExample: "// Linear Sieve achieves O(N) time with prime factorization"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the first prime number processed by the outer loop?",
    shortAnswer: "$p = 2$ (the smallest and only even prime number).",
    explanation: "Smallest prime number initialization.",
    hint: "p = 2.",
    level: "basic",
    codeExample: "for (int p = 2; p * p <= limit; p++)"
  },
  {
    question: "How can you query if an integer $K$ is prime in $O(1)$ time after running the Sieve?",
    shortAnswer: "Direct array indexing: simply check `if (isPrime[K])`, which returns the precomputed boolean in $O(1)$ constant time.",
    explanation: "O(1) precomputed prime query.",
    hint: "Direct array lookup: isPrime[K] in O(1) time.",
    level: "basic",
    codeExample: "if (isPrime[studentRollNumber]) { ... }"
  },
  {
    question: "Can Sieve of Eratosthenes be used to find the Smallest Prime Factor (SPF) for all numbers up to $N$?",
    shortAnswer: "YES! By storing an integer array `int[] spf = new int[N + 1]` and setting `spf[multiple] = p` when marking composites, enabling $O(\\log N)$ prime factorization.",
    explanation: "Smallest Prime Factor (SPF) sieve application.",
    hint: "Yes, storing spf[multiple] = p enables O(log N) factorization for any number.",
    level: "intermediate",
    codeExample: "int[] spf = new int[N + 1]; for (int i = 2; i <= N; i++) spf[i] = i;"
  },
  {
    question: "What is the Prime Number Theorem (PNT) regarding the density of primes up to $N$?",
    shortAnswer: "The number of primes $\\pi(N) \\approx \\frac{N}{\\ln N}$ (e.g. for $N = 100,000$, $\\frac{100,000}{\\ln(100,000)} \\approx 8,685$, close to the actual 9,592 primes).",
    explanation: "Prime Number Theorem asymptotic approximation.",
    hint: "Number of primes <= N is approximately N / ln(N).",
    level: "intermediate",
    codeExample: "// pi(N) ~ N / ln(N)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore benchmark, why was Sieve faster than Trial Division?",
    shortAnswer: "Because Trial Division performs redundant modulo division operations for every number, whereas the Sieve uses simple array index stepping with direct memory writes.",
    explanation: "CPU execution profile comparison.",
    hint: "Sieve uses simple memory writes; Trial division executes costly division operations.",
    level: "basic",
    codeExample: "// Memory addition (multiple += p) is vastly faster than modulo division (n % i == 0)"
  },
  {
    question: "What is a 'Twin Prime' and how can the Sieve find all twin primes up to $N$?",
    shortAnswer: "A pair of prime numbers that differ by 2 (e.g. $(3, 5), (11, 13)$); after running Sieve, check `if (isPrime[i] && isPrime[i + 2])`.",
    explanation: "Twin prime identification using Sieve.",
    hint: "Primes differing by 2: isPrime[i] && isPrime[i + 2].",
    level: "basic",
    codeExample: "for (int i = 2; i <= N - 2; i++) if (isPrime[i] && isPrime[i+2]) System.out.println(i + \", \" + (i+2));"
  },
  {
    question: "How does Goldbach's Conjecture relate to precomputed Sieve primes?",
    shortAnswer: "Goldbach's Conjecture states every even integer $> 2$ is the sum of two primes; after running Sieve, verify by checking if `isPrime[p] && isPrime[even - p]` for $p \\le \\frac{even}{2}$.",
    explanation: "Goldbach's conjecture verification with Sieve.",
    hint: "Check if isPrime[p] && isPrime[even - p] in O(1) lookups.",
    level: "intermediate",
    codeExample: "for (int p = 2; p <= even / 2; p++) if (isPrime[p] && isPrime[even - p]) return true;"
  },
  {
    question: "What is the maximum limit $N$ for a standard `boolean[]` array in 64-bit Java JVM?",
    shortAnswer: "Approximately $N \\approx 2 \\times 10^8$ ($\approx 200$ million, requiring $\approx 200$ MB RAM), limited by `Integer.MAX_VALUE - 8` max array size.",
    explanation: "Java array size limitations.",
    hint: "Around 200 million before running into heap memory or Integer.MAX_VALUE limits.",
    level: "advanced",
    codeExample: "// Java array maximum length is Integer.MAX_VALUE - 8"
  },
  {
    question: "How does the `6k ± 1` optimization optimize the Naive Trial Division algorithm?",
    shortAnswer: "All primes greater than 3 can be expressed in the form $6k \\pm 1$ ($6k - 1$ or $6k + 1$), allowing trial division to skip all multiples of 2 and 3, testing only $\\frac{1}{3}$ of all integers.",
    explanation: "6k ± 1 trial division optimization.",
    hint: "Primes > 3 are of the form 6k ± 1; steps by 6 to test i and i + 2.",
    level: "intermediate",
    codeExample: "for (int i = 5; i * i <= n; i += 6) if (n % i == 0 || n % (i + 2) == 0) return false;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was `bitSet.nextSetBit(p + 1)` used for?",
    shortAnswer: "To efficiently jump directly to the next prime number without iterating through non-prime composite bits in Indian Rupees (₹).",
    explanation: "BitSet nextSetBit method usage.",
    hint: "Jumps directly to the next set bit (prime) in O(1) hardware bitwise instructions.",
    level: "advanced",
    codeExample: "p = bitSet.nextSetBit(p + 1);"
  },
  {
    question: "Can the Sieve of Eratosthenes be parallelized across multiple CPU cores in Java?",
    shortAnswer: "YES! By generating base primes up to $\\sqrt{N}$ on one thread, and then processing independent segments in parallel using `ForkJoinPool` or `IntStream.range().parallel()`.",
    explanation: "Parallel segmented sieve in modern Java.",
    hint: "Yes, segments can be processed in parallel across multiple CPU cores.",
    level: "advanced",
    codeExample: "IntStream.range(0, numSegments).parallel().forEach(seg -> sieveSegment(seg));"
  },
  {
    question: "What is an 'Emirp' prime?",
    shortAnswer: "A prime number whose reversed digits also form a different prime number (e.g. 13 and 31, 17 and 71), easily identified using Sieve array lookups.",
    explanation: "Emirp prime definition.",
    hint: "A prime whose reversed digits also form a different prime (e.g. 13 and 31).",
    level: "intermediate",
    codeExample: "int rev = reverse(p); if (rev != p && isPrime[rev]) { /* Emirp */ }"
  },
  {
    question: "What is the memory consumption of `boolean[100_000_000]` vs `BitSet(100_000_000)`?",
    shortAnswer: "`boolean[]` consumes $\\approx 100$ MB of Heap memory; `BitSet` consumes only $\\approx 12.5$ MB of Heap memory (8x less).",
    explanation: "Concrete memory calculation comparison.",
    hint: "100 MB for boolean array vs 12.5 MB for BitSet.",
    level: "intermediate",
    codeExample: "100,000,000 bits / 8 / 1024 / 1024 = 11.92 MB"
  },
  {
    question: "Why should `Arrays.fill(isPrime, true)` be used instead of manual for-loops?",
    shortAnswer: "`Arrays.fill()` is recognized as a JVM intrinsic and compiled into highly optimized vectorized native CPU memory fill instructions (`memset`).",
    explanation: "JVM intrinsic optimization for Arrays.fill.",
    hint: "JIT intrinsic compiled into optimized native vectorized memset instructions.",
    level: "basic",
    codeExample: "Arrays.fill(isPrime, true);"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 1 for Java developers?",
    shortAnswer: "The Sieve of Eratosthenes is the gold standard for generating primes up to $N$ in $O(N \\log (\\log N))$ time. Always start inner marking at $p \\times p$, bound the outer loop at $\\sqrt{N}$, and use `BitSet` for memory efficiency.",
    explanation: "Mastery of Sieve of Eratosthenes.",
    hint: "O(N log(log N)) gold standard; start at p * p, stop outer loop at sqrt(N).",
    level: "basic",
    codeExample: "// Summary: O(N log(log N)) | Outer: p*p <= N | Inner: multiple = p*p"
  },
  {
    question: "What is the next topic (Topic 2) in Module 001_008?",
    shortAnswer: "Algorithmic Problem 2: Palindromic number and String verification.",
    explanation: "Topic 2 explores mathematical digit reversing and two-pointer String palindrome verification.",
    hint: "Algorithmic Problem 2: Palindromic number and String verification.",
    level: "basic",
    codeExample: "// Topic 2: Palindromic Number & String Verification"
  },
  {
    question: "How is Sieve of Eratosthenes used in Cryptography (RSA Key Generation)?",
    shortAnswer: "It pre-filters candidate random numbers by eliminating multiples of small primes before applying probabilistic Miller-Rabin primality tests on large 2048-bit numbers.",
    explanation: "Cryptographic pre-filtering with prime sieves.",
    hint: "Pre-filters composite numbers before running heavy Miller-Rabin primality tests.",
    level: "advanced",
    codeExample: "// Pre-filter candidates with small prime sieve before Miller-Rabin"
  }
];

export default questions;
