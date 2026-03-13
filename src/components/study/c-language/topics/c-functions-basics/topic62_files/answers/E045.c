#include <stdio.h>
#include <stdbool.h>

bool searchMatrix(int matrix[][100], int m, int n, int target, int *row, int *col) {
    int i = 0, j = n - 1;
    while (i < m && j >= 0) {
        if (matrix[i][j] == target) {
            *row = i; *col = j;
            return true;
        } else if (matrix[i][j] > target) {
            j--;
        } else {
            i++;
        }
    }
    return false;
}

int main() {
    int m, n, target;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    int mat[100][100];
    printf("Matrix:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &mat[i][j]);
    printf("Target: ");
    scanf("%d", &target);

    int row, col;
    if (searchMatrix(mat, m, n, target, &row, &col))
        printf("Element found at (%d,%d)\n", row, col);
    else
        printf("Element not found\n");
    return 0;
}
