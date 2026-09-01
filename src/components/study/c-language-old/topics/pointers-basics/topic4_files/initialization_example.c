#include <stdio.h>
#include <stdlib.h>

int main() {
    // 1. Initialize to NULL
    int *p1 = NULL;
    if (p1 == NULL) {
        printf("p1 is NULL, safe to check before use\n");
    }

    // 2. Initialize to address of a variable
    int x = 42;
    int *p2 = &x;
    printf("*p2 = %d\n", *p2);

    // 3. Initialize with malloc, check for failure
    int *p3 = (int*)malloc(sizeof(int));
    if (p3 != NULL) {
        *p3 = 100;
        printf("*p3 = %d\n", *p3);
        free(p3);
        p3 = NULL; // good practice
    } else {
        printf("malloc failed\n");
    }

    return 0;
}