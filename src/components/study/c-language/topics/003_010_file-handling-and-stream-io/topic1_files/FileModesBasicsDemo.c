/**
 * FileModesBasicsDemo.c
 * Demonstrates File Pointer (FILE*), fopen() mode behaviors,
 * Mandatory NULL checks, and clean stream closing with fclose().
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>

int main(void) {
    const char *test_filename = "demo_file.txt";

    printf("========================================================\n");
    printf("   CODER & ACCOTAX - FILE MODES & FOPEN() MECHANICS     \n");
    printf("========================================================\n\n");

    // 1. Writing to a file in "w" mode (Creates or Overwrites)
    printf("--- 1. OPENING FILE IN WRITE MODE (\"w\") ---\n");
    FILE *fp = fopen(test_filename, "w");
    
    // MANDATORY NULL CHECK
    if (fp == NULL) {
        perror("Error opening file for write");
        return 1;
    }

    fprintf(fp, "Line 1: Initialized in write mode.\n");
    fprintf(fp, "Line 2: Systems Programming at Barrackpore.\n");
    fclose(fp);
    fp = NULL;
    printf("  Created and wrote 2 lines to '%s' successfully.\n\n", test_filename);

    // 2. Appending to the file in "a" mode (Preserves existing data)
    printf("--- 2. OPENING FILE IN APPEND MODE (\"a\") ---\n");
    fp = fopen(test_filename, "a");
    if (fp == NULL) {
        perror("Error opening file for append");
        return 1;
    }

    fprintf(fp, "Line 3: Appended without truncating old records!\n");
    fclose(fp);
    fp = NULL;
    printf("  Appended 1 line to '%s' successfully.\n\n", test_filename);

    // 3. Reading the file back in "r" mode
    printf("--- 3. OPENING FILE IN READ MODE (\"r\") ---\n");
    fp = fopen(test_filename, "r");
    if (fp == NULL) {
        perror("Error opening file for read");
        return 1;
    }

    printf("  File Contents:\n");
    char buffer[256];
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("    > %s", buffer);
    }
    
    fclose(fp);
    fp = NULL;

    // Clean up demo file
    remove(test_filename);
    printf("\n  Demo file '%s' closed and cleaned up.\n", test_filename);
    printf("========================================================\n");

    return 0;
}
