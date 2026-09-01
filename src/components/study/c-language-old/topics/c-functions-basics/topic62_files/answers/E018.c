#include <stdio.h>

void setZeroes(int matrix[][100], int m, int n) {
    int firstRowZero = 0, firstColZero = 0;
    for (int j = 0; j < n; j++)
        if (matrix[0][j] == 0) firstRowZero = 1;
    for (int i = 0; i < m; i++)
        if (matrix[i][0] == 0) firstColZero = 1;

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (int i = 1; i < m; i++) {
        if (matrix[i][0] == 0)
            for (int j = 1; j < n; j++) matrix[i][j] = 0;
    }
    for (int j = 1; j < n; j++) {
        if (matrix[0][j] == 0)
            for (int i = 1; i < m; i++) matrix[i][j] = 0;
    }
    if (firstRowZero)
        for (int j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstColZero)
        for (int i = 0; i < m; i++) matrix[i][0] = 0;
}

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    int mat[100][100];
    printf("Matrix:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &mat[i][j]);

    setZeroes(mat, m, n);

    printf("Result:\n");
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++)
            printf("%d ", mat[i][j]);
        printf("\n");
    }
    return 0;
}
