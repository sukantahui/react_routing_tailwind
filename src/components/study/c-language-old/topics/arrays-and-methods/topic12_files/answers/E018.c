#include <stdio.h>

void setZeroes(int matrix[][100], int rows, int cols) {
    int firstRowZero = 0, firstColZero = 0;
    for (int j = 0; j < cols; j++)
        if (matrix[0][j] == 0) firstRowZero = 1;
    for (int i = 0; i < rows; i++)
        if (matrix[i][0] == 0) firstColZero = 1;

    for (int i = 1; i < rows; i++) {
        for (int j = 1; j < cols; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (int i = 1; i < rows; i++) {
        for (int j = 1; j < cols; j++) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0)
                matrix[i][j] = 0;
        }
    }

    if (firstRowZero)
        for (int j = 0; j < cols; j++) matrix[0][j] = 0;
    if (firstColZero)
        for (int i = 0; i < rows; i++) matrix[i][0] = 0;
}

int main() {
    int rows, cols, matrix[100][100];
    printf("Enter rows and cols: ");
    scanf("%d %d", &rows, &cols);
    printf("Enter matrix:\n");
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            scanf("%d", &matrix[i][j]);

    setZeroes(matrix, rows, cols);

    printf("Result:\n");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++)
            printf("%d ", matrix[i][j]);
        printf("\n");
    }
    return 0;
}