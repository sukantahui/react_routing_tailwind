// input_validation_good.c – Validates inputs and handles errors gracefully
#include <stdio.h>
#include <stddef.h>  // for NULL

// Returns 1 on success, 0 on error (division by zero)
int divide(int a, int b, double *result) {
    if (b == 0) {
        printf("Error: Division by zero\n");
        return 0;
    }
    *result = a / (double)b;
    return 1;
}

// Returns 1 on success, 0 on NULL pointer or out-of-bounds
int getElement(int *arr, int size, int index, int *result) {
    if (arr == NULL) {
        printf("Error: NULL pointer\n");
        return 0;
    }
    if (index < 0 || index >= size) {
        printf("Error: Index %d out of bounds [0, %d)\n", index, size);
        return 0;
    }
    *result = arr[index];
    return 1;
}

int main() {
    double res;
    if (divide(10, 0, &res)) {
        printf("10 / 0 = %f\n", res);
    } else {
        printf("Division failed – continuing safely.\n");
    }

    int numbers[5] = {1, 2, 3, 4, 5};
    int val;
    if (getElement(numbers, 5, 10, &val)) {
        printf("Value at index 10: %d\n", val);
    } else {
        printf("Array access failed – continuing safely.\n");
    }

    // Test NULL pointer
    int *ptr = NULL;
    if (getElement(ptr, 5, 0, &val)) {
        printf("Value: %d\n", val);
    } else {
        printf("NULL pointer access prevented.\n");
    }

    return 0;
}