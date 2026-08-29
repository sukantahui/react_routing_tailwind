#include <stdio.h>
#include <limits.h>

int max(int a, int b) { return (a > b) ? a : b; }
int min(int a, int b) { return (a < b) ? a : b; }

double find_median_sorted_arrays(int A[], int n1, int B[], int n2) {
    if (n1 > n2) return find_median_sorted_arrays(B, n2, A, n1);
    int low = 0, high = n1;
    while (low <= high) {
        int i1 = low + (high - low) / 2;
        int i2 = (n1 + n2 + 1) / 2 - i1;

        int maxL1 = (i1 == 0) ? INT_MIN : A[i1 - 1];
        int minR1 = (i1 == n1) ? INT_MAX : A[i1];
        int maxL2 = (i2 == 0) ? INT_MIN : B[i2 - 1];
        int minR2 = (i2 == n2) ? INT_MAX : B[i2];

        if (maxL1 <= minR2 && maxL2 <= minR1) {
            if ((n1 + n2) % 2 == 0) return (max(maxL1, maxL2) + min(minR1, minR2)) / 2.0;
            else return max(maxL1, maxL2);
        } else if (maxL1 > minR2) high = i1 - 1;
        else low = i1 + 1;
    }
    return 0.0;
}

int main() {
    int A[] = {1, 3};
    int B[] = {2};
    printf("--- Median of Two Sorted Arrays O(log(min(N,M))) ---\n");
    printf("Median = %.1f\n", find_median_sorted_arrays(A, 2, B, 1));
    return 0;
}
