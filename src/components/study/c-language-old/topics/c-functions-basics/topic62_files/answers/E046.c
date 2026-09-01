#include <stdio.h>
#include <limits.h>

int countLessEqual(int matrix[][100], int n, int x) {
    int count = 0;
    for (int i = 0; i < n; i++) {
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

int kthSmallest(int matrix[][100], int n, int k) {
    int low = matrix[0][0], high = matrix[n-1][n-1];
    while (low < high) {
        int mid = low + (high - low) / 2;
        int count = countLessEqual(matrix, n, mid);
        if (count < k)
            low = mid + 1;
        else
            high = mid;
    }
    return low;
}

int main() {
    int n, k;
    printf("Enter n: ");
    scanf("%d", &n);
    int mat[100][100];
    printf("Matrix:\n");
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &mat[i][j]);
    printf("Enter k: ");
    scanf("%d", &k);

    int kth = kthSmallest(mat, n, k);
    printf("%dth smallest = %d\n", k, kth);
    return 0;
}
