/*
 * File: MultiplicativeLoopDemo.c
 * Purpose: Analyzes and benchmarks C loops with multiplicative step updates
 *          (i *= 2, i /= 2, i *= k) to prove exact logarithmic iteration bounds.
 * Mentor: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <math.h>

void test_loop_multiply(int n) {
    int count = 0;
    printf("\n[Testing: for(int i = 1; i < %d; i *= 2)]\n", n);
    for (int i = 1; i < n; i *= 2) {
        printf("  Iteration %2d: i = %6d (which is 2^%d)\n", count + 1, i, count);
        count++;
    }
    printf("Total iterations: %d | ceil(log2(%d)) = %d\n", count, n, (int)ceil(log2((double)n)));
}

void test_loop_divide(int n) {
    int count = 0;
    printf("\n[Testing: for(int i = %d; i > 1; i /= 2)]\n", n);
    for (int i = n; i > 1; i /= 2) {
        printf("  Iteration %2d: i = %6d\n", count + 1, i);
        count++;
    }
    printf("Total iterations: %d | floor(log2(%d)) = %d\n", count, n, (int)floor(log2((double)n)));
}

int main() {
    printf("==================================================================\n");
    printf("  CODER & ACCOTAX - MULTIPLICATIVE LOOP STEP ANALYSIS IN C        \n");
    printf("==================================================================\n");

    test_loop_multiply(64);
    test_loop_divide(100);

    return 0;
}
