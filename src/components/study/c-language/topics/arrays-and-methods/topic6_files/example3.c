#include <stdio.h>

// Function that only reads the array – uses const for safety
int sumArray(const int arr[], size_t n) {
    int total = 0;
    for (size_t i = 0; i < n; i++) {
        total += arr[i]; // OK – reading is allowed
        // arr[i] = 0; // Compiler error if uncommented – const prevents modification
    }
    return total;
}

int main() {
    int data[] = {10, 20, 30, 40, 50};
    size_t n = sizeof(data) / sizeof(data[0]);

    int total = sumArray(data, n);
    printf("Sum of array: %d\n", total);

    // Original array remains unchanged
    printf("First element still: %d\n", data[0]);

    return 0;
}