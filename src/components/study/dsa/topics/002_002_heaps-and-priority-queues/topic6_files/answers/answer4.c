#include <stdio.h>

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void build_heap(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
}

int main() {
    int arr[] = {4, 10, 3, 5, 1};
    int n = 5;
    printf("--- Floyd's O(N) Heapify Algorithm ---\nBefore: [ 4 10 3 5 1 ]\n");
    build_heap(arr, n);
    printf("After : [ ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("]\n");
    return 0;
}
