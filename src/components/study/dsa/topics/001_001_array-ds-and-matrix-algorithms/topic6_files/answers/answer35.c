#include <stdio.h>
#include <limits.h>

int max(int a, int b) { return (a > b) ? a : b; }
int min(int a, int b) { return (a < b) ? a : b; }

double find_median_sorted_arrays(int A[], int m, int B[], int n) {
    if (m > n) return find_median_sorted_arrays(B, n, A, m); // Ensure A is smaller array

    int low = 0, high = m;
    while (low <= high) {
        int i = (low + high) / 2;
        int j = (m + n + 1) / 2 - i;

        int maxLeftA  = (i == 0) ? INT_MIN : A[i - 1];
        int minRightA = (i == m) ? INT_MAX : A[i];

        int maxLeftB  = (j == 0) ? INT_MIN : B[j - 1];
        int minRightB = (j == n) ? INT_MAX : B[j];

        if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
            if ((m + n) % 2 == 0) {
                return (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0;
            } else {
                return max(maxLeftA, maxLeftB);
            }
        } else if (maxLeftA > minRightB) {
            high = i - 1;
        } else {
            low = i + 1;
        }
    }
    return 0.0;
}

int main() {
    int A[] = {1, 3, 8, 9, 15};
    int B[] = {7, 11, 18, 19, 21, 25};
    int m = sizeof(A) / sizeof(A[0]);
    int n = sizeof(B) / sizeof(B[0]);

    printf("--- Optimal Binary Search Median Finder ---\nArray A (m=%d): [ 1 3 8 9 15 ]\nArray B (n=%d): [ 7 11 18 19 21 25 ]\n", m, n);
    double median = find_median_sorted_arrays(A, m, B, n);

    printf("Median of Combined Sorted Arrays = %.2f (O(log(min(M,N))) Time Complexity)\n", median);
    return 0;
}
