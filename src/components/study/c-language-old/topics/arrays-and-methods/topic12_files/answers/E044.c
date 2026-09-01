#include <stdio.h>

int countLessEqual(int matrix[][100], int rows, int cols, int x) {
    int count = 0;
    for (int i = 0; i < rows; i++) {
        int left = 0, right = cols - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (matrix[i][mid] <= x) left = mid + 1;
            else right = mid - 1;
        }
        count += left;
    }
    return count;
}

int findMedian(int matrix[][100], int rows, int cols) {
    int low = matrix[0][0], high = matrix[0][cols - 1];
    for (int i = 1; i < rows; i++) {
        if (matrix[i][0] < low) low = matrix[i][0];
        if (matrix[i][cols - 1] > high) high = matrix[i][cols - 1];
    }

    int desired = (rows * cols + 1) / 2;

    while (low < high) {
        int mid = low + (high - low) / 2;
        int count = countLessEqual(matrix, rows, cols, mid);
        if (count < desired) low = mid + 1;
        else high = mid;
    }
    return low;
}

int main() {
    int rows, cols, matrix[100][100];
    printf("Enter rows and cols: ");
    scanf("%d %d", &rows, &cols);
    printf("Enter matrix row by row (sorted):\n");
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            scanf("%d", &matrix[i][j]);

    int median = findMedian(matrix, rows, cols);
    printf("Median = %d\n", median);
    return 0;
}