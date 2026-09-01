#include <stdio.h>
#include <stdlib.h>

int main() {
    // This program intentionally leaks memory to show detection
    int *leak1 = (int*)malloc(100 * sizeof(int));
    int *leak2 = (int*)calloc(50, sizeof(int));

    // No free for leak1 and leak2

    // This is a valid allocation that will be freed
    int *valid = (int*)malloc(sizeof(int));
    if (valid) {
        *valid = 123;
        printf("Valid value: %d\n", *valid);
        free(valid);
    }

    // leak1 and leak2 remain allocated → reported by Valgrind
    return 0;
}