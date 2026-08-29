/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Amortized Analysis: Dynamic Vector Doubling & Banker's Method
 * File: AmortizedAnalysisDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

// Dynamic Vector Struct with Geometric Doubling
typedef struct DynamicVector {
    int* data;
    int size;
    int capacity;
    unsigned long long totalCopyCost;
} DynamicVector;

DynamicVector* createVector(int initialCapacity) {
    DynamicVector* vec = (DynamicVector*)malloc(sizeof(DynamicVector));
    vec->size = 0;
    vec->capacity = initialCapacity;
    vec->totalCopyCost = 0;
    vec->data = (int*)malloc(initialCapacity * sizeof(int));
    return vec;
}

// Push Back with 2x Geometric Resizing
void vectorPushBack(DynamicVector* vec, int value) {
    if (vec->size == vec->capacity) {
        int oldCap = vec->capacity;
        int newCap = oldCap * 2; // Geometric factor of 2

        int* newData = (int*)malloc(newCap * sizeof(int));
        for (int i = 0; i < vec->size; i++) {
            newData[i] = vec->data[i];
            vec->totalCopyCost++; // Count expensive copy steps
        }
        free(vec->data);
        vec->data = newData;
        vec->capacity = newCap;
    }

    vec->data[vec->size++] = value;
    vec->totalCopyCost++; // Count insertion step
}

void freeVector(DynamicVector* vec) {
    if (vec) {
        free(vec->data);
        free(vec);
    }
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - AMORTIZED COMPLEXITY & VECTOR DOUBLING    \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    int testInserts = 32;
    DynamicVector* vec = createVector(1);

    printf("Dynamic Vector Growth Trace (Geometric Doubling 2x):\n");
    printf("-----------------------------------------------------------------\n");
    printf(" Op # | Insert Val | Vector Size | Capacity | Resized? | Total Ops \n");
    printf("-----------------------------------------------------------------\n");

    for (int i = 1; i <= testInserts; i++) {
        int prevCap = vec->capacity;
        vectorPushBack(vec, i * 10);
        bool resized = (vec->capacity != prevCap && i > 1);

        if (resized || i <= 8 || i == testInserts) {
            printf(" %4d | %10d | %11d | %8d | %8s | %9llu\n",
                   i, i * 10, vec->size, vec->capacity, resized ? "YES (2x)" : "no", vec->totalCopyCost);
        }
    }
    printf("-----------------------------------------------------------------\n\n");

    printf("Amortized Cost Mathematical Breakdown for %d Insertions:\n", testInserts);
    printf("• Total Elementary Copy & Insert Steps: %llu steps\n", vec->totalCopyCost);
    printf("• Amortized Cost per Insertion:         %.2f steps / insert (Constant O(1)!)\n\n",
           (double)vec->totalCopyCost / testInserts);

    printf("Banker's Accounting Proof:\n");
    printf("• Charge $3 amortized cost for each insertion:\n");
    printf("  - $1 pays for the actual insertion into memory\n");
    printf("  - $1 is stored as credit to pay for its own future copy during table doubling\n");
    printf("  - $1 is stored as credit to pay for an older unmoved element's future copy\n");
    printf("• The bank account NEVER drops below zero, rigorously proving Amortized O(1) time!\n");

    freeVector(vec);
    return 0;
}
