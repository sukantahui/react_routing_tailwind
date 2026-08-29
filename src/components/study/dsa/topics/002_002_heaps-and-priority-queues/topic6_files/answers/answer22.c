#include <stdio.h>
#include <stdlib.h>
#include <math.h>

typedef struct FibNode {
    int key;
    int degree;
    int mark;
    struct FibNode *parent;
    struct FibNode *child;
    struct FibNode *left;
    struct FibNode *right;
} FibNode;

typedef struct FibHeap {
    int n;
    FibNode *min;
} FibHeap;

FibHeap* create_fib_heap() {
    FibHeap *heap = (FibHeap*)malloc(sizeof(FibHeap));
    heap->n = 0;
    heap->min = NULL;
    return heap;
}

FibNode* create_fib_node(int key) {
    FibNode *node = (FibNode*)malloc(sizeof(FibNode));
    node->key = key;
    node->degree = 0;
    node->mark = 0;
    node->parent = NULL;
    node->child = NULL;
    node->left = node;
    node->right = node;
    return node;
}

void fib_heap_insert(FibHeap *heap, FibNode *node) {
    if (heap->min == NULL) {
        heap->min = node;
    } else {
        node->right = heap->min;
        node->left = heap->min->left;
        heap->min->left->right = node;
        heap->min->left = node;
        if (node->key < heap->min->key) {
            heap->min = node;
        }
    }
    heap->n++;
}

void print_root_list(FibHeap *heap) {
    if (heap->min == NULL) {
        printf("Heap is empty.\n");
        return;
    }
    printf("Root List Keys: ");
    FibNode *curr = heap->min;
    do {
        printf("%d ", curr->key);
        curr = curr->right;
    } while (curr != heap->min);
    printf("\n");
}

int main() {
    printf("--- Fibonacci Heap Amortized O(1) Engine ---\n");
    FibHeap *heap = create_fib_heap();

    FibNode *n1 = create_fib_node(10);
    FibNode *n2 = create_fib_node(3);
    FibNode *n3 = create_fib_node(17);
    FibNode *n4 = create_fib_node(24);

    fib_heap_insert(heap, n1);
    fib_heap_insert(heap, n2);
    fib_heap_insert(heap, n3);
    fib_heap_insert(heap, n4);

    printf("Fibonacci Heap Structure initialized with %d nodes.\n", heap->n);
    printf("Minimum Key in Heap = %d\n", heap->min->key);
    print_root_list(heap);

    return 0;
}

