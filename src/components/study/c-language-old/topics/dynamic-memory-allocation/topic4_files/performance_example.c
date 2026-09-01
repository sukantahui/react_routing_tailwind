#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define SIZE 10000000 // 10 million integers

int main() {
    clock_t start, end;
    int *a, *b;

    // malloc + manual zeroing (if needed)
    start = clock();
    a = (int*)malloc(SIZE * sizeof(int));
    if (a) {
        for (long i = 0; i < SIZE; i++) a[i] = 0; // manual zeroing
    }
    end = clock();
    printf("malloc + manual zeroing: %lf ms\n", (double)(end - start) * 1000 / CLOCKS_PER_SEC);

    // calloc (zeros automatically)
    start = clock();
    b = (int*)calloc(SIZE, sizeof(int));
    end = clock();
    printf("calloc: %lf ms\n", (double)(end - start) * 1000 / CLOCKS_PER_SEC);

    free(a);
    free(b);
    return 0;
}