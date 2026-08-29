#include <stdio.h>

void max_subarray_sum(const int arr[], int n) {
    int max_so_far = arr[0];
    int curr_max = arr[0];
    int start = 0, end = 0, temp_start = 0;

    for (int i = 1; i < n; i++) {
        if (arr[i] > curr_max + arr[i]) {
            curr_max = arr[i];
            temp_start = i;
        } else {
            curr_max += arr[i];
        }

        if (curr_max > max_so_far) {
            max_so_far = curr_max;
            start = temp_start;
            end = i;
        }
    }

    printf("--- Kadane's Algorithm Max Subarray Sum ---\n");
    printf("Maximum Contiguous Sum = %d\n", max_so_far);
    printf("Subarray Window: Index [%d .. %d]\n", start, end);
    printf("Subarray Elements: [ ");
    for (int i = start; i <= end; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\n");
}

int main() {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int n = sizeof(arr) / sizeof(arr[0]);

    max_subarray_sum(arr, n);

    return 0;
}
