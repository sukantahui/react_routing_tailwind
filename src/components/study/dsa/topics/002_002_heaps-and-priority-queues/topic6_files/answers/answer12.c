#include <stdio.h>

typedef struct {
    int val, arr_idx, next_idx;
} HeapNode;

void swap(HeapNode *a, HeapNode *b) { HeapNode temp = *a; *a = *b; *b = temp; }

void min_heapify(HeapNode h[], int size, int i) {
    int smallest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < size && h[l].val < h[smallest].val) smallest = l;
    if (r < size && h[r].val < h[smallest].val) smallest = r;
    if (smallest != i) { swap(&h[i], &h[smallest]); min_heapify(h, size, smallest); }
}

int main() {
    int K = 3, N = 3;
    int arr[3][3] = { {1, 4, 7}, {2, 5, 8}, {3, 6, 9} };
    HeapNode h[3];
    for (int i = 0; i < K; i++) h[i] = (HeapNode){arr[i][0], i, 1};
    for (int i = K / 2 - 1; i >= 0; i--) min_heapify(h, K, i);

    printf("--- K-Way Merging of Sorted Arrays ---\nMerged Array: [ ");
    for (int count = 0; count < K * N; count++) {
        HeapNode root = h[0];
        printf("%d ", root.val);
        if (root.next_idx < N) {
            h[0] = (HeapNode){arr[root.arr_idx][root.next_idx], root.arr_idx, root.next_idx + 1};
        } else {
            h[0] = h[--K];
        }
        min_heapify(h, K, 0);
    }
    printf("]\n");
    return 0;
}
