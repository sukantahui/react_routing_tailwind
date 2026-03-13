/**
 * rectangle_pattern.c
 *
 * Prints a solid rectangle of asterisks.
 * Rows = 5, Columns = 3.
 */

#include <stdio.h>

int main() {
    int rows = 5;
    int cols = 3;

    for (int row = 0; row < rows; row++) {
        for (int col = 0; col < cols; col++) {
            printf("* ");
        }
        printf("\n");  // move to next line after each row
    }

    return 0;
}