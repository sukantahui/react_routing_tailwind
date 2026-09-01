/**
 * ============================================================================
 * Project 16: Collatz Conjecture (3N + 1 Hailstone Sequence) Step Analyzer
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void analyzeCollatzSequence(long long startNum) {
    printf("--- Collatz Sequence Analysis for N = %lld ---\n", startNum);
    long long current = startNum;
    long long stepCount = 0;
    long long peakValue = startNum;

    printf("Sequence: %lld", current);

    while (current != 1) {
        if (current % 2 == 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }

        if (current > peakValue) {
            peakValue = current;
        }

        stepCount++;
        printf(" -> %lld", current);
        if (stepCount % 10 == 0) printf("\n         ");
    }

    printf("\n\n>> Summary Report:\n");
    printf("  • Total Steps to Reach 1 : %lld\n", stepCount);
    printf("  • Maximum Peak Value Hit : %lld\n\n", peakValue);
}

int main(void) {
    printf("===================================================================\n");
    printf("     COLLATZ CONJECTURE (3N + 1) ANALYZER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    analyzeCollatzSequence(6);
    analyzeCollatzSequence(27); // Famous for taking 111 steps and peaking at 9232!

    printf("===================================================================\n");
    return 0;
}
