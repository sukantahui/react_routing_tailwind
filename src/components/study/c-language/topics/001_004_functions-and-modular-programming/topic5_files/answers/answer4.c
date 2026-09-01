/**
 * ============================================================================
 * Project 4: In-Place Array Reversal & Two-Pointer Element Transformation
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void printArray(const char *label, const int *arr, int size) {
    printf("%-20s: [ ", label);
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\n");
}

void reverseArrayInPlace(int *arr, int size) {
    if (arr == NULL || size <= 1) return;
    int left = 0, right = size - 1;

    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}

int main(void) {
    int dataset[] = {10, 20, 30, 40, 50, 60, 70};
    int len = sizeof(dataset) / sizeof(dataset[0]);

    printf("===================================================================\n");
    printf("     IN-PLACE TWO-POINTER ARRAY REVERSAL - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    printArray("Original Array", dataset, len);
    reverseArrayInPlace(dataset, len);
    printArray("In-Place Reversed", dataset, len);

    printf("\n===================================================================\n");
    return 0;
}
