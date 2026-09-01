/**
 * triangle_pattern.c
 *
 * Prints a right‑angled triangle of asterisks.
 * Height = 5, each row has (row+1) stars.
 */

#include <stdio.h>

int main() {
    int height = 5;

    for (int row = 0; row < height; row++) {
        for (int col = 0; col <= row; col++) {
            printf("* ");
        }
        printf("\n");
    }

    return 0;
}