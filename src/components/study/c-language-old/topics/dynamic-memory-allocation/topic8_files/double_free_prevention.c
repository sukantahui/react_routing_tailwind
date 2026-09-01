#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (!ptr) return 1;

    *ptr = 42;
    printf("Value: %d\n", *ptr);

    free(ptr);
    ptr = NULL; // Prevent double free

    // Now free(NULL) is safe (does nothing)
    free(ptr); // No double free
    return 0;
}