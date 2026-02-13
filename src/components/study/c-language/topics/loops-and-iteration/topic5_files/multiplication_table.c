/**
 * multiplication_table.c
 *
 * Prints the multiplication table of a given number up to 10.
 * Uses a simple for loop with fixed iteration count.
 */

#include <stdio.h>

int main() {
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    printf("\n📋 Multiplication table of %d:\n", n);
    printf("------------------------\n");
    for (int i = 1; i <= 10; i++) {
        printf("%2d × %2d = %3d\n", n, i, n * i);
    }

    return 0;
}