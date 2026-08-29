/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Complexity Classes (P, NP, NP-Complete) & Space-Time Tradeoffs
 * File: ComplexityClassesDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// 1. Polynomial-Time Verification for Subset Sum (P vs NP Demonstration)
// Problem: Given set S and target T, is there a subset summing to T? (NP-Complete)
// Certificate: A candidate subset chosen by the user
// Verifier: Checks in O(K) polynomial time if the certificate sums to T
bool verifySubsetSumCertificate(const int originalSet[], int n, const int certificate[], int certSize, int target) {
    int sum = 0;
    for (int i = 0; i < certSize; i++) {
        // Verify element belongs to original set
        bool foundInSet = false;
        for (int j = 0; j < n; j++) {
            if (originalSet[j] == certificate[i]) {
                foundInSet = true;
                break;
            }
        }
        if (!foundInSet) return false; // Invalid certificate!
        sum += certificate[i];
    }
    return (sum == target);
}

// 2. Space-Time Tradeoff Demonstration:
// Problem: Check if element X exists in dataset [0..1000]
// Option A: Time O(N), Space O(1) [Linear Scan]
// Option B: Time O(1), Space O(M) [Direct Address Lookup Table / Hash Map]

typedef struct DirectAddressTable {
    bool* present;
    int maxVal;
} DirectAddressTable;

DirectAddressTable* createDAT(int maxVal) {
    DirectAddressTable* dat = (DirectAddressTable*)malloc(sizeof(DirectAddressTable));
    dat->maxVal = maxVal;
    dat->present = (bool*)calloc(maxVal + 1, sizeof(bool));
    return dat;
}

void datInsert(DirectAddressTable* dat, int val) {
    if (val <= dat->maxVal) dat->present[val] = true;
}

bool datLookup(const DirectAddressTable* dat, int val) {
    if (val <= dat->maxVal) return dat->present[val];
    return false;
}

void freeDAT(DirectAddressTable* dat) {
    if (dat) {
        free(dat->present);
        free(dat);
    }
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - COMPLEXITY CLASSES & TRADEOFFS DEMO       \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    // 1. NP Verification Demo
    int fullSet[] = {3, 14, 27, 38, 41, 59, 82};
    int setSize = 7;
    int targetSum = 82;

    int candidateCert[] = {14, 27, 41}; // 14 + 27 + 41 = 82
    int certSize = 3;

    printf("1. Polynomial-Time Certificate Verification (P vs NP):\n");
    printf("   Set: {3, 14, 27, 38, 41, 59, 82}, Target Sum: %d\n", targetSum);
    printf("   Candidate Certificate: {14, 27, 41}\n");

    bool isValid = verifySubsetSumCertificate(fullSet, setSize, candidateCert, certSize, targetSum);
    printf("   -> Certificate Verification Result: %s (Verified in O(K) linear steps!)\n\n",
           isValid ? "VALID SOLUTION ✓" : "INVALID ✗");

    // 2. Space-Time Tradeoff Demo
    printf("2. Space-Time Trade-Off Comparison:\n");
    DirectAddressTable* dat = createDAT(100);
    int sampleData[] = {12, 45, 67, 89, 99};
    for (int i = 0; i < 5; i++) datInsert(dat, sampleData[i]);

    printf("   • Space-Saving Search (Linear Scan) : O(1) Space, O(N) Time\n");
    printf("   • Time-Saving Search (Lookup Table) : O(M) Space, O(1) Time\n");
    printf("   • Testing datLookup(67): %s\n", datLookup(dat, 67) ? "FOUND in 1 step ✓" : "NOT FOUND");
    printf("   • Testing datLookup(50): %s\n\n", datLookup(dat, 50) ? "FOUND in 1 step ✓" : "NOT FOUND (1 step)");

    printf("Complexity Classes Blueprint:\n");
    printf("• P:           Problems solvable in polynomial time O(n^k) (e.g. Sorting, Shortest Path)\n");
    printf("• NP:          Problems whose solutions can be VERIFIED in polynomial time\n");
    printf("• NP-Complete: Hardest problems in NP (e.g. 3-SAT, TSP, Subset Sum, Clique)\n");
    printf("• NP-Hard:     At least as hard as any NP-Complete problem (e.g. Halting Problem)\n");

    freeDAT(dat);
    return 0;
}
