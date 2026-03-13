/**
 * factorial.c
 *
 * Computes the factorial of a non‑negative integer using a for loop.
 * Demonstrates the product accumulator pattern.
 */

#include <stdio.h>

int main() {
    int n;
    long long fact = 1;  // 0! = 1, so initialise with 1

    printf("Enter a non‑negative integer: ");
    scanf("%d", &n);

    if (n < 0) {
        printf("❌ Factorial is not defined for negative numbers.\n");
        return 1;
    }

    for (int i = 1; i <= n; i++) {
        fact *= i;  // multiply each integer
    }

    printf("%d! = %lld\n", n, fact);
    return 0;
}