/**
 * fibonacci.c
 *
 * Generates and prints the first N Fibonacci numbers.
 * Uses two state variables (a, b) and updates iteratively.
 */

#include <stdio.h>

int main() {
    int n;

    printf("How many Fibonacci numbers? ");
    scanf("%d", &n);

    if (n <= 0) {
        printf("Please enter a positive integer.\n");
        return 1;
    }

    unsigned long long a = 0, b = 1;

    printf("Fibonacci series:\n");
    for (int i = 0; i < n; i++) {
        printf("%llu ", a);
        unsigned long long next = a + b;
        a = b;
        b = next;
    }
    printf("\n");

    return 0;
}