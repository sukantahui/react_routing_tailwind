#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // 1. Buffer overflow
    char small[10];
    strcpy(small, "This string is much too long for the buffer"); // overflow!
    printf("small: %s\n", small); // may crash or corrupt

    // 2. Use-after-free
    int *p = malloc(sizeof(int));
    *p = 42;
    free(p);
    *p = 100; // use after free (undefined behavior)

    // 3. Double free
    int *q = malloc(sizeof(int));
    free(q);
    free(q); // double free (corrupts heap)

    // 4. Dereferencing NULL
    int *r = NULL;
    *r = 5; // segfault

    return 0;
}