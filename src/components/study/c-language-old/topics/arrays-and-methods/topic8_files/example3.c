#include <stdio.h>

int main() {
    int matrix[3][4] = {
        {2, 4, 6, 8},
        {1, 3, 5, 7},
        {10, 20, 30, 40}
    };

    int rows = 3, cols = 4;
    int sum = 0;

    // Compute sum of all elements
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            sum += matrix[r][c];
        }
    }

    printf("Sum of all elements = %d\n", sum);

    // Compute row-wise sums
    printf("\nRow-wise sums:\n");
    for (int r = 0; r < rows; r++) {
        int rowSum = 0;
        for (int c = 0; c < cols; c++) {
            rowSum += matrix[r][c];
        }
        printf("Row %d sum = %d\n", r, rowSum);
    }

    return 0;
}