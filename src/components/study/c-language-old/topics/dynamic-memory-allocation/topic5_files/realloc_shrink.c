#include <stdio.h>
#include <stdlib.h>

int main() {
    int *big = malloc(10000 * sizeof(int));
    if (!big) return 1;

    // Use only a few elements
    for (int i = 0; i < 100; i++) {
        big[i] = i;
    }

    // Shrink to exactly the needed size
    int *temp = realloc(big, 100 * sizeof(int));
    if (!temp) {
        printf("Shrink failed, but original big still valid\n");
        free(big);
        return 1;
    }
    big = temp;

    printf("Shrunk to 100 ints\n");
    free(big);
    return 0;
}