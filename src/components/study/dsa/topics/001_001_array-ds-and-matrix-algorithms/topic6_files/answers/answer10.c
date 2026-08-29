#include <stdio.h>

#define R 3
#define C 3

void find_saddle_point(int matrix[R][C]) {
    int found = 0;

    for (int i = 0; i < R; i++) {
        // Step 1: Find minimum element in row i
        int min_row_val = matrix[i][0];
        int col_idx = 0;

        for (int j = 1; j < C; j++) {
            if (matrix[i][j] < min_row_val) {
                min_row_val = matrix[i][j];
                col_idx = j;
            }
        }

        // Step 2: Check if min_row_val is maximum element in column col_idx
        int is_saddle = 1;
        for (int k = 0; k < R; k++) {
            if (matrix[k][col_idx] > min_row_val) {
                is_saddle = 0;
                break;
            }
        }

        // Step 3: Report saddle point
        if (is_saddle) {
            printf("Saddle Point found at Position Matrix[%d][%d] = %d\n", i, col_idx, min_row_val);
            found = 1;
        }
    }

    if (!found) {
        printf("No Saddle Point exists in the given matrix.\n");
    }
}

int main() {
    int matrix[R][C] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    printf("--- Matrix Saddle Point Search Engine ---\n");
    find_saddle_point(matrix);

    return 0;
}
