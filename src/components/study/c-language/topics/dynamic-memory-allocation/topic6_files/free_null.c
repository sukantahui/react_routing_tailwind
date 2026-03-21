#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = NULL;

    // free(NULL) is safe and does nothing
    free(ptr);
    printf("free(NULL) executed safely\n");

    // Works even if the pointer is never allocated
    ptr = (int*)malloc(sizeof(int));
    if (ptr) {
        *ptr = 100;
        printf("Value: %d\n", *ptr);
        free(ptr);
    }

    // Setting to NULL after free is good practice
    ptr = NULL;
    free(ptr); // still safe

    return 0;
}