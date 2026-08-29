#include <stdio.h>

#define N 3

int count_less_equal(int matrix[N][N], int mid) {
    int count = 0, row = 0, col = N - 1;
    while (row < N && col >= 0) {
        if (matrix[row][col] <= mid) {
            count += (col + 1);
            row++;
        } else {
            col--;
        }
    }
    return count;
}

int kth_smallest_matrix(int matrix[N][N], int k) {
    int low = matrix[0][0], high = matrix[N - 1][N - 1], ans = low;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (count_less_equal(matrix, mid) >= k) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int matrix[N][N] = {
        {1, 5, 9},
        {10, 11, 13},
        {12, 13, 15}
    };
    int k = 8;
    printf("--- Kth Smallest Element in Sorted Matrix ---\n");
    printf("The %d-th Smallest Element = %d\n", k, kth_smallest_matrix(matrix, k));
    return 0;
}
