#include <stdio.h>

/**
 * Project 9: Matrix Saddle Point Detector
 * Finds saddle point (minimum in its row and maximum in its column).
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#define R 3
#define C 3

void findSaddlePoint(int mat[R][C]) {
    int found = 0;

    for (int i = 0; i < R; i++) {
        // Step 1: Find min element in row i
        int minRowVal = mat[i][0];
        int colIdx = 0;
        for (int j = 1; j < C; j++) {
            if (mat[i][j] < minRowVal) {
                minRowVal = mat[i][j];
                colIdx = j;
            }
        }

        // Step 2: Check if minRowVal is max in column colIdx
        int isSaddle = 1;
        for (int k = 0; k < R; k++) {
            if (mat[k][colIdx] > minRowVal) {
                isSaddle = 0;
                break;
            }
        }

        if (isSaddle) {
            printf("✓ Saddle Point Found: %d at Position (%d, %d)\n", minRowVal, i, colIdx);
            found = 1;
        }
    }

    if (!found) {
        printf("✗ No Saddle Point exists in the matrix.\n");
    }
}

int main(void) {
    int matrix[R][C] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    printf("Matrix (3x3):\n");
    for (int i = 0; i < R; i++) {
        printf("  [ ");
        for (int j = 0; j < C; j++) printf("%d ", matrix[i][j]);
        printf("]\n");
    }
    printf("\n");

    findSaddlePoint(matrix);

    return 0;
}
