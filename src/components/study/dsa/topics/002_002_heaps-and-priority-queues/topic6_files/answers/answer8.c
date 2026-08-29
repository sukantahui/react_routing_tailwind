#include <stdio.h>

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void heapify_max(int h[], int k, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < k && h[l] > h[largest]) largest = l;
    if (r < k && h[r] > h[largest]) largest = r;
    if (largest != i) { swap(&h[i], &h[largest]); heapify_max(h, k, largest); }
}

int find_kth_smallest(int arr[], int n, int k) {
    int max_heap[100];
    for (int i = 0; i < k; i++) max_heap[i] = arr[i];
    for (int i = k / 2 - 1; i >= 0; i--) heapify_max(max_heap, k, i);

    for (int i = k; i < n; i++) {
        if (arr[i] < max_heap[0]) {
            max_heap[0] = arr[i];
            heapify_max(max_heap, k, 0);
        }
    }
    return max_heap[0];
}

int main() {
    int arr[] = {7, 10, 4, 3, 20, 15};
    int n = 6, k = 3;
    printf("--- K-th Smallest Element using Max-Heap ---\n");
    printf("The %d-rd Smallest Element = %d\n", k, find_kth_smallest(arr, n, k));
    return 0;
}
