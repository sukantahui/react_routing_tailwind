#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (!ptr) return 1;

    *ptr = 42;
    printf("Value: %d\n", *ptr);

    free(ptr);
    // Double free — UNDEFINED BEHAVIOR!
    free(ptr);

    return 0;
}