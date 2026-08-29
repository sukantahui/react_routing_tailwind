/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Space Complexity, Call Stack Frames & CPU Cache Hierarchy
 * File: SpaceMemoryHierarchyDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// 1. Stack Space: Deep Recursion Activation Frames
void recursiveStackDepth(int depth, int maxDepth, void* initialStackPtr) {
    int localVariableOnStack = depth;
    void* currentStackPtr = (void*)&localVariableOnStack;

    if (depth == 1 || depth == maxDepth / 2 || depth == maxDepth) {
        long bytesConsumed = (char*)initialStackPtr - (char*)currentStackPtr;
        if (bytesConsumed < 0) bytesConsumed = -bytesConsumed; // Handle stack growth direction
        printf("   • Recursion Depth %4d: Current Stack Address = %p (Stack RAM Consumed: ~%ld bytes)\n",
               depth, currentStackPtr, bytesConsumed);
    }

    if (depth < maxDepth) {
        recursiveStackDepth(depth + 1, maxDepth, initialStackPtr);
    }
}

// 2. Tail Call Optimization (TCO) simulation in C
// Standard recursion vs Tail-recursive accumulator
long long factorialTailRec(int n, long long accumulator) {
    if (n <= 1) return accumulator;
    // Tail call: nothing left to compute after function returns, compiler can reuse stack frame!
    return factorialTailRec(n - 1, n * accumulator);
}

// 3. Cache Locality Demonstration: Row-Major vs Column-Major Matrix Traversal
#define MATRIX_DIM 2048
static int testMatrix[MATRIX_DIM][MATRIX_DIM];

void benchmarkCacheLocality(void) {
    printf("3. CPU Cache Hierarchy: Row-Major vs Column-Major Access (%dx%d Matrix):\n",
           MATRIX_DIM, MATRIX_DIM);

    // Row-Major Traversal (Cache-Friendly: Sequential stride 1 access)
    clock_t start = clock();
    long long rowSum = 0;
    for (int i = 0; i < MATRIX_DIM; i++) {
        for (int j = 0; j < MATRIX_DIM; j++) {
            rowSum += testMatrix[i][j];
        }
    }
    clock_t end = clock();
    double rowTimeMs = ((double)(end - start) / CLOCKS_PER_SEC) * 1000.0;
    printf("   • Row-Major Traversal (Cache Hits)   : %.2f ms (Spatial Locality ✓)\n", rowTimeMs);

    // Column-Major Traversal (Cache-Unfriendly: 2048-element stride jumps causing L1/L2 misses)
    start = clock();
    long long colSum = 0;
    for (int j = 0; j < MATRIX_DIM; j++) {
        for (int i = 0; i < MATRIX_DIM; i++) {
            colSum += testMatrix[i][j];
        }
    }
    end = clock();
    double colTimeMs = ((double)(end - start) / CLOCKS_PER_SEC) * 1000.0;
    printf("   • Column-Major Traversal (Cache Thrashing): %.2f ms (Cache Misses ✗)\n", colTimeMs);
    printf("   -> Performance Difference: Row-major is ~%.1fx faster due to 64-byte L1 Cache Lines!\n\n",
           colTimeMs / (rowTimeMs > 0.01 ? rowTimeMs : 0.01));
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - SPACE COMPLEXITY & CACHE HIERARCHY        \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    int startMarker = 0;
    printf("1. Physical Call Stack Activation Frames (Stack Space O(N)):\n");
    recursiveStackDepth(1, 1000, (void*)&startMarker);
    printf("\n");

    printf("2. Tail Call Optimization (TCO):\n");
    long long fact10 = factorialTailRec(10, 1);
    printf("   • Factorial(10) via Tail-Recursive Accumulator: %lld\n\n", fact10);

    benchmarkCacheLocality();

    return 0;
}
