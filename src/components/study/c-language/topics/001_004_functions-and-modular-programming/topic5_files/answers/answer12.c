/**
 * ============================================================================
 * Project 12: Recursive Sum of Digits & Digital Root Reducer
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

/* 1. Recursive Sum of Digits */
int sumOfDigitsRecursive(long long n) {
    if (n < 0) n = -n;
    if (n == 0) return 0;
    return (n % 10) + sumOfDigitsRecursive(n / 10);
}

/* 2. Recursive Digital Root (Repeated digit sum until 1 single digit remains) */
int digitalRootRecursive(long long n) {
    if (n < 10) return (int)n;
    return digitalRootRecursive(sumOfDigitsRecursive(n));
}

int main(void) {
    printf("===================================================================\n");
    printf("     RECURSIVE DIGITAL ROOT REDUCER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    long long testNumbers[] = {12345, 98765, 493193, 2026};
    int count = sizeof(testNumbers) / sizeof(testNumbers[0]);

    for (int i = 0; i < count; i++) {
        long long num = testNumbers[i];
        int digitSum = sumOfDigitsRecursive(num);
        int dRoot = digitalRootRecursive(num);
        printf("Number: %-10lld -> Sum of Digits = %2d -> Digital Root = %d\n", num, digitSum, dRoot);
    }

    printf("\n===================================================================\n");
    return 0;
}
