#include <stdio.h>

// Function that prints array (size passed explicitly)
void printArray(int arr[], size_t n) {
    printf("Array elements: ");
    for (size_t i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // Demonstrate sizeof inside function
    printf("Inside function: sizeof(arr) = %zu bytes (pointer size)\n", sizeof(arr));
}

int main() {
    int scores[] = {88, 92, 79, 85, 91};
    size_t n = sizeof(scores) / sizeof(scores[0]);

    printf("In main: sizeof(scores) = %zu bytes (whole array)\n", sizeof(scores));
    printArray(scores, n);

    return 0;
}