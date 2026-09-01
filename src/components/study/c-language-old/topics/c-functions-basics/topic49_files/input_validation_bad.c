// input_validation_bad.c – No input validation, crashes on bad data
#include <stdio.h>

// No check for zero divisor – crashes if b == 0
double divide(int a, int b) {
    return a / (double)b;
}

// No NULL check – crashes if arr is NULL
int getElement(int *arr, int index) {
    return arr[index];
}

// No range check – undefined behaviour for negative or large index
int getArrayValue(int arr[], int size, int index) {
    return arr[index];  // Assume index is valid
}

int main() {
    // Problem 1: division by zero
    double result = divide(10, 0);
    printf("10 / 0 = %f\n", result);  // Crash or infinity

    // Problem 2: NULL pointer
    int *ptr = NULL;
    int val = getElement(ptr, 0);  // Crash

    // Problem 3: out-of-bounds index
    int numbers[5] = {1, 2, 3, 4, 5};
    int bad = getArrayValue(numbers, 5, 10);  // Reads garbage, may crash
    printf("Value at index 10: %d\n", bad);

    return 0;
}