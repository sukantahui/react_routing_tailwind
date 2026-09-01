#include <stdio.h>

// Using array notation (decays to pointer)
void printArray(int arr[], size_t n) {
    printf("Inside function: sizeof(arr) = %zu\n", sizeof(arr)); // pointer size
    for (size_t i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// Modify array (affects original)
void doubleArray(int arr[], size_t n) {
    for (size_t i = 0; i < n; i++) {
        arr[i] *= 2;
    }
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    size_t len = sizeof(numbers) / sizeof(numbers[0]);

    printf("In main: sizeof(numbers) = %zu\n", sizeof(numbers));
    printf("Original: ");
    printArray(numbers, len);

    doubleArray(numbers, len);
    printf("After doubling: ");
    printArray(numbers, len);

    return 0;
}