#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) {
        printf("Allocation failed\n");
        return 1;
    }
    *ptr = 100;
    printf("Heap value: %d\n", *ptr);
    free(ptr);    // manual deallocation
    return 0;
}