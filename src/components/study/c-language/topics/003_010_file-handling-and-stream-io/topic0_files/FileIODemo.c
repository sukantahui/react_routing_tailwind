#include <stdio.h>
#include <stdlib.h>

/**
 * FileIODemo.c
 * Text file writing and reading using fopen, fprintf, fgets, fclose
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    FILE *fp = NULL;
    char buffer[256];

    printf("=== Text File I/O Stream Operations ===\n\n");

    // Write text to file
    fp = fopen("students.txt", "w");
    if (fp == NULL) {
        perror("Error opening file for writing");
        return 1;
    }

    fprintf(fp, "Center: Barrackpore | Educator: Sukanta Hui\n");
    fprintf(fp, "Student: Swadeep | Subject: C Programming\n");
    fclose(fp);
    printf("Data written to 'students.txt' successfully.\n\n");

    // Read text from file
    fp = fopen("students.txt", "r");
    if (fp == NULL) {
        perror("Error opening file for reading");
        return 1;
    }

    printf("Reading 'students.txt':\n");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }

    fclose(fp);
    return 0;
}
