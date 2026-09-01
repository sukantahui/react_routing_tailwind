#include <stdio.h>
#include <limits.h>

int countLessEqual(int matrix[][100], int m, int n, int x) {
    int count = 0;
    for (int i = 0; i < m; i++) {
        int lo = 0, hi = n-1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (matrix[i][mid] <= x)
                lo = mid + 1;
            else
                hi = mid - 1;
        }
        count += lo;
    }
    return count;
}

int findMedian(int matrix[][100], int m, int n) {
    int low = INT_MAX, high = INT_MIN;
    for (int i = 0; i < m; i++) {
        if (matrix[i][0] < low) low = matrix[i][0];
        if (matrix[i][n-1] > high) high = matrix[i][n-1];
    }
    int desired = (m * n + 1) / 2;
    while (low < high) {
        int mid = low + (high - low) / 2;
        int count = countLessEqual(matrix, m, n, mid);
        if (count < desired)
            low = mid + 1;
        else
            high = mid;
    }
    return low;
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

    int median = findMedian(mat, m, n);
    printf("Median = %d\n", median);
    return 0;
}
