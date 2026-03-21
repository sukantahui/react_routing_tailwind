#include <stdio.h>
#include <time.h>

// This example demonstrates that both methods compile to similar code.
// For large arrays, the performance difference is negligible.

#define SIZE 10000000

int main() {
    int arr[SIZE];
    // Initialize array
    for (int i = 0; i < SIZE; i++) arr[i] = i;

    clock_t start, end;

    // Indexing loop
    start = clock();
    long sum1 = 0;
    for (int i = 0; i < SIZE; i++) {
        sum1 += arr[i];
    }
    end = clock();
    printf("Indexing time: %f seconds\n", (double)(end - start) / CLOCKS_PER_SEC);

    // Pointer arithmetic loop
    start = clock();
    long sum2 = 0;
    for (int *p = arr; p < arr + SIZE; p++) {
        sum2 += *p;
    }
    end = clock();
    printf("Pointer arithmetic time: %f seconds\n", (double)(end - start) / CLOCKS_PER_SEC);

    // Both sums should be equal
    printf("sum1 = %ld, sum2 = %ld\n", sum1, sum2);

    return 0;
}