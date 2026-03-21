#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (!ptr) return 1;

    *ptr = 123;
    printf("Value: %d\n", *ptr);

    free(ptr);
    // DO NOT DO THIS — double free leads to undefined behavior
    // free(ptr); // Uncommenting will likely crash or corrupt heap

    // Instead, set pointer to NULL after free
    ptr = NULL;
    // Now free(ptr) is safe (does nothing)
    free(ptr);

    return 0;
}