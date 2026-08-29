#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct {
    int val;
    int list_idx;
    int elem_idx;
} HeapNode;

typedef struct {
    HeapNode *arr;
    int size;
    int capacity;
} MinHeap;

MinHeap* create_min_heap(int capacity) {
    MinHeap *heap = (MinHeap*)malloc(sizeof(MinHeap));
    heap->arr = (HeapNode*)malloc(sizeof(HeapNode) * capacity);
    heap->size = 0;
    heap->capacity = capacity;
    return heap;
}

void swap(HeapNode *a, HeapNode *b) {
    HeapNode temp = *a;
    *a = *b;
    *b = temp;
}

void min_heapify(MinHeap *heap, int idx) {
    int smallest = idx;
    int left = 2 * idx + 1;
    int right = 2 * idx + 2;

    if (left < heap->size && heap->arr[left].val < heap->arr[smallest].val)
        smallest = left;
    if (right < heap->size && heap->arr[right].val < heap->arr[smallest].val)
        smallest = right;

    if (smallest != idx) {
        swap(&heap->arr[idx], &heap->arr[smallest]);
        min_heapify(heap, smallest);
    }
}

void insert_heap(MinHeap *heap, HeapNode node) {
    if (heap->size == heap->capacity) return;
    heap->size++;
    int i = heap->size - 1;
    heap->arr[i] = node;

    while (i != 0 && heap->arr[(i - 1) / 2].val > heap->arr[i].val) {
        swap(&heap->arr[i], &heap->arr[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

HeapNode extract_min(MinHeap *heap) {
    HeapNode root = heap->arr[0];
    heap->arr[0] = heap->arr[heap->size - 1];
    heap->size--;
    min_heapify(heap, 0);
    return root;
}

void find_smallest_range(int **lists, int k, int *sizes) {
    MinHeap *heap = create_min_heap(k);
    int current_max = INT_MIN;

    for (int i = 0; i < k; i++) {
        HeapNode node = { lists[i][0], i, 0 };
        insert_heap(heap, node);
        if (lists[i][0] > current_max) {
            current_max = lists[i][0];
        }
    }

    int range_start = 0, range_end = INT_MAX;
    int min_range_len = INT_MAX;

    while (1) {
        HeapNode min_node = extract_min(heap);
        int current_min = min_node.val;

        if (current_max - current_min < min_range_len) {
            min_range_len = current_max - current_min;
            range_start = current_min;
            range_end = current_max;
        }

        if (min_node.elem_idx + 1 < sizes[min_node.list_idx]) {
            int next_val = lists[min_node.list_idx][min_node.elem_idx + 1];
            HeapNode next_node = { next_val, min_node.list_idx, min_node.elem_idx + 1 };
            insert_heap(heap, next_node);
            if (next_val > current_max) {
                current_max = next_val;
            }
        } else {
            break;
        }
    }

    printf("--- Smallest Range Covering K Lists ---\n");
    printf("Smallest Range bounds = [%d, %d]\n", range_start, range_end);
    printf("Range Length = %d\n", min_range_len);

    free(heap->arr);
    free(heap);
}

int main() {
    int list1[] = {4, 10, 15, 24, 26};
    int list2[] = {0, 9, 12, 20};
    int list3[] = {5, 18, 22, 30};

    int *lists[3] = {list1, list2, list3};
    int sizes[3] = {5, 4, 4};

    find_smallest_range(lists, 3, sizes);

    return 0;
}

