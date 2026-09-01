#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>

int main() {
    int *p_malloc = (int*)malloc(5 * sizeof(int));
    int *p_calloc = (int*)calloc(5, sizeof(int));

    if (!p_malloc || !p_calloc) {
        printf("Allocation failed\n");
        free(p_malloc);
        free(p_calloc);
        return 1;
    }

    printf("malloc array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", p_malloc[i]); // may be garbage
    }
    printf("\n");

    printf("calloc array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", p_calloc[i]); // always zeros
    }
    printf("\n");

    free(p_malloc);
    free(p_calloc);
    return 0;
}