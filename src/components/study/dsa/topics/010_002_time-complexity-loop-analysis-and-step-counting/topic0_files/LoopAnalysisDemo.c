/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Loop Complexity Analysis, Discrete Summations & Sieve Harmonics
 * File: LoopAnalysisDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>

// 1. Dependent Nested Loop Analysis: Sum_{i=1 to N} i = N*(N+1)/2 = O(N^2)
unsigned long long dependentNestedLoops(int n) {
    unsigned long long stepCounter = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            stepCounter++; // Executed 1 + 2 + 3 + ... + N times
        }
    }
    return stepCounter;
}

// 2. Geometric Jump Loop: i doubles every step -> O(log2 N)
unsigned long long geometricJumpLoop(int n) {
    unsigned long long stepCounter = 0;
    for (int i = 1; i <= n; i *= 2) {
        stepCounter++; // Executed ceil(log2 N) + 1 times
    }
    return stepCounter;
}

// 3. Square Root Loop: i * i <= N -> O(sqrt(N))
unsigned long long squareRootLoop(int n) {
    unsigned long long stepCounter = 0;
    for (int i = 1; i * i <= n; i++) {
        stepCounter++; // Executed floor(sqrt(N)) times
    }
    return stepCounter;
}

// 4. Sieve of Eratosthenes Harmonic Prime Summation: O(N log(log N))
int sieveOfEratosthenes(int n) {
    bool* isPrime = (bool*)malloc((n + 1) * sizeof(bool));
    for (int i = 0; i <= n; i++) isPrime[i] = true;
    isPrime[0] = isPrime[1] = false;

    unsigned long long innerOperations = 0;

    for (int p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            // Harmonic summation of primes: N/2 + N/3 + N/5 + N/7 + ... = O(N log log N)
            for (int i = p * p; i <= n; i += p) {
                isPrime[i] = false;
                innerOperations++;
            }
        }
    }

    int primeCount = 0;
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) primeCount++;
    }

    printf("   • Sieve up to N = %d: Found %d primes in %llu inner marking steps!\n", n, primeCount, innerOperations);

    free(isPrime);
    return primeCount;
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - LOOP ANALYSIS & DISCRETE SUMMATIONS       \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    int n = 100;
    printf("Loop Step Counts for N = %d:\n", n);
    printf("-----------------------------------------------------------------\n");

    unsigned long long depSteps = dependentNestedLoops(n);
    printf("1. Dependent Loop: for(i=1..N) for(j=1..i) -> %llu steps (Formula: N*(N+1)/2 = %d)\n",
           depSteps, n * (n + 1) / 2);

    unsigned long long geomSteps = geometricJumpLoop(n);
    printf("2. Geometric Loop: for(i=1; i<=N; i*=2)    -> %llu steps (O(log2 N))\n", geomSteps);

    unsigned long long sqrtSteps = squareRootLoop(n);
    printf("3. Sqrt Loop:      for(i=1; i*i<=N; i++)   -> %llu steps (O(sqrt(N)) = %d)\n\n", sqrtSteps, (int)sqrt(n));

    printf("4. Prime Sieve Harmonic Complexity Demonstration:\n");
    sieveOfEratosthenes(100);
    sieveOfEratosthenes(1000);
    sieveOfEratosthenes(10000);

    return 0;
}
