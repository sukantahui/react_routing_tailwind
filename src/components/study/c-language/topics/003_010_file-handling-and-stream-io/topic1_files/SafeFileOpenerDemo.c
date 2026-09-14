/**
 * SafeFileOpenerDemo.c
 * Demonstrates defensive programming idioms for C file handling:
 * Safe fopen wrapper, mandatory NULL checking, error code logging,
 * and clean deterministic resource release.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

/**
 * Defensive fopen helper that logs detailed diagnostic information
 * if the open operation fails.
 */
FILE *safe_fopen(const char *filepath, const char *mode) {
    if (filepath == NULL || mode == NULL) {
        fprintf(stderr, "[ERROR] Null filepath or mode passed to safe_fopen.\n");
        return NULL;
    }

    FILE *fp = fopen(filepath, mode);
    if (fp == NULL) {
        fprintf(stderr, "[ERROR] Failed to open '%s' in mode '%s'. Reason: %s (errno=%d)\n",
                filepath, mode, strerror(errno), errno);
        return NULL;
    }

    return fp;
}

/**
 * Safe stream closer that resets pointer to NULL to prevent dangling file handles.
 */
void safe_fclose(FILE **fp_ptr) {
    if (fp_ptr != NULL && *fp_ptr != NULL) {
        fclose(*fp_ptr);
        *fp_ptr = NULL;
    }
}

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - SAFE FILE OPENER & ERROR LAB       \n");
    printf("========================================================\n\n");

    const char *valid_file = "valid_sample.txt";
    const char *missing_file = "non_existent_file_xyz123.txt";

    // 1. Attempting to open non-existent file in read mode
    printf("--- 1. TESTING CONTROLLED FAILURE (MISSING FILE) ---\n");
    FILE *fp_missing = safe_fopen(missing_file, "r");
    if (fp_missing == NULL) {
        printf("  [HANDLED] Gracefully trapped missing file error without crash.\n\n");
    }

    // 2. Creating and writing with defensive helpers
    printf("--- 2. CREATING FILE SAFELY ---\n");
    FILE *fp_valid = safe_fopen(valid_file, "w");
    if (fp_valid != NULL) {
        fprintf(fp_valid, "Safe file handling demonstration in Barrackpore.\n");
        printf("  Successfully wrote record to '%s'.\n", valid_file);
        safe_fclose(&fp_valid);
        printf("  Stream safely closed. Pointer reset: fp_valid == %s\n\n",
               fp_valid == NULL ? "NULL" : "ACTIVE");
    }

    // 3. Reading back safely
    printf("--- 3. READING CREATED FILE ---\n");
    fp_valid = safe_fopen(valid_file, "r");
    if (fp_valid != NULL) {
        char buffer[128];
        if (fgets(buffer, sizeof(buffer), fp_valid) != NULL) {
            printf("  Read Content: \"%s\"\n", buffer);
        }
        safe_fclose(&fp_valid);
    }

    // Cleanup
    remove(valid_file);
    printf("  Cleaned up sample file '%s'.\n", valid_file);
    printf("========================================================\n");

    return 0;
}
