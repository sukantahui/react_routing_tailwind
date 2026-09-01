#include <stdio.h>

/**
 * ArrayMatrixDemo.c
 * 1D Array manipulation & 2D Matrix Transposition
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    int arr[5] = {12, 45, 67, 23, 89};
    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int transpose[3][2];
    int i, j;

    printf("=== 1D & 2D Contiguous Memory Layout ===\n\n");

    printf("1D Array Elements & Addresses:\n");
    for (i = 0; i < 5; i++) {
        printf("arr[%d] = %d (RAM Address: %p)\n", i, arr[i], (void*)&arr[i]);
    }

    printf("\nOriginal 2x3 Matrix:\n");
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
            transpose[j][i] = matrix[i][j];
        }
        printf("\n");
    }

    printf("\nTransposed 3x2 Matrix:\n");
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 2; j++) {
            printf("%d ", transpose[i][j]);
        }
        printf("\n");
    }

    return 0;
}
