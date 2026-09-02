#include <stdio.h>

/**
 * Project 3: In-Place Array Reversal and Rotation (Right Shift by K positions)
 * Rotates an array to the right by k positions in O(n) time and O(1) space
 * using the 3-step reversal algorithm.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void reverseRange(int arr[], int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

void rotateRight(int arr[], int n, int k) {
    k = k % n; // In case k >= n
    if (k == 0) return;

    // 1. Reverse entire array
    reverseRange(arr, 0, n - 1);
    // 2. Reverse first k elements
    reverseRange(arr, 0, k - 1);
    // 3. Reverse remaining n - k elements
    reverseRange(arr, k, n - 1);
}

int main(void) {
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    int k = 3;

    printf("Original Array: [ ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("]\n");

    rotateRight(arr, n, k);

    printf("Rotated Right by %d positions: [ ", k);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("]\n");

    return 0;
}
