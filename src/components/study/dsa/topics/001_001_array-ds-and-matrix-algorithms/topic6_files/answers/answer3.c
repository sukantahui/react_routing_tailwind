#include <stdio.h>

void reverse(int arr[], int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

void rotate_right(int arr[], int n, int k) {
    k = k % n;
    if (k < 0) k += n;
    if (k == 0) return;

    // Reversal Algorithm for O(1) space cyclic right rotation:
    // 1. Reverse entire array
    reverse(arr, 0, n - 1);
    // 2. Reverse first k elements
    reverse(arr, 0, k - 1);
    // 3. Reverse remaining n - k elements
    reverse(arr, k, n - 1);
}

void print_array(const int arr[], int n) {
    printf("[ ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\n");
}

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    int k = 3;

    printf("Original Array: ");
    print_array(arr, n);

    printf("Rotating Right by K = %d positions...\n", k);
    rotate_right(arr, n, k);

    printf("Rotated Array:  ");
    print_array(arr, n);

    return 0;
}
