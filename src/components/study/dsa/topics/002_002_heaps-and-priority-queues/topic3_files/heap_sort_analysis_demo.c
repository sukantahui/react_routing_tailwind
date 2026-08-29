#include <stdio.h>
#include <stdlib.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    printf("[HEAP SORT] Phase 1: Building Max Heap bottom-up O(n)...\n");
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    printf("[HEAP SORT] Phase 2: Extracting Max root & swapping to end O(n log n)...\n");
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}

void printArray(int arr[], int n) {
    printf("Array: [ ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("]\n");
}

int main() {
    printf("=== Heap Sort In-Place Performance Analysis in C ===\n\n");
    int arr[] = {44, 11, 99, 22, 55, 33};
    int n = sizeof(arr) / sizeof(arr[0]);

    printArray(arr, n);
    heapSort(arr, n);
    printArray(arr, n);

    return 0;
}
