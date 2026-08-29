#include <stdio.h>

typedef struct {
    int row;
    int col;
    int value;
} Element;

void compress_sparse_matrix(int rows, int cols, int matrix[rows][cols], Element sparse[], int *count) {
    int k = 0;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (matrix[i][j] != 0) {
                sparse[k].row = i;
                sparse[k].col = j;
                sparse[k].value = matrix[i][j];
                k++;
            }
        }
    }
    *count = k;
}

int main() {
    int matrix[4][5] = {
        {0, 0, 3, 0, 4},
        {0, 0, 0, 5, 0},
        {0, 2, 0, 0, 0},
        {0, 0, 0, 0, 7}
    };

    Element sparse[20];
    int non_zero_count = 0;

    compress_sparse_matrix(4, 5, matrix, sparse, &non_zero_count);

    printf("--- Sparse Matrix Compression (Coordinate List format) ---\n");
    printf("Original Matrix Dimensions: 4 Rows x 5 Cols (Total Elements = 20)\n");
    printf("Non-Zero Count: %d\n\n", non_zero_count);

    printf("Index | Row | Col | Value\n");
    printf("-------------------------\n");
    for (int i = 0; i < non_zero_count; i++) {
        printf("  %d   |  %d  |  %d  |   %d\n", i, sparse[i].row, sparse[i].col, sparse[i].value);
    }

    double memory_saved = (1.0 - ((double)(non_zero_count * 3 * sizeof(int)) / (20 * sizeof(int)))) * 100.0;
    printf("\nMemory Footprint Reduction: %.2f%%\n", memory_saved);

    return 0;
}
