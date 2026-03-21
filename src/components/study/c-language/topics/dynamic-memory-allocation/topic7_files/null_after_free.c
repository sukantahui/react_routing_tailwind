#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (!ptr) return 1;

    *ptr = 42;
    printf("Value: %d\n", *ptr);

    free(ptr);
    ptr = NULL;  // Prevents accidental reuse

    // Now checking for NULL before use avoids undefined behavior
    if (ptr != NULL) {
        printf("Still valid: %d\n", *ptr);
    } else {
        printf("Pointer is NULL, safe\n");
    }

    return 0;
}