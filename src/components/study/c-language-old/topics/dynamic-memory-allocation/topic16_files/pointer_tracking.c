#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (!ptr) {
        fprintf(stderr, "Allocation failed\n");
        return 1;
    }
    *ptr = 42;

    printf("Pointer address: %p\n", (void*)ptr);
    printf("Value at address: %d\n", *ptr);

    free(ptr);
    printf("After free, pointer still points to: %p\n", (void*)ptr);
    // Never dereference ptr after free!

    return 0;
}