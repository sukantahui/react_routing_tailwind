#include <stdio.h>
#include <time.h>

#define ROWS 5000
#define COLS 5000

int matrix[ROWS][COLS];  // static allocation to avoid stack overflow

int main() {
    clock_t start, end;
    double cpu_time_used;

    // Initialize matrix with some values
    for (int i = 0; i < ROWS; i++)
        for (int j = 0; j < COLS; j++)
            matrix[i][j] = i + j;

    // Row‑major traversal (cache friendly)
    start = clock();
    long long sum_row = 0;
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            sum_row += matrix[i][j];
        }
    }
    end = clock();
    cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Row‑major traversal time: %f seconds (sum = %lld)\n", cpu_time_used, sum_row);

    // Column‑major traversal (cache unfriendly)
    start = clock();
    long long sum_col = 0;
    for (int j = 0; j < COLS; j++) {
        for (int i = 0; i < ROWS; i++) {
            sum_col += matrix[i][j];
        }
    }
    end = clock();
    cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Column‑major traversal time: %f seconds (sum = %lld)\n", cpu_time_used, sum_col);

    return 0;
}