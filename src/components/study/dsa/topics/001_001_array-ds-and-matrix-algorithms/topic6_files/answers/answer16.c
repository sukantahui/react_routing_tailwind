#include <stdio.h>
#include <stdbool.h>

#define N 3

bool is_symmetric(int matrix[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = i + 1; j < N; j++) {
            if (matrix[i][j] != matrix[j][i]) {
                return false;
            }
        }
    }
    return true;
}

int main() {
    int sym_matrix[N][N] = {
        {1, 2, 3},
        {2, 4, 5},
        {3, 5, 6}
    };

    printf("--- Matrix Symmetry Validator ---\n");
    if (is_symmetric(sym_matrix)) {
        printf("Result: Matrix is Symmetric (A == A^T).\n");
    } else {
        printf("Result: Matrix is NOT Symmetric.\n");
    }

    return 0;
}
