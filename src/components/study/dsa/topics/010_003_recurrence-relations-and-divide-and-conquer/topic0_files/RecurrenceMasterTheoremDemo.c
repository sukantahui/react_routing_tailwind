/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Recurrence Relations: Master Theorem, Substitution & Recursion Trees
 * File: RecurrenceMasterTheoremDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Pedagogical call counter
static unsigned long long recursionCalls = 0;

// 1. Divide and Conquer: Merge Sort Recurrence T(n) = 2T(n/2) + O(n) -> O(n log n)
void mergeSortSimulated(int n) {
    recursionCalls++;
    if (n <= 1) return;

    // Divide into 2 equal subproblems of size n/2
    mergeSortSimulated(n / 2);
    mergeSortSimulated(n / 2);

    // Simulated O(n) merge work
    // (n operations performed across two branches)
}

// 2. Binary Search Recurrence: T(n) = T(n/2) + O(1) -> O(log n)
void binarySearchSimulated(int n) {
    recursionCalls++;
    if (n <= 1) return;
    binarySearchSimulated(n / 2); // Only 1 subproblem of size n/2
}

// 3. Karatsuba Integer Multiplication Recurrence: T(n) = 3T(n/2) + O(n) -> O(n^(log2 3)) = O(n^1.585)
void karatsubaSimulated(int n) {
    recursionCalls++;
    if (n <= 1) return;
    karatsubaSimulated(n / 2);
    karatsubaSimulated(n / 2);
    karatsubaSimulated(n / 2);
}

// 4. Naive Fibonacci Recurrence: T(n) = T(n-1) + T(n-2) + O(1) -> O(2^n) (Golden Ratio 1.618^n)
unsigned long long fibonacciRecursive(int n) {
    recursionCalls++;
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - RECURRENCE RELATIONS & MASTER THEOREM     \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    int N = 1024;
    printf("Empirical Recursive Call Counts for Input Size N = %d:\n", N);
    printf("-----------------------------------------------------------------\n");

    // Binary Search: T(n) = T(n/2) + O(1)
    recursionCalls = 0;
    binarySearchSimulated(N);
    printf("1. Binary Search  [T(n) = T(n/2) + 1]    : %llu calls  -> O(log2 N = %.1f)\n",
           recursionCalls, log2(N));

    // Merge Sort: T(n) = 2T(n/2) + n
    recursionCalls = 0;
    mergeSortSimulated(N);
    printf("2. Merge Sort     [T(n) = 2T(n/2) + n]   : %llu calls -> O(N log2 N = %.1f)\n",
           recursionCalls, N * log2(N));

    // Karatsuba: T(n) = 3T(n/2) + n
    recursionCalls = 0;
    karatsubaSimulated(N);
    printf("3. Karatsuba Mult [T(n) = 3T(n/2) + n]   : %llu calls -> O(N^1.585 = %.1f)\n\n",
           recursionCalls, pow(N, log2(3)));

    // Naive Fibonacci (tested with small n = 25)
    recursionCalls = 0;
    int fibN = 25;
    fibonacciRecursive(fibN);
    printf("4. Naive Fibonacci [T(n) = T(n-1) + T(n-2)] for n = %d:\n", fibN);
    printf("   -> Total Recursive Calls: %llu (Exponential Explosion O(2^N) = O(1.618^N))\n\n", recursionCalls);

    printf("Master Theorem Summary (Form: T(n) = a*T(n/b) + f(n)):\n");
    printf("• Case 1: f(n) = O(n^(log_b(a) - eps))  => T(n) = Θ(n^(log_b a))       [Leaves dominate]\n");
    printf("• Case 2: f(n) = Θ(n^(log_b a) * log^k n)=> T(n) = Θ(n^(log_b a) * log^(k+1) n) [Balanced]\n");
    printf("• Case 3: f(n) = Ω(n^(log_b(a) + eps))  => T(n) = Θ(f(n))              [Root dominates]\n");

    return 0;
}
