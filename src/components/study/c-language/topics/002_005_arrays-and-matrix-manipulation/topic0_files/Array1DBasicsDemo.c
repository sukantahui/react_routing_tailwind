#include <stdio.h>

/**
 * Array1DBasicsDemo.c
 * Demonstrates 1D array declaration, memory addresses, contiguous RAM layout,
 * element indexing, and pointer offset arithmetic.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    // 1. Declare and initialize a 1D integer array
    int scores[5] = {85, 92, 78, 96, 88};
    int n = sizeof(scores) / sizeof(scores[0]);
    int sum = 0;
    int maxScore = scores[0];
    int minScore = scores[0];

    printf("====================================================\n");
    printf(" 1D Array Contiguous Memory Layout & Traversal\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("Array Base Address (scores / &scores[0]): %p\n", (void*)scores);
    printf("Element Size: %zu bytes | Total Array Size: %zu bytes\n\n", 
           sizeof(scores[0]), sizeof(scores));

    printf("----------------------------------------------------------------------\n");
    printf("%-7s | %-16s | %-8s | %-12s | %-12s\n", 
           "Index", "Memory Address", "Value", "Subscript", "Pointer Offset");
    printf("----------------------------------------------------------------------\n");

    // 2. Traverse array, calculate stats, inspect contiguous byte addresses
    for (int i = 0; i < n; i++) {
        printf("[%d]     | %p   | %-8d | scores[%d]=%-4d | *(scores+%d)=%-4d\n",
               i, (void*)&scores[i], scores[i], i, scores[i], i, *(scores + i));

        sum += scores[i];
        if (scores[i] > maxScore) maxScore = scores[i];
        if (scores[i] < minScore) minScore = scores[i];
    }
    printf("----------------------------------------------------------------------\n");

    // 3. Display aggregate calculations
    double average = (double)sum / n;
    printf("\n📊 Array Statistical Summary:\n");
    printf(" • Total Elements : %d\n", n);
    printf(" • Sum of Scores  : %d\n", sum);
    printf(" • Class Average  : %.2f\n", average);
    printf(" • Highest Score  : %d\n", maxScore);
    printf(" • Lowest Score   : %d\n", minScore);

    return 0;
}
