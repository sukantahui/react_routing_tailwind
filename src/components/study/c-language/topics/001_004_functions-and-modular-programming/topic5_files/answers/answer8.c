/**
 * ============================================================================
 * Project 8: Tail-Recursive Accumulator Engine vs Non-Tail Execution
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

/* 1. Non-Tail Recursive Sum: Pending addition on stack unwinding */
long long sumNonTail(int n) {
    if (n <= 1) return n;
    return n + sumNonTail(n - 1); // Non-tail: addition happens AFTER return!
}

/* 2. Tail Recursive Sum: Accumulator passes intermediate result forward */
long long sumTail(int n, long long accumulator) {
    if (n <= 0) return accumulator;
    return sumTail(n - 1, accumulator + n); // Pure tail call: eligible for TCO!
}

int main(void) {
    printf("===================================================================\n");
    printf("     TAIL RECURSION ACCUMULATOR LAB - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    int testN = 100;

    printf("Sum from 1 to %d:\n", testN);
    printf("  • Non-Tail Recursive Result : %lld (O(N) Stack Frames)\n", sumNonTail(testN));
    printf("  • Tail-Recursive Result     : %lld (O(1) Stack Frames under TCO)\n", sumTail(testN, 0));

    printf("\n>> Summary: Tail calls pass running totals in the accumulator argument,\n");
    printf("   allowing compilers to reuse stack frames and prevent stack overflows!\n");
    printf("===================================================================\n");
    return 0;
}
