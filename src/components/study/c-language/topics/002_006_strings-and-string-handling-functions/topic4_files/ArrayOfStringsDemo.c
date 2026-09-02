#include <stdio.h>
#include <string.h>

/**
 * ArrayOfStringsDemo.c
 * Demonstrates 2D character arrays (fixed-width) vs array of string pointers (ragged/jagged),
 * alphabetical string sorting using strcmp() and pointer swaps.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#define NUM_STUDENTS 5
#define MAX_NAME_LEN 30

// 1. Alphabetical sorting of 2D fixed-width char array using strcpy
void sort2DStringArray(char names[NUM_STUDENTS][MAX_NAME_LEN], int count) {
    char temp[MAX_NAME_LEN];
    for (int i = 0; i < count - 1; i++) {
        for (int j = 0; j < count - 1 - i; j++) {
            if (strcmp(names[j], names[j + 1]) > 0) {
                // Swap whole string buffer
                strcpy(temp, names[j]);
                strcpy(names[j], names[j + 1]);
                strcpy(names[j + 1], temp);
            }
        }
    }
}

// 2. High-performance alphabetical sorting of string pointers (O(1) pointer swap!)
void sortStringPointers(const char *names[], int count) {
    for (int i = 0; i < count - 1; i++) {
        for (int j = 0; j < count - 1 - i; j++) {
            if (strcmp(names[j], names[j + 1]) > 0) {
                // Swap 8-byte pointer addresses directly (Zero memory copying!)
                const char *temp = names[j];
                names[j] = names[j + 1];
                names[j + 1] = temp;
            }
        }
    }
}

int main(void) {
    // A. 2D Fixed-width Array: 5 rows of 30 bytes = 150 contiguous bytes in RAM
    char studentList[NUM_STUDENTS][MAX_NAME_LEN] = {
        "Swadeep Mukherjee",
        "Tuhina Paul",
        "Abhronila Das",
        "Debangshu Roy",
        "Arindam Hui"
    };

    // B. Array of Char Pointers: 5 pointers (40 bytes) pointing to string literals
    const char *cities[] = {
        "Shyamnagar",
        "Barrackpore",
        "Naihati",
        "Ichapur",
        "Kolkata"
    };
    int cityCount = sizeof(cities) / sizeof(cities[0]);

    printf("====================================================\n");
    printf(" Array of Strings: 2D Char Arrays vs Pointer Arrays\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("1. Unsorted 2D Character Array:\n");
    for (int i = 0; i < NUM_STUDENTS; i++) {
        printf("   [%d] %-20s (Address: %p, Stride: %zu B)\n",
               i, studentList[i], (void*)studentList[i], sizeof(studentList[0]));
    }
    printf("\n");

    // Sort 2D array
    sort2DStringArray(studentList, NUM_STUDENTS);
    printf("2. Alphabetically Sorted 2D Student Array:\n");
    for (int i = 0; i < NUM_STUDENTS; i++) {
        printf("   [%d] %s\n", i + 1, studentList[i]);
    }
    printf("\n");

    // Sort Pointer Array
    printf("3. Array of String Pointers (Before Sort):\n");
    for (int i = 0; i < cityCount; i++) {
        printf("   [%d] %-15s (Points to: %p in .rodata)\n", i, cities[i], (void*)cities[i]);
    }
    printf("\n");

    sortStringPointers(cities, cityCount);
    printf("4. Alphabetically Sorted String Pointers (Lightning Fast O(1) Swaps):\n");
    for (int i = 0; i < cityCount; i++) {
        printf("   [%d] %s\n", i + 1, cities[i]);
    }

    return 0;
}
