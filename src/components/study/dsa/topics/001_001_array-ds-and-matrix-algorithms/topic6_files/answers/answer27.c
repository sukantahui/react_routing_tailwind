#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }
int min(int a, int b) { return (a < b) ? a : b; }

int max_product_subarray(int arr[], int n) {
    if (n == 0) return 0;

    int max_so_far = arr[0];
    int curr_max = arr[0];
    int curr_min = arr[0];

    for (int i = 1; i < n; i++) {
        if (arr[i] < 0) {
            int temp = curr_max;
            curr_max = curr_min;
            curr_min = temp;
        }

        curr_max = max(arr[i], curr_max * arr[i]);
        curr_min = min(arr[i], curr_min * arr[i]);

        max_so_far = max(max_so_far, curr_max);
    }

    return max_so_far;
}

int main() {
    int arr[] = {2, 3, -2, 4, -2};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- Maximum Product Subarray Engine ---\nInput: [ 2 3 -2 4 -2 ]\n");
    int result = max_product_subarray(arr, n);

    printf("Maximum Contiguous Subarray Product = %d\n", result);
    return 0;
}
