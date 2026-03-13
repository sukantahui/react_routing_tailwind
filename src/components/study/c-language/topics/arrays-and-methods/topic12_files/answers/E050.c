#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *arr;
    int size;
    int capacity;
} MinHeap;

MinHeap* createHeap(int cap) {
    MinHeap *h = (MinHeap*)malloc(sizeof(MinHeap));
    h->capacity = cap;
    h->size = 0;
    h->arr = (int*)malloc(cap * sizeof(int));
    return h;
}

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

void heapify(MinHeap *h, int i) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < h->size && h->arr[left] < h->arr[smallest]) smallest = left;
    if (right < h->size && h->arr[right] < h->arr[smallest]) smallest = right;
    if (smallest != i) {
        swap(&h->arr[i], &h->arr[smallest]);
        heapify(h, smallest);
    }
}

void insert(MinHeap *h, int val) {
    if (h->size == h->capacity) {
        printf("Heap full\n");
        return;
    }
    h->arr[h->size] = val;
    int i = h->size;
    h->size++;
    while (i != 0 && h->arr[(i - 1) / 2] > h->arr[i]) {
        swap(&h->arr[i], &h->arr[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

int extractMin(MinHeap *h) {
    if (h->size <= 0) return -1;
    if (h->size == 1) {
        h->size--;
        return h->arr[0];
    }
    int root = h->arr[0];
    h->arr[0] = h->arr[h->size - 1];
    h->size--;
    heapify(h, 0);
    return root;
}

int main() {
    MinHeap *heap = createHeap(100);
    int choice, val;
    while (1) {
        printf("\n1. Insert\n2. Extract Min\n3. Exit\nChoice: ");
        scanf("%d", &choice);
        switch (choice) {
            case 1:
                printf("Value: ");
                scanf("%d", &val);
                insert(heap, val);
                break;
            case 2:
                val = extractMin(heap);
                if (val != -1) printf("Min = %d\n", val);
                else printf("Heap empty\n");
                break;
            case 3:
                free(heap->arr);
                free(heap);
                return 0;
        }
    }
}