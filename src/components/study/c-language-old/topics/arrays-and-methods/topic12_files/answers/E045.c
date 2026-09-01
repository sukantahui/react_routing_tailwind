#include <stdio.h>

void searchMatrix(int matrix[][100], int rows, int cols, int target) {
    int i = 0, j = cols - 1;
    while (i < rows && j >= 0) {
        if (matrix[i][j] == target) {
            printf("Element found at (%d,%d)\n", i, j);
            return;
        }
        if (matrix[i][j] > target) j--;
        else i++;
    }
    printf("Element not found\n");
}

int main() {
    int rows, cols, matrix[100][100], target;
    printf("Enter rows and cols: ");
    scanf("%d %d", &rows, &cols);
    printf("Enter matrix (row and column sorted):\n");
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            scanf("%d", &matrix[i][j]);
    printf("Enter target: ");
    scanf("%d", &target);

    searchMatrix(matrix, rows, cols, target);
    return 0;
}