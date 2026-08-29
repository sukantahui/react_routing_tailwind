#include <stdio.h>

#define N 3

void process_diagonals(int matrix[N][N]) {
    int main_trace = 0, anti_trace = 0;

    printf("--- Matrix Diagonals Extractor ---\n");
    printf("Main Diagonal: [ ");
    for (int i = 0; i < N; i++) {
        printf("%d ", matrix[i][i]);
        main_trace += matrix[i][i];
    }
    printf("] -> Trace Sum = %d\n", main_trace);

    printf("Anti-Diagonal: [ ");
    for (int i = 0; i < N; i++) {
        printf("%d ", matrix[i][N - 1 - i]);
        anti_trace += matrix[i][N - 1 - i];
    }
    printf("] -> Anti-Diagonal Sum = %d\n", anti_trace);
}

int main() {
    int matrix[N][N] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    process_diagonals(matrix);
    return 0;
}
