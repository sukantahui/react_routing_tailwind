#include <stdio.h>

/**
 * SortingSearchingDemo.c
 * Bubble Sort & Binary Search in C
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1, mid;
    while (low <= high) {
        mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main(void) {
    int data[6] = {64, 25, 12, 22, 11, 90};
    int i, target = 22, index;

    printf("=== Bubble Sort & Binary Search Demo ===\n\n");
    printf("Original Data: ");
    for (i = 0; i < 6; i++) printf("%d ", data[i]);
    printf("\n");

    bubbleSort(data, 6);

    printf("Sorted Data  : ");
    for (i = 0; i < 6; i++) printf("%d ", data[i]);
    printf("\n\n");

    index = binarySearch(data, 6, target);
    if (index != -1) {
        printf("Element %d found at sorted index %d.\n", target, index);
    } else {
        printf("Element %d not found.\n", target);
    }

    return 0;
}
