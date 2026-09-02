#include <stdio.h>

/**
 * StringMemoryBasicsDemo.c
 * Demonstrates character arrays vs null-terminated strings ('\0'),
 * memory byte inspection, ASCII values, and string literals in .rodata segment.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    // 1. Character array without null terminator (raw char array)
    char charArr[5] = {'H', 'e', 'l', 'l', 'o'};

    // 2. Null-terminated C string
    char str[6] = {'H', 'e', 'l', 'l', 'o', '\0'};

    // 3. String literal initialization (compiler automatically adds '\0')
    char city[] = "Barrackpore";

    // 4. Pointer to string literal (Stored in read-only .rodata segment)
    const char *educator = "Sukanta Hui";

    printf("====================================================\n");
    printf(" C Strings: Character Arrays & Null-Terminator '\\0'\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("String 'city' (\"%s\") has length %zu bytes in memory.\n", city, sizeof(city));
    printf("Pointer 'educator' (\"%s\") has sizeof(educator) = %zu bytes (Pointer size).\n\n", 
           educator, sizeof(educator));

    printf("🔍 Byte-by-Byte Memory & ASCII Inspection for 'city':\n");
    printf("-------------------------------------------------------------------\n");
    printf("%-7s | %-16s | %-8s | %-12s | %-10s\n", 
           "Index", "Memory Address", "Char", "ASCII Code", "Hex Value");
    printf("-------------------------------------------------------------------\n");

    for (int i = 0; city[i] != '\0'; i++) {
        printf("[%2d]    | %p   | '%c'      | %-12d | 0x%02X\n",
               i, (void*)&city[i], city[i], (int)city[i], (unsigned char)city[i]);
    }
    // Inspect the null terminator
    int nullIdx = sizeof(city) - 1;
    printf("[%2d]    | %p   | '\\0'     | %-12d | 0x%02X (NULL TERMINATOR)\n",
           nullIdx, (void*)&city[nullIdx], (int)city[nullIdx], (unsigned char)city[nullIdx]);
    printf("-------------------------------------------------------------------\n");

    printf("\n💡 Raw Char Array vs Null-Terminated String Output:\n");
    printf(" • With '\\0' (str) : \"%s\"\n", str);
    printf(" • Note: Printing 'charArr' without '\\0' using %%s leads to Undefined Behavior!\n");

    return 0;
}
