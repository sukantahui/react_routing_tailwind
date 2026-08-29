#include <stdio.h>

#define ROWS 3
#define COLS 4

void calculate_sums(int grid[ROWS][COLS]) {
    int grand_total = 0;

    printf("--- 2D Grid Row & Column Sum Analysis ---\n");
    for (int i = 0; i < ROWS; i++) {
        int row_sum = 0;
        printf("Row %d: [ ", i);
        for (int j = 0; j < COLS; j++) {
            printf("%d ", grid[i][j]);
            row_sum += grid[i][j];
        }
        printf("] -> Sum = %d\n", row_sum);
        grand_total += row_sum;
    }

    printf("----------------------------------\nColumn Sums: ");
    for (int j = 0; j < COLS; j++) {
        int col_sum = 0;
        for (int i = 0; i < ROWS; i++) {
            col_sum += grid[i][j];
        }
        printf("Col %d=%d | ", j, col_sum);
    }
    printf("\nGrand Matrix Total = %d\n", grand_total);
}

int main() {
    int grid[ROWS][COLS] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    calculate_sums(grid);
    return 0;
}
