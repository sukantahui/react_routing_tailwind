/**
 * ============================================================================
 * Project 13: Register Storage Class Micro-Benchmark for Iteration Loops
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void performRegisterLoopCalculation(int iterations) {
    register int counter;
    register long long accumulator = 0;

    printf("Executing calculation loop for %d iterations using CPU register variables...\n", iterations);

    for (counter = 1; counter <= iterations; counter++) {
        accumulator += (counter * 3) - 1;
    }

    printf(">> Result calculated in registers: %lld\n", accumulator);
}

int main(void) {
    printf("===================================================================\n");
    printf("     REGISTER STORAGE CLASS BENCHMARK - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    performRegisterLoopCalculation(10000);
    performRegisterLoopCalculation(50000);

    printf("\n===================================================================\n");
    return 0;
}
