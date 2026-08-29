/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Bitmasking, Power-Set Subsets & Dynamic 64-bit Bitsets
 * File: BitmaskingDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>

// ============================================================================
// 1. POWER-SET (ALL 2^N SUBSETS) GENERATION VIA BITMASKS
// ============================================================================
void generateAllSubsets(const char* elements[], int n) {
    int totalSubsets = 1 << n; // 2^N subsets

    printf("1. Power-Set Generation for %d Elements (Total %d Subsets):\n", n, totalSubsets);

    for (int mask = 0; mask < totalSubsets; mask++) {
        printf("   Subset #%2d (Mask 0x%02X): { ", mask, mask);
        bool first = true;
        for (int i = 0; i < n; i++) {
            // If i-th bit is set in mask, include elements[i]
            if ((mask & (1 << i)) != 0) {
                if (!first) printf(", ");
                printf("\"%s\"", elements[i]);
                first = false;
            }
        }
        if (first) printf("EMPTY_SET");
        printf(" }\n");
    }
    printf("\n");
}

// ============================================================================
// 2. SUBMASK ITERATION IN O(3^N)
// ============================================================================
void iterateSubmasks(int mask) {
    printf("2. Submask Iteration for Mask 0x%02X:\n", mask);
    int submask = mask;
    while (submask > 0) {
        printf("   • Submask: 0x%02X\n", submask);
        // The magic submask decrement idiom: (submask - 1) & mask
        submask = (submask - 1) & mask;
    }
    printf("   • Submask: 0x00 (Empty Submask)\n\n");
}

// ============================================================================
// 3. DYNAMIC 64-BIT ALIGNED BITSET IN C
// ============================================================================
typedef struct Bitset {
    uint64_t* words;
    size_t size; // Total number of bits
} Bitset;

Bitset* createBitset(size_t numBits) {
    Bitset* bs = (Bitset*)malloc(sizeof(Bitset));
    if (!bs) return NULL;

    bs->size = numBits;
    size_t numWords = (numBits + 63) / 64;
    bs->words = (uint64_t*)calloc(numWords, sizeof(uint64_t));
    if (!bs->words) {
        free(bs);
        return NULL;
    }
    return bs;
}

void bitsetSet(Bitset* bs, size_t index) {
    if (index >= bs->size) return;
    bs->words[index / 64] |= (1ULL << (index % 64));
}

void bitsetClear(Bitset* bs, size_t index) {
    if (index >= bs->size) return;
    bs->words[index / 64] &= ~(1ULL << (index % 64));
}

bool bitsetTest(const Bitset* bs, size_t index) {
    if (index >= bs->size) return false;
    return (bs->words[index / 64] & (1ULL << (index % 64))) != 0;
}

void freeBitset(Bitset* bs) {
    if (bs) {
        free(bs->words);
        free(bs);
    }
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - BITMASKING & BITSET ENGINE DEMO           \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    const char* items[] = {"CPU", "RAM", "GPU", "SSD"};
    generateAllSubsets(items, 4);

    iterateSubmasks(0b00001101); // Mask with 3 set bits (decimal 13)

    // Dynamic Bitset Demonstration
    Bitset* bloom = createBitset(256);
    printf("3. Dynamic Bitset (256 bits):\n");
    bitsetSet(bloom, 7);
    bitsetSet(bloom, 42);
    bitsetSet(bloom, 128);
    bitsetSet(bloom, 255);

    printf("   • Is bit 7 set?   %s\n", bitsetTest(bloom, 7) ? "YES ✓" : "NO ✗");
    printf("   • Is bit 10 set?  %s\n", bitsetTest(bloom, 10) ? "YES ✓" : "NO ✗");
    printf("   • Is bit 42 set?  %s\n", bitsetTest(bloom, 42) ? "YES ✓" : "NO ✗");
    printf("   • Is bit 255 set? %s\n", bitsetTest(bloom, 255) ? "YES ✓" : "NO ✗");

    freeBitset(bloom);
    printf("   ✓ Bitset memory safely freed.\n");

    return 0;
}
