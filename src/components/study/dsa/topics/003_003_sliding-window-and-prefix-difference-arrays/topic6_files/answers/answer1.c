#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int max_sub_array_of_size_k(int arr[], int n, int k) {
    if (n < k) return -1;
    int window_sum = 0;
    for (int i = 0; i < k; i++) window_sum += arr[i];

    int max_sum = window_sum;
    for (int i = k; i < n; i++) {
        window_sum += arr[i] - arr[i - k];
        max_sum = max(max_sum, window_sum);
    }
    return max_sum;
}

int main() {
    int arr[] = {2, 1, 5, 1, 3, 2};
    int n = 6, k = 3;
    printf("--- Maximum Sum Subarray of Size K ---\n");
    printf("Maximum Sum Subarray of Size %d = %d\n", k, max_sub_array_of_size_k(arr, n, k));
    return 0;
}
