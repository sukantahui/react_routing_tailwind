#include <stdio.h>

/**
 * PassByReferenceDemo.c
 * Demonstrates pass-by-value vs pass-by-reference simulation using pointers in C:
 * the classic swap(&x, &y) function and returning multiple results (min, max, avg).
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

// 1. Pass-by-value (FAILS to modify caller variables)
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

// 2. Pass-by-reference simulation (SUCCESSFULLY modifies caller variables)
void swapByReference(int *pA, int *pB) {
    int temp = *pA;
    *pA = *pB;
    *pB = temp;
}

// 3. Simulating multiple return values via pointer output parameters
void calculateStatistics(const int arr[], int size, int *min, int *max, double *avg) {
    if (size <= 0) return;

    *min = arr[0];
    *max = arr[0];
    int sum = 0;

    for (int i = 0; i < size; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
        sum += arr[i];
    }
    *avg = (double)sum / size;
}

int main(void) {
    int x = 10, y = 20;

    printf("====================================================\n");
    printf(" Pass-by-Reference Simulation Using Pointers in C\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("Initial values : x = %d, y = %d\n\n", x, y);

    // Testing swapByValue
    swapByValue(x, y);
    printf("After swapByValue(x, y)      : x = %d, y = %d (UNMODIFIED!)\n", x, y);

    // Testing swapByReference
    swapByReference(&x, &y);
    printf("After swapByReference(&x, &y): x = %d, y = %d (SWAPPED SUCCESSFULLY!)\n\n", x, y);

    // Testing multiple return parameters
    int marks[] = {85, 92, 78, 64, 99, 88};
    int n = sizeof(marks) / sizeof(marks[0]);
    int minScore = 0, maxScore = 0;
    double avgScore = 0.0;

    calculateStatistics(marks, n, &minScore, &maxScore, &avgScore);

    printf("Student Scores Analysis (Multiple Return Parameters):\n");
    printf(" • Minimum Score : %d\n", minScore);
    printf(" • Maximum Score : %d\n", maxScore);
    printf(" • Class Average : %.2f\n", avgScore);

    return 0;
}
