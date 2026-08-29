#include <stdio.h>

#define ROWS 3
#define COLS 4

// Row-Major formula: Address(A[i][j]) = Base + (i * COLS + j) * sizeof(Type)
// Column-Major formula: Address(A[i][j]) = Base + (j * ROWS + i) * sizeof(Type)

int main() {
    printf("=== 2D Matrix Memory Ordering: Row-Major vs Column-Major in C ===\n\n");
    int matrix[ROWS][COLS] = {
        {10, 20, 30, 40},
        {50, 60, 70, 80},
        {90, 100, 110, 120}
    };

    int *basePtr = &matrix[0][0];

    printf("Visualizing 2D Matrix A[%d][%d]:\n", ROWS, COLS);
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            printf("%4d ", matrix[i][j]);
        }
        printf("\n");
    }

    printf("\nFlat 1D Physical RAM Address Layout (Row-Major in C):\n");
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            int offset = i * COLS + j;
            printf("A[%d][%d] -> Flat Offset [%2d] -> Address %p (Value: %d)\n",
                   i, j, offset, (void*)(basePtr + offset), *(basePtr + offset));
        }
    }

    return 0;
}
