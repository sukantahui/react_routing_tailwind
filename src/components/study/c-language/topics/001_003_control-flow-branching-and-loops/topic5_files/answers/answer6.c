/**
 * ============================================================================
 * Project 6: Number Properties Multi-Inspector (Prime, Armstrong, Perfect, Strong)
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

/* Compute Factorial of a Digit */
int factorialDigit(int d) {
    int f = 1;
    for (int i = 1; i <= d; i++) f *= i;
    return f;
}

void inspectNumber(int num) {
    printf("--- Analyzing Integer: %d ---\n", num);

    /* 1. Prime Check (Optimized up to sqrt(N)) */
    bool isPrime = (num >= 2);
    for (int d = 2; d * d <= num; d++) {
        if (num % d == 0) { isPrime = false; break; }
    }

    /* 2. Armstrong (Narcissistic) Check for Any Digit Length */
    int temp = num, digitCount = 0;
    while (temp > 0) { digitCount++; temp /= 10; }

    temp = num;
    int armstrongSum = 0;
    while (temp > 0) {
        int rem = temp % 10;
        int p = 1;
        for (int i = 0; i < digitCount; i++) p *= rem;
        armstrongSum += p;
        temp /= 10;
    }
    bool isArmstrong = (armstrongSum == num);

    /* 3. Perfect Number Check */
    int properDivisorSum = 0;
    for (int i = 1; i <= num / 2; i++) {
        if (num % i == 0) properDivisorSum += i;
    }
    bool isPerfect = (properDivisorSum == num && num > 0);

    /* 4. Strong (Krishnamurthy) Number Check */
    temp = num;
    int strongSum = 0;
    while (temp > 0) {
        strongSum += factorialDigit(temp % 10);
        temp /= 10;
    }
    bool isStrong = (strongSum == num && num > 0);

    /* Print Summary Report */
    printf("  • Prime Status       : %s\n", isPrime ? "PRIME" : "NOT PRIME");
    printf("  • Armstrong Status   : %s (Digit power sum: %d)\n", isArmstrong ? "ARMSTRONG" : "NOT ARMSTRONG", armstrongSum);
    printf("  • Perfect Number     : %s (Divisor sum: %d)\n", isPerfect ? "PERFECT" : "NOT PERFECT", properDivisorSum);
    printf("  • Strong Number      : %s (Factorial sum: %d)\n\n", isStrong ? "STRONG / KRISHNAMURTHY" : "NOT STRONG", strongSum);
}

int main(void) {
    printf("===================================================================\n");
    printf("     NUMBER PROPERTIES MULTI-INSPECTOR - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    inspectNumber(153);  /* Armstrong: 1^3 + 5^3 + 3^3 */
    inspectNumber(28);   /* Perfect: 1 + 2 + 4 + 7 + 14 */
    inspectNumber(145);  /* Strong: 1! + 4! + 5! = 145 */
    inspectNumber(29);   /* Prime */

    printf("===================================================================\n");
    return 0;
}
