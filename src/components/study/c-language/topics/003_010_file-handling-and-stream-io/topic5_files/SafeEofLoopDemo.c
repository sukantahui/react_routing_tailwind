/**
 * SafeEofLoopDemo.c
 * Demonstrates the infamous "while (!feof(fp))" one-off bug vs
 * the industry-standard "while (fread / fgets / fscanf)" loop pattern.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>

int main(void) {
    printf("========================================================\n");
    printf("     CODER & ACCOTAX - THE FEOF() ONE-OFF TRAP LAB      \n");
    printf("========================================================\n\n");

    const char *test_file = "eof_trap_demo.txt";

    // 1. Create a simple 2-line file
    FILE *fp = fopen(test_file, "w");
    if (fp == NULL) {
        perror("Error creating file");
        return 1;
    }
    fprintf(fp, "Line 1: Swadeep\n");
    fprintf(fp, "Line 2: Tuhina\n");
    fclose(fp);

    // 2. THE BUGGY PATTERN: while (!feof(fp))
    printf("--- 1. THE BUGGY PATTERN (while (!feof(fp))) ---\n");
    fp = fopen(test_file, "r");
    if (fp == NULL) return 1;

    char buffer[64];
    int buggy_iterations = 0;
    // WHY THIS IS WRONG: feof() only becomes true AFTER an attempted read fails!
    while (!feof(fp)) {
        buggy_iterations++;
        fgets(buffer, sizeof(buffer), fp);
        printf("  [Loop %d] Read: %s", buggy_iterations, buffer);
    }
    fclose(fp);
    printf("  [NOTICE] Notice how the last line was printed TWICE or with stale data!\n\n");

    // 3. THE CORRECT SAFE PATTERN: Test read operation return value directly!
    printf("--- 2. THE CORRECT INDUSTRIAL PATTERN (while (fgets(...) != NULL)) ---\n");
    fp = fopen(test_file, "r");
    if (fp == NULL) return 1;

    int correct_iterations = 0;
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        correct_iterations++;
        printf("  [Loop %d] Read: %s", correct_iterations, buffer);
    }

    // Now inspect feof() to confirm why loop stopped
    if (feof(fp)) {
        printf("  [CONFIRMED] Loop terminated cleanly at true End-of-File (EOF).\n");
    } else if (ferror(fp)) {
        printf("  [ERROR] Loop terminated due to physical stream error!\n");
    }

    fclose(fp);

    // Cleanup
    remove(test_file);
    printf("\n  Cleaned up temporary test file '%s'.\n", test_file);
    printf("========================================================\n");

    return 0;
}
