#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    *ptr = 42; // must initialize because malloc gives uninitialized memory
    printf("Value: %d\n", *ptr);

    free(ptr);
    return 0;
}