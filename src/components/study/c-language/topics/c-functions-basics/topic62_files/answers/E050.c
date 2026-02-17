#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *arr;
    int size;
    int capacity;
} MinHeap;

MinHeap* createHeap(int cap) {
    MinHeap *heap = (MinHeap*)malloc(sizeof(MinHeap));
    heap->arr = (int*)malloc(cap * sizeof(int));
    heap->size = 0;
    heap->capacity = cap;
    return heap;
}

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

void heapify(MinHeap *heap, int i) {
    int smallest = i;
    int left = 2*i + 1;
    int right = 2*i + 2;
    if (left < heap->size && heap->arr[left] < heap->arr[smallest])
        smallest = left;
    if (right < heap->size && heap->arr[right] < heap->arr[smallest])
        smallest = right;
    if (smallest != i) {
        swap(&heap->arr[i], &heap->arr[smallest]);
        heapify(heap, smallest);
    }
}

void insert(MinHeap *heap, int val) {
    if (heap->size == heap->capacity) return;
    heap->arr[heap->size] = val;
    int i = heap->size;
    heap->size++;
    while (i != 0 && heap->arr[(i-1)/2] > heap->arr[i]) {
        swap(&heap->arr[i], &heap->arr[(i-1)/2]);
        i = (i-1)/2;
    }
}

int extractMin(MinHeap *heap) {
    if (heap->size <= 0) return -1;
    if (heap->size == 1) {
        heap->size--;
        return heap->arr[0];
    }
    int root = heap->arr[0];
    heap->arr[0] = heap->arr[heap->size-1];
    heap->size--;
    heapify(heap, 0);
    return root;
}

int main() {
    MinHeap *heap = createHeap(100);
    int vals[] = {5,3,8,1,2};
    printf("Inserting: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", vals[i]);
        insert(heap, vals[i]);
    }
    printf("\nExtracting min three times: ");
    for (int i = 0; i < 3; i++)
        printf("%d ", extractMin(heap));
    printf("\n");
    free(heap->arr);
    free(heap);
    return 0;
}
