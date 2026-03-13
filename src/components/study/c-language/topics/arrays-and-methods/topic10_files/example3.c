#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Manual debugging: simulate a simple "canary" to detect overflow
int main() {
    // Allocate array with extra space for canaries
    int *arr = malloc(5 * sizeof(int) + 2 * sizeof(int));
    if (!arr) return 1;

    // Place canaries before and after
    int *canary_before = (int*)arr;
    int *data = arr + 1;
    int *canary_after = arr + 6;

    // Initialize canaries with known values
    *canary_before = 0xDEADBEEF;
    *canary_after = 0xDEADBEEF;

    // Initialize data
    for (int i = 0; i < 5; i++) {
        data[i] = i * 10;
    }

    // Simulate a bug: write past the end
    // Uncomment the next line to see canary detection
    // data[5] = 999; // out-of-bounds write

    // Check canaries after operations
    if (*canary_before != 0xDEADBEEF) {
        printf("Buffer underflow detected!\n");
    }
    if (*canary_after != 0xDEADBEEF) {
        printf("Buffer overflow detected!\n");
    } else {
        printf("No overflow detected.\n");
    }

    free(arr);
    return 0;
}