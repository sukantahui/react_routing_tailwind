// 📏 Good: one clear purpose, reusable
#include <stdio.h>
#include <stdbool.h>

// Checks if a number is prime (single responsibility)
bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// Uses the reusable function
int main() {
    int numbers[] = {2, 3, 4, 5, 16, 17, 18, 19, 20};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    for (int i = 0; i < size; i++) {
        if (isPrime(numbers[i])) {
            printf("%d is prime\n", numbers[i]);
        } else {
            printf("%d is not prime\n", numbers[i]);
        }
    }
    return 0;
}