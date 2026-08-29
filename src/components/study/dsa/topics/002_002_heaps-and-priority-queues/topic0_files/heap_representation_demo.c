#include <stdio.h>
#include <stdlib.h>

#define CAPACITY 15

typedef struct {
    int data[CAPACITY];
    int size;
} BinaryHeapArray;

int getParent(int i) { return (i - 1) / 2; }
int getLeftChild(int i) { return 2 * i + 1; }
int getRightChild(int i) { return 2 * i + 2; }

void printHeapStructure(const BinaryHeapArray *h) {
    printf("1D Array Heap Memory Layout:\n");
    printf("Index: ");
    for (int i = 0; i < h->size; i++) printf("[%2d] ", i);
    printf("\nValue: ");
    for (int i = 0; i < h->size; i++) printf(" %2d  ", h->data[i]);
    printf("\n\nParent/Child Index Relationships:\n");
    for (int i = 0; i < h->size; i++) {
        int p = getParent(i);
        int l = getLeftChild(i);
        int r = getRightChild(i);
        printf("Node [%d] (Val: %d) -> Parent: [%d], Left: [%d], Right: [%d]\n",
               i, h->data[i], (i == 0) ? -1 : p, (l < h->size) ? l : -1, (r < h->size) ? r : -1);
    }
}

int main() {
    printf("=== Binary Heap 1D Array Layout & Index Math in C ===\n\n");
    BinaryHeapArray h = {{90, 80, 70, 40, 30, 60, 50}, 7};
    printHeapStructure(&h);
    return 0;
}
