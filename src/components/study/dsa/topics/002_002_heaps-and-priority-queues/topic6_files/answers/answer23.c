#include <stdio.h>

#define D 4
#define MAX 100

typedef struct {
    int heap[MAX];
    int size;
} DAryHeap;

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void insert_dary(DAryHeap *h, int val) {
    int i = h->size++;
    h->heap[i] = val;
    while (i != 0 && h->heap[(i - 1) / D] < h->heap[i]) {
        swap(&h->heap[i], &h->heap[(i - 1) / D]);
        i = (i - 1) / D;
    }
}

int main() {
    DAryHeap h = {{0}, 0};
    printf("--- D-Ary Heap (Branching Factor D=4) ---\n");
    insert_dary(&h, 10); insert_dary(&h, 50); insert_dary(&h, 30); insert_dary(&h, 90);
    printf("D-Ary Heap Root = %d\n", h.heap[0]);
    return 0;
}
