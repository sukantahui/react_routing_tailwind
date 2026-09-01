/**
 * ============================================================================
 * Program: RecursionStackDemo.c
 * Module: 001_004 - Functions & Modular Programming
 * Topic 4: Recursion: Base Condition, Stack Frame Expansion & Tail Calls
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>

/* ============================================================================
 * 1. CLASSIC RECURSION: Factorial with Call Stack Trace
 * ============================================================================ */
unsigned long long calculateFactorial(int n, int depth) {
    for (int i = 0; i < depth; i++) printf("  ");
    printf("-> Entering fact(%d) [Stack Depth %d]\n", n, depth);

    /* BASE CASE: Halts recursion and begins call stack unwinding */
    if (n <= 1) {
        for (int i = 0; i < depth; i++) printf("  ");
        printf("<- Base Case Reached at fact(1) = 1 [Unwinding Begins]\n");
        return 1;
    }

    /* RECURSIVE STEP: fact(n) = n * fact(n-1) */
    unsigned long long subResult = calculateFactorial(n - 1, depth + 1);
    unsigned long long result = n * subResult;

    for (int i = 0; i < depth; i++) printf("  ");
    printf("<- Returning from fact(%d): %d * %llu = %llu\n", n, n, subResult, result);
    return result;
}

/* ============================================================================
 * 2. TAIL RECURSION: Accumulator passed along; optimized by modern compilers
 * ============================================================================ */
unsigned long long factorialTailRecursive(int n, unsigned long long accumulator) {
    if (n <= 1) return accumulator;
    return factorialTailRecursive(n - 1, n * accumulator); // Pure tail call
}

/* ============================================================================
 * 3. MULTI-BRANCH RECURSION: Fibonacci Sequence
 * ============================================================================ */
int calculateFibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

/* ============================================================================
 * 4. CLASSIC RECURSIVE PUZZLE: Tower of Hanoi 3-Peg Solver
 * ============================================================================ */
void solveTowerOfHanoi(int disks, char source, char destination, char auxiliary) {
    if (disks == 1) {
        printf("   Move disk 1 from peg %c -> peg %c\n", source, destination);
        return;
    }
    solveTowerOfHanoi(disks - 1, source, auxiliary, destination);
    printf("   Move disk %d from peg %c -> peg %c\n", disks, source, destination);
    solveTowerOfHanoi(disks - 1, auxiliary, destination, source);
}

int main(void) {
    printf("===================================================================\n");
    printf("     RECURSION & CALL STACK ANALYSIS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* 1. Factorial Call Stack Visualization */
    printf("--- [1] Factorial Call Stack Expansion & Unwinding (N = 4) ---\n");
    unsigned long long factResult = calculateFactorial(4, 0);
    printf("Final Calculated Factorial (4!) = %llu\n\n", factResult);

    /* 2. Tail Recursion */
    printf("--- [2] Tail Recursive Factorial (N = 5, Accumulator = 1) ---\n");
    printf("5! via Tail Recursion = %llu\n\n", factorialTailRecursive(5, 1));

    /* 3. Fibonacci Sequence */
    printf("--- [3] Recursive Fibonacci Terms [0 to 7] ---\n");
    for (int i = 0; i <= 7; i++) {
        printf("Fib(%d) = %d  ", i, calculateFibonacci(i));
    }
    printf("\n\n");

    /* 4. Tower of Hanoi */
    printf("--- [4] Tower of Hanoi Solution (3 Disks: A -> C via B) ---\n");
    solveTowerOfHanoi(3, 'A', 'C', 'B');

    printf("\n===================================================================\n");
    return 0;
}
