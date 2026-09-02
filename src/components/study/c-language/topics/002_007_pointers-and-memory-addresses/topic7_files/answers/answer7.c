#include <stdio.h>

/**
 * Project 7: In-Place Array Cyclic Rotator using Pure Pointer Arithmetic
 * Rotates an array to the right by K positions using pointer ranges without indexing.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void reversePointerRange(int *start, int *end) {
    while (start < end) {
        int temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}

void rotateArrayPointers(int *arr, int size, int k) {
    k = k % size;
    if (k == 0) return;

    // 1. Reverse entire range
    reversePointerRange(arr, arr + size - 1);
    // 2. Reverse first k elements
    reversePointerRange(arr, arr + k - 1);
    // 3. Reverse remaining elements
    reversePointerRange(arr + k, arr + size - 1);
}

int main(void) {
    int data[] = {10, 20, 30, 40, 50, 60, 70};
    int n = sizeof(data) / sizeof(data[0]);
    int k = 3;

    printf("Original: [ ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\n");

    rotateArrayPointers(data, n, k);

    printf("Rotated Right by %d (via Pointer Arithmetic): [ ", k);
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\n");

    return 0;
}
