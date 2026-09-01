#include <stdio.h>
#include <stdlib.h>

int process_data() {
    int *a = NULL;
    int *b = NULL;
    int *c = NULL;
    int ret = EXIT_SUCCESS;

    a = (int*)malloc(sizeof(*a));
    if (!a) { ret = EXIT_FAILURE; goto cleanup; }

    b = (int*)malloc(sizeof(*b));
    if (!b) { ret = EXIT_FAILURE; goto cleanup; }

    c = (int*)malloc(sizeof(*c));
    if (!c) { ret = EXIT_FAILURE; goto cleanup; }

    // Use allocated memory
    *a = 10; *b = 20; *c = 30;
    printf("%d %d %d\n", *a, *b, *c);

cleanup:
    free(a);   // safe even if a is NULL
    free(b);
    free(c);
    return ret;
}

int main() {
    if (process_data() != EXIT_SUCCESS) {
        fprintf(stderr, "Processing failed\n");
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
}