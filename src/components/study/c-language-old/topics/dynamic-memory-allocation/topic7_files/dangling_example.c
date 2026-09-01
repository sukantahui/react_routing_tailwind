#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (!ptr) return 1;

    *ptr = 42;
    printf("Before free: %d\n", *ptr);

    free(ptr);

    // Dangling pointer: ptr still points to freed memory
    printf("After free (danger): %d\n", *ptr); // Undefined behavior!

    return 0;
}