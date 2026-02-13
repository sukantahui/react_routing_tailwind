/**
 * prime_check.c
 *
 * Efficiently checks whether a given number is prime.
 * Uses the √n optimisation and handles edge cases.
 */

#include <stdio.h>
#include <stdbool.h>

bool isPrime(int n) {
    if (n <= 1) return false;   // 0 and 1 are not prime
    if (n == 2) return true;    // 2 is the only even prime
    if (n % 2 == 0) return false; // other even numbers are not prime

    // Check odd divisors up to √n
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) {
            return false;       // divisor found → not prime
        }
    }
    return true;                // no divisors → prime
}

int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);

    if (isPrime(num)) {
        printf("✅ %d is a prime number.\n", num);
    } else {
        printf("❌ %d is not a prime number.\n", num);
    }

    return 0;
}