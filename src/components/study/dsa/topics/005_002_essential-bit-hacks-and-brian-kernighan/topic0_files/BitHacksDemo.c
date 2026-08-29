/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Essential Bit Hacks, Brian Kernighan & GCC Intrinsics
 * File: BitHacksDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

// 1. Fundamental Bit Manipulation Idioms
static inline bool isKthBitSet(uint32_t n, int k) {
    return (n & (1U << k)) != 0;
}

static inline uint32_t setKthBit(uint32_t n, int k) {
    return n | (1U << k);
}

static inline uint32_t clearKthBit(uint32_t n, int k) {
    return n & ~(1U << k);
}

static inline uint32_t toggleKthBit(uint32_t n, int k) {
    return n ^ (1U << k);
}

// 2. Clear Lowest Set Bit: n & (n - 1)
static inline uint32_t clearLowestSetBit(uint32_t n) {
    return n & (n - 1);
}

// 3. Extract Lowest Set Bit: n & (-n)
static inline uint32_t extractLowestSetBit(uint32_t n) {
    return n & (-n);
}

// 4. Power of Two Check in O(1)
static inline bool isPowerOfTwo(uint32_t n) {
    return (n > 0) && ((n & (n - 1)) == 0);
}

// 5. Brian Kernighan's Population Count (Set Bit Counting) in O(number of set bits)
int countSetBitsKernighan(uint32_t n) {
    int count = 0;
    while (n > 0) {
        n = n & (n - 1); // Clears the lowest set bit in each iteration
        count++;
    }
    return count;
}

// 6. Find Single Unique Number among Duplicates using XOR in O(N)
int findSingleNumber(const int arr[], int n) {
    int uniqueVal = 0;
    for (int i = 0; i < n; i++) {
        uniqueVal ^= arr[i]; // x ^ x = 0, cancels all pairs!
    }
    return uniqueVal;
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - ESSENTIAL BIT HACKS & KERNIGHAN DEMO      \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    uint32_t num = 44; // Binary: 0010 1100
    printf("Base Number: %u (Binary: 0010 1100)\n\n", num);

    // 1. Bit Testing, Setting, Clearing, Toggling
    printf("1. Basic Bit Manipulations on bit index 1 and 4:\n");
    printf("   • Is bit 2 set?   %s\n", isKthBitSet(num, 2) ? "YES" : "NO");
    printf("   • Set bit 0:      %u\n", setKthBit(num, 0));
    printf("   • Clear bit 2:    %u\n", clearKthBit(num, 2));
    printf("   • Toggle bit 3:   %u\n\n", toggleKthBit(num, 3));

    // 2. Lowest set bit tricks
    printf("2. Lowest Set Bit Mechanics:\n");
    printf("   • n & (n - 1) [Clear lowest set bit]: %u\n", clearLowestSetBit(num));
    printf("   • n & (-n)    [Extract lowest set bit]: %u (Bit position value: 4)\n\n", extractLowestSetBit(num));

    // 3. Power of 2 Checks
    printf("3. Power of 2 Verification:\n");
    uint32_t powers[] = {0, 1, 16, 18, 64, 100, 1024};
    for (int i = 0; i < 7; i++) {
        printf("   • isPowerOfTwo(%4u): %s\n", powers[i], isPowerOfTwo(powers[i]) ? "TRUE  ✓" : "FALSE ✗");
    }
    printf("\n");

    // 4. Brian Kernighan vs GCC Builtin Popcount
    uint32_t testVal = 0x8F3A0142; // Complex bit pattern
    int kernighanCount = countSetBitsKernighan(testVal);
    int gccBuiltinCount = __builtin_popcount(testVal);
    int leadingZeros = __builtin_clz(testVal);
    int trailingZeros = __builtin_ctz(testVal);

    printf("4. Population Count & Hardware Intrinsics (Value: 0x%08X):\n", testVal);
    printf("   • Brian Kernighan Count: %d set bits\n", kernighanCount);
    printf("   • GCC __builtin_popcount: %d set bits (Single CPU instruction!)\n", gccBuiltinCount);
    printf("   • Count Leading Zeros:   %d zeros (__builtin_clz)\n", leadingZeros);
    printf("   • Count Trailing Zeros:  %d zeros (__builtin_ctz)\n\n", trailingZeros);

    // 5. XOR Single Number Finding
    int dataset[] = {4, 1, 2, 1, 2, 99, 4};
    int nData = sizeof(dataset) / sizeof(dataset[0]);
    int singleNum = findSingleNumber(dataset, nData);
    printf("5. Single Number Finding via XOR:\n");
    printf("   Dataset: {4, 1, 2, 1, 2, 99, 4}\n");
    printf("   -> Unique Element Found: %d (in O(N) time, O(1) space)\n", singleNum);

    return 0;
}
