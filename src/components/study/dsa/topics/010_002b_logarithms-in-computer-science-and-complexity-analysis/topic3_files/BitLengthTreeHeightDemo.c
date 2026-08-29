/*
 * File: BitLengthTreeHeightDemo.c
 * Purpose: Demonstrates the physical hardware connection of logarithms:
 *          1) Integer bit length calculation: bits = floor(log2(N)) + 1
 *          2) Balanced binary tree depth: h = floor(log2(N))
 * Mentor: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <math.h>

// Calculates exact bit length of an integer
int calculate_bit_length(unsigned long long n) {
    if (n == 0) return 1;
    int bits = 0;
    unsigned long long temp = n;
    while (temp > 0) {
        bits++;
        temp >>= 1; // shift right by 1 bit (equivalent to /= 2)
    }
    return bits;
}

int main() {
    printf("===================================================================\n");
    printf("  CODER & ACCOTAX - BIT LENGTH & TREE HEIGHT LOGARITHMIC MAPPING   \n");
    printf("===================================================================\n\n");

    unsigned long long numbers[] = {1, 7, 8, 15, 16, 255, 1024, 65535, 1000000, 4294967295ULL};
    int count = sizeof(numbers) / sizeof(numbers[0]);

    printf("%-15s | %-12s | %-12s | %-15s\n", "Number N", "Bit Length", "Tree Height", "log2(N) Float");
    printf("-------------------------------------------------------------------\n");

    for (int i = 0; i < count; i++) {
        unsigned long long n = numbers[i];
        int bits = calculate_bit_length(n);
        int tree_height = (int)floor(log2((double)n));
        double l2 = log2((double)n);

        printf("%-15llu | %-12d | %-12d | %-15.4f\n", n, bits, tree_height, l2);
    }

    printf("\nLaw 1 (Hardware Bits): bits(N) = floor(log2(N)) + 1\n");
    printf("Law 2 (Tree Height):   height(N) = floor(log2(N))\n");
    return 0;
}
