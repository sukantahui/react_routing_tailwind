#include <stdio.h>
#include <stdlib.h>

int** generateMatrix(int n, int *returnSize, int **returnColumnSizes) {
    *returnSize = n;
    *returnColumnSizes = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) (*returnColumnSizes)[i] = n;

    int **matrix = (int**)malloc(n * sizeof(int*));
    for (int i = 0; i < n; i++)
        matrix[i] = (int*)malloc(n * sizeof(int));

    int top = 0, bottom = n-1, left = 0, right = n-1;
    int num = 1;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) matrix[top][j] = num++;
        top++;
        for (int i = top; i <= bottom; i++) matrix[i][right] = num++;
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) matrix[bottom][j] = num++;
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) matrix[i][left] = num++;
            left++;
        }
    }
    return matrix;
}

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    int size;
    int *colSizes;
    int **mat = generateMatrix(n, &size, &colSizes);

    for (int i = 0; i < size; i++) {
        for (int j = 0; j < colSizes[i]; j++)
            printf("%d ", mat[i][j]);
        printf("\n");
        free(mat[i]);
    }
    free(mat);
    free(colSizes);
    return 0;
}
