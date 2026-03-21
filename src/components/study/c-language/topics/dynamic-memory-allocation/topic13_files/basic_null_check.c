#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) {
        fprintf(stderr, "Error: Memory allocation failed!\n");
        return EXIT_FAILURE;
    }
    *ptr = 42;
    printf("Value: %d\n", *ptr);
    free(ptr);
    return EXIT_SUCCESS;
}