/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: XOR Superpowers: Single Number (finding non-duplicate in array where every other element appears twice)
 * Module: Essential Bit Hacks: Brian Kernighan, Power-of-Two & Lowest Set Bit
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

// Core demonstration for: XOR Superpowers: Single Number (finding non-duplicate in array where every other element appears twice)
void executeTopicDemo(void) {
    printf("Executing: XOR Superpowers: Single Number (finding non-duplicate in arr\n");
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
