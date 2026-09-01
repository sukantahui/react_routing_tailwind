#include <stdio.h>
#include <stdlib.h>

// BAD: returns address of stack variable
int* badStackReturn() {
    int x = 10;
    return &x;   // dangerous!
}

// GOOD: allocate on heap
int* goodHeapReturn() {
    int *p = (int*)malloc(sizeof(int));
    if (p) *p = 20;
    return p;
}

int main() {
    // int *bad = badStackReturn(); // undefined behavior
    int *good = goodHeapReturn();
    printf("Heap allocated value: %d\n", *good);
    free(good);
    return 0;
}