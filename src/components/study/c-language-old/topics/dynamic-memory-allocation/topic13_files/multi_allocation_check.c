#include <stdio.h>
#include <stdlib.h>

int main() {
    int *a = NULL;
    int *b = NULL;
    int *c = NULL;
    int ret = EXIT_SUCCESS;

    a = (int*)malloc(sizeof(int));
    if (!a) {
        fprintf(stderr, "Failed to allocate a\n");
        ret = EXIT_FAILURE;
        goto cleanup;
    }

    b = (int*)malloc(sizeof(int));
    if (!b) {
        fprintf(stderr, "Failed to allocate b\n");
        ret = EXIT_FAILURE;
        goto cleanup;
    }

    c = (int*)malloc(sizeof(int));
    if (!c) {
        fprintf(stderr, "Failed to allocate c\n");
        ret = EXIT_FAILURE;
        goto cleanup;
    }

    *a = 10; *b = 20; *c = 30;
    printf("%d %d %d\n", *a, *b, *c);

cleanup:
    free(a);
    free(b);
    free(c);
    return ret;
}