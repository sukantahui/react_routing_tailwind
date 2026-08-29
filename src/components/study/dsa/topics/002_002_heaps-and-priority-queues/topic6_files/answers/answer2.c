#include <stdio.h>

#define MAX 100

typedef struct {
    int arr[MAX];
    int size;
} MaxHeap;

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void heapify_down(MaxHeap *h, int i) {
    int largest = i;
    int left = 2 * i + 1, right = 2 * i + 2;
    if (left < h->size && h->arr[left] > h->arr[largest]) largest = left;
    if (right < h->size && h->arr[right] > h->arr[largest]) largest = right;
    if (largest != i) {
        swap(&h->arr[i], &h->arr[largest]);
        heapify_down(h, largest);
    }
}

int extract_max(MaxHeap *h) {
    if (h->size <= 0) return -1;
    int root = h->arr[0];
    h->arr[0] = h->arr[--(h->size)];
    heapify_down(h, 0);
    return root;
}

int main() {
    MaxHeap h = {{40, 30, 20, 10}, 4};
    printf("--- Extract-Max from Max-Heap ---\nExtracted Root = %d\n", extract_max(&h));
    printf("New Root = %d\n", h.arr[0]);
    return 0;
}
