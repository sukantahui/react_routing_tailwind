/**
 * for_sum.c
 *
 * Computes the sum of first N natural numbers using a for loop.
 * User inputs N.
 */

#include <stdio.h>

int main() {
    int n, sum = 0;
    printf("Enter a positive integer: ");
    scanf("%d", &n);

    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    printf("Sum = %d\n", sum);
    return 0;
}