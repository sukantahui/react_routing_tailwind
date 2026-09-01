#include <stdio.h>

int main() {
    // Create a 2x3 matrix (2 rows, 3 columns)
    int table[2][3] = {
        {10, 20, 30},
        {40, 50, 60}
    };

    // Print original
    printf("Original table:\n");
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%d ", table[r][c]);
        }
        printf("\n");
    }

    // Modify element at row 1, column 2 (zero-based)
    table[1][2] = 99;
    printf("\nAfter modifying table[1][2] to 99:\n");
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%d ", table[r][c]);
        }
        printf("\n");
    }

    return 0;
}