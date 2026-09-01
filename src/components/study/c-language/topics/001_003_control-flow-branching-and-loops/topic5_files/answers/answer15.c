/**
 * ============================================================================
 * Project 15: Euclidean Algorithm Greatest Common Divisor & Least Common Multiple
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

/* Fast Euclidean GCD Algorithm using modulo while loop */
long long calculateGCD(long long a, long long b) {
    while (b != 0) {
        long long rem = a % b;
        a = b;
        b = rem;
    }
    return a;
}

/* Calculate LCM using mathematical duality: LCM = (a * b) / GCD(a, b) */
long long calculateLCM(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    long long gcd = calculateGCD(a, b);
    return (a / gcd) * b; // Divide first to prevent integer overflow
}

int main(void) {
    printf("===================================================================\n");
    printf("     EUCLIDEAN GCD & LCM ACCELERATOR - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    long long testPairs[][2] = {
        {48, 18},
        {105, 35},
        {270, 192},
        {1000000LL, 250000LL},
        {17, 19} // Coprime
    };

    int count = sizeof(testPairs) / sizeof(testPairs[0]);

    for (int i = 0; i < count; i++) {
        long long a = testPairs[i][0];
        long long b = testPairs[i][1];
        long long gcd = calculateGCD(a, b);
        long long lcm = calculateLCM(a, b);

        printf("Pair (%lld, %lld):\n", a, b);
        printf("  • Greatest Common Divisor (GCD) : %lld\n", gcd);
        printf("  • Least Common Multiple   (LCM) : %lld\n\n", lcm);
    }

    printf("===================================================================\n");
    return 0;
}
