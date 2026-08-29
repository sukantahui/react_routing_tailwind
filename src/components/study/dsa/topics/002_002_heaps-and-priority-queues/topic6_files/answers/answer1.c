#include <stdio.h>

#define MAX 100

typedef struct {
    int arr[MAX];
    int size;
} MaxHeap;

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void insert_max_heap(MaxHeap *h, int val) {
    if (h->size == MAX) return;
    int i = h->size++;
    h->arr[i] = val;
    while (i != 0 && h->arr[(i - 1) / 2] < h->arr[i]) {
        swap(&h->arr[i], &h->arr[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

void print_heap(MaxHeap *h) {
    printf("Max-Heap: [ ");
    for (int i = 0; i < h->size; i++) printf("%d ", h->arr[i]);
    printf("]\n");
}

int main() {
    MaxHeap h = {{0}, 0};
    printf("--- Max-Heap Up-Heap Insertion ---\n");
    insert_max_heap(&h, 10); insert_max_heap(&h, 30); insert_max_heap(&h, 20); insert_max_heap(&h, 40);
    print_heap(&h);
    return 0;
}
