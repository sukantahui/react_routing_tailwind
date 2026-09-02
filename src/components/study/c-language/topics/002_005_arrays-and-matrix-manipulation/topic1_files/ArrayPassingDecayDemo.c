#include <stdio.h>

/**
 * ArrayPassingDecayDemo.c
 * Demonstrates array decay to pointer when passed to functions,
 * why sizeof(arr) evaluates to pointer size inside a function,
 * and how to modify array contents in-place.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

// Function 1: Displays array elements and shows sizeof(arr) vs sizeof(int*)
void printArray(const int arr[], int size) {
    printf("Inside printArray(): sizeof(arr) = %zu bytes (Decayed to pointer!)\n", sizeof(arr));
    printf("Elements: [ ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\n");
}

// Function 2: Doubles each element in-place (Pass-by-reference simulation)
void doubleArrayElements(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        *(arr + i) *= 2; // Equivalent to: arr[i] *= 2;
    }
}

// Function 3: Calculates sum and returns average
double calculateAverage(const int *arr, int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return (double)sum / size;
}

int main(void) {
    int numbers[5] = {10, 25, 40, 55, 70};
    int n = sizeof(numbers) / sizeof(numbers[0]);

    printf("====================================================\n");
    printf(" Passing Arrays to Functions & Array-to-Pointer Decay\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("Inside main(): sizeof(numbers) = %zu bytes (Full array: 5 x 4B)\n\n", sizeof(numbers));

    printf("1. Initial Array State:\n");
    printArray(numbers, n);

    printf("\n2. Doubling All Array Elements In-Place...\n");
    doubleArrayElements(numbers, n);

    printf("\n3. Modified Array State (Mutated via Base Pointer):\n");
    printArray(numbers, n);

    double avg = calculateAverage(numbers, n);
    printf("\n📊 Calculated Average: %.2f\n", avg);

    return 0;
}
