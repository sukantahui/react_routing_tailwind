#include <stdio.h>

int linear_search(int arr[], int n, int target, int *comparisons) {
    *comparisons = 0;
    for (int i = 0; i < n; i++) {
        (*comparisons)++;
        if (arr[i] == target) return i;
    }
    return -1;
}

int binary_search(int arr[], int n, int target, int *comparisons) {
    int low = 0, high = n - 1;
    *comparisons = 0;
    while (low <= high) {
        (*comparisons)++;
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 56;
    int comp_lin = 0, comp_bin = 0;

    printf("--- Search Performance Benchmark ---\n");
    int idx_lin = linear_search(arr, n, target, &comp_lin);
    int idx_bin = binary_search(arr, n, target, &comp_bin);

    printf("Target Key: %d\n", target);
    printf("Linear Search: Index %d, Comparisons = %d\n", idx_lin, comp_lin);
    printf("Binary Search: Index %d, Comparisons = %d\n", idx_bin, comp_bin);

    return 0;
}
