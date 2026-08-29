#include <stdio.h>

#define MAX 100

typedef struct {
    int arr[MAX];
    int size;
} MinHeap;

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void insert_min_heap(MinHeap *h, int val) {
    int i = h->size++;
    h->arr[i] = val;
    while (i != 0 && h->arr[(i - 1) / 2] > h->arr[i]) {
        swap(&h->arr[i], &h->arr[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

int main() {
    MinHeap h = {{0}, 0};
    printf("--- Min-Heap Implementation ---\n");
    insert_min_heap(&h, 40); insert_min_heap(&h, 10); insert_min_heap(&h, 30);
    printf("Min-Heap Root = %d\n", h.arr[0]);
    return 0;
}
