/**
 * ============================================================================
 * Project 10: Recursive Fibonacci Memoization Cache with Static Lookup Array
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

#define MAX_CACHE 90

/* Recursive Fibonacci with Static Memoization Cache: Reduces O(2^N) to O(N)! */
unsigned long long fibonacciMemoized(int n) {
    static unsigned long long memo[MAX_CACHE] = {0};
    static int initialized = 0;

    if (!initialized) {
        memo[0] = 0;
        memo[1] = 1;
        initialized = 1;
    }

    if (n <= 0) return 0;
    if (n == 1) return 1;

    /* If already cached, return immediately! */
    if (memo[n] != 0) {
        return memo[n];
    }

    /* Compute and store in static cache */
    memo[n] = fibonacciMemoized(n - 1) + fibonacciMemoized(n - 2);
    return memo[n];
}

int main(void) {
    printf("===================================================================\n");
    printf("     MEMOIZED RECURSIVE FIBONACCI ACCELERATOR - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    printf("Computing Fibonacci terms with O(N) Memoization Cache:\n\n");
    for (int i = 0; i <= 20; i += 2) {
        printf("  • Fibonacci(%2d) = %llu\n", i, fibonacciMemoized(i));
    }

    printf("  • Fibonacci(50) = %llu (Instantaneous via static cache!)\n", fibonacciMemoized(50));

    printf("\n===================================================================\n");
    return 0;
}
