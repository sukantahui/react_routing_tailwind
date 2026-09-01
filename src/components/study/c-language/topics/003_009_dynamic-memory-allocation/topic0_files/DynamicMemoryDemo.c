#include <stdio.h>
#include <stdlib.h>

/**
 * DynamicMemoryDemo.c
 * Heap allocation using malloc, calloc, realloc, and free
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    int n = 5, i;
    int *arr = NULL;

    printf("=== Dynamic Memory Allocation (Heap Management) ===\n\n");

    // Allocate memory on Heap using malloc
    arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Heap Allocation Failed!\n");
        return 1;
    }

    for (i = 0; i < n; i++) arr[i] = (i + 1) * 10;

    printf("Initial Heap Allocation (malloc):\n");
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n\n");

    // Expand Heap Allocation using realloc
    n = 8;
    int *temp = (int *)realloc(arr, n * sizeof(int));
    if (temp == NULL) {
        free(arr);
        fprintf(stderr, "Heap Reallocation Failed!\n");
        return 1;
    }
    arr = temp;

    for (i = 5; i < n; i++) arr[i] = (i + 1) * 10;

    printf("Resized Heap Allocation (realloc to 8 items):\n");
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n\n");

    // Free memory to prevent memory leak
    free(arr);
    arr = NULL; // Avoid dangling pointer
    printf("Heap Memory Freed Successfully.\n");

    return 0;
}
