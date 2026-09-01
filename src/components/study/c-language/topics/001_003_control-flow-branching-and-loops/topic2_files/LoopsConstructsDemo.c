/**
 * ============================================================================
 * Program: LoopsConstructsDemo.c
 * Module: 001_003 - Control Flow: Branching, Decision Making & Loops
 * Topic 2: Iterative Loop Constructs: while, do-while (post-test), for (pre-test)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>

int main(void) {
    printf("===================================================================\n");
    printf("     ITERATIVE LOOP CONSTRUCTS IN C - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* 1. Pre-Test 'for' Loop: Computing Factorial & Sum */
    int n = 5;
    long long factorial = 1;
    int sum = 0;

    printf("--- [1] Pre-Test 'for' Loop (Counting & Accumulation) ---\n");
    for (int i = 1; i <= n; i++) {
        factorial *= i;
        sum += i;
    }
    printf("Calculations for N = %d:\n", n);
    printf("Sum (1 to %d)       : %d\n", n, sum);
    printf("Factorial (%d!)     : %lld\n", n, factorial);

    /* 2. Pre-Test 'while' Loop: Digit Peeling & Number Reversal */
    int originalNumber = 12345;
    int numCopy = originalNumber;
    int reversedNumber = 0;
    int digitCount = 0;

    printf("\n--- [2] Pre-Test 'while' Loop (Digit Extraction) ---\n");
    while (numCopy > 0) {
        int remainder = numCopy % 10;
        reversedNumber = (reversedNumber * 10) + remainder;
        numCopy /= 10;
        digitCount++;
    }
    printf("Original Number     : %d\n", originalNumber);
    printf("Extracted Digits    : %d\n", digitCount);
    printf("Reversed Number     : %d\n", reversedNumber);

    /* 3. Post-Test 'do-while' Loop: Guaranteed Minimum 1 Execution */
    printf("\n--- [3] Post-Test 'do-while' Loop (Guaranteed Entry) ---\n");
    int attemptCounter = 0;
    int simulatedUserPin = 4321;
    int correctPin = 4321;

    do {
        attemptCounter++;
        printf("PIN Validation Attempt #%d: Checking PIN %d...\n", attemptCounter, simulatedUserPin);
        if (simulatedUserPin == correctPin) {
            printf("Access Granted on attempt %d!\n", attemptCounter);
            break;
        }
    } while (attemptCounter < 3);

    printf("===================================================================\n");
    return 0;
}
