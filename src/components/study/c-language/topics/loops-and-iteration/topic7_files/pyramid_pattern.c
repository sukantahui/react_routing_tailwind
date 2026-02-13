/**
 * pyramid_pattern.c
 *
 * Prints a centered pyramid of asterisks.
 * Height = 5.
 * Each row: spaces + stars.
 */

#include <stdio.h>

int main() {
    int height = 5;

    for (int row = 0; row < height; row++) {
        // print leading spaces
        for (int space = 0; space < height - row - 1; space++) {
            printf("  ");
        }
        // print stars
        for (int star = 0; star < (2 * row + 1); star++) {
            printf("* ");
        }
        printf("\n");
    }

    return 0;
}