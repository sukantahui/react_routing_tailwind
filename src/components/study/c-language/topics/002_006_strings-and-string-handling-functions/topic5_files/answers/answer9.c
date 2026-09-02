#include <stdio.h>
#include <string.h>

/**
 * Project 9: Lexicographical Dictionary Sorter for Names
 * Sorts an array of student names in alphabetical order using strcmp and pointer swaps.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void sortNames(const char *names[], int count) {
    for (int i = 0; i < count - 1; i++) {
        for (int j = 0; j < count - 1 - i; j++) {
            if (strcmp(names[j], names[j + 1]) > 0) {
                const char *temp = names[j];
                names[j] = names[j + 1];
                names[j + 1] = temp;
            }
        }
    }
}

int main(void) {
    const char *students[] = {
        "Tuhina Paul",
        "Swadeep Mukherjee",
        "Abhronila Das",
        "Debangshu Roy",
        "Arindam Hui"
    };
    int count = sizeof(students) / sizeof(students[0]);

    printf("Original Student List:\n");
    for (int i = 0; i < count; i++) printf("  • %s\n", students[i]);

    sortNames(students, count);

    printf("\nSorted Alphabetical Directory:\n");
    for (int i = 0; i < count; i++) printf("  %d. %s\n", i + 1, students[i]);

    return 0;
}
