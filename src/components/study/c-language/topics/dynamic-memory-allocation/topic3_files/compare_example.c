#include <stdio.h>
#include <stdlib.h>

int main() {
    int *a = (int*)malloc(5 * sizeof(int));
    int *b = (int*)calloc(5, sizeof(int));

    if (!a || !b) {
        printf("Allocation failed\n");
        free(a);
        free(b);
        return 1;
    }

    printf("malloc array (uninitialized): ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", a[i]); // may print garbage
    }
    printf("\n");

    printf("calloc array (zeroed): ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", b[i]); // always 0
    }
    printf("\n");

    free(a);
    free(b);
    return 0;
}