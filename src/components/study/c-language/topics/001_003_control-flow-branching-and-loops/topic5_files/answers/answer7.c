/**
 * ============================================================================
 * Project 7: High-Precision Factorial & Combinatorics Permutations Engine
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

/* Compute Factorial using 64-bit unsigned integer */
unsigned long long calculateFactorial(int n) {
    if (n < 0 || n > 20) return 0; // Prevent 64-bit integer overflow
    unsigned long long fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    return fact;
}

/* Compute Combinations nCr iteratively without large factorial overflow */
unsigned long long calculateNCR(int n, int r) {
    if (r < 0 || r > n) return 0;
    if (r == 0 || r == n) return 1;
    if (r > n / 2) r = n - r; // Symmetry property: nCr = nC(n-r)

    unsigned long long res = 1;
    for (int i = 1; i <= r; i++) {
        res = res * (n - i + 1) / i;
    }
    return res;
}

/* Compute Permutations nPr */
unsigned long long calculateNPR(int n, int r) {
    if (r < 0 || r > n) return 0;
    unsigned long long res = 1;
    for (int i = 0; i < r; i++) {
        res *= (n - i);
    }
    return res;
}

int main(void) {
    printf("===================================================================\n");
    printf("     COMBINATORICS & FACTORIAL ENGINE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    int testPairs[][2] = {
        {5, 2},
        {10, 3},
        {15, 4},
        {20, 5}
    };

    int total = sizeof(testPairs) / sizeof(testPairs[0]);

    for (int i = 0; i < total; i++) {
        int n = testPairs[i][0];
        int r = testPairs[i][1];

        unsigned long long factN = calculateFactorial(n);
        unsigned long long nCr = calculateNCR(n, r);
        unsigned long long nPr = calculateNPR(n, r);

        printf("Parameters: N = %2d, R = %2d\n", n, r);
        printf("  • Factorial (%d!)       : %llu\n", n, factN);
        printf("  • Permutations P(%d,%d)  : %llu\n", n, r, nPr);
        printf("  • Combinations C(%d,%d)  : %llu\n\n", n, r, nCr);
    }

    printf("===================================================================\n");
    return 0;
}
