#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int n = 5;
    // Using malloc (uninitialized)
    int *arr = (int*)malloc(n * sizeof(int));
    if (!arr) return 1;
    // Initialize manually
    for (int i = 0; i < n; i++)
        arr[i] = i * 10;

    // Using calloc (zero‑initialized)
    int *arr2 = (int*)calloc(n, sizeof(int));
    if (!arr2) {
        free(arr);
        return 1;
    }

    printf("malloc array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    printf("calloc array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr2[i]);
    printf("\n");

    free(arr);
    free(arr2);
    return 0;
}