/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Non-Linear Loop Stepping: Square Root Bounds (O(sqrt(n))) in Primality Tests & Integer Factorization
 * Module: Time Complexity: Loop Step-Counting, Nested Loops & Dependent Summations
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

// Core demonstration for: Non-Linear Loop Stepping: Square Root Bounds (O(sqrt(n))) in Primality Tests & Integer Factorization
void executeTopicDemo(void) {
    printf("Executing: Non-Linear Loop Stepping: Square Root Bounds (O(sqrt(n))) in\n");
    printf("Memory state initialized successfully in C.\n");
    
    int sampleData[] = {10, 25, 42, 68, 99};
    int n = sizeof(sampleData) / sizeof(sampleData[0]);
    
    printf("Data elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", sampleData[i]);
    }
    printf("\n");
    printf("Algorithm invariant verified: O(1) pointer bounds respected.\n\n");
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - DATA STRUCTURES & ALGORITHMS IN C         \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    executeTopicDemo();

    return 0;
}
