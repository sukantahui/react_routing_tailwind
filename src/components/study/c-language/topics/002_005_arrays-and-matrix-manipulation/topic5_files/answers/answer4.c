#include <stdio.h>

/**
 * Project 4: Subarray with Given Sum (Sliding Window / Two-Pointer)
 * Finds a contiguous subarray whose sum equals a target value S in O(n) time.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int findSubarraySum(const int arr[], int n, int target, int *startIdx, int *endIdx) {
    int currentSum = arr[0];
    int start = 0;

    for (int end = 1; end <= n; end++) {
        // Shrink window from left while currentSum exceeds target
        while (currentSum > target && start < end - 1) {
            currentSum -= arr[start];
            start++;
        }

        if (currentSum == target) {
            *startIdx = start;
            *endIdx = end - 1;
            return 1; // Found
        }

        if (end < n) {
            currentSum += arr[end];
        }
    }
    return 0; // Not found
}

int main(void) {
    int arr[] = {1, 4, 20, 3, 10, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 33;
    int start = -1, end = -1;

    printf("Array: [ 1, 4, 20, 3, 10, 5 ] | Target Sum = %d\n", target);

    if (findSubarraySum(arr, n, target, &start, &end)) {
        printf("✓ Subarray found between index %d and %d: [ ", start, end);
        for (int i = start; i <= end; i++) printf("%d ", arr[i]);
        printf("]\n");
    } else {
        printf("✗ No contiguous subarray with sum %d found.\n", target);
    }

    return 0;
}
