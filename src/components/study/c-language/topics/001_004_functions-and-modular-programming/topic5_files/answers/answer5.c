/**
 * ============================================================================
 * Project 5: Mathematical Recursion Suite: Factorial, GCD, and Binary Exponentiation
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

/* 1. Recursive Factorial */
unsigned long long recFactorial(int n) {
    if (n <= 1) return 1;
    return n * recFactorial(n - 1);
}

/* 2. Recursive Euclidean GCD */
long long recGCD(long long a, long long b) {
    if (b == 0) return a;
    return recGCD(b, a % b);
}

/* 3. Recursive Fast Power: X^N in O(log N) */
double recFastPower(double base, int exp) {
    if (exp == 0) return 1.0;
    if (exp < 0) return 1.0 / recFastPower(base, -exp);

    double half = recFastPower(base, exp / 2);
    if (exp % 2 == 0) return half * half;
    return base * half * half;
}

int main(void) {
    printf("===================================================================\n");
    printf("     MATHEMATICAL RECURSION SUITE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    printf("1. Recursive Factorial (6!)   : %llu\n", recFactorial(6));
    printf("2. Recursive GCD (252, 105)   : %lld\n", recGCD(252, 105));
    printf("3. Recursive Fast Power (2^10): %.2f\n", recFastPower(2.0, 10));
    printf("4. Recursive Fast Power (3^5) : %.2f\n", recFastPower(3.0, 5));

    printf("===================================================================\n");
    return 0;
}
