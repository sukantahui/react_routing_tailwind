#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(100 * sizeof(int));
    if (!ptr) return 1;

    // Try to allocate a huge amount (likely fails)
    int *new_ptr = realloc(ptr, 1024 * 1024 * 1024); // 1 GB
    if (new_ptr == NULL) {
        printf("Reallocation failed. Original pointer remains valid.\n");
        // Do something with original ptr, or free it
        free(ptr);
        return 1;
    }

    // On success, use new_ptr
    ptr = new_ptr;
    printf("Reallocation succeeded!\n");
    free(ptr);
    return 0;
}