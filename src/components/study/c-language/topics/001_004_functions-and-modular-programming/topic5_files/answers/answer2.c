/**
 * ============================================================================
 * Project 2: High-Speed Integer Arithmetic & Stats Out-Parameter Package
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void calculateArrayStatistics(const int *arr, int size, int *minOut, int *maxOut, long long *sumOut, double *avgOut) {
    if (arr == NULL || size <= 0 || minOut == NULL || maxOut == NULL || sumOut == NULL || avgOut == NULL) {
        return;
    }

    *minOut = arr[0];
    *maxOut = arr[0];
    *sumOut = 0;

    for (int i = 0; i < size; i++) {
        if (arr[i] < *minOut) *minOut = arr[i];
        if (arr[i] > *maxOut) *maxOut = arr[i];
        *sumOut += arr[i];
    }
    *avgOut = (double)(*sumOut) / size;
}

int main(void) {
    int data[] = {45, 88, 12, 95, 67, 34, 102, 78};
    int n = sizeof(data) / sizeof(data[0]);

    int minVal, maxVal;
    long long totalSum;
    double avgVal;

    printf("===================================================================\n");
    printf("     MULTIPLE OUT-PARAMETERS STATS ENGINE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    calculateArrayStatistics(data, n, &minVal, &maxVal, &totalSum, &avgVal);

    printf("Dataset: [ 45, 88, 12, 95, 67, 34, 102, 78 ] (N = %d)\n\n", n);
    printf("Calculated Statistics via Pointer Out-Parameters:\n");
    printf("  • Minimum Value   : %d\n", minVal);
    printf("  • Maximum Value   : %d\n", maxVal);
    printf("  • Total Sum       : %lld\n", totalSum);
    printf("  • Average (Mean)  : %.2f\n", avgVal);

    printf("===================================================================\n");
    return 0;
}
