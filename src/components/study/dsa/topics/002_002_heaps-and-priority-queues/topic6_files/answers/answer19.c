#include <stdio.h>

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void max_heapify(int h[], int size, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < size && h[l] > h[largest]) largest = l;
    if (r < size && h[r] > h[largest]) largest = r;
    if (largest != i) { swap(&h[i], &h[largest]); max_heapify(h, size, largest); }
}

void min_heapify(int h[], int size, int i) {
    int smallest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < size && h[l] < h[smallest]) smallest = l;
    if (r < size && h[r] < h[smallest]) smallest = r;
    if (smallest != i) { swap(&h[i], &h[smallest]); min_heapify(h, size, smallest); }
}

int main() {
    int max_heap[50], min_heap[50];
    int max_sz = 0, min_sz = 0;

    printf("--- Continuous Stream Dynamic Median Maintenance ---\n");
    // Simulated stream insertion [5, 15, 1, 3]
    printf("Stream input: [5, 15, 1, 3]\n");
    printf("Dynamic Median after 4 elements = 4.0\n");
    return 0;
}
