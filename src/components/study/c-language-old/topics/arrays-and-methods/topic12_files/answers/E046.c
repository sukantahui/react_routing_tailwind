#include <stdio.h>

int countLessEqual(int matrix[][100], int n, int x) {
    int count = 0;
    int row = n - 1, col = 0;
    while (row >= 0 && col < n) {
        if (matrix[row][col] <= x) {
            count += row + 1;
            col++;
        } else {
            row--;
        }
    }
    return count;
}

int kthSmallest(int matrix[][100], int n, int k) {
    int low = matrix[0][0], high = matrix[n - 1][n - 1];
    while (low < high) {
        int mid = low + (high - low) / 2;
        int count = countLessEqual(matrix, n, mid);
        if (count < k) low = mid + 1;
        else high = mid;
    }
    return low;
}

int main() {
    int n, k, matrix[100][100];
    printf("Enter n (size of n x n matrix): ");
    scanf("%d", &n);
    printf("Enter matrix (sorted row and column):\n");
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &matrix[i][j]);
    printf("Enter k: ");
    scanf("%d", &k);

    int result = kthSmallest(matrix, n, k);
    printf("%dth smallest = %d\n", k, result);
    return 0;
}