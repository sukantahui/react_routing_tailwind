/**
 * sum_numbers.c
 *
 * Computes the sum of first N natural numbers using a for loop.
 * Classic accumulator pattern with sum = 0 initialisation.
 */

#include <stdio.h>

int main() {
    int n, sum = 0;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    if (n <= 0) {
        printf("❌ Please enter a positive number.\n");
        return 1;
    }

    for (int i = 1; i <= n; i++) {
        sum += i;
    }

    printf("Sum of 1 to %d = %d\n", n, sum);
    return 0;
}