#include <stdio.h>

void merge_sorted_arrays(int A[], int n, int B[], int m, int C[]) {
    int p1 = 0, p2 = 0, p3 = 0;
    while (p1 < n && p2 < m) {
        if (A[p1] <= B[p2]) {
            C[p3++] = A[p1++];
        } else {
            C[p3++] = B[p2++];
        }
    }
    while (p1 < n) C[p3++] = A[p1++];
    while (p2 < m) C[p3++] = B[p2++];
}

int main() {
    int A[] = {1, 3, 5, 7};
    int B[] = {2, 4, 6, 8, 10};
    int n = sizeof(A) / sizeof(A[0]);
    int m = sizeof(B) / sizeof(B[0]);
    int C[n + m];

    printf("--- Two-Pointer Sorted Array Merging ---\n");
    merge_sorted_arrays(A, n, B, m, C);

    printf("Merged Array: [ ");
    for (int i = 0; i < n + m; i++) {
        printf("%d ", C[i]);
    }
    printf("]\n");

    return 0;
}
