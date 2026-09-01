#include <stdio.h>

/**
 * PatternAndLoopsDemo.c
 * Pyramid Pattern & Loop Logic Utility
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    int rows = 5, i, j, space;

    printf("=== Pyramid Pattern Printing in C ===\n\n");

    for (i = 1; i <= rows; i++) {
        // Print leading spaces
        for (space = 1; space <= rows - i; space++) {
            printf(" ");
        }
        // Print stars
        for (j = 1; j <= (2 * i - 1); j++) {
            printf("*");
        }
        printf("\n");
    }

    return 0;
}
