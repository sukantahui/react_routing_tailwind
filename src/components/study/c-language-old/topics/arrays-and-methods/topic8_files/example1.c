#include <stdio.h>

int main() {
    // Declare and initialize a 3x4 matrix
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    // Print the matrix using nested loops
    printf("Matrix (3 rows, 4 columns):\n");
    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 4; col++) {
            printf("%4d", matrix[row][col]); // %4d for alignment
        }
        printf("\n"); // new line after each row
    }

    return 0;
}