#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) {
        printf("Allocation failed\n");
        return 1;
    }

    *ptr = 42;
    printf("Value: %d\n", *ptr);

    free(ptr);        // release memory
    // ptr is now dangling — do not use it!
    return 0;
}