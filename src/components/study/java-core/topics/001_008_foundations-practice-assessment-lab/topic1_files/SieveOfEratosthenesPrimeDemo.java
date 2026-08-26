/**
 * File: SieveOfEratosthenesPrimeDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 1)
 * Description: Implements and benchmarks the Sieve of Eratosthenes Prime Number Generation Algorithm in Java:
 *              1. Sieve Algorithm: O(N log(log N)) time complexity
 *              2. Inner loop optimization: Starting composite marking at p * p
 *              3. Outer loop limit: p * p <= N (sqrt(N) bound)
 *              4. Comparison with Naive Trial Division O(N * sqrt(N))
 *              5. BitSet memory optimization (1 bit per entry vs boolean array)
 *              for student cryptographic token generation at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.Arrays;
import java.util.BitSet;

public class SieveOfEratosthenesPrimeDemo {

    // =========================================================================
    // 1. STANDARD SIEVE OF ERATOSTHENES: O(N log(log N))
    // =========================================================================
    public static boolean[] generatePrimesSieve(int limit) {
        if (limit < 2) return new boolean[0];

        boolean[] isPrime = new boolean[limit + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = false;
        isPrime[1] = false;

        // Outer loop runs up to sqrt(limit)
        for (int p = 2; p * p <= limit; p++) {
            if (isPrime[p]) {
                // Inner loop marks multiples starting from p * p:
                for (int multiple = p * p; multiple <= limit; multiple += p) {
                    isPrime[multiple] = false;
                }
            }
        }
        return isPrime;
    }

    // =========================================================================
    // 2. MEMORY OPTIMIZED SIEVE USING BITSET (1 bit per number)
    // =========================================================================
    public static BitSet generatePrimesBitSet(int limit) {
        BitSet bitSet = new BitSet(limit + 1);
        bitSet.set(2, limit + 1); // Set bits 2 to limit to true

        for (int p = 2; p * p <= limit; p = bitSet.nextSetBit(p + 1)) {
            if (p == -1) break;
            for (int multiple = p * p; multiple <= limit; multiple += p) {
                bitSet.clear(multiple);
            }
        }
        return bitSet;
    }

    // =========================================================================
    // 3. NAIVE TRIAL DIVISION (For Performance Benchmark Comparison)
    // =========================================================================
    public static boolean isPrimeTrialDivision(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;

        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 1 SIEVE OF ERATOSTHENES");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        int sampleLimit = 50;
        System.out.printf("1. GENERATING ALL PRIME NUMBERS UP TO %d USING SIEVE:%n", sampleLimit);
        boolean[] primes = generatePrimesSieve(sampleLimit);

        int primeCount = 0;
        System.out.print("   Primes: ");
        for (int i = 2; i <= sampleLimit; i++) {
            if (primes[i]) {
                System.out.print(i + " ");
                primeCount++;
            }
        }
        System.out.printf("%n   Total primes found in range [2..%d]: %d primes%n%n", sampleLimit, primeCount);

        // =====================================================================
        // BENCHMARK: SIEVE VS NAIVE TRIAL DIVISION (N = 100,000)
        // =====================================================================
        int benchmarkLimit = 100_000;
        System.out.printf("2. PERFORMANCE BENCHMARK (Finding Primes up to %,d):%n", benchmarkLimit);

        // A. Sieve of Eratosthenes
        long startSieve = System.nanoTime();
        boolean[] sievePrimes = generatePrimesSieve(benchmarkLimit);
        long endSieve = System.nanoTime();

        int sieveCount = 0;
        for (int i = 2; i <= benchmarkLimit; i++) {
            if (sievePrimes[i]) sieveCount++;
        }

        // B. Naive Trial Division
        long startTrial = System.nanoTime();
        int trialCount = 0;
        for (int i = 2; i <= benchmarkLimit; i++) {
            if (isPrimeTrialDivision(i)) trialCount++;
        }
        long endTrial = System.nanoTime();

        // C. BitSet Sieve
        long startBitSet = System.nanoTime();
        BitSet bitSetPrimes = generatePrimesBitSet(benchmarkLimit);
        long endBitSet = System.nanoTime();

        System.out.printf("   • Sieve of Eratosthenes : %,d primes | Time: %,10d ns%n", sieveCount, (endSieve - startSieve));
        System.out.printf("   • BitSet Optimized Sieve: %,d primes | Time: %,10d ns%n", bitSetPrimes.cardinality(), (endBitSet - startBitSet));
        System.out.printf("   • Naive Trial Division  : %,d primes | Time: %,10d ns%n%n", trialCount, (endTrial - startTrial));

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Sieve of Eratosthenes runs in O(N log(log N)), vastly beating trial division.");
        System.out.println("2. Always start the inner composite marking loop at p * p (not 2 * p).");
        System.out.println("3. The outer loop only needs to iterate up to sqrt(N) (p * p <= N).");
        System.out.println("4. BitSet reduces memory from 1 byte/boolean to 1 bit/boolean for massive ranges.");
        System.out.println("================================================================================");
    }
}
