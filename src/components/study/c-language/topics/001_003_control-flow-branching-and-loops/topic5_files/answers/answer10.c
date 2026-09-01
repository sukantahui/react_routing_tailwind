/**
 * ============================================================================
 * Project 10: Optimized O(sqrt(N)) Prime Range Generator & Prime Factorization
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

/* Fast Prime Checker: O(sqrt(N)) time complexity */
bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;

    for (int d = 5; d * d <= n; d += 6) {
        if (n % d == 0 || n % (d + 2) == 0) {
            return false;
        }
    }
    return true;
}

/* Print Prime Factorization of an Integer */
void printPrimeFactorization(int n) {
    printf("Prime Factorization of %d: ", n);
    if (n <= 1) {
        printf("None (N <= 1)\n");
        return;
    }

    int temp = n;
    while (temp % 2 == 0) {
        printf("2 ");
        temp /= 2;
    }

    for (int d = 3; d * d <= temp; d += 2) {
        while (temp % d == 0) {
            printf("%d ", d);
            temp /= d;
        }
    }

    if (temp > 2) {
        printf("%d", temp);
    }
    printf("\n");
}

int main(void) {
    printf("===================================================================\n");
    printf("     PRIME GENERATOR & FACTORIZATION ENGINE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    /* 1. Generate All Primes in Range [1, 50] */
    printf("--- [1] Prime Numbers between 1 and 50 ---\n");
    int primeCount = 0;
    for (int num = 1; num <= 50; num++) {
        if (isPrime(num)) {
            printf("%3d ", num);
            primeCount++;
            if (primeCount % 10 == 0) printf("\n");
        }
    }
    printf("\nTotal Primes Found: %d\n\n", primeCount);

    /* 2. Prime Factorization Demonstrations */
    printf("--- [2] Prime Factorization Suite ---\n");
    printPrimeFactorization(360);  /* 2 2 2 3 3 5 */
    printPrimeFactorization(1024); /* 2^10 */
    printPrimeFactorization(9973); /* Prime */

    printf("===================================================================\n");
    return 0;
}
