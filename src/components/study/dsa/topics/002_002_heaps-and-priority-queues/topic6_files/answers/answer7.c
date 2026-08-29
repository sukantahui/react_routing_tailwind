#include <stdio.h>

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void heapify_min(int h[], int k, int i) {
    int smallest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < k && h[l] < h[smallest]) smallest = l;
    if (r < k && h[r] < h[smallest]) smallest = r;
    if (smallest != i) { swap(&h[i], &h[smallest]); heapify_min(h, k, smallest); }
}

int find_kth_largest(int arr[], int n, int k) {
    int min_heap[100];
    for (int i = 0; i < k; i++) min_heap[i] = arr[i];
    for (int i = k / 2 - 1; i >= 0; i--) heapify_min(min_heap, k, i);

    for (int i = k; i < n; i++) {
        if (arr[i] > min_heap[0]) {
            min_heap[0] = arr[i];
            heapify_min(min_heap, k, 0);
        }
    }
    return min_heap[0];
}

int main() {
    int arr[] = {3, 2, 1, 5, 6, 4};
    int n = 6, k = 2;
    printf("--- K-th Largest Element using Min-Heap ---\n");
    printf("The %d-nd Largest Element = %d\n", k, find_kth_largest(arr, n, k));
    return 0;
}
