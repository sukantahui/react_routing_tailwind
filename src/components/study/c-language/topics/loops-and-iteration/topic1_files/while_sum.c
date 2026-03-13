/**
 * while_sum.c
 *
 * Computes the sum of first N natural numbers using while loop.
 * User inputs N.
 */

#include <stdio.h>

int main() {
    int n, i = 1, sum = 0;
    printf("Enter a positive integer: ");
    scanf("%d", &n);

    while (i <= n) {
        sum += i;
        i++;
    }
    printf("Sum = %d\n", sum);
    return 0;
}